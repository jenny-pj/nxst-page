import { problem } from '../data/copy.js';
import ProblemScatter from './ProblemScatter.jsx';
import Reveal from './Reveal.jsx';

/** §4.3 Problem — 좌측 논지 3개 + 우측 스크롤 연동 산점도 */
export default function Problem() {
  return (
    <section id="problem" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">PROBLEM</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{problem.title}</h2>
          <p className="mt-2 font-mono text-xs text-ink-dim">{problem.titleEn}</p>
        </Reveal>

        <div className="mt-12 grid items-center gap-12 md:grid-cols-2">
          <div>
            <ol className="space-y-8">
              {problem.points.map((pt, i) => (
                <Reveal as="li" key={pt.title} delay={i * 80} className="flex gap-5">
                  <span aria-hidden="true" className="mt-0.5 font-mono text-sm text-signal">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-ink">{pt.title}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink-dim">{pt.body}</p>
                  </div>
                </Reveal>
              ))}
            </ol>
            <Reveal delay={260}>
              <p className="mt-10 border-l-2 border-signal pl-5 text-base font-medium text-ink">{problem.closing}</p>
            </Reveal>
          </div>

          <Reveal delay={120}>
            <ProblemScatter />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
