import { useEffect, useRef, useState } from 'react';
import { proofBar } from '../data/copy.js';

/** §4.2 Proof Bar — 항목별 50ms staggered 페이드인, 호버 시 텍스트 컬러만 전환 */
export default function ProofBar() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div className="border-y border-line bg-surface/40">
      <ul
        ref={ref}
        aria-label="연구 실적 게재 저널 및 수상"
        className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-2 px-5 py-5 md:px-8"
      >
        {proofBar.map((item, i) => (
          <li
            key={item}
            style={{ transitionDelay: shown ? `${i * 50}ms` : '0ms' }}
            className={`font-mono text-[11px] tracking-wide transition-all duration-500 hover:text-ink md:text-xs ${
              shown ? 'translate-y-0 opacity-100' : 'translate-y-1 opacity-0'
            } motion-reduce:translate-y-0 motion-reduce:opacity-100 motion-reduce:transition-none ${
              i === 0 ? 'text-signal/90 hover:text-signal' : 'text-ink-dim'
            }`}
          >
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
