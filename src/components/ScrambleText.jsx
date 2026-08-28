import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#$%&';

/**
 * factory.ai식 디코드 효과 — 뷰포트 진입 시 무작위 문자에서 원문으로 정착, 1회만.
 * 영문 라벨 전용(한글은 자소 분해 없이 어색해 사용하지 않는다).
 */
export default function ScrambleText({ text, className = '', duration = 700 }) {
  const ref = useRef(null);
  const rafRef = useRef(0);
  const played = useRef(false);
  const [display, setDisplay] = useState(text);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || played.current) return;
        played.current = true;
        io.disconnect();

        const start = performance.now();
        const tick = (now) => {
          const p = Math.min((now - start) / duration, 1);
          const settled = Math.ceil(text.length * p);
          setDisplay(
            text.slice(0, settled) +
              [...text.slice(settled)]
                .map((ch) => (/\s/.test(ch) ? ch : CHARS[(Math.random() * CHARS.length) | 0]))
                .join('')
          );
          if (p < 1) rafRef.current = requestAnimationFrame(tick);
        };
        rafRef.current = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(rafRef.current);
    };
  }, [text, duration, reduced]);

  return (
    <span ref={ref} className={className} aria-label={text}>
      {display}
    </span>
  );
}
