import { principles } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import illoIndustrialFirst from '../assets/figma/principle-industrial-first.svg';
import illoDataCentric from '../assets/figma/principle-data-centric.svg';
import illoResearchDriven from '../assets/figma/principle-research-driven.svg';
import illoEngineeringOriented from '../assets/figma/principle-engineering-oriented.svg';
import illoRealWorldValidation from '../assets/figma/principle-real-world-validation.svg';

const ILLOS = {
  'industrial-first': illoIndustrialFirst,
  'data-centric': illoDataCentric,
  'research-driven': illoResearchDriven,
  'engineering-oriented': illoEngineeringOriented,
  'real-world-validation': illoRealWorldValidation,
};

/**
 * SECTION 06 — 연구 철학 (Figma 27:321).
 * 라이트 배경 위 5개 화이트 카드(r16) — 2행 타이틀 + 하단 라인 일러스트.
 * hover/focus(모바일 탭 포함 — tabIndex) 시 액센트 틴트가 아래에서 차오르며 설명 텍스트가 페이드인.
 */
export default function Principles() {
  return (
    <section id="principles" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-24 md:gap-[80px] md:px-[60px] md:py-[140px]">
        <SectionHeader eyebrow={principles.eyebrow} title={principles.title} />

        <ul className="grid w-full max-w-[1296px] grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {principles.items.map((p, i) => (
            <Reveal key={p.illo} as="li" delay={i * 80} className="h-full">
              <div
                tabIndex={0}
                className="group relative h-[300px] overflow-hidden rounded-2xl bg-white outline-none transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_16px_40px_rgba(81,131,232,0.18)] focus:-translate-y-1 focus:shadow-[0_16px_40px_rgba(81,131,232,0.18)]"
              >
                {/* 액센트 틴트 — 아래에서 은은하게 차오르는 그라데이션 워시 */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-t from-accent-soft via-accent-soft/60 to-white opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100 group-focus:opacity-100"
                />

                {/* 일러스트 — hover 시 아래로 살짝 가라앉으며 옅어짐 */}
                <img
                  src={ILLOS[p.illo]}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="pointer-events-none absolute bottom-0 left-0 w-full transition-all duration-700 ease-out group-hover:translate-y-4 group-hover:opacity-20 group-focus:translate-y-4 group-focus:opacity-20 motion-reduce:transition-none"
                />

                {/* 텍스트 레이어 */}
                <div className="relative flex h-full flex-col px-7 pt-7">
                  <h3 className="whitespace-pre-line text-[22px] font-semibold leading-[1.25] text-ink transition-colors duration-500 group-hover:text-accent group-focus:text-accent md:text-[24px]">
                    {p.name}
                  </h3>

                  {/* 설명 — 살짝 떠오르며 페이드인 (틴트보다 반 박자 늦게) */}
                  <p className="mt-5 translate-y-3 text-[16px] leading-[1.7] text-ink opacity-0 transition-all delay-100 duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100 motion-reduce:transition-none md:text-[17px]">
                    {p.desc}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
