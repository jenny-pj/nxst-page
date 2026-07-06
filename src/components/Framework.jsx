import { framework } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import ScrambleText from './ScrambleText.jsx';

/* 레이어별 슬랩 톤 — L01 액센트 → L05 블랙으로 수렴 (Figma Vector 2~6) */
const SLAB_TONES = [
  { stroke: '#5183e8', fillOpacity: 0.2 },
  { stroke: '#d6d6d6', fillOpacity: 0.4 },
  { stroke: '#d6d6d6', fillOpacity: 0.6 },
  { stroke: '#d6d6d6', fillOpacity: 0.8 },
  { stroke: '#010a12', fillOpacity: 1 },
];

/* 등각 레이어 판 — 상단 모서리가 접힌 슬랩 형태 */
function LayerSlab({ stroke, fillOpacity }) {
  return (
    <svg
      viewBox="0 0 1206.5 145.517"
      preserveAspectRatio="none"
      aria-hidden="true"
      fill="none"
      className="absolute inset-0 size-full"
    >
      <path d="M1 144.517V23.5167L40 1H1205.5V122L1166.5 144.517H1Z" fill="white" fillOpacity={fillOpacity} />
      <path
        d="M1205.5 1V122L1166.5 144.517H1V23.5167L40 1H1205.5ZM1 23.5167H1166.5M1166.5 144.517V23.5167M1166.5 23.5167L1205.5 1"
        stroke={stroke}
        strokeWidth="2"
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

function Chip({ children }) {
  return (
    <li className="rounded-2xl bg-accent-soft px-3 py-2 text-[14px] leading-[1.25] text-accent transition-colors duration-300 hover:bg-accent hover:text-white lg:px-4 lg:py-2.5 lg:text-[18px] xl:text-[22px]">
      {children}
    </li>
  );
}

/**
 * SECTION 04 — 우리는 어떻게 연구하는가.
 * 데이터(L01)에서 Physical AI(L05)로 쌓이는 레이어 아키텍처.
 */
export default function Framework() {
  return (
    <section id="framework" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-14 px-5 py-24 md:gap-[80px] md:px-[60px] md:py-[140px]">
        <SectionHeader eyebrow={framework.eyebrow} title={framework.title} />

        {/* 데스크톱: 슬랩 스택 */}
        <div className="hidden w-full max-w-[1204px] flex-col gap-1.5 lg:flex">
          {framework.layers.map((layer, i) => (
            <Reveal key={layer.no} delay={i * 80}>
              <div className="relative h-[144px] w-full transition-all duration-300 hover:-translate-y-1 hover:drop-shadow-[0_10px_24px_rgba(81,131,232,0.15)]">
                <LayerSlab {...SLAB_TONES[i]} />
                {/* 콘텐츠는 슬랩 상단 접힘선(y=23) 아래 배치 */}
                <div className="absolute inset-x-0 bottom-0 top-[23px] flex items-center gap-6 pl-8 pr-8">
                  <p
                    className={`w-[340px] shrink-0 text-[26px] leading-[1.25] text-ink xl:text-[32px] ${
                      layer.terminal ? 'font-semibold' : 'font-normal'
                    }`}
                  >
                    <ScrambleText text={layer.name} duration={650} />
                  </p>
                  <ul className="flex flex-1 flex-wrap items-center gap-4">
                    {layer.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </ul>
                  {/* 슬랩 면의 오른쪽 경계는 접힘 때문에 40px 안쪽 — mr로 보정 */}
                  <p className="mr-6 shrink-0 self-end pb-3 text-[20px] leading-[1.25] text-ink-dim">{layer.no}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* 태블릿·모바일: 슬랩 스택 — 데스크톱과 같은 직사면체 형태 유지 */}
        <div className="flex w-full flex-col gap-2 lg:hidden">
          {framework.layers.map((layer, i) => (
            <Reveal key={layer.no} delay={i * 60}>
              <div className="relative">
                <LayerSlab {...SLAB_TONES[i]} />
                {/* 콘텐츠는 슬랩 면(상단 접힘선 아래) 안쪽에 배치 */}
                <div className="relative px-5 pb-5 pt-8">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className={`text-[19px] leading-[1.25] text-ink ${layer.terminal ? 'font-semibold' : 'font-normal'}`}>
                      {layer.name}
                    </p>
                    <p className="mr-4 text-[14px] text-ink-dim">{layer.no}</p>
                  </div>
                  <ul className="mt-3 flex flex-wrap gap-2">
                    {layer.items.map((item) => (
                      <Chip key={item}>{item}</Chip>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
