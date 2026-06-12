import { hero } from '../data/copy.js';
import HeroDenoise from './HeroDenoise.jsx';

export default function Hero() {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* 배경: Denoising 시그니처 애니메이션 */}
      <HeroDenoise className="absolute inset-0 h-full w-full" />
      {/* 좌측 텍스트 가독성을 위한 그라디언트 스크림 */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-bg via-bg/65 to-transparent"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pt-[72px] md:px-8">
        <p className="mb-4 font-mono text-xs tracking-[0.25em] text-signal">{hero.eyebrow}</p>
        <h1 className="whitespace-pre-line font-sans text-4xl font-bold leading-[1.15] tracking-tight text-ink md:text-6xl">
          {hero.h1}
        </h1>
        <p className="mt-4 font-display text-sm font-medium tracking-wide text-physics md:text-base">{hero.h1En}</p>
        <p className="mt-6 max-w-xl whitespace-pre-line text-base leading-relaxed text-ink-dim md:text-lg">
          {hero.sub}
        </p>
        <a
          href={`#${hero.ctaTarget}`}
          className="mt-10 inline-block rounded-sm border border-signal px-6 py-3 font-mono text-sm text-signal transition-colors hover:bg-signal hover:text-bg"
        >
          {hero.cta}
        </a>
      </div>
    </section>
  );
}
