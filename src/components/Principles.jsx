import { principles } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import ScrambleText from './ScrambleText.jsx';

/**
 * SECTION 06 — Research Principles (Figma 미디자인 → 다크 섹션 언어 확장).
 * 오프닝 다크 블록을 반복하는 리듬 — 번호(01~05)는 Framework의 L01~L05를 잇는다.
 */
export default function Principles() {
  return (
    <section id="principles" className="bg-dark">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-16 md:gap-[80px] md:px-[60px] md:py-[100px]">
        <SectionHeader dark eyebrow={principles.eyebrow} title={principles.title} />

        <div className="w-full max-w-[1204px] border-t border-white/10">
          {principles.items.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className="group grid grid-cols-[56px_1fr] items-baseline gap-4 border-b border-white/10 px-2 py-6 transition-colors duration-300 hover:border-accent/40 hover:bg-white/[0.04] md:grid-cols-[120px_1fr_1fr] md:gap-8 md:py-8">
                <span className="text-[15px] leading-[1.25] text-accent md:text-[20px]">{p.no}</span>
                <h3 className="text-[19px] font-semibold leading-[1.25] text-ink-light transition-transform duration-300 group-hover:translate-x-1.5 md:text-[26px]">
                  <ScrambleText text={p.name} duration={650} />
                </h3>
                <p className="col-start-2 text-[15px] leading-[1.5] text-dim-dark transition-colors duration-300 group-hover:text-ink-light-soft md:col-start-3 md:text-[18px]">
                  {p.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
