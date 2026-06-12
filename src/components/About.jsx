import { useEffect, useRef, useState } from 'react';
import { about } from '../data/copy.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import Reveal from './Reveal.jsx';

/** §5-7 — 뷰포트 진입 시 1회 카운트업. reduced-motion: 즉시 최종값 */
function CountUp({ value, duration = 900 }) {
  const reduced = usePrefersReducedMotion();
  const ref = useRef(null);
  const [display, setDisplay] = useState(reduced ? value : 0);

  useEffect(() => {
    if (reduced) {
      setDisplay(value);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let rafId = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        let t0 = null;
        const tick = (now) => {
          if (t0 === null) t0 = now;
          const p = Math.min((now - t0) / duration, 1);
          setDisplay(Math.round(value * (1 - (1 - p) ** 3)));
          if (p < 1) rafId = requestAnimationFrame(tick);
        };
        rafId = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafId);
    };
  }, [reduced, value, duration]);

  return (
    <span ref={ref} aria-label={String(value)}>
      {display}
    </span>
  );
}

/** §4.8 About — 회사 차원 소개 (개인 정보 없음), 2단 + 지표 3개 */
export default function About() {
  return (
    <section id="about" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">ABOUT</p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
              {about.headline}
            </h2>
          </Reveal>

          <div>
            <Reveal delay={80}>
              <p className="text-[15.5px] leading-relaxed text-ink-dim">{about.body1}</p>
            </Reveal>
            <Reveal delay={160}>
              <p className="mt-5 text-[15.5px] leading-relaxed text-ink-dim">{about.body2}</p>
            </Reveal>
          </div>
        </div>

        {/* 지표 3개 — 숫자는 copy.js 상수 (자동 집계하지 않음) */}
        <Reveal delay={200}>
          <dl className="mt-16 grid gap-px overflow-hidden rounded-sm border border-line bg-line sm:grid-cols-3">
            {about.metrics.map((m) => (
              <div key={m.label} className="bg-surface/60 px-6 py-8">
                <dd className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
                  {m.value !== null ? (
                    <>
                      <CountUp value={m.value} />
                      <span className="text-signal">{m.suffix}</span>
                    </>
                  ) : (
                    <>
                      {m.text}
                      <span className="text-signal">{m.suffix}</span>
                    </>
                  )}
                </dd>
                <dt className="mt-2 font-mono text-xs text-ink-dim">{m.label}</dt>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
