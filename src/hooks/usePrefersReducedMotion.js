import { useEffect, useState } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

/** 모션 축소 선호 여부 — 모든 애니메이션 컴포넌트가 공유하는 단일 기준.
 *  프리렌더(SSR) 시엔 window가 없으므로 false로 시작하고, 마운트 후 실제 값으로 보정한다. */
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(QUERY);
    const onChange = (e) => setReduced(e.matches);
    mql.addEventListener('change', onChange);
    setReduced(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, []);

  return reduced;
}
