import { faLandmark, faIndustry, faGraduationCap, faRightLeft } from '@fortawesome/free-solid-svg-icons';
import { collaboration } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import logoDark from '../assets/figma/logo-dark.png';

/* 위성 원 아이콘 — Font Awesome solid, 협력 주체 성격에 매칭 */
const FA_ICONS = {
  landmark: faLandmark, // Government R&D
  industry: faIndustry, // Industry
  academia: faGraduationCap, // Academia
  transfer: faRightLeft, // Technology Transfer
};

/* FA 512 좌표계 글리프를 WhyData 노드와 동일한 비율(160 그리드에 72 높이)로 배치 */
const GLYPH_SCALE = 72 / 512;

/* 위성 원 — 110px 흰 원 + 연블루 보더 + 액센트 아이콘 */
function SatelliteCircle({ icon }) {
  const [w, h, , , path] = FA_ICONS[icon].icon;
  return (
    <div
      className="flex size-[88px] shrink-0 items-center justify-center rounded-full border-2 border-[#dae5ef] bg-white text-accent transition-all duration-300 group-hover:border-accent group-hover:shadow-[0_8px_24px_rgba(81,131,232,0.2)] lg:size-[110px]"
      aria-hidden="true"
    >
      <svg viewBox="0 0 160 160" className="size-full scale-75" fill="currentColor">
        <g transform={`translate(${(160 - w * GLYPH_SCALE) / 2} ${(160 - h * GLYPH_SCALE) / 2}) scale(${GLYPH_SCALE})`}>
          <path d={path} />
        </g>
      </svg>
    </div>
  );
}

/* 파트너 텍스트 블록 */
function PartnerText({ partner, alignRight = false }) {
  return (
    <div className={`flex w-[184px] flex-col gap-1.5 lg:w-auto lg:min-w-[184px] ${alignRight ? 'items-end text-right' : 'items-start text-left'}`}>
      <h3 className="text-[20px] font-semibold leading-[1.25] text-accent lg:whitespace-nowrap lg:text-[24px]">
        {partner.name}
      </h3>
      {partner.items.map((item) => (
        <p key={item} className="text-[16px] leading-[1.5] text-ink lg:text-[18px]">
          {item}
        </p>
      ))}
    </div>
  );
}

/* 대시 커넥터 — Figma 80:381 곡선 패스: 위성 쪽에서 수평으로 시작해 허브로 휘어지는 점선(4,4)
   + 허브 쪽 끝 14px 도트(50%). 기본형은 좌상단 — flip: 좌우 반전(우측 열), up: 상하 반전(하단 행) */
function Connector({ flip = false, up = false }) {
  return (
    <svg
      viewBox="0 0 81 22"
      className={`w-[81px] shrink-0 text-accent ${flip ? '-scale-x-100' : ''} ${up ? '-scale-y-100' : ''}`}
      aria-hidden="true"
      fill="none"
    >
      <path
        d="M0.073 1.225C11.743 0.38 43.605 1.631 67.552 13.402"
        stroke="#a3bdf1"
        strokeWidth="2"
        strokeDasharray="4 4"
      />
      <circle cx="73" cy="14.2" r="7" fill="currentColor" opacity="0.5" />
    </svg>
  );
}

/**
 * SECTION 07 — Collaboration (Figma 79:268).
 * 중앙 NEXTSTUDIO 허브(340px 원 + 로고) + 4개 협력 주체 위성 원 방사형 배치.
 * 시안의 빈 위성 원은 주체별 아이콘으로 채움.
 */
export default function Collaboration() {
  const left = collaboration.partners.filter((p) => p.side === 'left');
  const right = collaboration.partners.filter((p) => p.side === 'right');

  return (
    <section id="collaboration" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-24 md:gap-[80px] md:px-[60px] md:py-[140px]">
        <SectionHeader eyebrow={collaboration.eyebrow} title={collaboration.title} />

        {/* 데스크톱: 허브-스포크 다이어그램 */}
        <div className="hidden w-full max-w-[1320px] grid-cols-[1fr_auto_1fr] items-center lg:grid">
          <div className="flex flex-col gap-[90px] justify-self-end">
            {left.map((p, i) => (
              <Reveal key={p.name} delay={i * 120}>
                <div className="group flex items-center gap-4">
                  <PartnerText partner={p} alignRight />
                  <SatelliteCircle icon={p.icon} />
                  <Connector up={i === 1} />
                </div>
              </Reveal>
            ))}
          </div>

          {/* 중앙 허브 — 340px 원 + 다크 로고 */}
          <Reveal delay={60}>
            <div className="mx-2 flex size-[340px] items-center justify-center rounded-full border border-[#dae5ef] bg-white shadow-[0_4px_40px_rgba(81,131,232,0.08)]">
              <img src={logoDark} alt="NEXTSTUDIO" className="w-[239px]" />
            </div>
          </Reveal>

          <div className="flex flex-col gap-[90px] justify-self-start">
            {right.map((p, i) => (
              <Reveal key={p.name} delay={i * 120 + 60}>
                <div className="group flex items-center gap-4">
                  <Connector flip up={i === 1} />
                  <SatelliteCircle icon={p.icon} />
                  <PartnerText partner={p} />
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* 모바일·태블릿: 허브 + 세로 스택 */}
        <div className="flex w-full flex-col items-center gap-10 lg:hidden">
          <Reveal>
            <div className="flex size-[220px] items-center justify-center rounded-full border border-[#dae5ef] bg-white shadow-[0_4px_40px_rgba(81,131,232,0.08)]">
              <img src={logoDark} alt="NEXTSTUDIO" className="w-[150px]" />
            </div>
          </Reveal>
          <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2">
            {collaboration.partners.map((p, i) => (
              <Reveal key={p.name} as="li" delay={i * 80}>
                <div className="group flex items-center gap-5 rounded-2xl bg-white p-5">
                  <SatelliteCircle icon={p.icon} />
                  <PartnerText partner={p} />
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
