import { whyData } from '../data/copy.js';
import Reveal from './Reveal.jsx';
import SectionHeader from './SectionHeader.jsx';

/* 노드 사이 화살표 — Figma flow-line (흰색 라인 + 화살촉). angle: 분기/합류 구간에서 CSS rotate로 기울임(비율 왜곡 없음) */
function FlowArrow({ vertical = false, angle = 0 }) {
  return (
    <svg
      viewBox="0 0 34 160"
      aria-hidden="true"
      className={vertical ? 'h-10 w-3 rotate-90 self-center' : 'h-[120px] w-8 shrink-0 self-center lg:h-[160px]'}
      style={angle ? { transform: `rotate(${angle}deg)` } : undefined}
      preserveAspectRatio="none"
      fill="none"
    >
      <path
        d="M1 79C0.447715 79 0 79.4477 0 80C0 80.5523 0.447715 81 1 81V80V79ZM33.7071 80.7071C34.0976 80.3166 34.0976 79.6834 33.7071 79.2929L27.3431 72.9289C26.9526 72.5384 26.3195 72.5384 25.9289 72.9289C25.5384 73.3195 25.5384 73.9526 25.9289 74.3431L31.5858 80L25.9289 85.6569C25.5384 86.0474 25.5384 86.6805 25.9289 87.0711C26.3195 87.4616 26.9526 87.4616 27.3431 87.0711L33.7071 80.7071ZM1 80V81H33V80V79H1V80Z"
        fill="white"
      />
    </svg>
  );
}

/*
 * 플로우 레이아웃 상수 — 원(S) · 원-라벨 간격(gapY) · 라벨 고정 높이(labelH) · 분기 노드 간격(G)
 * 으로부터 유도. 라벨 높이를 고정해 서브텍스트 유무와 무관하게 모든 노드 박스 높이(H)를
 * 동일하게 만들고, 그 위에서 "원의 중심"이 정확히 정렬되도록 계산한다.
 *   H = S + gapY + labelH, HALF = (H + G) / 2
 * - 싱글 노드/직선 화살표의 위쪽 여백 = HALF (자신의 원 중심을 분기 쌍의 중간 지점에 맞춤)
 * - 대각선 화살표 쌍을 담는 컨테이너도 위아래 절반(HALF)씩 두 칸으로 나눠, 각 칸 중앙에
 *   기존 FlowArrow를 회전만 시켜 배치 — 비율을 늘리지 않고(스케일 1:1 유지) 원형 중심 높이에 맞춤
 */
const CENTER_OFFSET = 'mt-[120px] lg:mt-[156px]';
const DIAGONAL_OFFSET = 'mt-[60px] lg:mt-20';
const DIAGONAL_HALF = 'flex h-[120px] items-center justify-center lg:h-[156px]';

/* 노드 아이콘 — Figma 시안(Font Awesome solid) 패스, 160×160 좌표계 */
const ICON_PATHS = {
  industry:
    'M52 52C49.7875 52 48 53.7875 48 56V102C48 105.312 50.6875 108 54 108H106C109.312 108 112 105.312 112 102V67.025C112 64.75 109.575 63.3125 107.575 64.3875L88 74.925V67.025C88 64.75 85.575 63.3125 83.575 64.3875L64 74.925V56C64 53.7875 62.2125 52 60 52H52Z',
  database:
    'M108 73.725C106.15 74.95 104.025 75.9375 101.812 76.725C95.9375 78.825 88.225 80 80 80C71.775 80 64.05 78.8125 58.1875 76.725C55.9875 75.9375 53.85 74.95 52 73.725V84C52 89.525 64.5375 94 80 94C95.4625 94 108 89.525 108 84V73.725ZM108 64V58C108 52.475 95.4625 48 80 48C64.5375 48 52 52.475 52 58V64C52 69.525 64.5375 74 80 74C95.4625 74 108 69.525 108 64ZM101.812 96.725C95.95 98.8125 88.2375 100 80 100C71.7625 100 64.05 98.8125 58.1875 96.725C55.9875 95.9375 53.85 94.95 52 93.725V102C52 107.525 64.5375 112 80 112C95.4625 112 108 107.525 108 102V93.725C106.15 94.95 104.025 95.9375 101.812 96.725Z',
  brain:
    'M63 55C63 51.1375 66.1375 48 70 48H73C75.2125 48 77 49.7875 77 52V108C77 110.213 75.2125 112 73 112H69C65.275 112 62.1375 109.45 61.25 106C61.1625 106 61.0875 106 61 106C55.475 106 51 101.525 51 96C51 93.75 51.75 91.675 53 90C50.575 88.175 49 85.275 49 82C49 78.1375 51.2 74.775 54.4 73.1125C53.5125 71.6125 53 69.8625 53 68C53 62.475 57.475 58 63 58V55ZM97 55V58C102.525 58 107 62.475 107 68C107 69.875 106.487 71.625 105.6 73.1125C108.812 74.775 111 78.125 111 82C111 85.275 109.425 88.175 107 90C108.25 91.675 109 93.75 109 96C109 101.525 104.525 106 99 106C98.9125 106 98.8375 106 98.75 106C97.8625 109.45 94.725 112 91 112H87C84.7875 112 83 110.213 83 108V52C83 49.7875 84.7875 48 87 48H90C93.8625 48 97 51.1375 97 55Z',
  chart:
    'M56 56C56 53.7875 54.2125 52 52 52C49.7875 52 48 53.7875 48 56V98C48 103.525 52.475 108 58 108H108C110.213 108 112 106.213 112 104C112 101.787 110.213 100 108 100H58C56.9 100 56 99.1 56 98V56ZM106.825 66.825C108.387 65.2625 108.387 62.725 106.825 61.1625C105.262 59.6 102.725 59.6 101.162 61.1625L88 74.3375L80.825 67.175C79.2625 65.6125 76.725 65.6125 75.1625 67.175L63.1625 79.175C61.6 80.7375 61.6 83.275 63.1625 84.8375C64.725 86.4 67.2625 86.4 68.825 84.8375L78 75.6625L85.175 82.8375C86.7375 84.4 89.275 84.4 90.8375 82.8375L106.838 66.8375L106.825 66.825Z',
  robot:
    'M84 48C84 45.7875 82.2125 44 80 44C77.7875 44 76 45.7875 76 48V56H64C57.375 56 52 61.375 52 68V96C52 102.625 57.375 108 64 108H96C102.625 108 108 102.625 108 96V68C108 61.375 102.625 56 96 56H84V48ZM60 94C60 92.3375 61.3375 91 63 91H67C68.6625 91 70 92.3375 70 94C70 95.6625 68.6625 97 67 97H63C61.3375 97 60 95.6625 60 94ZM75 94C75 92.3375 76.3375 91 78 91H82C83.6625 91 85 92.3375 85 94C85 95.6625 83.6625 97 82 97H78C76.3375 97 75 95.6625 75 94ZM90 94C90 92.3375 91.3375 91 93 91H97C98.6625 91 100 92.3375 100 94C100 95.6625 98.6625 97 97 97H93C91.3375 97 90 95.6625 90 94ZM68 70C71.3125 70 74 72.6875 74 76C74 79.3125 71.3125 82 68 82C64.6875 82 62 79.3125 62 76C62 72.6875 64.6875 70 68 70ZM86 76C86 72.6875 88.6875 70 92 70C95.3125 70 98 72.6875 98 76C98 79.3125 95.3125 82 92 82C88.6875 82 86 79.3125 86 76ZM48 76C48 73.7875 46.2125 72 44 72C41.7875 72 40 73.7875 40 76V88C40 90.2125 41.7875 92 44 92C46.2125 92 48 90.2125 48 88V76ZM116 72C113.787 72 112 73.7875 112 76V88C112 90.2125 113.787 92 116 92C118.213 92 120 90.2125 120 88V76C120 73.7875 118.213 72 116 72Z',
};

/*
 * 합성 데이터 노드 전용 — Figma 동기화(2026-07-15, 선택된 참조 PNG 픽셀 확인 완료). 물리 제약 기반으로
 * "생성"된 데이터를 나타내는 노드·엣지(네트워크) 그래픽 — 연결선은 굵은 단색 채움, 노드 점 7개는
 * 링(테두리만 currentColor, 가운데는 뚫려 배경이 비침) — PNG 레퍼런스와 동일한 2-tone 구조.
 * Figma 원본 좌표는 160 캔버스 안에서 글리프가 43유닛 정도로 작게 그려져 있어(다른 FA 아이콘은 56~80유닛),
 * 그대로 쓰면 다른 아이콘 대비 작아 보여 중심(80,80) 기준 1.5배 확대.
 */
function SynthesisIcon() {
  return (
    <svg viewBox="0 0 160 160" className="size-full scale-75" fill="currentColor" stroke="none">
      <g transform="translate(80 80) scale(1.5) translate(-80 -80)">
        <path d="M75.8872 97.9133L61.9311 90.592L68.809 87.1809L75.8872 97.9133ZM98.0678 90.592L84.1118 97.9133L91.1899 87.1809L98.0678 90.592ZM88.6899 85.9407L81.3842 97.0198V82.3186L88.6899 85.9407ZM78.6147 97.0188L71.309 85.9407L78.6147 82.3186V97.0188ZM97.1362 87.0393L92.725 84.8518L94.2094 82.6008L97.1362 87.0393ZM67.2729 84.8518L62.8627 87.0383L65.7885 82.6018L67.2729 84.8518ZM99.7309 85.9436L95.8676 80.0862L99.7309 74.2288V85.9436ZM64.1303 80.0862L60.269 85.9417V74.2297L64.1303 80.0862ZM92.5512 80.0862L90.225 83.6126L83.1157 80.0862L90.226 76.5598L92.5512 80.0862ZM76.8823 80.0862L69.7729 83.6116L67.4477 80.0862L69.7729 76.5608L76.8823 80.0862ZM78.6147 77.8538L71.309 74.2307L78.6147 63.1536V77.8538ZM88.6899 74.2307L81.3842 77.8538V63.1526L88.6899 74.2307ZM94.2094 77.5715L92.725 75.3206L97.1362 73.1331L94.2094 77.5715ZM67.2729 75.3206L65.7895 77.5706L62.8637 73.134L67.2729 75.3206ZM98.0688 69.5803L91.1889 72.9915L84.1118 62.259L98.0688 69.5803ZM68.809 72.9905L61.9301 69.5803L75.8862 62.259L68.809 72.9905Z" />
        <circle cx="80" cy="58.5383" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
        <circle cx="80" cy="80" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
        <circle cx="58.8846" cy="69.2691" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
        <circle cx="58.8846" cy="90.3846" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
        <circle cx="101.115" cy="69.2691" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
        <circle cx="101.115" cy="90.3846" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
        <circle cx="80" cy="101.462" r="4.5" fill="none" stroke="currentColor" strokeWidth="2.77" />
      </g>
    </svg>
  );
}

function FlowNode({ node, vertical = false }) {
  const size = vertical ? 'size-[88px]' : 'size-[120px] lg:size-[160px]';
  return (
    <div className={`group flex flex-col items-center gap-3 md:gap-4 ${vertical ? '' : 'w-[120px] lg:w-[160px]'}`}>
      <div
        className="relative transition-transform duration-300 ease-out group-hover:-translate-y-1.5 motion-reduce:transition-none"
        aria-hidden="true"
      >
        {/* 산업 데이터 / 합성 데이터 노드 — 배경으로 약하게 퍼지는 파동 링 (위상차 2겹) */}
        {node.accent && (
          <>
            <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-accent/70 motion-safe:animate-[nodeRipple_3s_ease-out_infinite]" />
            <span className="pointer-events-none absolute inset-0 rounded-full border-2 border-accent/50 motion-safe:animate-[nodeRipple_3s_ease-out_1.5s_infinite]" />
          </>
        )}
        <div
          className={`relative rounded-full border-2 ${size} ${
            node.accent ? 'border-accent bg-glow/20 text-accent' : 'border-[#d9d9d9] text-white'
          }`}
        >
          {/* 아이콘 글리프 80px→60px — 원 대비 0.75 스케일 */}
          {node.icon === 'network' ? (
            <SynthesisIcon />
          ) : (
            <svg viewBox="0 0 160 160" className="size-full scale-75" fill="currentColor">
              <path d={ICON_PATHS[node.icon]} />
            </svg>
          )}
        </div>
      </div>
      {/* 라벨 높이 고정(h-16/lg:h-20) — 서브텍스트 유무와 무관하게 모든 노드의 원 중심을 동일 라인에 정렬 */}
      <div className={`flex flex-col items-center gap-1 ${vertical ? '' : 'h-16 lg:h-20'}`}>
        <p
          className={`whitespace-nowrap text-center text-[15px] font-semibold leading-[1.5] md:text-[20px] lg:text-[24px] ${
            node.accent ? 'text-accent' : 'text-dim-dark'
          }`}
        >
          {node.ko}
        </p>
        {/* 서브텍스트 — Figma 동기화(2026-07-15)로 추가된 노드 보조 설명 */}
        {node.subtitle && (
          <p className="max-w-[150px] whitespace-pre-line text-center text-[12px] leading-[1.5] text-dim-dark/70 md:max-w-[200px] md:text-[14px] lg:text-[15px]">
            {node.subtitle}
          </p>
        )}
      </div>
    </div>
  );
}

/**
 * SECTION 02 — Physical AI는 왜 산업 데이터를 필요로 하는가.
 * Flow의 중심은 AI가 아니라 산업 데이터 — accent 노드만 강조.
 * 산업 환경 → (산업 데이터 / 합성 데이터) 분기 → AI 학습 합류 → 추론 및 의사결정 → Physical AI (Figma 동기화 2026-07-15)
 * 노드는 좌→우 순차 리빌로 데이터 흐름의 방향성을 전달.
 */
export default function WhyData() {
  // 모바일은 분기 구조를 표현하기 어려워 branch를 순차 나열로 평탄화
  const flatFlow = whyData.flow.flatMap((node) => (node.branch ? node.branch : [node]));

  return (
    <section id="why-data" className="bg-dark">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-16 px-5 pb-32 pt-28 md:gap-[100px] md:px-[60px] md:pb-[200px] md:pt-[160px]">
        <SectionHeader dark eyebrow={whyData.eyebrow} title={whyData.title} support={whyData.support} />

        {/* 데스크톱: 수평 플로우 — items-start + 고정 오프셋으로 원형 중심을 정확히 정렬 */}
        <div className="hidden items-start gap-3 md:flex lg:gap-5">
          {whyData.flow.map((node, i) => {
            const prev = whyData.flow[i - 1];
            const isDiagonal = i > 0 && (node.branch || prev.branch);
            const splitting = Boolean(node.branch);
            return (
              <div key={node.branch ? 'branch' : node.ko} className="contents">
                {i > 0 && (
                  <Reveal delay={i * 160 - 80} className={isDiagonal ? DIAGONAL_OFFSET : CENTER_OFFSET}>
                    {isDiagonal ? (
                      <div className="flex flex-col">
                        <div className={DIAGONAL_HALF}>
                          <FlowArrow angle={splitting ? -22 : 22} />
                        </div>
                        <div className={DIAGONAL_HALF}>
                          <FlowArrow angle={splitting ? 22 : -22} />
                        </div>
                      </div>
                    ) : (
                      <FlowArrow />
                    )}
                  </Reveal>
                )}
                <Reveal delay={i * 160} className={node.branch ? undefined : CENTER_OFFSET}>
                  {node.branch ? (
                    <div className="flex flex-col gap-10 lg:gap-14">
                      {node.branch.map((b) => (
                        <FlowNode key={b.ko} node={b} />
                      ))}
                    </div>
                  ) : (
                    <FlowNode node={node} />
                  )}
                </Reveal>
              </div>
            );
          })}
        </div>

        {/* 모바일: 수직 플로우 — 분기 없이 순차 나열 */}
        <Reveal className="md:hidden">
          <div className="flex flex-col items-center gap-2">
            {flatFlow.map((node, i) => (
              <div key={node.ko} className="contents">
                {i > 0 && <FlowArrow vertical />}
                <FlowNode node={node} vertical />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
