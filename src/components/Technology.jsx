import { useMemo, useState } from 'react';
import { technology } from '../data/copy.js';
import { techStack } from '../data/techStack.js';
import { publications, PILLARS } from '../data/publications.js';
import { useMediaQuery } from '../hooks/useMediaQuery.js';
import Reveal from './Reveal.jsx';
import TechDiagram from './TechDiagram.jsx';

const LAYER_TITLES = { L3: 'L3 · Capability', L2: 'L2 · Model Core', L1: 'L1 · Data Space' };

const pubById = Object.fromEntries(publications.map((p) => [p.id, p]));

/** active 항목({type,id}) → 패널에 표시할 콘텐츠로 해석 */
function resolvePanel(active) {
  if (!active) return null;
  if (active.type === 'layer') {
    const layer = techStack.layers.find((l) => l.id === active.id);
    const paperIds = layer.boxes.flatMap((b) => b.paperIds);
    return { title: LAYER_TITLES[layer.id], tag: layer.sub, description: layer.description, paperIds, badge: null };
  }
  if (active.type === 'box') {
    for (const layer of techStack.layers) {
      const box = layer.boxes.find((b) => b.id === active.id);
      if (box) {
        return {
          title: box.title,
          tag: `${LAYER_TITLES[layer.id]} · ${box.sub}`,
          description: box.description,
          paperIds: box.paperIds,
          badge: box.badge ?? null,
          badgeColor: box.id === 'pinn' ? 'var(--color-physics)' : 'var(--color-signal)',
          newsLink: box.newsLink ?? false,
        };
      }
    }
  }
  if (active.type === 'source') {
    const src = techStack.sources.find((s) => s.id === active.id);
    return { title: `데이터 소스 · ${src.title}`, tag: 'L1로 수집·정제되는 현장 소스', description: src.description, paperIds: src.paperIds, badge: null };
  }
  return null;
}

function PaperMiniCard({ paper }) {
  const color = PILLARS[paper.pillar[0]].color;
  return (
    <li className="border-l-2 py-1.5 pl-3" style={{ borderColor: color }}>
      <p className="font-mono text-[11px] leading-snug text-ink-dim">
        {paper.venue} · {paper.year}
      </p>
      <p className="mt-0.5 line-clamp-2 text-[13px] leading-snug text-ink">{paper.title}</p>
    </li>
  );
}

export default function Technology() {
  const isDesktopDiagram = useMediaQuery('(min-width: 768px)');
  const [hovered, setHovered] = useState(null);
  const [selected, setSelected] = useState(null);
  const active = hovered ?? selected;
  const panel = useMemo(() => resolvePanel(active), [active]);

  const papers = (panel?.paperIds ?? []).map((id) => pubById[id]).filter(Boolean);
  const shownPapers = papers.slice(0, 3);

  const goResearch = () => {
    // STAGE 4의 Research 필터와 연동 — 해당 논문 ID 목록을 전달
    window.dispatchEvent(new CustomEvent('research:filter', { detail: { paperIds: panel?.paperIds ?? [] } }));
  };

  return (
    <section id="technology" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">TECHNOLOGY</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">
            {technology.title}
          </h2>
          <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-dim">{technology.intro}</p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_320px]">
          <Reveal delay={100}>
            <TechDiagram
              vertical={!isDesktopDiagram}
              active={active}
              onHover={setHovered}
              onSelect={(p) => setSelected(p)}
            />
          </Reveal>

          {/* 설명 패널 — 데스크톱: 우측 고정 / 모바일: 다이어그램 하단 */}
          <Reveal delay={180}>
            <aside
              aria-live="polite"
              className="sticky top-[88px] min-h-[260px] rounded-sm border border-line bg-surface/60 p-5 transition-opacity duration-150"
            >
              {panel ? (
                <>
                  <p className="font-mono text-[11px] tracking-wide text-ink-dim">{panel.tag}</p>
                  <h3 className="mt-1 text-lg font-semibold text-ink">{panel.title}</h3>
                  {panel.badge && (
                    <span
                      className="mt-2 inline-block rounded-xs border px-2 py-0.5 font-mono text-[10.5px]"
                      style={{ borderColor: panel.badgeColor, color: panel.badgeColor }}
                    >
                      {panel.badge}
                    </span>
                  )}
                  <p className="mt-3 text-[13.5px] leading-relaxed text-ink-dim">{panel.description}</p>

                  {shownPapers.length > 0 && (
                    <>
                      <p className="mt-5 font-mono text-[11px] tracking-[0.15em] text-ink-dim">근거 논문</p>
                      <ul className="mt-2 space-y-2.5">
                        {shownPapers.map((p) => (
                          <PaperMiniCard key={p.id} paper={p} />
                        ))}
                      </ul>
                      <a
                        href="#research"
                        onClick={goResearch}
                        className="mt-4 inline-block font-mono text-xs text-signal transition-colors hover:text-ink"
                      >
                        Research에서 보기 {papers.length > 3 ? `(${papers.length}편)` : ''} →
                      </a>
                    </>
                  )}
                  {panel.newsLink && (
                    <a
                      href="#news"
                      className="mt-4 block font-mono text-xs text-signal transition-colors hover:text-ink"
                    >
                      News에서 수상 소식 보기 →
                    </a>
                  )}
                </>
              ) : (
                <div className="flex h-full min-h-[220px] flex-col justify-center">
                  <p className="font-mono text-[11px] tracking-[0.15em] text-ink-dim">INTERACTIVE</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-ink-dim">
                    레이어·박스·데이터 소스에 마우스를 올리거나 선택하면, 해당 기술의 설명과{' '}
                    <span className="text-ink">근거 논문</span>이 여기에 표시됩니다.
                  </p>
                  <p className="mt-3 text-[13px] leading-relaxed text-ink-dim">
                    다이어그램의 모든 요소는 실제 게재 논문으로 추적됩니다.
                  </p>
                </div>
              )}
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
