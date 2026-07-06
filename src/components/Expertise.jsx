import { expertise } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

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

        <ul className="grid w-full grid-cols-1 gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-5">
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

                {/* 역량명 */}
                <h3 className="mt-6 whitespace-nowrap text-center text-[20px] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-accent md:text-[24px]">
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
      </div>
    </section>
  );
}
