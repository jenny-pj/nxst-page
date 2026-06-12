import { useLayoutEffect, useMemo, useRef } from 'react';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion.js';

/**
 * Hero 시그니처 — Denoising 애니메이션 (§5-1).
 * 무작위 노이즈 점들이 공정 시계열 파형(사인파 + 이상 스파이크)으로 수렴.
 * 1회 수렴 후 미세한 idle 리플 + 저강도 포인터 패럴랙스만 유지.
 * prefers-reduced-motion: 수렴된 최종 프레임을 정지 상태로 렌더링.
 */

const W = 1200;
const H = 420;
const N = 150;

/* 스파이크: 위로 솟는 대형 이상 신호 1개 + 아래로 꺼지는 소형 1개.
   x는 모바일(중앙 크롭)·데스크톱 모두에서 텍스트에 가리지 않고 보이는 범위(503~936)로 배치 */
const SPIKES = [
  { x: 640, amp: -95, sigma: 7 },
  { x: 860, amp: 62, sigma: 9 },
];

/* 시드 고정 PRNG — 매 로드마다 동일한 노이즈 배치 (reduced-motion 정지 프레임과 일치) */
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

function signalY(x) {
  let y = 230 - 40 * Math.sin(x / 85) - 12 * Math.sin(x / 33 + 1.7);
  for (const s of SPIKES) {
    y += s.amp * Math.exp(-((x - s.x) ** 2) / (2 * s.sigma * s.sigma));
  }
  return y;
}

function buildPoints() {
  const rng = mulberry32(20260612);
  const pts = [];
  for (let i = 0; i < N; i++) {
    const tx = 10 + (i * (W - 20)) / (N - 1);
    const ty = signalY(tx);
    const anomaly = SPIKES.some((s) => Math.abs(tx - s.x) < 2.5 * s.sigma);
    pts.push({
      tx,
      ty,
      anomaly,
      sx: 30 + rng() * (W - 60), // 노이즈 시작 위치
      sy: 30 + rng() * (H - 60),
      delay: (i / N) * 600 + rng() * 350, // ms — 좌→우 스태거 + 지터
      dur: 1500 + rng() * 500,
      finalOpacity: anomaly ? 0.95 : 0.55,
    });
  }
  return pts;
}

const easeOutCubic = (p) => 1 - (1 - p) ** 3;

export default function HeroDenoise({ className = '' }) {
  const reduced = usePrefersReducedMotion();
  const points = useMemo(buildPoints, []);
  const pathD = useMemo(
    () => points.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.tx.toFixed(1)} ${p.ty.toFixed(1)}`).join(''),
    [points]
  );

  const svgRef = useRef(null);
  const groupRef = useRef(null);
  const pathRef = useRef(null);
  const circleRefs = useRef([]);

  useLayoutEffect(() => {
    if (reduced) return; // JSX 기본 상태가 곧 최종 프레임 — 그대로 정지

    const circles = circleRefs.current;
    const path = pathRef.current;
    const group = groupRef.current;
    const svg = svgRef.current;
    if (!path || !group || !svg) return;

    // 시작 프레임: 흩어진 노이즈
    points.forEach((p, i) => {
      const c = circles[i];
      c.setAttribute('cx', p.sx);
      c.setAttribute('cy', p.sy);
      c.setAttribute('opacity', 0.22);
    });
    path.style.strokeOpacity = 0;
    path.style.transition = 'stroke-opacity 900ms ease';

    const tConverged = Math.max(...points.map((p) => p.delay + p.dur));
    let pathShown = false;
    let visible = true;
    let rafId = 0;
    let t0 = null;

    // 포인터 패럴랙스 목표/현재 오프셋
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onPointerMove = (e) => {
      const r = svg.getBoundingClientRect();
      target.x = ((e.clientX - r.left) / r.width - 0.5) * 14;
      target.y = ((e.clientY - r.top) / r.height - 0.5) * 8;
    };
    const host = svg.parentElement ?? svg;
    host.addEventListener('pointermove', onPointerMove, { passive: true });

    // 화면 밖에서는 프레임 작업 생략
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(svg);

    const tick = (now) => {
      rafId = requestAnimationFrame(tick);
      if (!visible) return;
      if (t0 === null) t0 = now;
      const t = now - t0;

      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const raw = Math.min(Math.max((t - p.delay) / p.dur, 0), 1);
        const e = easeOutCubic(raw);
        const idle = e * 2.5 * Math.sin(now / 900 + p.tx / 70); // 수렴 후 미세 리플
        const c = circles[i];
        c.setAttribute('cx', p.sx + (p.tx - p.sx) * e);
        c.setAttribute('cy', p.sy + (p.ty - p.sy) * e + idle);
        c.setAttribute('opacity', 0.22 + (p.finalOpacity - 0.22) * e);
      }

      if (!pathShown && t > tConverged) {
        pathShown = true;
        path.style.strokeOpacity = 0.35;
      }

      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;
      group.setAttribute('transform', `translate(${cur.x.toFixed(2)} ${cur.y.toFixed(2)})`);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      host.removeEventListener('pointermove', onPointerMove);
      io.disconnect();
    };
  }, [reduced, points]);

  return (
    <svg
      ref={svgRef}
      className={className}
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      role="presentation"
    >
      <g ref={groupRef}>
        <path
          ref={pathRef}
          d={pathD}
          fill="none"
          stroke="var(--color-physics)"
          strokeWidth="1"
          style={{ strokeOpacity: 0.35 }}
        />
        {points.map((p, i) => (
          <circle
            key={i}
            ref={(el) => (circleRefs.current[i] = el)}
            cx={p.tx}
            cy={p.ty}
            r={p.anomaly ? 3 : 2}
            fill={p.anomaly ? 'var(--color-signal)' : 'var(--color-physics)'}
            opacity={p.finalOpacity}
          />
        ))}
      </g>
    </svg>
  );
}
