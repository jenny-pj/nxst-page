import { contact, site } from '../data/copy.js';
import Reveal from './Reveal.jsx';

/**
 * CONTACT (Figma 미디자인 → 다크 섹션 언어로 페이지를 닫는 북엔드).
 * 허브 글로우를 재사용해 히어로와 수미상관.
 */
export default function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden bg-dark">
      <div
        aria-hidden="true"
        className="absolute left-1/2 top-1/2 h-[300px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-glow/15 blur-[60px] motion-safe:animate-[glowPulse_5s_ease-in-out_infinite]"
      />

      <div className="relative mx-auto flex max-w-[1440px] flex-col items-center gap-10 px-5 py-24 text-center md:gap-12 md:px-[60px] md:py-[160px]">
        <Reveal>
          <p className="text-[17px] font-semibold leading-[1.25] text-accent md:text-[24px]">{contact.eyebrow}</p>
        </Reveal>
        <Reveal delay={80}>
          <h2 className="whitespace-pre-line text-[24px] font-semibold leading-[1.35] text-ink-light md:text-[40px] md:leading-[1.25]">
            {contact.title}
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <a
            href={`mailto:${site.email}`}
            className="group inline-flex items-center justify-center gap-2.5 rounded-2xl bg-accent px-8 py-4 text-[17px] font-semibold leading-[1.25] text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-glow hover:shadow-[0_10px_36px_rgba(81,131,232,0.45)] md:text-[20px]"
          >
            {site.email}
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </a>
        </Reveal>

        <Reveal delay={240}>
          <address className="flex flex-col items-center gap-1.5 text-[14px] not-italic leading-[1.5] text-dim-dark md:text-[16px]">
            <p>{site.phone}</p>
            <p>{site.addressKo}</p>
            <p className="text-[12px] text-dim-dark/70 md:text-[14px]">{site.addressEn}</p>
          </address>
        </Reveal>
      </div>
    </section>
  );
}
