import { Fragment } from 'react';
import { techStack } from '../data/techStack.js';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * §3 / §4.4 / §5-4 — 3계층 + 데이터 소스 인터랙티브 SVG 다이어그램.
 * 레이아웃은 techStack 데이터로부터 계산 — 데스크톱(가로 레이어드) / 모바일(세로 스택) 두 변형.
 * 호버/포커스 = 미리보기 하이라이트, 클릭/Enter = 선택(패널 고정).
 */

const LAYER_LABELS = {
  L3: ['L3 · CAPABILITY', 'AI 역량·응용'],
  L2: ['L2 · MODEL CORE', '물리 × 생성'],
  L1: ['L1 · DATA SPACE', '융합데이터 기반'],
};

/* ── 데스크톱 레이아웃 ───────────────────────────────────────────── */
function layoutDesktop() {
  const W = 1080;
  const X0 = 16;
  const CW = 924; // 박스 영역 폭 (우측 140은 레이어 라벨)
  const GAP = 12;
  const rows = [];
  let y = 16;

  for (const layer of techStack.layers) {
    const h = 104;
    const boxes = [];
    if (layer.id === 'L3') {
      const w = (CW - 3 * GAP) / 4;
      layer.boxes.forEach((b, i) => boxes.push({ ...b, x: X0 + i * (w + GAP), y, w, h }));
    } else if (layer.id === 'L2') {
      const wPinn = 320;
      boxes.push({ ...layer.boxes[0], x: X0, y, w: wPinn, h });
      boxes.push({ ...layer.boxes[1], x: X0 + wPinn + GAP, y, w: CW - wPinn - GAP, h });
    } else {
      boxes.push({ ...layer.boxes[0], x: X0, y, w: CW, h });
    }
    rows.push({ layer, y, h, boxes, labelX: X0 + CW + 18, labelY: y + h / 2 });
    y += h + 18;
  }

  const l1Bottom = y - 18 + 0; // 마지막 행 bottom
  const srcR = 36;
  const srcCY = l1Bottom + 100;
  const sources = techStack.sources.map((s, i) => ({
    ...s,
    cx: X0 + (CW * (i + 0.5)) / 4,
    cy: srcCY,
    r: srcR,
    lineY1: l1Bottom,
    lineY2: srcCY - srcR,
  }));

  return { W, H: srcCY + srcR + 34, rows, sources, vertical: false, ellipsisX: X0 + CW - 6, ellipsisY: srcCY };
}

/* ── 모바일 세로 스택 레이아웃 ───────────────────────────────────── */
function layoutMobile() {
  const W = 380;
  const X0 = 12;
  const CW = W - 24;
  const rows = [];
  let y = 8;

  for (const layer of techStack.layers) {
    const labelY = y + 10;
    y += 24;
    const boxes = [];
    for (const b of layer.boxes) {
      boxes.push({ ...b, title: b.titleShort ?? b.title, sub: b.subShort ?? b.sub, x: X0, y, w: CW, h: 68 });
      y += 76;
    }
    rows.push({ layer, boxes, labelX: X0, labelY, vertical: true });
    y += 14;
  }

  const l1Bottom = y - 14 - 8;
  const srcR = 30;
  const srcCY = l1Bottom + 76;
  const sources = techStack.sources.map((s, i) => ({
    ...s,
    cx: X0 + (CW * (i + 0.5)) / 4,
    cy: srcCY,
    r: srcR,
    lineY1: l1Bottom,
    lineY2: srcCY - srcR,
  }));

  return { W, H: srcCY + srcR + 28, rows, sources, vertical: true, ellipsisX: null };
}

function Badge({ x, y, anchor = 'end', text, color }) {
  // CJK 글자는 모노 영문 대비 ~1.7배 폭
  const w = [...text].reduce((acc, ch) => acc + (ch.charCodeAt(0) > 0x2e80 ? 10.5 : 6.2), 16);
  const bx = anchor === 'end' ? x - w : x;
  return (
    <g aria-hidden="true">
      <rect x={bx} y={y} width={w} height={18} rx={2} fill="var(--color-bg)" stroke={color} strokeWidth="1" />
      <text
        x={bx + w / 2}
        y={y + 12.5}
        textAnchor="middle"
        fontSize="9.5"
        fill={color}
        style={{ fontFamily: 'var(--font-mono)' }}
      >
        {text}
      </text>
    </g>
  );
}

export default function TechDiagram({ vertical, active, onHover, onSelect }) {
  const reduced = usePrefersReducedMotion();
  const L = vertical ? layoutMobile() : layoutDesktop();

  const activeLayerId =
    active?.type === 'layer' ? active.id : active?.type === 'box' ? active.layerId : active?.type === 'source' ? 'L1' : null;

  const rowOpacity = (layerId) => (activeLayerId && activeLayerId !== layerId ? 0.35 : 1);

  const boxStroke = (b) =>
    active?.type === 'box' && active.id === b.id
      ? 'var(--color-signal)'
      : activeLayerId === b.layerId
        ? '#33415c'
        : 'var(--color-line)';

  const handleKey = (e, payload) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelect(payload);
    }
  };

  return (
    <svg
      viewBox={`0 0 ${L.W} ${L.H}`}
      className="w-full select-none"
      role="group"
      aria-label="기술 스택 다이어그램 — 3개 계층과 데이터 소스"
    >
      {/* 배경 클릭 → 선택 해제 */}
      <rect x="0" y="0" width={L.W} height={L.H} fill="transparent" onClick={() => onSelect(null)} />

      {L.rows.map(({ layer, boxes, labelX, labelY }) => {
        const [labelMain, labelSub] = LAYER_LABELS[layer.id];
        const layerPayload = { type: 'layer', id: layer.id };
        return (
          <g
            key={layer.id}
            opacity={rowOpacity(layer.id)}
            className="transition-opacity duration-150 motion-reduce:transition-none"
          >
            {/* 레이어 라벨 — 호버/클릭 시 레이어 전체 하이라이트 */}
            <g
              role="button"
              tabIndex={0}
              aria-label={`${labelMain} (${labelSub}) 레이어 설명 보기`}
              className="cursor-pointer outline-none"
              onMouseEnter={() => onHover(layerPayload)}
              onMouseLeave={() => onHover(null)}
              onFocus={() => onHover(layerPayload)}
              onBlur={() => onHover(null)}
              onClick={() => onSelect(layerPayload)}
              onKeyDown={(e) => handleKey(e, layerPayload)}
            >
              {L.vertical ? (
                <text x={labelX} y={labelY + 4} fontSize="11" fill={activeLayerId === layer.id ? 'var(--color-signal)' : 'var(--color-ink-dim)'} style={{ fontFamily: 'var(--font-mono)' }}>
                  {labelMain} — {labelSub}
                </text>
              ) : (
                <>
                  <text x={labelX} y={labelY - 4} fontSize="12.5" fill={activeLayerId === layer.id ? 'var(--color-signal)' : 'var(--color-ink)'} style={{ fontFamily: 'var(--font-mono)' }}>
                    {labelMain}
                  </text>
                  <text x={labelX} y={labelY + 14} fontSize="11" fill="var(--color-ink-dim)" style={{ fontFamily: 'var(--font-mono)' }}>
                    {labelSub}
                  </text>
                </>
              )}
            </g>

            {/* 박스 */}
            {boxes.map((b) => {
              const payload = { type: 'box', id: b.id, layerId: layer.id };
              const cx = b.x + b.w / 2;
              return (
                <g
                  key={b.id}
                  role="button"
                  tabIndex={0}
                  aria-label={`${b.title} — 설명과 근거 논문 보기`}
                  className="cursor-pointer outline-none"
                  onMouseEnter={() => onHover(payload)}
                  onMouseLeave={() => onHover(null)}
                  onFocus={() => onHover(payload)}
                  onBlur={() => onHover(null)}
                  onClick={() => onSelect(payload)}
                  onKeyDown={(e) => handleKey(e, payload)}
                >
                  <rect
                    x={b.x}
                    y={b.y}
                    width={b.w}
                    height={b.h}
                    rx="3"
                    fill="var(--color-surface)"
                    stroke={boxStroke({ ...b, layerId: layer.id })}
                    strokeWidth={active?.type === 'box' && active.id === b.id ? 1.5 : 1}
                    className="transition-all duration-150 motion-reduce:transition-none"
                  />
                  <text x={cx} y={b.y + b.h / 2 - 4} textAnchor="middle" fontSize={L.vertical ? 14 : 17} fontWeight="600" fill="var(--color-ink)" style={{ fontFamily: 'var(--font-sans)' }}>
                    {b.title}
                  </text>
                  <text x={cx} y={b.y + b.h / 2 + 18} textAnchor="middle" fontSize={L.vertical ? 10.5 : 12} fill="var(--color-ink-dim)" style={{ fontFamily: 'var(--font-sans)' }}>
                    {b.sub}
                  </text>
                  {b.badge && (
                    <Badge
                      x={L.vertical ? b.x + b.w - 6 : b.x + b.w - 8}
                      y={b.y + 5}
                      text={b.badgeShort ?? b.badge}
                      color={b.id === 'pinn' ? 'var(--color-physics)' : 'var(--color-signal)'}
                    />
                  )}
                </g>
              );
            })}
          </g>
        );
      })}

      {/* 데이터 소스 + 연결선 */}
      <g opacity={activeLayerId && activeLayerId !== 'L1' ? 0.35 : 1} className="transition-opacity duration-150 motion-reduce:transition-none">
        <text
          x={L.vertical ? 12 : 16}
          y={L.sources[0].lineY1 + 30}
          fontSize={L.vertical ? 10 : 11.5}
          fill="var(--color-ink-dim)"
          style={{ fontFamily: 'var(--font-mono)' }}
        >
          DATA SOURCES
        </text>
        {L.sources.map((s) => {
          const payload = { type: 'source', id: s.id };
          const isActive = active?.type === 'source' && active.id === s.id;
          return (
            <Fragment key={s.id}>
              <line
                x1={s.cx}
                y1={s.lineY1}
                x2={s.cx}
                y2={s.lineY2}
                stroke={isActive ? 'var(--color-physics)' : 'var(--color-line)'}
                strokeWidth="1.2"
                className="transition-all duration-150 motion-reduce:transition-none"
              />
              {/* 호버 시 데이터 패킷 흐름 (소스 → L1, 위 방향) */}
              {isActive &&
                !reduced &&
                [0, 0.45, 0.9].map((begin) => (
                  <circle key={begin} r="3" fill="var(--color-physics)">
                    <animateMotion
                      dur="1.3s"
                      begin={`${begin}s`}
                      repeatCount="indefinite"
                      path={`M ${s.cx} ${s.lineY2} L ${s.cx} ${s.lineY1}`}
                    />
                  </circle>
                ))}
              <g
                role="button"
                tabIndex={0}
                aria-label={`데이터 소스 ${s.title} — 관련 논문 보기`}
                className="cursor-pointer outline-none"
                onMouseEnter={() => onHover(payload)}
                onMouseLeave={() => onHover(null)}
                onFocus={() => onHover(payload)}
                onBlur={() => onHover(null)}
                onClick={() => onSelect(payload)}
                onKeyDown={(e) => handleKey(e, payload)}
              >
                <circle
                  cx={s.cx}
                  cy={s.cy}
                  r={s.r}
                  fill="var(--color-surface)"
                  stroke={isActive ? 'var(--color-physics)' : 'var(--color-line)'}
                  strokeWidth={isActive ? 1.5 : 1}
                  className="transition-all duration-150 motion-reduce:transition-none"
                />
                <text
                  x={s.cx}
                  y={s.cy + 4}
                  textAnchor="middle"
                  fontSize={L.vertical ? 11 : 13}
                  fill="var(--color-ink)"
                  style={{ fontFamily: 'var(--font-sans)' }}
                >
                  {s.title}
                </text>
              </g>
            </Fragment>
          );
        })}
        {L.ellipsisX && (
          <text x={L.ellipsisX} y={L.sources[0].cy + 5} fontSize="16" fill="var(--color-ink-dim)" aria-hidden="true">
            ···
          </text>
        )}
      </g>
    </svg>
  );
}
