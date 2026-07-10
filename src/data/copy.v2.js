/**
 * 카피 V2 — 2026-07-07 정리안. 타이틀은 한 호흡, 핵심 설명은 보조문으로 이관.
 * 변경되는 키만 재정의하고, 다이어그램 데이터·공통 텍스트는 v1을 그대로 재사용.
 * 확정 시 copy.js로 병합하고 v1/선택기 제거 예정.
 */

import * as v1 from './copy.v1.js';

/* 변경 없는 export는 v1 그대로 — hero(h1·선언 배너)는 v1 유지 결정 (2026-07-08) */
export { site, nav, hero, footer, contactForm } from './copy.v1.js';

/* ── WHY INDUSTRIAL DATA ── */
export const whyData = {
  ...v1.whyData,
  title: '현실을 반영한 산업 데이터가\nPhysical AI의 인식과 판단을 만듭니다',
  support:
    'Physical AI의 성능은 산업 데이터를 얼마나 신뢰성 있게\n확보하고 활용하는지에 따라 결정됩니다.',
};

/* ── RESEARCH AREAS ── */
export const researchAreas = {
  ...v1.researchAreas,
  title: '산업 데이터를 중심으로 연구가 연결될 때\n신뢰할 수 있는 Physical AI가 구현됩니다',
};

/* ── RESEARCH FRAMEWORK ── */
export const framework = {
  ...v1.framework,
  title: '데이터 확보부터 산업 적용까지,\n하나의 연구 체계로 Physical AI를 구현합니다',
};

/* ── CORE EXPERTISE ── */
export const expertise = {
  ...v1.expertise,
  title: '산업 데이터를 중심으로\n연구 역량을 융합합니다',
};

/* ── RESEARCH PRINCIPLES ── */
export const principles = {
  ...v1.principles,
  title: '새로운 기술보다,\n산업 현장에서 지속 가능한 기술을 연구합니다',
};

/* ── COLLABORATION ── */
export const collaboration = {
  ...v1.collaboration,
  title: '정부·산업계·학계와 함께\n현장에서 활용되는 기술을 연구합니다',
};
