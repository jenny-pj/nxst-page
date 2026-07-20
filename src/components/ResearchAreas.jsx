import { Fragment, useEffect, useRef, useState } from 'react';
import { researchAreas } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import stackBright from '../assets/figma/research-stack-3d.png';
import stackDim from '../assets/figma/research-stack-3d-dim.png';
import maskFoundation from '../assets/figma/research-stack-mask-foundation.svg';
import maskModel from '../assets/figma/research-stack-mask-model.svg';
import maskSynthetic from '../assets/figma/research-stack-mask-synthetic.svg';
import maskSystem from '../assets/figma/research-stack-mask-system.svg';

/* ── 적층 순서 — copy.js는 위→아래(system→foundation)이므로 뒤집어 아래→위로 진행 ── */
const STACK = [...researchAreas.layers].reverse();
const N = STACK.length;

/* Figma 하이라이트 마스크 — 딤 베이스 위에 밝은 렌더를 계층 영역만 잘라 얹는다.
   각 마스크는 하단(foundation)부터 해당 단계까지 누적된 도형 — 아래→위로 컬러가 쭉 이어져 보인다.
   pos/size는 566×750 렌더 좌표 기준 (Figma mask-position/mask-size 그대로) */
const HIGHLIGHTS = {
  foundation: { mask: maskFoundation, pos: '67.5px 447px', size: '438px 202.5px' },
  model: { mask: maskModel, pos: '74px 343px', size: '420px 302.5px' },
  synthetic: { mask: maskSynthetic, pos: '74.5px 212.5px', size: '409px 439px' },
  system: { mask: maskSystem, pos: '74px 189.5px', size: '416px 455.5px' },
};

/* 계층 세로 앵커(컨테이너 비율) — 마스크 중심에서 산출, 흐름 라벨 seam 위치 계산용 */
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
    <div className="relative h-[600px] w-[400px]">
      {/* Figma 배치 그대로 — 566×750 렌더를 400×600 박스에 클립 */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-[-75px] h-[750px] w-[566px] -translate-x-1/2">
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
            style={{ top: `calc(${(seam * 100).toFixed(2)}% + 10px)`, opacity: easeOut(lps[si]) }}
          >
            <FlowPill label={layer.flowAfter.label} tone={layer.flowAfter.tone} />
          </div>
        );
      })}
    </div>
  );
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
  const progress = useScrollProgress(wrapRef);

  // 계층별 로컬 진행도 — 구간의 앞 80%에서 등장, 뒤 20%는 홀드
  const seg = progress * N;
  const lps = STACK.map((_, i) => clamp01((seg - i) / 0.8));
  const activeIdx = Math.max(0, Math.min(N - 1, Math.floor(seg)));

  return (
    <div ref={wrapRef} className="relative h-[380vh]">
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center gap-10 overflow-hidden px-5 md:px-[60px]">
        <div className="w-full max-w-[1320px]">
          <SectionHeader dark tight eyebrow={researchAreas.eyebrow} title={researchAreas.title} support={researchAreas.support} />
        </div>

        <div className="grid w-full max-w-[1320px] grid-cols-[400px_minmax(0,1fr)] items-center gap-x-10">
          <StackVisual activeIdx={activeIdx} lps={lps} />

          {/* 활성 계층 콘텐츠 — 단계 전환 시 배지→항목 순 스태거 등장 */}
          <div className="self-center pl-[43px] transition-opacity duration-300" style={{ opacity: lps[activeIdx] > 0.02 ? 1 : 0 }}>
            <div key={activeIdx}>
              <LayerInfo layer={STACK[activeIdx]} animated />
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

      <Reveal className="w-full max-w-[380px]">
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
  const reduced = usePrefersReducedMotion();

  return (
    // overflow-hidden은 sticky를 깨므로 overflow-x-clip 사용
    <section
      id="research"
      className="relative overflow-x-clip bg-gradient-to-b from-dark via-[#001625] via-60% to-[#2d4c6f]"
    >
      {desktop && !reduced ? <PinnedSection /> : <StaticSection />}
    </section>
  );
}
