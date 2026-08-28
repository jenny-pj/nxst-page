import { useEffect, useState } from 'react';

/** CSS 미디어쿼리 매칭 여부 — 다이어그램 데스크톱/모바일 레이아웃 전환용.
 *  프리렌더(SSR) 시엔 window가 없으므로 false로 시작하고, 마운트 후 실제 값으로 보정한다. */
export function useMediaQuery(query) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    setMatches(mql.matches);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}
