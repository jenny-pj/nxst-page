import { useEffect, useState } from 'react';

/**
 * 섹션 id 배열을 받아 현재 뷰포트에서 활성인 섹션 id를 반환한다.
 * 고정 네비 하이라이트(스크롤 스파이)용.
 */
export function useScrollSpy(sectionIds) {
  const [activeId, setActiveId] = useState(null);
  const [atBottom, setAtBottom] = useState(false);

  /* 마지막 섹션(푸터)은 짧아서 가시 비율로는 활성화되지 못함 —
     페이지 최하단 도달 시 마지막 id를 강제 활성 */
  useEffect(() => {
    const onScroll = () => {
      setAtBottom(window.innerHeight + Math.ceil(window.scrollY) >= document.documentElement.scrollHeight - 2);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

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

  return atBottom ? sectionIds[sectionIds.length - 1] : activeId;
}
