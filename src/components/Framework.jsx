import { Fragment, useEffect, useState } from 'react';
import { framework } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';
import ScrambleText from './ScrambleText.jsx';

/* 등각 레이어 판 — 상단좌·하단우 모서리가 접힌 슬랩 형태.
   전부 순수 CSS로 그린다 (SVG 없음). 접힘 크기는 카드 크기와 무관한 고정 픽셀(40×24).

   외곽선은 "이중 clip-path 폴리곤"으로 그린다 — 육각형 실루엣(모서리 2곳 대각선 포함)을
   테두리색으로 채운 바깥 다각형 위에, BORDER(2px)만큼 안쪽으로 당긴 같은 모양의 안쪽 다각형을
   채움색으로 겹친다. 두 다각형 사이 2px 틈이 테두리로 보인다.
   → 육각형 전체(직선 4변 + 대각선 2곳)가 "하나의 폴리곤 정의"라 조인트가 어긋날 수 없고,
     border-width는 스케일과 무관하게 항상 정확히 2px다.
   (border 속성을 clip-path 도형에 직접 얹는 방식은 대각선으로 잘린 가장자리에는 선이 안 그려져서
   폐기 — clip-path는 페인트를 잘라낼 뿐 새 테두리를 그려주지 않는다.)

   우상단의 3줄(노치 대각선 + 상단/우측 시임)은 실루엣이 아닌 순수 장식용 — 원본 디자인처럼
   앞면과 오른쪽 옆면(depth face)을 구분해 입체감을 준다. 우측 시임은 노치 하단(top: FOLD_H)에서
   우하단 접힘의 실제 시작점(bottom: 0, 즉 컨테이너 맨 아래)까지 끝까지 이어져야 옆면이 끊기지 않는다. */
const FOLD_W = 40; // px — 접힘 가로 폭
const FOLD_H = 24; // px — 접힘 세로 두께 (카드 높이와 무관하게 고정)
const BORDER = 2; // px — 테두리 두께
const NOTCH_LEN = Math.hypot(FOLD_W, FOLD_H); // 장식용 노치 대각선 길이
const NOTCH_DEG = -(Math.atan2(FOLD_H, FOLD_W) * 180) / Math.PI; // 노치 회전각 (rotate는 시계방향 양수)

/* 육각형 clip-path — inset만큼 안쪽으로 당긴 버전을 생성. FOLD_W/FOLD_H는 두 대각선 모서리에서
   "접힘 방향" 축의 좌표라 inset의 영향을 받지 않고, 나머지(직선 변과 맞닿는) 좌표만 inset된다. */
function hexClip(inset) {
  const edge = `calc(100% - ${inset}px)`;
  return [
    `${FOLD_W}px ${inset}px`,
    `${edge} ${inset}px`,
    `${edge} calc(100% - ${FOLD_H}px)`,
    `calc(100% - ${FOLD_W}px) ${edge}`,
    `${inset}px ${edge}`,
    `${inset}px ${FOLD_H}px`,
  ].join(', ');
}

function LayerSlab({ stroke, fillOpacity = 0.5 }) {
  return (
    <div className="absolute inset-0">
      {/* 바깥 육각형 — 테두리색 채움 */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{ backgroundColor: stroke, clipPath: `polygon(${hexClip(0)})` }}
      />
      {/* 안쪽 육각형 — BORDER만큼 당긴 동일 모양, 실제 채움색. 바깥과의 틈이 테두리로 보인다.
          안쪽이 바깥(테두리색) 위에 겹쳐지는 구조라 rgba 반투명을 쓰면 hover로 stroke가 바뀔 때마다
          채움색도 같이 물드는 버그가 생긴다 — 항상 페이지 배경(--color-bg)과 미리 섞은 불투명색을 써서
          stroke 값과 무관하게 채움색이 고정되도록 한다. */}
      <div
        className="absolute inset-0 transition-colors duration-300"
        style={{
          backgroundColor: `color-mix(in srgb, white ${fillOpacity * 100}%, var(--color-bg))`,
          clipPath: `polygon(${hexClip(BORDER)})`,
        }}
      />
      {/* 우상단 노치 대각선 — 장식용 시임(실루엣 아님) */}
      <div
        aria-hidden="true"
        className="absolute origin-top-left border-t-2 transition-colors duration-300"
        style={{
          left: `calc(100% - ${FOLD_W}px)`,
          top: FOLD_H,
          width: NOTCH_LEN,
          borderColor: stroke,
          transform: `rotate(${NOTCH_DEG}deg)`,
        }}
      />
      {/* 상단 시임 — 좌상단 접힘 밑점과 우상단 노치 사이 수평선 */}
      <div
        aria-hidden="true"
        className="absolute border-t-2 transition-colors duration-300"
        style={{ left: 0, right: FOLD_W, top: FOLD_H, borderColor: stroke }}
      />
      {/* 우측 시임(옆면 경계) — 우상단 노치에서 우하단 접힘 시작점까지 끝까지 이어짐 */}
      <div
        aria-hidden="true"
        className="absolute border-l-2 transition-colors duration-300"
        style={{ right: FOLD_W, top: FOLD_H, bottom: 0, borderColor: stroke }}
      />
    </div>
  );
}

function Chip({ children }) {
  return (
    <li className="rounded-2xl bg-accent-soft px-3 py-2 text-[14px] leading-[1.5] text-accent transition-colors duration-300 hover:bg-accent hover:text-white lg:px-4 lg:py-2.5 lg:text-[16px] xl:text-[18px]">
      {children}
    </li>
  );
}

/* CORE(액센트 채움) / OUTCOME(액센트 보더) 배지 */
function Badge({ kind }) {
  return kind === 'CORE' ? (
    <span className="rounded-full bg-accent px-3 py-1 text-[12px] font-semibold tracking-[0.08em] text-white">CORE</span>
  ) : (
    <span className="rounded-full border border-accent px-3 py-1 text-[12px] font-semibold tracking-[0.08em] text-accent">OUTCOME</span>
  );
}

/* 파이프라인 크럼 — 호버/고정된 슬랩의 stage가 점등 */
function PipelineCrumb({ activeStages }) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1.5 text-[13px] font-medium tracking-[0.08em] md:text-[15px]"
    >
      {framework.stages.map((s, i) => (
        <Fragment key={s.key}>
          {i > 0 && <span className="text-ink-dim/40">→</span>}
          <span
            className={`border-b pb-0.5 transition-colors duration-200 ${
              activeStages.includes(s.key) ? 'border-accent text-accent' : 'border-transparent text-ink-dim'
            }`}
          >
            {s.label}
          </span>
        </Fragment>
      ))}
    </div>
  );
}

/* 슬랩 사이 흐름 커넥터 — 인접 슬랩 호버 시 점등 */
function FlowLabel({ label, lit, className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={`flex items-center gap-2.5 text-[13px] font-medium tracking-[0.04em] transition-colors duration-200 md:text-[14px] ${
        lit ? 'text-accent' : 'text-ink-dim/70'
      } ${className}`}
    >
      <span className={`inline-block text-[14px] leading-none transition-transform duration-200 ${lit ? 'translate-y-0.5' : ''}`}>
        ↓
      </span>
      {label}
    </div>
  );
}

/* 보더는 점등(호버/포커스) 시에만 액센트 — CORE도 다른 슬랩과 동일하게 동작 */
const slabStroke = (layer, lit) => (lit ? '#5183e8' : '#d6d6d6');

/* 데스크톱 슬랩 — 호버/포커스 시 디테일 펼침, 클릭 시 고정(다른 슬랩 클릭 전까지 유지) */
function DesktopSlab({ layer, lit, open, onEnter, onLeave, onClick }) {
  return (
    <div
      tabIndex={0}
      aria-label={`${layer.no} ${layer.name}`}
      aria-expanded={open}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClick={onClick}
      className={`relative w-full overflow-hidden outline-none transition-all duration-300 focus-visible:ring-2 focus-visible:ring-accent/40 ${
        open ? '-translate-y-1 drop-shadow-[0_10px_24px_rgba(81,131,232,0.15)]' : ''
      }`}
    >
      <LayerSlab stroke={slabStroke(layer, lit)} />
      {/* 접힘 밴드는 슬랩 높이의 ~16%로 늘어남 — 펼침 시 pt를 함께 키워 콘텐츠가 면의 세로 중앙에 오도록 보정 */}
      <div
        className={`relative flex flex-col px-10 pb-9 transition-[padding] duration-300 ${
          open ? 'pt-[88px]' : 'pt-[74px]'
        }`}
      >
        {/* 역할 태그 + 배지 — 같은 선상. 좁은 폭에서는 줄바꿈해 잘리지 않도록 flex-wrap */}
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p
            className={`text-[13px] font-medium tracking-[0.08em] transition-colors duration-200 ${
              open ? 'text-accent' : 'text-ink-dim'
            }`}
          >
            {layer.role}
          </p>
          {layer.badge && (
            <div className="mr-6">
              <Badge kind={layer.badge} />
            </div>
          )}
        </div>
        <div className="flex min-h-[100px] items-center gap-8">
          <div className="w-[360px] shrink-0">
            <p className={`text-[24px] leading-[1.5] xl:text-[26px] ${layer.core ? 'text-accent' : 'text-ink'} ${layer.core || layer.terminal ? 'font-semibold' : 'font-normal'}`}>
              <ScrambleText text={layer.name} duration={650} />
            </p>
            <p className="mt-2 text-[15px] leading-[1.5] text-ink-dim">{layer.caption}</p>
          </div>
          <ul className="flex flex-1 flex-wrap items-center gap-4">
            {layer.items.map((item) => (
              <Chip key={item}>{item}</Chip>
            ))}
          </ul>
          {/* 슬랩 면의 오른쪽 경계는 접힘 때문에 40px 안쪽 — mr로 보정 */}
          <p className="mr-6 shrink-0 self-end pb-2 text-[20px] leading-[1.5] text-ink-dim">{layer.no}</p>
        </div>

        {/* 디테일 — 호버/포커스 시 펼침 */}
        <div className={`overflow-hidden transition-all duration-300 ${open ? 'mt-3 max-h-[300px] opacity-100' : 'max-h-0 opacity-0'}`}>
          {/* 슬랩 오른쪽 접힘 보정과 동일하게 mr-6으로 좌우 여백을 맞춤 */}
          <div className="mr-6 border-t border-line pb-2 pt-5">
            <span className="mb-2.5 block text-[13px] font-medium tracking-[0.08em] text-accent">{layer.detailTag}</span>
            <p className="w-full text-[15px] leading-[1.75] text-ink-dim">{layer.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 모바일 슬랩 — 탭으로 디테일 토글 */
function MobileSlab({ layer, open, onToggle }) {
  return (
    <div className="relative">
      <LayerSlab stroke={slabStroke(layer, false)} />
      <div
        role="button"
        tabIndex={0}
        aria-expanded={open}
        aria-label={`${layer.no} ${layer.name} — 상세 ${open ? '접기' : '펼치기'}`}
        onClick={onToggle}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onToggle();
          }
        }}
        className="relative block w-full cursor-pointer overflow-hidden px-7 pb-8 pt-10 text-left outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
          <p className="text-[12px] font-medium tracking-[0.08em] text-ink-dim">{layer.role}</p>
          <div className="mr-4 flex shrink-0 items-center gap-2">
            {layer.badge && <Badge kind={layer.badge} />}
            <p className="text-[14px] text-ink-dim">{layer.no}</p>
          </div>
        </div>
        <p className={`mt-2 text-[20px] leading-[1.3] ${layer.core ? 'text-accent' : 'text-ink'} ${layer.core || layer.terminal ? 'font-semibold' : 'font-normal'}`}>
          {layer.name}
        </p>
        <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-dim">{layer.caption}</p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {layer.items.map((item) => (
            <Chip key={item}>{item}</Chip>
          ))}
        </ul>
        <div className={`overflow-hidden transition-all duration-300 ${open ? 'mt-4 max-h-[380px] opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="border-t border-line pt-4">
            <span className="mb-2 block text-[12px] font-medium tracking-[0.08em] text-accent">{layer.detailTag}</span>
            <p className="text-[14px] leading-[1.7] text-ink-dim">{layer.detail}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * SECTION 04 — 우리는 어떻게 연구하는가.
 * 데이터(L01)에서 Physical AI(L05)로 쌓이는 레이어 아키텍처.
 * 호버 시 파이프라인 크럼·흐름 커넥터 점등 + 디테일 펼침,
 * L03~L05 오른쪽에는 물리 검증 레일.
 */
export default function Framework() {
  const [hovered, setHovered] = useState(null);
  const [pinned, setPinned] = useState(null);
  const [railLit, setRailLit] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(null);

  const layers = framework.layers;

  // 슬랩 바깥 클릭 시 고정 해제 — 슬랩 클릭은 stopPropagation으로 여기까지 오지 않음
  useEffect(() => {
    if (pinned == null) return undefined;
    const close = () => setPinned(null);
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, [pinned]);

  // 호버 또는 클릭 고정된 슬랩 — 마우스가 떠나도 고정은 유지, 다른 슬랩 클릭 시 이전 고정 해제
  const isOn = (i) => hovered === i || pinned === i;
  const activeStages = layers.filter((_, i) => isOn(i)).map((l) => l.stage);

  const renderDesktop = (i, extraDelay = 0) => {
    const layer = layers[i];
    return (
      <Fragment key={layer.no}>
        <Reveal delay={i * 80 + extraDelay}>
          <DesktopSlab
            layer={layer}
            lit={isOn(i) || (railLit && layer.rail)}
            open={isOn(i)}
            onEnter={() => setHovered(i)}
            onLeave={() => setHovered(null)}
            onClick={(e) => {
              e.stopPropagation();
              setPinned(pinned === i ? null : i);
            }}
          />
        </Reveal>
        {layer.flow && (
          <Reveal delay={i * 80 + 40 + extraDelay}>
            <FlowLabel label={layer.flow} lit={isOn(i) || isOn(i + 1)} className="py-4 pl-10" />
          </Reveal>
        )}
      </Fragment>
    );
  };

  return (
    <section id="framework" className="bg-bg">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-5 py-28 md:gap-[100px] md:px-[60px] md:py-[160px]">
        <SectionHeader tight eyebrow={framework.eyebrow} title={framework.title} />

        {/* 파이프라인 크럼 + 슬랩 스택 — 연결된 요소라 좁은 간격으로 묶음 */}
        <div className="flex w-full flex-col items-center gap-6 md:gap-8">
          <Reveal delay={160}>
            <PipelineCrumb activeStages={activeStages} />
          </Reveal>

          {/* 데스크톱: 슬랩 스택 + 물리 검증 레일 */}
          <div className="hidden w-full max-w-[1204px] flex-col lg:flex">
          {renderDesktop(0)}
          {renderDesktop(1)}
          {/* L03~L05 — 슬랩 너비는 L01·L02와 동일하게 유지하고, 레일은 스택 오른쪽 밖에 절대 배치 */}
          <div className="relative">
            <div className="flex min-w-0 flex-col">
              {renderDesktop(2)}
              {renderDesktop(3)}
              {renderDesktop(4)}
            </div>
            <div
              role="note"
              tabIndex={0}
              aria-label={framework.railNote}
              onMouseEnter={() => setRailLit(true)}
              onMouseLeave={() => setRailLit(false)}
              onFocus={() => setRailLit(true)}
              onBlur={() => setRailLit(false)}
              className={`absolute inset-y-0 left-full ml-3 flex w-9 items-center justify-center border outline-none transition-colors duration-200 ${
                railLit ? 'border-accent bg-accent/5' : 'border-accent/40'
              }`}
            >
              <span
                className={`whitespace-nowrap text-[13px] font-medium tracking-[0.14em] transition-colors duration-200 [writing-mode:vertical-rl] ${
                  railLit ? 'text-accent' : 'text-accent/60'
                }`}
              >
                {framework.railLabel}
              </span>
            </div>
          </div>
          </div>

          {/* 태블릿·모바일: 슬랩 스택 — 탭으로 디테일 토글 */}
          <div className="flex w-full flex-col lg:hidden">
            {layers.map((layer, i) => (
              <Fragment key={layer.no}>
                {i > 0 && layers[i - 1].flow && (
                  <FlowLabel label={layers[i - 1].flow} lit={false} className="py-3 pl-7" />
                )}
                {/* 데스크톱 세로 레일 대신 L03 위 가로 라벨 */}
                {i === 2 && (
                  <div
                    role="note"
                    aria-label={framework.railNote}
                    className="mb-2 flex items-center border border-accent/50 bg-accent/5 px-3 py-2 text-[12px] font-medium tracking-[0.1em] text-accent"
                  >
                    {framework.railLabel} · L03–L05
                  </div>
                )}
                <Reveal delay={i * 60}>
                  <MobileSlab
                    layer={layer}
                    open={mobileOpen === i}
                    onToggle={() => setMobileOpen(mobileOpen === i ? null : i)}
                  />
                </Reveal>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
