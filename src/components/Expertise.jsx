import { Fragment, useEffect, useRef, useState } from 'react';
import { expertise, framework } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/* 협력 기관 로고 — Figma 개별 에셋 12장 (2026-07-21 로고 세트 갱신).
   box: Figma 카드(130×100) 기준 로고 크기를 %로 환산한 값 — 로고별로 원본 비율이 제각각이라
   Figma에서 카드 안에 크기를 다르게 맞춰놓은 걸 그대로 재현 (KAIST처럼 카드보다 넓어 가장자리가
   잘리는 경우도 포함). Harvard Medical School·GIST는 Figma가 확대 크롭한 영역까지 반영해 이미지
   자체를 그 영역으로 미리 잘라둠. */
const PARTNER_LOGOS = Object.entries(
  import.meta.glob('../assets/figma/partners/partner-*.png', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], i) => ({
    src,
    ...[
      { name: 'University of Cambridge', box: { w: 88.68, h: 25 } },
      { name: 'Harvard University', box: { w: 84.62, h: 30 } },
      { name: 'University of Oxford', box: { w: 92.31, h: 36 } },
      { name: 'Imperial College London', box: { w: 76.92, h: 11 } },
      { name: "King's College London", box: { w: 61.54, h: 53 } },
      { name: 'Mass Eye and Ear', box: { w: 92.31, h: 29 } },
      { name: 'Harvard Medical School', box: { w: 92.31, h: 30 } },
      { name: 'KAIST', box: { w: 153.85, h: 47 } },
      { name: 'University of Liverpool', box: { w: 86.15, h: 28 } },
      { name: 'Durham University', box: { w: 76.92, h: 43 } },
      { name: 'GIST', box: { w: 46.15, h: 57 } },
      { name: 'Curtin University', box: { w: 92.31, h: 25 } },
    ][i],
  }));

/* 스크롤 진입 시 0 → 목표값 카운트업 ("12+" → 숫자 12 + 접미사 "+").
   reduced-motion 시 즉시 최종값 표시. */
function CountUp({ value, duration = 1600 }) {
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [null, '0', ''];
  const target = parseInt(num, 10);
  const ref = useRef(null);
  // 프리렌더/no-JS에선 최종값이 보이도록 target으로 시작 — 브라우저에서만 0부터 카운트업
  const [n, setN] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf;
    setN(0);
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * target)); // ease-out cubic
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

const LAYER_IDS = [1, 2, 3, 4, 5];

/* L01~L05 파이프라인 축 — 카드 hover 시 해당 레이어 점등 (Framework 레이어명 공유) */
function LayerAxis({ lit }) {
  return (
    <div className="flex w-full items-start justify-center">
      {LAYER_IDS.map((id, i) => {
        const on = lit.includes(id);
        return (
          <Fragment key={id}>
            {i > 0 && (
              <span
                aria-hidden="true"
                className={`mt-[13px] h-px w-5 shrink-0 transition-colors duration-200 sm:w-9 md:w-14 ${
                  lit.includes(id - 1) && on ? 'bg-accent' : 'bg-line'
                }`}
              />
            )}
            <div className="flex max-w-[190px] flex-col items-center gap-2 px-1.5">
              <span
                className={`rounded-full border px-3 py-1 text-[13px] font-semibold tracking-[0.08em] transition-colors duration-200 md:text-[14px] ${
                  on ? 'border-accent bg-accent text-white' : 'border-line bg-surface text-ink-dim'
                }`}
              >
                L0{id}
              </span>
              <span
                className={`hidden text-center text-[14px] font-medium leading-[1.4] transition-colors duration-200 md:block ${
                  on ? 'text-accent' : 'text-ink-dim'
                }`}
              >
                {framework.layers[id - 1].name}
              </span>
            </div>
          </Fragment>
        );
      })}
    </div>
  );
}

/* 카드 헤더 커버리지 바 — L01~L05 5칸 세그먼트, 매핑된 레이어만 액센트 */
function CoverageBar({ layers }) {
  return (
    <div className="flex items-center gap-1" aria-label={`파이프라인 커버리지 — ${layers.map((l) => `L0${l}`).join(', ')}`}>
      {LAYER_IDS.map((id) => (
        <span
          key={id}
          title={`L0${id}`}
          className={`h-[5px] w-6 rounded-full ${layers.includes(id) ? 'bg-accent' : 'bg-line/60'}`}
        />
      ))}
    </div>
  );
}

/* 역량 아이템 행 — hover/포커스 시 디테일 펼침, 탭(클릭)으로 열림 고정 (터치 대응) */
function GroupItem({ item, open, onToggle }) {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-expanded={open}
      onClick={(e) => {
        // 아이템 자신의 클릭은 document의 '바깥 클릭 닫기'까지 올라가지 않게 — 토글만 수행
        e.stopPropagation();
        onToggle();
      }}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onToggle();
        }
      }}
      className="group/item relative cursor-pointer border-b border-[#e3e9f1] outline-none last:border-b-0"
    >
      {/* 왼쪽 액센트 틱 — hover 시 위에서 아래로 펼침 */}
      <span
        aria-hidden="true"
        className={`absolute inset-y-0 left-0 w-0.5 origin-top bg-accent transition-transform duration-200 ${
          open ? 'scale-y-100' : 'scale-y-0 group-hover/item:scale-y-100 group-focus-visible/item:scale-y-100'
        }`}
      />
      <div
        className={`flex items-center justify-between gap-3 px-5 py-3.5 transition-colors duration-200 md:px-6 ${
          open ? 'bg-accent/5' : 'group-hover/item:bg-accent/5'
        }`}
      >
        <span
          className={`text-[15px] font-medium leading-[1.5] transition-colors duration-200 md:text-[16px] ${
            open ? 'text-accent' : 'text-ink group-hover/item:text-accent'
          }`}
        >
          {item.name}
        </span>
        <span
          aria-hidden="true"
          className={`shrink-0 text-[13px] transition-all duration-200 ${
            open ? 'rotate-90 text-accent' : 'text-ink-dim group-hover/item:text-accent'
          }`}
        >
          ▸
        </span>
      </div>
      {/* 디테일 펼침 — hover 시 150ms 지연 후 천천히 펼침(스치듯 지나갈 땐 안 열림), 닫힘도 500ms로 완만하게 */}
      <div
        className={`overflow-hidden transition-[max-height,opacity] duration-500 ease-in-out ${
          open
            ? 'max-h-[220px] opacity-100'
            : 'max-h-0 opacity-0 delay-0 group-hover/item:max-h-[220px] group-hover/item:opacity-100 group-hover/item:delay-150'
        }`}
      >
        <p className="px-5 pb-4 text-[14px] leading-[1.65] text-ink-dim md:px-6 md:text-[15px]">{item.detail}</p>
      </div>
    </div>
  );
}

/* 역량 그룹 카드 — CORE 그룹은 액센트 보더 + 틴트 배경, hover 시 커서 추적 글로우.
   coverage: 헤더에 L01~L05 커버리지 바 표시, onEnter/onLeave: 축 점등 연동.
   열림 고정 상태(openKey)는 섹션 전역 — 다른 카드 클릭 시에도 이전 고정이 풀린다 */
function GroupCard({ group, index, openKey, setOpenKey, coverage = false, onEnter, onLeave }) {
  const ref = useRef(null);

  const onMouseMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  };

  const isCore = group.badge === 'CORE';

  return (
    <article
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="group/card relative h-full overflow-hidden rounded-2xl border border-line bg-surface transition-all duration-300 hover:border-accent/50 hover:shadow-[0_8px_24px_rgba(1,10,18,0.07)]"
    >
      {/* 커서 추적 글로우 */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/card:opacity-100"
        style={{
          background:
            'radial-gradient(340px circle at var(--mx, -200px) var(--my, -200px), rgba(81,131,232,0.08), transparent 65%)',
        }}
      />

      <div className="relative border-b border-[#e3e9f1] px-5 pb-4 pt-5 md:px-6 md:pt-6">
        {/* 상단 행 — 커버리지 바(좌) + CORE 뱃지(우) */}
        <div className="flex min-h-[28px] flex-wrap items-center justify-between gap-2">
          {coverage && <CoverageBar layers={group.layers} />}
          {isCore && (
            <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold tracking-[0.08em] text-white">
              CORE
            </span>
          )}
        </div>
        <h3 className={`mt-2 text-[20px] font-semibold leading-[1.4] md:text-[22px] ${isCore ? 'text-accent' : 'text-ink'}`}>{group.name}</h3>
        <p className="mt-1 text-[14px] leading-[1.5] text-ink-dim md:text-[15px]">{group.cap}</p>
      </div>

      <div className="relative">
        {group.items.map((item, i) => {
          const key = `${index}-${i}`;
          return (
            <GroupItem
              key={item.name}
              item={item}
              open={openKey === key}
              onToggle={() => setOpenKey(openKey === key ? null : key)}
            />
          );
        })}
      </div>
    </article>
  );
}

/**
 * SECTION 05 — 핵심 연구 역량 (Figma 20:160).
 * 라이트 배경(#f5f7fa) 위 5컬럼 — 72px 원형 아이콘 + 역량명 + 흰색 칩 3개(r16).
 * 원 안 아이콘은 시안에 비어 있어 역량 성격에 맞는 아이콘으로 채움.
 */
const PUBLICATIONS_COLLAPSED_COUNT = 4;

export default function Expertise() {
  const [showAllPublications, setShowAllPublications] = useState(false);
  const [litLayers, setLitLayers] = useState([]); // hover된 카드가 커버하는 레이어 — 축 점등
  const [openKey, setOpenKey] = useState(null); // 클릭으로 고정된 아이템 ('카드idx-아이템idx') — 전 카드 통틀어 하나만

  // 아이템 바깥 아무 곳이나 클릭하면 고정 해제 — 아이템 클릭은 stopPropagation으로 여기 안 옴
  useEffect(() => {
    if (openKey == null) return undefined;
    const close = () => setOpenKey(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [openKey]);

  const visiblePublications = showAllPublications
    ? expertise.research.publications
    : expertise.research.publications.slice(0, PUBLICATIONS_COLLAPSED_COUNT);

  return (
    <section id="expertise" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-5 py-28 md:gap-[100px] md:px-[80px] md:py-[160px]">
        <SectionHeader tight eyebrow={expertise.eyebrow} title={expertise.title} support={expertise.support} />

        {/* 역량 그룹 카드 2×2 — 아이템 hover/탭 시 디테일 펼침 */}
        {/* 파이프라인 축 + 역량 그룹 카드 — 카드 hover 시 축의 매핑 레이어 점등 */}
        <div className="flex w-full flex-col items-center gap-8">
          <Reveal className="w-full">
            <LayerAxis lit={litLayers} />
          </Reveal>
          {/* row stretch — 디테일 펼침 시 같은 행의 카드도 함께 늘어나 행 바닥선이 정렬 유지 */}
          <div className="grid w-full max-w-[1060px] grid-cols-1 gap-4 md:grid-cols-2">
            {expertise.groups.map((group, i) => (
              <Reveal key={group.name} delay={i * 80} className="h-full">
                <GroupCard
                  group={group}
                  index={i}
                  openKey={openKey}
                  setOpenKey={setOpenKey}
                  coverage
                  onEnter={() => setLitLayers(group.layers)}
                  onLeave={() => setLitLayers([])}
                />
              </Reveal>
            ))}
          </div>
        </div>

        {/* 연구 성과 하이라이트 — Figma 155:1574 */}
        <div className="flex w-full flex-col items-center gap-14 md:gap-[80px]">
          <div className="flex flex-col items-center gap-8">
            <Reveal>
              <h3 className="whitespace-pre-line text-center text-[24px] font-semibold leading-[1.5] tracking-[-0.02em] text-ink md:text-[40px] md:leading-[1.5]">
                {expertise.research.title}
              </h3>
            </Reveal>

            <Reveal delay={80}>
              <p className="text-center text-[15px] font-medium leading-[1.5] tracking-[-0.3px] text-ink-dim md:text-[24px] md:tracking-[-0.48px]">
                {expertise.research.caption}
              </p>
            </Reveal>
          </div>

          {/* 핵심 지표 3종 — 액센트 숫자 + 영문 레이블 */}
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-12 lg:gap-[80px]">
            {expertise.research.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="flex flex-col items-center gap-2">
                <p className="text-[36px] font-semibold leading-[1.5] tracking-[-0.02em] text-accent md:text-[48px]">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-center text-[16px] leading-[1.5] text-ink md:text-[20px]">{stat.label}</p>
              </Reveal>
            ))}
          </div>

          {/* 협력 기관 로고 마퀴 — 동일 크기 흰색 프레임(Figma 130:100 비율) 안에 로고를 contain으로 배치.
              동일 세트 2개를 이어 붙여 우→좌 무한 루프, 각 세트에 pr(=gap)을 줘 -50% 이동 주기가 정확히 한 세트가 되도록 */}
          <Reveal className="w-full">
            <div className="w-full overflow-hidden" role="img" aria-label="협력 기관 로고 — Cambridge, Harvard, Oxford, Imperial, KAIST, GIST 등">
              <div className="flex w-max motion-safe:animate-[ticker_40s_linear_infinite]">
                {[0, 1].map((copy) => (
                  <div
                    key={copy}
                    aria-hidden={copy === 1}
                    className="flex items-center gap-[10px] pr-[10px] md:gap-[15px] md:pr-[15px]"
                  >
                    {PARTNER_LOGOS.map((logo) => (
                      <div
                        key={logo.name}
                        className="relative flex h-[72px] w-[94px] shrink-0 items-center justify-center overflow-hidden rounded-lg bg-white md:h-[111px] md:w-[144px]"
                      >
                        <div className="relative" style={{ width: `${logo.box.w}%`, height: `${logo.box.h}%` }}>
                          <img
                            src={logo.src}
                            alt={copy === 0 ? logo.name : ''}
                            loading="lazy"
                            className="absolute inset-0 size-full object-cover"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="flex w-full flex-col items-center gap-8">
            {/* 논문 리스트 — 연도·게재처 / 논문명 / 협력 기관 칩 3칼럼 */}
            <div className="w-full">
              <Reveal>
                <p className="border-b border-[#d9d9d9] py-4 text-[20px] font-semibold leading-[1.5] text-ink md:text-[24px]">
                  {expertise.research.publicationsTitle}
                </p>
              </Reveal>
              <ul>
                {visiblePublications.map((pub, i) => (
                  <Reveal
                    as="li"
                    key={`${pub.year}-${pub.title}-${i}`}
                    delay={i * 60}
                    className="flex flex-col gap-4 border-b border-[#d9d9d9] py-6 xl:grid xl:grid-cols-[160px_400px_1fr] xl:items-start xl:gap-x-10"
                  >
                    <div className="flex min-w-0 items-baseline gap-3 leading-[1.5] xl:flex-col xl:items-start xl:gap-2">
                      <p className="text-[16px] font-bold text-ink md:text-[20px]">{pub.year}</p>
                      <p className="text-[14px] text-ink-dim md:text-[16px]">{pub.venue}</p>
                    </div>
                    <p className="min-w-0 text-[16px] leading-[1.5] text-ink md:text-[20px]">{pub.title}</p>
                    <ul className="flex min-w-0 flex-wrap items-center gap-x-4 gap-y-2">
                      {pub.partners.map((partner) => (
                        <li
                          key={partner}
                          className="rounded-full border border-ink px-4 py-1 text-[14px] leading-[1.5] text-ink md:text-[17px]"
                        >
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </ul>
              {expertise.research.publications.length > PUBLICATIONS_COLLAPSED_COUNT && (
                <Reveal className="flex justify-center">
                  <button
                    type="button"
                    onClick={() => setShowAllPublications((v) => !v)}
                    className="mt-8 text-[15px] font-medium leading-[1.5] text-accent transition-colors duration-300 hover:text-ink md:text-[17px]"
                  >
                    {showAllPublications ? '− 간략히 보기' : '+ 논문 더보기'}
                  </button>
                </Reveal>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
