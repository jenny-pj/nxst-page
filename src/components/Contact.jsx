import { contact, site } from '../data/copy.js';
import Reveal from './Reveal.jsx';

/** §4.9 Contact — 주소(국·영문)·이메일·전화 + 구글맵 임베드 */
export default function Contact() {
  return (
    <section id="contact" className="border-t border-line">
      <div className="mx-auto max-w-7xl px-5 py-24 md:px-8">
        <Reveal>
          <p className="mb-3 font-mono text-xs tracking-[0.2em] text-signal">CONTACT</p>
          <h2 className="font-display text-3xl font-semibold tracking-tight text-ink md:text-4xl">{contact.title}</h2>
          <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-ink-dim">{contact.tagline}</p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <Reveal delay={80}>
            <address className="space-y-7 not-italic">
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-ink-dim">ADDRESS</p>
                <p className="mt-2 text-[15px] leading-relaxed text-ink">{site.addressKo}</p>
                <p className="mt-1 text-[13px] leading-relaxed text-ink-dim">{site.addressEn}</p>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-ink-dim">EMAIL</p>
                <a
                  href={`mailto:${site.email}`}
                  className="mt-2 inline-block font-mono text-[15px] text-physics transition-colors hover:text-ink"
                >
                  {site.email}
                </a>
              </div>
              <div>
                <p className="font-mono text-[11px] tracking-[0.2em] text-ink-dim">PHONE</p>
                <a
                  href={`tel:${site.phone.replace(/\s/g, '')}`}
                  className="mt-2 inline-block font-mono text-[15px] text-ink transition-colors hover:text-physics"
                >
                  {site.phone}
                </a>
              </div>
            </address>
          </Reveal>

          <Reveal delay={160}>
            <iframe
              title={`nextstud.io 위치 — ${site.addressKo}`}
              src={contact.mapEmbedUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-80 w-full rounded-sm border border-line opacity-90 grayscale"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
