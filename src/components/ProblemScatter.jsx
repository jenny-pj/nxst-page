import { useEffect, useMemo, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * §4.3 / §5-3 — 스크롤 연동 산점도.
 * 뷰포트 진입 시 3단계 순차 재생 (1회):
 *  ① 파란 정상 점군 → ② 주황 비정상 점 소수 → ③ 합성데이터(주황 외곽선) 점들이 비정상 영역을 채움
 * prefers-reduced-motion: 3단계 모두 완료된 정지 프레임.
 */

const W = 480;
const H = 360;
const PAD = 28;

function mulberry32(seed) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/* Box-Muller 가우시안 */
function makeGaussian(rng) {
  return (mx, my, sx, sy) => {
    const u1 = Math.max(rng(), 1e-9);
    const u2 = rng();
    const r = Math.sqrt(-2 * Math.log(u1));
    return { x: mx + r * Math.cos(2 * Math.PI * u2) * sx, y: my + r * Math.sin(2 * Math.PI * u2) * sy };
  };
}

const clamp = (v, lo, hi) => Math.min(Math.max(v, lo), hi);

function buildData() {
  const rng = mulberry32(7);
  const gauss = makeGaussian(rng);

  const normal = []; // 밀집된 정상 점군 (좌하단)
  for (let i = 0; i < 130; i++) {
    const p = gauss(168, 222, 64, 46);
    normal.push({ x: clamp(p.x, PAD + 6, W - PAD - 6), y: clamp(p.y, PAD + 6, H - PAD - 6) });
  }

  const anomaly = []; // 희소한 비정상 실측 (우상단)
  const A_CX = 356;
  const A_CY = 116;
  for (let i = 0; i < 6; i++) {
    const p = gauss(A_CX, A_CY, 42, 30);
    anomaly.push({ x: clamp(p.x, PAD + 8, W - PAD - 8), y: clamp(p.y, PAD + 8, H - PAD - 8) });
  }

  const synthetic = []; // 합성데이터 — 비정상 영역을 채우는 외곽선 점
  for (let i = 0; i < 40; i++) {
    const p = gauss(A_CX, A_CY, 52, 38);
    synthetic.push({ x: clamp(p.x, PAD + 8, W - PAD - 8), y: clamp(p.y, PAD + 8, H - PAD - 8) });
  }

  return { normal, anomaly, synthetic };
}

const LEGEND = [
  { stage: 1, label: '정상 실측', cls: 'bg-physics', dot: 'solid-blue' },
  { stage: 2, label: '비정상 실측 — 희소', cls: 'bg-signal', dot: 'solid-orange' },
  { stage: 3, label: '합성데이터', cls: 'border border-signal', dot: 'outline-orange' },
];

export default function ProblemScatter() {
  const reduced = usePrefersReducedMotion();
  const { normal, anomaly, synthetic } = useMemo(buildData, []);
  const ref = useRef(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (reduced) {
      setStage(3);
      return;
    }
    const el = ref.current;
    if (!el) return;
    let timers = [];
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        setStage(1);
        timers = [setTimeout(() => setStage(2), 1100), setTimeout(() => setStage(3), 2200)];
      },
      { threshold: 0.35 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      timers.forEach(clearTimeout);
    };
  }, [reduced]);

  const dotCls = (visible, extraDelayBase, i, step = 6) =>
    `transition-opacity duration-500 motion-reduce:transition-none ${visible ? 'opacity-100' : 'opacity-0'}`;

  return (
    <figure ref={ref} className="m-0">
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full rounded-sm border border-line bg-surface/50"
        role="img"
        aria-label="정상 데이터는 밀집되어 있지만 비정상 데이터는 희소하며, 합성데이터가 그 영역을 채우는 것을 보여주는 산점도"
      >
        {/* 축 헤어라인 */}
        <line x1={PAD} y1={H - PAD} x2={W - PAD + 8} y2={H - PAD} stroke="var(--color-line)" strokeWidth="1" />
        <line x1={PAD} y1={H - PAD} x2={PAD} y2={PAD - 8} stroke="var(--color-line)" strokeWidth="1" />

        {/* ① 정상 점군 */}
        <g>
          {normal.map((p, i) => (
            <circle
              key={`n${i}`}
              cx={p.x}
              cy={p.y}
              r="2.4"
              fill="var(--color-physics)"
              fillOpacity="0.65"
              className={dotCls(stage >= 1)}
              style={{ transitionDelay: stage >= 1 && !reduced ? `${i * 6}ms` : '0ms' }}
            />
          ))}
        </g>

        {/* ② 비정상 실측 (희소) */}
        <g>
          {anomaly.map((p, i) => (
            <circle
              key={`a${i}`}
              cx={p.x}
              cy={p.y}
              r="3.4"
              fill="var(--color-signal)"
              className={dotCls(stage >= 2)}
              style={{ transitionDelay: stage >= 2 && !reduced ? `${i * 90}ms` : '0ms' }}
            />
          ))}
        </g>

        {/* ③ 합성데이터 — 외곽선 점 */}
        <g>
          {synthetic.map((p, i) => (
            <circle
              key={`s${i}`}
              cx={p.x}
              cy={p.y}
              r="3"
              fill="none"
              stroke="var(--color-signal)"
              strokeWidth="1.3"
              strokeOpacity="0.85"
              className={dotCls(stage >= 3)}
              style={{ transitionDelay: stage >= 3 && !reduced ? `${i * 28}ms` : '0ms' }}
            />
          ))}
        </g>

        {/* 영역 라벨 */}
        <text
          x="168"
          y={H - PAD - 12}
          textAnchor="middle"
          fontSize="11"
          fill="var(--color-physics)"
          style={{ fontFamily: 'var(--font-mono)' }}
          className={dotCls(stage >= 1)}
        >
          NORMAL
        </text>
        <text
          x="356"
          y="52"
          textAnchor="middle"
          fontSize="11"
          fill="var(--color-signal)"
          style={{ fontFamily: 'var(--font-mono)' }}
          className={dotCls(stage >= 2)}
        >
          ANOMALY
        </text>
      </svg>

      <figcaption className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
        {LEGEND.map((l) => (
          <span
            key={l.label}
            className={`flex items-center gap-2 font-mono text-[11px] text-ink-dim transition-opacity duration-500 motion-reduce:transition-none ${
              stage >= l.stage ? 'opacity-100' : 'opacity-0'
            }`}
          >
            {l.dot === 'solid-blue' && <span className="h-2 w-2 rounded-full bg-physics" />}
            {l.dot === 'solid-orange' && <span className="h-2 w-2 rounded-full bg-signal" />}
            {l.dot === 'outline-orange' && <span className="h-2 w-2 rounded-full border border-signal" />}
            {l.label}
          </span>
        ))}
      </figcaption>
    </figure>
  );
}
