import { researchAreas } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import ScrambleText from './ScrambleText.jsx';
import sectionTexture from '../assets/figma/section-texture.jpg';
import orbitUnion from '../assets/figma/orbit-union.svg';
import ringOuter from '../assets/figma/ring-outer.png';
import ringMid from '../assets/figma/ring-mid.png';
import ringInner from '../assets/figma/ring-inner.png';

/* 다이어그램 캔버스 기준 크기 — Figma Footer Content(1320×700) */
const CANVAS_W = 1320;

function DomainCard({ domain, absolute = false, index = 0 }) {
  const card = (
    <div
      className={`group flex w-[300px] flex-col items-center justify-center gap-2.5 rounded-2xl border-2 border-line bg-white/80 px-5 py-4 backdrop-blur-[2px] transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_12px_32px_rgba(81,131,232,0.18)] ${
        absolute ? '' : 'w-full max-w-[340px]'
      }`}
    >
      <p className="whitespace-nowrap text-center text-[20px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-accent md:text-[24px]">
        {domain.name}
      </p>
      <ul className="flex flex-col items-center gap-1.5 text-[14px] font-semibold leading-[1.25] text-ink-dim md:text-[16px]">
        {domain.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );

  if (!absolute) return card;

  const style = domain.pos.center
    ? { left: '50%', transform: 'translateX(-50%)', top: domain.pos.y }
    : { left: `${(domain.pos.x / CANVAS_W) * 100}%`, top: domain.pos.y };
  return (
    <div style={style} className="absolute">
      {/* 플로팅은 래퍼에, 호버 리프트는 카드에 — transform 충돌 방지 */}
      <div
        className="motion-safe:animate-[floatY_7s_ease-in-out_infinite]"
        style={{ animationDelay: `${(index % 4) * 0.9}s` }}
      >
        {card}
      </div>
    </div>
  );
}

/**
 * SECTION 03 — 우리는 무엇을 연구하는가.
 * Industrial Data를 중심 궤도에 두고 7개 연구 분야가 공전하는 다이어그램.
 */
export default function ResearchAreas() {
  return (
    <section id="research" className="relative overflow-hidden bg-bg">
      {/* 배경 텍스처 */}
      <img src={sectionTexture} alt="" aria-hidden="true" className="absolute inset-0 size-full object-cover opacity-20" />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-16 md:gap-[80px] md:px-[60px] md:py-[100px]">
        <SectionHeader eyebrow={researchAreas.eyebrow} title={researchAreas.title} />

        {/* 데스크톱: 궤도 다이어그램 */}
        <Reveal className="hidden w-full xl:block">
          <div className="relative h-[700px] w-full">
            {/* 중심 글로우 링 */}
            <img src={ringOuter} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[490px] w-[860px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-50" />
            <img src={ringMid} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[446px] w-[782px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-30" />
            <img src={ringInner} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[400px] w-[702px] max-w-none -translate-x-1/2 -translate-y-1/2 opacity-10" />
            {/* 궤도 라인 */}
            <img src={orbitUnion} alt="" aria-hidden="true" className="absolute left-1/2 top-1/2 h-[542px] w-[943px] max-w-none -translate-x-1/2 -translate-y-1/2" />
            {/* 궤도 스윕 — 궤도 SVG를 마스크로 쓰고 액센트 하이라이트가 시계방향으로 순회 */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[542px] w-[943px] max-w-none -translate-x-1/2 -translate-y-1/2"
              style={{
                maskImage: `url(${orbitUnion})`,
                maskSize: '100% 100%',
                WebkitMaskImage: `url(${orbitUnion})`,
                WebkitMaskSize: '100% 100%',
              }}
            >
              <div
                className="absolute left-1/2 top-1/2 size-[1100px] -translate-x-1/2 -translate-y-1/2 motion-safe:animate-[ringSpin_9s_linear_infinite]"
                style={{
                  background:
                    'conic-gradient(from 0deg, transparent 0deg, var(--color-accent) 45deg, transparent 90deg)',
                }}
              />
            </div>
            {/* 허브 글로우 + 라벨 */}
            <div
              aria-hidden="true"
              className="absolute left-1/2 top-1/2 h-[177px] w-[290px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/20 blur-[33px] motion-safe:animate-[glowPulse_4.5s_ease-in-out_infinite]"
            />
            <p className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-pre-line text-center text-[40px] font-semibold leading-[1.25] text-accent">
              <ScrambleText text={researchAreas.hub} duration={900} />
            </p>

            {researchAreas.domains.map((d, i) => (
              <DomainCard key={d.name} domain={d} absolute index={i} />
            ))}
          </div>
        </Reveal>

        {/* 태블릿·모바일: 허브 + 카드 그리드 */}
        <Reveal className="w-full xl:hidden">
          <div className="flex flex-col items-center gap-6">
            <div className="relative flex h-[160px] w-full items-center justify-center">
              <div aria-hidden="true" className="absolute h-[140px] w-[240px] rounded-full bg-glow/20 blur-[33px]" />
              <p className="relative whitespace-pre-line text-center text-[28px] font-semibold leading-[1.25] text-accent md:text-[36px]">
                {researchAreas.hub}
              </p>
            </div>
            <div className="grid w-full grid-cols-1 justify-items-center gap-4 sm:grid-cols-2">
              {researchAreas.domains.map((d) => (
                <DomainCard key={d.name} domain={d} />
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
