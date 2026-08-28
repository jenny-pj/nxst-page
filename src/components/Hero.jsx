import Reveal from './Reveal.jsx';
import { hero } from '../data/copy.js';
import heroBg from '../assets/figma/hero-bg.webp';

/* 연구 키워드 마퀴 — 동일 리스트 4개를 이어 무한 루프.
   리스트 1개(~1900px)가 와이드 화면보다 좁으면 -50% 이동 중 오른쪽이 비므로,
   4개를 이어 이동 후에도 항상 2개 분량이 화면을 덮게 함 (88s = 기존과 동일 속도) */
function KeywordTicker() {
  return (
    <div className="overflow-hidden border-y border-white/10 py-4" aria-label="연구 키워드">
      <div className="flex w-max motion-safe:animate-[ticker_88s_linear_infinite]">
        {[0, 1, 2, 3].map((dup) => (
          <ul key={dup} aria-hidden={dup > 0 || undefined} className="flex shrink-0 items-center">
            {hero.keywords.map((kw) => (
              <li key={kw} className="flex items-center whitespace-nowrap text-[13px] font-medium uppercase tracking-[0.1em] text-dim-dark/80">
                <span className="px-7">{kw}</span>
                <span aria-hidden="true" className="size-1 rounded-full bg-accent/60" />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

/**
 * SECTION 01 — 브랜드 선언.
 * 다크 히어로(슬로우 줌 배경 + 타이틀 라인 스태거) + 키워드 마퀴 + 선언 배너.
 */
export default function Hero() {
  return (
    <section id="top" className="bg-dark">
      {/* 히어로 비주얼 */}
      <div className="relative flex min-h-[560px] items-center justify-center overflow-hidden md:min-h-[720px] lg:min-h-[806px]">
        <img
          src={heroBg}
          alt=""
          fetchpriority="high"
          className="absolute inset-0 size-full object-cover motion-safe:animate-[heroZoom_24s_ease-in-out_infinite_alternate]"
        />
        {/* 하단을 다크 배경으로 자연스럽게 연결 */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/30 via-transparent to-dark" aria-hidden="true" />

        <h1
          className="relative px-5 text-center text-[28px] font-semibold leading-[1.8] text-ink-light md:text-[44px] lg:text-[54px]"
          style={{ textShadow: '0px 0px 20px rgba(0,0,0,0.5)' }}
        >
          {hero.h1.split('\n').map((line, i) => (
            <span
              key={line}
              className="block motion-safe:animate-[fadeUp_0.8s_ease-out_both]"
              style={{ animationDelay: `${i * 160 + 100}ms` }}
            >
              {line}
            </span>
          ))}
        </h1>

        {/* 스크롤 유도 커서 */}
        <div
          aria-hidden="true"
          className="absolute bottom-8 left-1/2 h-10 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-ink-light-soft/70 to-ink-light-soft motion-safe:animate-[scrollBob_2.2s_ease-in-out_infinite]"
        />
      </div>

      <KeywordTicker />

      {/* 선언 배너 */}
      <div className="flex items-center justify-center px-5 py-20 md:px-[60px] md:py-[140px]">
        <Reveal>
          <p className="whitespace-pre-line text-center text-[17px] font-semibold leading-[1.8] text-ink-light-soft md:text-[28px] md:leading-[1.7]">
            {hero.banner}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
