import { Fragment, useEffect, useRef, useState } from 'react';
import { researchAreas } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import stackBright from '../assets/figma/research-stack-3d.webp';
import stackDim from '../assets/figma/research-stack-3d-dim.webp';
import maskFoundation from '../assets/figma/research-stack-mask-foundation.svg';
import maskModel from '../assets/figma/research-stack-mask-model.svg';
import maskSynthetic from '../assets/figma/research-stack-mask-synthetic.svg';
import maskSystem from '../assets/figma/research-stack-mask-system.svg';

/* ── 적층 순서 — copy.js는 위→아래(system→foundation)이므로 뒤집어 아래→위로 진행 ── */
const STACK = [...researchAreas.layers].reverse();
const N = STACK.length;

/* Figma 하이라이트 마스크 — 딤 베이스 위에 밝은 렌더를 계층 영역만 잘라 얹는다.
   각 마스크는 하단(foundation)부터 해당 단계까지 누적된 도형 — 아래→위로 컬러가 쭉 이어져 보인다.
   pos/size는 Figma 551×594 좌표에 데스크톱 확대 배율(1.1×)을 곱한 값 (2026-07-20 이미지 전면 교체 + PC 10% 확대) */
const HIGHLIGHTS = {
  foundation: { mask: maskFoundation, pos: '65.45px 409.2px', size: '481.8px 222.75px' },
  model: { mask: maskModel, pos: '65.45px 304.15px', size: '481.8px 327.8px' },
  synthetic: { mask: maskSynthetic, pos: '65.45px 173.8px', size: '481.8px 458.15px' },
  system: { mask: maskSystem, pos: '65.45px 117.7px', size: '481.8px 514.25px' },
};

/* 계층 세로 앵커(컨테이너 비율) — 흐름 라벨 seam 위치 계산용 (기존 배치 유지) */
const PLATE_ANCHORS = [0.79, 0.59, 0.39, 0.3];

const clamp01 = (v) => Math.min(1, Math.max(0, v));
const easeOut = (t) => 1 - (1 - t) ** 3; // power2.out

const FLOW_TONE = {
  neutral: { label: 'border-white/25 text-dim-dark', wave: 'stroke-dim-dark' },
  accent: { label: 'border-accent/50 text-glow', wave: 'stroke-glow' },
};

const APPEAR = 'animate-[fadeUp_0.5s_cubic-bezier(0.22,1,0.36,1)_both]';

/* 상향 웨이브 — 아크 3개가 아래→위 순으로 점멸·상승하며 흐름을 표현. reduced-motion 시 정적 아크 */
function FlowWave({ tone }) {
  const t = FLOW_TONE[tone] ?? FLOW_TONE.neutral;
  return (
    <div className="flex flex-col items-center" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <svg
          key={i}
          className="-my-[2px] h-[10px] w-7 motion-safe:animate-[flowWave_1.8s_ease-in-out_infinite]"
          style={{ animationDelay: `${(2 - i) * 0.6 - 1.8}s` }}
          viewBox="0 0 28 10"
        >
          <path d="M2 8 Q14 0 26 8" fill="none" className={t.wave} strokeWidth="2" strokeLinecap="round" />
        </svg>
      ))}
    </div>
  );
}

function FlowPill({ label, tone }) {
  const t = FLOW_TONE[tone] ?? FLOW_TONE.neutral;
  return (
    <>
      <FlowWave tone={tone} />
      <span
        className={`inline-flex items-center rounded-full border bg-dark/70 px-3.5 py-1.5 text-[13px] font-medium backdrop-blur-[2px] ${t.label}`}
      >
        {label}
      </span>
    </>
  );
}

/* ── 계층 콘텐츠 — Figma: 흰 보더 필 배지 → 영문명+한글 부제 → 설명, synthetic은 칩 2×2 ── */
function LayerInfo({ layer, animated = false }) {
  return (
    <div>
      <div className={animated ? APPEAR : ''}>
        <span className="inline-flex items-center rounded-full border border-ink-light px-4 py-1 text-[16px] leading-[1.5] text-ink-light md:text-[20px]">
          {layer.badge}
        </span>
      </div>
      <div className="mt-4 flex flex-col gap-6 md:gap-8">
        {layer.cards.map((card, i) => (
          <div key={card.name} className={animated ? APPEAR : ''} style={animated ? { animationDelay: `${120 + i * 90}ms` } : undefined}>
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
              <h3 className="text-[20px] font-semibold leading-[1.25] text-ink-light md:text-[24px]">{card.name}</h3>
              <p className="text-[16px] leading-[1.5] text-ink-light md:text-[20px]">{card.sub}</p>
            </div>
            <p className="mt-3 text-[16px] leading-[1.5] text-dim-dark md:mt-4 md:text-[20px]">{card.desc}</p>
            {card.chips && (
              <div className="mt-4 grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                {card.chips.map((chip) => (
                  <div key={chip.name} className="rounded-2xl bg-white/30 px-5 py-4">
                    <p className="text-[17px] font-bold leading-[1.5] text-ink-light md:text-[20px]">{chip.name}</p>
                    <p className="mt-2 text-[14px] leading-[1.5] text-dim-dark md:text-[16px]">{chip.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── 3D 스택 렌더 — 딤 베이스 + 하단부터 활성 계층까지 누적 마스크로 밝은 렌더가 드러남 + 흐름 웨이브 ── */
function StackVisual({ activeIdx, lps }) {
  // 하이라이트 크로스페이드 — 스크럽 진행도에 직접 연동 (역스크롤도 대칭)
  const hlOpacity = (si) => {
    if (si === activeIdx) return easeOut(lps[si]);
    if (si === activeIdx - 1) return 1 - easeOut(lps[activeIdx]);
    return 0;
  };

  return (
    <div className="relative h-[660px] w-[440px]">
      {/* Figma 배치(551×594 → 400×600 클립)에 PC 10% 확대(440×660) 적용 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-79.2px] top-0 h-[653.4px] w-[606.1px]">
          <img src={stackDim} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full max-w-none" />
          {STACK.map((layer, si) => {
            const hl = HIGHLIGHTS[layer.key];
            return (
              <img
                key={layer.key}
                src={stackBright}
                alt=""
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 size-full max-w-none"
                style={{
                  opacity: hlOpacity(si),
                  willChange: 'opacity',
                  maskImage: `url("${hl.mask}")`,
                  WebkitMaskImage: `url("${hl.mask}")`,
                  maskMode: 'alpha',
                  maskRepeat: 'no-repeat',
                  WebkitMaskRepeat: 'no-repeat',
                  maskPosition: hl.pos,
                  WebkitMaskPosition: hl.pos,
                  maskSize: hl.size,
                  WebkitMaskSize: hl.size,
                }}
              />
            );
          })}
        </div>
      </div>
      {/* 계층 간 흐름 — 위 계층 착지와 함께 웨이브+라벨이 나타나 계속 흐른다 */}
      {STACK.map((layer, si) => {
        if (!layer.flowAfter) return null;
        const seam = (PLATE_ANCHORS[si] + PLATE_ANCHORS[si - 1]) / 2;
        return (
          <div
            key={`${layer.key}-flow`}
            aria-hidden="true"
            className="pointer-events-none absolute left-1/2 z-10 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-0.5"
            style={{ top: `calc(${(seam * 100).toFixed(2)}% + 10px)`, opacity: easeOut(lps[si]), willChange: 'opacity' }}
          >
            <FlowPill label={layer.flowAfter.label} tone={layer.flowAfter.tone} />
          </div>
        );
      })}
    </div>
  );
}

/* 고정 Nav(데스크톱 88px) + 여백 — pin 헤더가 nav 뒤에 가려지지 않도록 항상 확보하는 최소 상단 여백 */
const NAV_CLEARANCE = 104;
const BOTTOM_BREATHING = 24;
const GRID_GAP = 40; // 헤더 ↔ 그리드 사이 gap-10
const STACK_W = 440;
const STACK_H = 660;
/* pin 레이아웃 최소 뷰포트 높이 — nav(104) + 헤더(205) + gap(40) + 최장 계층 패널(429, synthetic)
   실측 합(≈778)에 여유를 둔 값. 이보다 낮으면 텍스트 원본 크기로는 물리적으로 안 들어가므로
   StaticSection으로 폴백 (1280×800 노트북까지는 pin 유지) */
const PIN_MIN_VH = 790;

/* ── 짧은 뷰포트 대응 — 텍스트는 항상 원본 크기 유지, 3D 스택 이미지만 비율 축소 ──
   scale은 뷰포트에서 nav·헤더·gap·하단 여백을 뺀 나머지 대비 이미지 높이(660)로 계산.
   paddingTop은 실측 콘텐츠 높이 기준 중앙 정렬(최소 nav 여백 보장). */
function useStackFit(contentRef, headerRef) {
  const [fit, setFit] = useState({ paddingTop: NAV_CLEARANCE, scale: 1 });

  useEffect(() => {
    const content = contentRef.current;
    const header = headerRef.current;
    if (!content || !header) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const headerH = header.offsetHeight;
      const scale = Math.min(1, (vh - NAV_CLEARANCE - headerH - GRID_GAP - BOTTOM_BREATHING) / STACK_H);
      const paddingTop = Math.max(NAV_CLEARANCE, (vh - content.offsetHeight) / 2);
      setFit((prev) => (prev.scale === scale && prev.paddingTop === paddingTop ? prev : { paddingTop, scale }));
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    // scale 적용 → 콘텐츠 높이 변화 → paddingTop 재계산까지 ResizeObserver로 수렴
    const ro = new ResizeObserver(schedule);
    ro.observe(content);
    window.addEventListener('resize', schedule);
    return () => {
      ro.disconnect();
      window.removeEventListener('resize', schedule);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [contentRef, headerRef]);

  return fit;
}

/* ── 래퍼 대비 스크롤 진행도 0~1 — rAF 스로틀, 의존성 없이 scrub 구현 ── */
function useScrollProgress(ref) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = rect.height - window.innerHeight;
      setProgress(total > 0 ? clamp01(-rect.top / total) : 0);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [ref]);

  return progress;
}

/* ── 데스크톱 — 섹션 pin + 스크럽으로 Foundation→Model→Synthetic→System 진행 ── */
function PinnedSection() {
  const wrapRef = useRef(null);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const progress = useScrollProgress(wrapRef);
  const { paddingTop, scale } = useStackFit(contentRef, headerRef);

  // 계층별 로컬 진행도 — 구간의 앞 80%에서 등장, 뒤 20%는 홀드
  const seg = progress * N;
  const lps = STACK.map((_, i) => clamp01((seg - i) / 0.8));
  const activeIdx = Math.max(0, Math.min(N - 1, Math.floor(seg)));

  return (
    <div ref={wrapRef} className="relative h-[380vh]">
      <div
        className="sticky top-0 flex h-screen flex-col items-center overflow-hidden px-5 md:px-[60px]"
        style={{ paddingTop }}
      >
        <div ref={contentRef} className="flex w-full flex-col items-center gap-10">
          <div ref={headerRef} className="w-full max-w-[1320px]">
            <SectionHeader dark tight eyebrow={researchAreas.eyebrow} title={researchAreas.title} support={researchAreas.support} />
          </div>

          <div className="grid w-full max-w-[1320px] grid-cols-[auto_minmax(0,1fr)] items-center gap-x-10">
            {/* 스택 이미지만 축소 — 래퍼가 축소된 실제 크기를 차지해 그리드가 빈틈없이 붙는다 */}
            <div style={{ width: STACK_W * scale, height: STACK_H * scale }}>
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>
                <StackVisual activeIdx={activeIdx} lps={lps} />
              </div>
            </div>

            {/* 활성 계층 콘텐츠 — 단계 전환 시 배지→항목 순 스태거 등장 */}
            <div className="self-center pl-[43px] transition-opacity duration-300" style={{ opacity: lps[activeIdx] > 0.02 ? 1 : 0 }}>
              <div key={activeIdx}>
                <LayerInfo layer={STACK[activeIdx]} animated />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── 모바일·reduced-motion — pin 없이 렌더 1장 + 계층 블록 순차 등장 (아래→위 순서) ── */
function StaticSection() {
  return (
    <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-28 md:gap-20 md:px-[60px] md:py-[160px]">
      <SectionHeader dark tight eyebrow={researchAreas.eyebrow} title={researchAreas.title} support={researchAreas.support} />

      <Reveal className="w-full max-w-[460px] sm:max-w-[540px] md:max-w-[620px]">
        <img src={stackBright} alt="" aria-hidden="true" className="w-full" />
      </Reveal>

      <div className="flex w-full max-w-[880px] flex-col">
        {STACK.map((layer, si) => (
          <Fragment key={layer.key}>
            {layer.flowAfter && (
              <Reveal delay={si * 60}>
                <div aria-hidden="true" className="flex flex-col items-center gap-0.5 py-5">
                  <FlowPill label={layer.flowAfter.label} tone={layer.flowAfter.tone} />
                </div>
              </Reveal>
            )}
            <Reveal delay={si * 60 + 40}>
              <LayerInfo layer={layer} />
            </Reveal>
          </Fragment>
        ))}
      </div>
    </div>
  );
}

/**
 * SECTION 03 — 우리는 무엇을 연구하는가.
 * Figma 다크 시안: 유리질 3D 계층 스택 렌더 + 스크롤 pin/scrub으로
 * Foundation→Model→Synthetic→System 순으로 콘텐츠 전환. 글로우 스포트라이트가
 * 활성 계층을 비추고, 계층 사이 흐름은 웨이브+라벨로 이미지 위에 남는다.
 */
export default function ResearchAreas() {
  const desktop = useMediaQuery('(min-width: 1024px)');
  // pin 레이아웃이 원본 텍스트 크기로 들어가지 않는 낮은 뷰포트는 StaticSection으로 폴백
  const tallEnough = useMediaQuery(`(min-height: ${PIN_MIN_VH}px)`);
  const reduced = usePrefersReducedMotion();

  return (
    // overflow-hidden은 sticky를 깨므로 overflow-x-clip 사용
    <section
      id="research"
      className="relative overflow-x-clip bg-gradient-to-b from-dark via-[#001625] via-60% to-[#2d4c6f]"
    >
      {desktop && tallEnough && !reduced ? <PinnedSection /> : <StaticSection />}
    </section>
  );
}
