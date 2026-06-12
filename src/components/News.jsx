import { news } from '../data/copy.js';
import Reveal from './Reveal.jsx';

/** §4.7 News — 카드 리스트 (추후 항목 추가 가능한 구조) */
export default function News() {
  return (
    <section id="news" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">NEWS</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{news.title}</h2>
        </Reveal>

        <ul className="mt-12 space-y-4">
          {news.items.map((item, i) => (
            <Reveal as="li" key={item.id} delay={i * 80}>
              <article className="grid gap-6 rounded-sm border border-line bg-surface/40 p-6 md:grid-cols-[180px_1fr] md:p-8">
                <div className="font-mono text-xs leading-relaxed text-ink-dim">
                  <p className="text-ink">{item.date}</p>
                  <p className="mt-1">{item.place}</p>
                  <p className="mt-4 inline-block rounded-xs border border-signal px-2 py-1 text-[10.5px] text-signal">
                    1st Place
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold leading-snug text-ink md:text-2xl">{item.headline}</h3>
                  <p className="mt-4 max-w-3xl text-[15px] leading-relaxed text-ink-dim">{item.body}</p>
                  <p className="mt-5 border-l-2 border-signal pl-4 text-[14px] font-medium text-ink">{item.point}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
