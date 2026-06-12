import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { research } from '../data/copy.js';
import { publications, PILLARS, PILLAR_ORDER, doiUrl } from '../data/publications.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';
import Reveal from './Reveal.jsx';

/**
 * §4.5 / §5-5 — Research 필터 그리드.
 * featured 상단 고정 + 연도 내림차순. 필터 전환은 FLIP 재배열(WAAPI),
 * Technology 다이어그램의 'research:filter' 이벤트(논문 ID 목록)와 연동.
 * 저자명은 비노출(확정 사항) — 데이터에는 보존.
 */

const ALL = 'ALL';

const sorted = [...publications].sort(
  (a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0) || b.year - a.year
);

const pillarCounts = Object.fromEntries(
  PILLAR_ORDER.map((k) => [k, publications.filter((p) => p.pillar.includes(k)).length])
);

function PubCard({ pub }) {
  const color = PILLARS[pub.pillar[0]].color;
  const url = doiUrl(pub.doi);
  return (
    <article
      data-pub={pub.id}
      className="group relative flex flex-col rounded-sm border border-line bg-surface/40 p-5 pl-6 transition-transform duration-200 hover:-translate-y-0.5 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
    >
      {/* Pillar 컬러 보더 — 호버 시 2px→4px */}
      <span
        aria-hidden="true"
        className="absolute inset-y-0 left-0 w-[2px] rounded-l-sm transition-all duration-200 group-hover:w-[4px] motion-reduce:transition-none"
        style={{ backgroundColor: color }}
      />
      {pub.featured && (
        <span className="absolute right-4 top-4 font-mono text-[9px] tracking-[0.2em] text-signal/80">FEATURED</span>
      )}
      <p className="pr-16 font-mono text-[11.5px] leading-snug" style={{ color }}>
        {pub.venue}
      </p>
      <h3 className="mt-2.5 text-[15px] font-medium leading-snug text-ink">{pub.title}</h3>
      {pub.note && <p className="mt-2 text-xs leading-relaxed text-ink-dim">{pub.note}</p>}
      <div className="mt-auto flex items-center gap-3 pt-4 font-mono text-[11px] text-ink-dim">
        <span>{pub.year}</span>
        <span aria-hidden="true">·</span>
        <span>{pub.pillar.map((k) => PILLARS[k].label).join(' / ')}</span>
        {url && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${pub.title} — DOI 페이지 열기`}
            className="ml-auto text-physics transition-colors hover:text-ink"
          >
            DOI ↗
          </a>
        )}
      </div>
    </article>
  );
}

export default function Research() {
  const reduced = usePrefersReducedMotion();
  // filter: { type: 'pillar', value: 'ALL'|'A'..'E' } | { type: 'ids', ids: string[] }
  const [filter, setFilter] = useState({ type: 'pillar', value: ALL });
  const gridRef = useRef(null);
  const prevRects = useRef(new Map());

  // Technology 다이어그램 → "Research에서 보기" 연동
  useEffect(() => {
    const onFilter = (e) => {
      const ids = e.detail?.paperIds ?? [];
      if (ids.length > 0) setFilter({ type: 'ids', ids });
    };
    window.addEventListener('research:filter', onFilter);
    return () => window.removeEventListener('research:filter', onFilter);
  }, []);

  const filtered = useMemo(() => {
    if (filter.type === 'ids') return sorted.filter((p) => filter.ids.includes(p.id));
    if (filter.value === ALL) return sorted;
    return sorted.filter((p) => p.pillar.includes(filter.value));
  }, [filter]);

  // FLIP — 필터 전환 시 남는 카드는 이동, 새 카드는 페이드인
  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const nodes = grid.querySelectorAll('[data-pub]');
    const next = new Map();
    nodes.forEach((n) => next.set(n.dataset.pub, n.getBoundingClientRect()));
    if (!reduced && prevRects.current.size > 0) {
      nodes.forEach((n) => {
        const prev = prevRects.current.get(n.dataset.pub);
        const cur = next.get(n.dataset.pub);
        if (prev) {
          const dx = prev.left - cur.left;
          const dy = prev.top - cur.top;
          if (dx || dy) {
            n.animate(
              [{ transform: `translate(${dx}px, ${dy}px)` }, { transform: 'translate(0, 0)' }],
              { duration: 300, easing: 'cubic-bezier(0.2, 0.8, 0.2, 1)' }
            );
          }
        } else {
          n.animate(
            [
              { opacity: 0, transform: 'translateY(8px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 300, easing: 'ease-out' }
          );
        }
      });
    }
    prevRects.current = next;
  }, [filtered, reduced]);

  const tabs = [{ key: ALL, label: research.filterAll, count: publications.length }].concat(
    PILLAR_ORDER.map((k) => ({ key: k, label: PILLARS[k].label, count: pillarCounts[k] }))
  );

  return (
    <section id="research" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">RESEARCH</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{research.title}</h2>
          <p className="mt-2 font-mono text-xs text-ink-dim">{research.titleEn}</p>
          <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-dim">{research.intro}</p>
        </Reveal>

        {/* Pillar 필터 탭 */}
        <Reveal delay={100}>
          <div role="tablist" aria-label="연구 필라 필터" className="mt-10 flex flex-wrap gap-2">
            {tabs.map((t) => {
              const active = filter.type === 'pillar' && filter.value === t.key;
              return (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={active}
                  onClick={() => setFilter({ type: 'pillar', value: t.key })}
                  className={`rounded-sm border px-3.5 py-2 font-mono text-xs transition-colors motion-reduce:transition-none ${
                    active
                      ? 'border-signal bg-signal/10 text-signal'
                      : 'border-line text-ink-dim hover:border-ink-dim hover:text-ink'
                  }`}
                  style={
                    t.key !== ALL && active ? { borderColor: PILLARS[t.key].color, color: PILLARS[t.key].color, backgroundColor: 'transparent' } : undefined
                  }
                >
                  {t.label} <span className="opacity-60">{t.count}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* 다이어그램 선택 모드 칩 */}
        {filter.type === 'ids' && (
          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-sm border border-physics/60 px-3 py-1.5 font-mono text-xs text-physics">
              Technology 다이어그램 선택 — {filtered.length}편
            </span>
            <button
              onClick={() => setFilter({ type: 'pillar', value: ALL })}
              className="font-mono text-xs text-ink-dim transition-colors hover:text-ink"
            >
              × 전체 보기
            </button>
          </div>
        )}

        <Reveal delay={160}>
          <div ref={gridRef} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((pub) => (
              <PubCard key={pub.id} pub={pub} />
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
