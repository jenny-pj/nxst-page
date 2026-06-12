import { useCases } from '../data/copy.js';
import Reveal from './Reveal.jsx';

/**
 * §4.6 / §5-6 — Use Cases 4종 카드.
 * 아이콘은 전부 인라인 SVG 직접 제작 (파형/렌즈/수명곡선/로봇암) — 외부 아이콘팩 금지.
 * 카드 호버 시 stroke-dashoffset 드로잉 재생 (index.css .uc-icon / .uc-card).
 */

const STROKE = { fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round' };

/* 모든 path/circle 에 pathLength=100 → 드로잉 키프레임을 공통 적용 */
const ICONS = {
  waveform: (
    <>
      <path pathLength="100" {...STROKE} d="M3 26 L12 26 L17 12 L23 36 L28 18 L33 28 L40 22 L53 22" />
      <path pathLength="100" {...STROKE} stroke="var(--color-signal)" d="M23 36 L23 40" opacity="0.7" />
    </>
  ),
  lens: (
    <>
      <circle pathLength="100" {...STROKE} cx="22" cy="19" r="13" />
      <path pathLength="100" {...STROKE} d="M32 29 L43 40" />
      <path pathLength="100" {...STROKE} stroke="var(--color-signal)" d="M17 17 L22 23 L27 14" />
    </>
  ),
  'rul-curve': (
    <>
      <path pathLength="100" {...STROKE} d="M5 5 L5 37 L52 37" />
      <path pathLength="100" {...STROKE} d="M8 11 C 22 13, 32 17, 39 25 C 43 29.5, 46 32, 49 33.5" />
      <path pathLength="100" {...STROKE} stroke="var(--color-signal)" d="M44 28 L49 33.5 M49 28 L44 33.5" />
    </>
  ),
  'robot-arm': (
    <>
      <path pathLength="100" {...STROKE} d="M10 40 L32 40 M21 40 L21 27" />
      <path pathLength="100" {...STROKE} d="M21 27 L34 16 L46 21" />
      <circle pathLength="100" {...STROKE} cx="34" cy="16" r="2.6" />
      <path pathLength="100" {...STROKE} stroke="var(--color-signal)" d="M46 21 L51 17 M46 21 L51 25" />
    </>
  ),
};

export default function UseCases() {
  return (
    <section id="use-cases" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">USE CASES</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{useCases.title}</h2>
          <p className="mt-2 font-mono text-xs text-ink-dim">{useCases.titleEn}</p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {useCases.items.map((item, i) => (
            <Reveal key={item.id} delay={i * 80}>
              <article className="uc-card group h-full rounded-sm border border-line bg-surface/40 p-6 transition-colors duration-200 hover:border-ink-dim/60">
                <div className="flex items-start justify-between">
                  <svg
                    viewBox="0 0 56 44"
                    className="uc-icon h-11 w-14 text-ink transition-colors duration-200"
                    aria-hidden="true"
                  >
                    {ICONS[item.icon]}
                  </svg>
                  <span aria-hidden="true" className="font-mono text-xs text-ink-dim/70">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3 className="mt-5 text-lg font-semibold text-ink">{item.title}</h3>
                <p className="mt-2.5 text-[13.5px] leading-relaxed text-ink-dim">{item.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
