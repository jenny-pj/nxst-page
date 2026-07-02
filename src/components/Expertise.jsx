import { expertise } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/**
 * SECTION 05 — Core Expertise (Figma 미디자인 → 시안 카드 언어 확장).
 * 화이트 배경 위 5개 역량군 카드 + 액센트 칩.
 */
export default function Expertise() {
  return (
    <section id="expertise" className="bg-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-16 md:gap-[80px] md:px-[60px] md:py-[100px]">
        <SectionHeader eyebrow={expertise.eyebrow} title={expertise.title} />

        <ul className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {expertise.clusters.map((cluster, i) => (
            <Reveal key={cluster.name} as="li" delay={i * 60} className="h-full">
              <div className="group flex h-full flex-col items-center gap-5 rounded-2xl border-2 border-line bg-white/80 px-5 py-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_12px_32px_rgba(81,131,232,0.15)]">
                <h3 className="text-center text-[20px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-accent md:text-[22px]">
                  {cluster.name}
                </h3>
                <ul className="flex flex-col items-center gap-2">
                  {cluster.items.map((item) => (
                    <li
                      key={item}
                      className="whitespace-nowrap rounded-2xl bg-accent-soft px-3.5 py-1.5 text-[14px] leading-[1.25] text-accent transition-colors duration-300 hover:bg-accent hover:text-white md:text-[15px]"
                    >
                      {item}
                    </li>
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
