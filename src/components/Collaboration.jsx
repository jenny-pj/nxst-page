import { collaboration } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/**
 * SECTION 07 — Collaboration (Figma 미디자인 → 시안 카드 언어 확장).
 * 라이트 배경 위 4개 협력 파트너 카드.
 */
export default function Collaboration() {
  return (
    <section id="collaboration" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-16 md:gap-[80px] md:px-[60px] md:py-[100px]">
        <SectionHeader eyebrow={collaboration.eyebrow} title={collaboration.title} />

        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {collaboration.partners.map((p, i) => (
            <Reveal key={p.name} as="li" delay={i * 60} className="h-full">
              <div className="group flex h-full flex-col items-center gap-2.5 rounded-2xl border-2 border-line bg-white/80 px-5 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_12px_32px_rgba(81,131,232,0.15)]">
                <p className="text-[14px] font-semibold leading-[1.25] text-accent md:text-[15px]">{p.ko}</p>
                <h3 className="whitespace-nowrap text-center text-[20px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-accent md:text-[24px]">
                  {p.name}
                </h3>
                <ul className="mt-2 flex flex-col items-center gap-1.5 text-[14px] font-semibold leading-[1.25] text-ink-dim md:text-[16px]">
                  {p.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
