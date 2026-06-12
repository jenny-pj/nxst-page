import { useEffect, useState } from 'react';

/**
 * 섹션 id 배열을 받아 현재 뷰포트에서 활성인 섹션 id를 반환한다.
 * 고정 네비 하이라이트(스크롤 스파이)용.
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);
    if (sections.length === 0) return;

    const visible = new Map();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        if (visible.size > 0) {
          // 가장 많이 보이는 섹션을 활성으로
          const top = [...visible.entries()].sort((a, b) => b[1] - a[1])[0][0];
          setActiveId(top);
        } else {
          setActiveId(null);
        }
      },
      { rootMargin: '-72px 0px -40% 0px', threshold: [0.1, 0.25, 0.5] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [sectionIds]);

  return activeId;
}
