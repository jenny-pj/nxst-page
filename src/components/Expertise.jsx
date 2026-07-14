import { useEffect, useRef, useState } from 'react';
import { expertise } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/* 협력 기관 로고 — 스트립 원본(Figma image 2)을 카드 단위로 슬라이스한 11장 */
const PARTNER_LOGOS = Object.entries(
  import.meta.glob('../assets/figma/partners/partner-*.png', { eager: true, import: 'default' })
)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([, src], i) => ({
    src,
    name: [
      'University of Cambridge',
      'Harvard Medical School',
      'Harvard SEAS',
      'KAIST',
      'Imperial College London',
      'GIST',
      "King's College London",
      'University of Oxford',
      'University of Kent',
      'University of Liverpool',
      'Mass Eye and Ear',
    ][i],
  }));

/* 스크롤 진입 시 0 → 목표값 카운트업 ("12+" → 숫자 12 + 접미사 "+").
   reduced-motion 시 즉시 최종값 표시. */
function CountUp({ value, duration = 1600 }) {
  const [, num, suffix] = value.match(/^(\d+)(.*)$/) ?? [null, '0', ''];
  const target = parseInt(num, 10);
  const ref = useRef(null);
  const [n, setN] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setN(target);
      return;
    }
    let raf;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const p = Math.min((t - t0) / duration, 1);
          setN(Math.round((1 - Math.pow(1 - p, 3)) * target)); // ease-out cubic
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {n}
      {suffix}
    </span>
  );
}

/* 원 안 아이콘 — Font Awesome solid 계열 패스, 160×160 좌표계 (WhyData와 동일 체계) */
const ICON_PATHS = {
  /* Brain — AI Foundation */
  brain:
    'M63 55C63 51.1375 66.1375 48 70 48H73C75.2125 48 77 49.7875 77 52V108C77 110.213 75.2125 112 73 112H69C65.275 112 62.1375 109.45 61.25 106C61.1625 106 61.0875 106 61 106C55.475 106 51 101.525 51 96C51 93.75 51.75 91.675 53 90C50.575 88.175 49 85.275 49 82C49 78.1375 51.2 74.775 54.4 73.1125C53.5125 71.6125 53 69.8625 53 68C53 62.475 57.475 58 63 58V55ZM97 55V58C102.525 58 107 62.475 107 68C107 69.875 106.487 71.625 105.6 73.1125C108.812 74.775 111 78.125 111 82C111 85.275 109.425 88.175 107 90C108.25 91.675 109 93.75 109 96C109 101.525 104.525 106 99 106C98.9125 106 98.8375 106 98.75 106C97.8625 109.45 94.725 112 91 112H87C84.7875 112 83 110.213 83 108V52C83 49.7875 84.7875 48 87 48H90C93.8625 48 97 51.1375 97 55Z',
  /* Industry — Industrial Intelligence */
  industry:
    'M52 52C49.7875 52 48 53.7875 48 56V102C48 105.312 50.6875 108 54 108H106C109.312 108 112 105.312 112 102V67.025C112 64.75 109.575 63.3125 107.575 64.3875L88 74.925V67.025C88 64.75 85.575 63.3125 83.575 64.3875L64 74.925V56C64 53.7875 62.2125 52 60 52H52Z',
  /* Robot — Physical Intelligence */
  robot:
    'M84 48C84 45.7875 82.2125 44 80 44C77.7875 44 76 45.7875 76 48V56H64C57.375 56 52 61.375 52 68V96C52 102.625 57.375 108 64 108H96C102.625 108 108 102.625 108 96V68C108 61.375 102.625 56 96 56H84V48ZM60 94C60 92.3375 61.3375 91 63 91H67C68.6625 91 70 92.3375 70 94C70 95.6625 68.6625 97 67 97H63C61.3375 97 60 95.6625 60 94ZM75 94C75 92.3375 76.3375 91 78 91H82C83.6625 91 85 92.3375 85 94C85 95.6625 83.6625 97 82 97H78C76.3375 97 75 95.6625 75 94ZM90 94C90 92.3375 91.3375 91 93 91H97C98.6625 91 100 92.3375 100 94C100 95.6625 98.6625 97 97 97H93C91.3375 97 90 95.6625 90 94ZM68 70C71.3125 70 74 72.6875 74 76C74 79.3125 71.3125 82 68 82C64.6875 82 62 79.3125 62 76C62 72.6875 64.6875 70 68 70ZM86 76C86 72.6875 88.6875 70 92 70C95.3125 70 98 72.6875 98 76C98 79.3125 95.3125 82 92 82C88.6875 82 86 79.3125 86 76ZM48 76C48 73.7875 46.2125 72 44 72C41.7875 72 40 73.7875 40 76V88C40 90.2125 41.7875 92 44 92C46.2125 92 48 90.2125 48 88V76ZM116 72C113.787 72 112 73.7875 112 76V88C112 90.2125 113.787 92 116 92C118.213 92 120 90.2125 120 88V76C120 73.7875 118.213 72 116 72Z',
  /* Eye (evenodd) — Computer Vision */
  eye:
    'M43 80C50 65 63 54 80 54C97 54 110 65 117 80C110 95 97 106 80 106C63 106 50 95 43 80ZM64 80C64 71.2 71.2 64 80 64C88.8 64 96 71.2 96 80C96 88.8 88.8 96 80 96C71.2 96 64 88.8 64 80ZM74 80C74 76.7 76.7 74 80 74C83.3 74 86 76.7 86 80C86 83.3 83.3 86 80 86C76.7 86 74 83.3 74 80Z',
  /* Lightning Bolt — AI Optimization */
  bolt: 'M93 48L57 88H79L69 112L103 72H81L93 48Z',
};

const ICON_FILL_RULE = { eye: 'evenodd' };

/**
 * SECTION 05 — 핵심 연구 역량 (Figma 20:160).
 * 라이트 배경(#f5f7fa) 위 5컬럼 — 72px 원형 아이콘 + 역량명 + 흰색 칩 3개(r16).
 * 원 안 아이콘은 시안에 비어 있어 역량 성격에 맞는 아이콘으로 채움.
 */
export default function Expertise() {
  return (
    <section id="expertise" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-24 md:gap-[80px] md:px-[80px] md:py-[140px]">
        <SectionHeader eyebrow={expertise.eyebrow} title={expertise.title} />

        {/* 5칼럼은 제목이 안전하게 들어가는 xl+에서만 — 그 아래는 3/2/1칼럼 */}
        <ul className="grid w-full grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
          {expertise.clusters.map((cluster, i) => (
            <Reveal key={cluster.name} as="li" delay={i * 80}>
              <div className="group flex flex-col items-center">
                {/* 원형 아이콘 — 흰 원 + 연블루 보더, 아이콘은 액센트 */}
                <div
                  className="flex size-[72px] items-center justify-center rounded-full border-2 border-[#dae5ef] bg-white text-accent transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_8px_24px_rgba(81,131,232,0.2)]"
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 160 160" className="size-full" fill="currentColor">
                    <path d={ICON_PATHS[cluster.icon]} fillRule={ICON_FILL_RULE[cluster.icon] ?? 'nonzero'} />
                  </svg>
                </div>

                {/* 역량명 — 좁은 칼럼에서는 2줄 래핑, min-h로 1줄 제목과 칩 시작선 정렬 */}
                <h3 className="mt-6 flex min-h-[56px] items-center text-center text-[20px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-accent md:text-[22px]">
                  {cluster.name}
                </h3>

                {/* 세부 항목 칩 — 흰색 카드, r16 */}
                <ul className="mt-8 flex w-full max-w-[240px] flex-col gap-4">
                  {cluster.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-2xl bg-white px-4 py-4 text-center text-[16px] leading-[1.5] text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-accent hover:text-white hover:shadow-[0_8px_20px_rgba(81,131,232,0.25)] md:text-[18px] lg:text-[17px] xl:text-[18px]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </ul>

        {/* 연구 성과 하이라이트 — Figma 155:1574 */}
        <div className="flex w-full flex-col items-center gap-14 md:gap-[80px]">
          <Reveal>
            <h3 className="whitespace-pre-line text-center text-[24px] font-semibold leading-[1.5] tracking-[-0.02em] text-ink md:text-[40px] md:leading-[1.25]">
              {expertise.research.title}
            </h3>
          </Reveal>

          {/* 핵심 지표 3종 — 액센트 숫자 + 영문 레이블 */}
          <div className="flex flex-col items-center gap-10 sm:flex-row sm:items-start sm:gap-12 lg:gap-[80px]">
            {expertise.research.stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80} className="flex flex-col items-center gap-2">
                <p className="text-[36px] font-semibold leading-[1.25] tracking-[-0.02em] text-accent md:text-[48px]">
                  <CountUp value={stat.value} />
                </p>
                <p className="text-center text-[16px] leading-[1.5] text-ink md:text-[20px]">{stat.label}</p>
              </Reveal>
            ))}
          </div>

          <div className="flex w-full flex-col items-center gap-8">
            {/* 논문 리스트 — 연도·게재처 / 논문명 / 협력 기관 칩 3칼럼 */}
            <div className="w-full">
              <Reveal>
                <p className="border-b border-[#d9d9d9] py-4 text-[20px] font-semibold leading-[1.25] text-ink md:text-[24px]">
                  {expertise.research.publicationsTitle}
                </p>
              </Reveal>
              <ul>
                {expertise.research.publications.map((pub, i) => (
                  <Reveal
                    as="li"
                    key={`${pub.year}-${pub.title}-${i}`}
                    delay={i * 60}
                    className="flex flex-col gap-4 border-b border-[#d9d9d9] py-6 xl:grid xl:grid-cols-[160px_400px_540px] xl:justify-between xl:gap-0"
                  >
                    <div className="flex items-baseline gap-3 leading-[1.5] xl:flex-col xl:items-start xl:gap-2">
                      <p className="text-[16px] font-bold text-ink md:text-[20px]">{pub.year}</p>
                      <p className="text-[14px] text-ink-dim md:text-[16px]">{pub.venue}</p>
                    </div>
                    <p className="text-[16px] leading-[1.5] text-ink md:text-[20px]">{pub.title}</p>
                    <ul className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      {pub.partners.map((partner) => (
                        <li
                          key={partner}
                          className="rounded-full border border-ink px-4 py-1 text-[14px] leading-[1.5] text-ink md:text-[17px]"
                        >
                          {partner}
                        </li>
                      ))}
                    </ul>
                  </Reveal>
                ))}
              </ul>
            </div>

            {/* 협력 기관 로고 마퀴 — 동일 세트 2개를 이어 붙여 우→좌 무한 루프.
                각 세트에 pr(=gap)을 줘 -50% 이동 주기가 정확히 한 세트가 되도록 */}
            <Reveal className="w-full">
              <div className="w-full overflow-hidden" role="img" aria-label="협력 기관 로고 — Cambridge, Harvard, KAIST, Imperial, GIST 등">
                <div className="flex w-max motion-safe:animate-[ticker_40s_linear_infinite]">
                  {[0, 1].map((copy) => (
                    <div
                      key={copy}
                      aria-hidden={copy === 1}
                      className="flex items-center gap-[10px] pr-[10px] md:gap-[15px] md:pr-[15px]"
                    >
                      {PARTNER_LOGOS.map((logo) => (
                        <img
                          key={logo.name}
                          src={logo.src}
                          alt={copy === 0 ? logo.name : ''}
                          loading="lazy"
                          className="h-[72px] w-auto max-w-none md:h-[111px]"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal>
              <p className="text-center text-[15px] leading-[1.5] text-ink md:text-[20px]">
                {expertise.research.caption}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
