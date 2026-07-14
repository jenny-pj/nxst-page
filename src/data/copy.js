/**
 * 사이트 전역 카피 텍스트 — Figma 시안(Desktop - 1) 기준.
 * 2026-07-10 카피 v2 확정 병합: 타이틀은 한 호흡, 핵심 설명은 보조문으로 이관.
 * (히어로 h1·선언 배너는 v1 원문 유지 결정 — 2026-07-08)
 * 각 섹션 eyebrow는 질문, 타이틀은 그 답이 되는 구조.
 */

export const site = {
  name: 'NEXTSTUDIO',
  nameKo: '넥스트스튜디오',
  tagline: 'Industrial Data for Physical AI',
  email: 'jin@nextstud.io',
  phone: '+82 055 320 4132',
  addressKo: '경상남도 김해시 인제로 197, 성산관 904호',
  addressEn: 'Seongsan Hall 904, 197 Inje-ro, Gimhae-si, Gyeongsangnam-do, Republic of Korea',
};

export const nav = [
  { id: 'research', label: 'Research' },
  { id: 'framework', label: 'Framework' },
  { id: 'expertise', label: 'Core Expertise' },
  { id: 'principles', label: 'Principles' },
  { id: 'collaboration', label: 'Collaboration' },
  { id: 'contact', label: 'Contact' },
];

/* ── HERO ──────────────────────────────────────────────────────── */

export const hero = {
  h1: 'Physical AI는\n산업데이터를 이해하는 것에서\n시작됩니다',
  // 키워드 마퀴 — 연구 정체성을 흐르는 스트립으로
  keywords: [
    'Industrial Data Infrastructure',
    'Synthetic Data',
    'Physical AI',
    'World Models',
    'Embodied Intelligence',
    'Physics-informed AI',
    'Simulation & Digital Twin',
    'Intelligent Agents',
  ],
  banner:
    '우리는 산업 데이터를 연구합니다.\n\n산업 데이터 인프라와 합성데이터 기술을 기반으로,\n\nPhysical AI가 산업 현장을 이해하고 활용할 수 있는\n데이터 기반 기술을 만들어갑니다.',
};

/* ── SECTION · WHY INDUSTRIAL DATA ─────────────────────────────── */

export const whyData = {
  eyebrow: 'Physical AI는 왜 산업 데이터를 필요로 하는가',
  title: '현실을 반영한 산업 데이터가\nPhysical AI의 인식과 판단을 만듭니다',
  support:
    'Physical AI의 성능은 산업 데이터를 얼마나 신뢰성 있게\n확보하고 활용하는지에 따라 결정됩니다.',
  // Flow의 중심은 AI가 아니라 산업 데이터 — accent: true 노드만 강조
  flow: [
    { ko: '산업 환경', icon: 'industry' },
    { ko: '산업 데이터', icon: 'database', accent: true },
    { ko: 'AI 학습', icon: 'brain' },
    { ko: '추론 및 의사결정', icon: 'chart' },
    { ko: 'Physical AI', icon: 'robot' },
  ],
};

/* ── SECTION · RESEARCH AREAS ──────────────────────────────────── */

export const researchAreas = {
  eyebrow: '우리는 무엇을 연구하는가',
  title: 'Generative Physical AI for Industries',
  hub: 'Industrial\nData',
  // pos: 1320×700 다이어그램 캔버스 기준 좌표(px) — Figma 배치 그대로
  domains: [
    { name: '산업 데이터 인프라', items: ['산업 데이터 수집 및 구조화', '데이터 자산화 기반 구축'], pos: { x: 510, y: 36, center: true } },
    { name: '합성 데이터', items: ['물리 정합된 산업 데이터 생성', '단일&다중 모달리티 데이터 품질 고도화'], pos: { x: 881, y: 142 } },
    { name: 'Intelligent Agents', items: ['AI 기반 이상 탐지 및 대응 Agent', 'AI 기반 공정 최적화'], pos: { x: 158, y: 158 } },
    { name: 'Physics-informed AI', items: ['물리 정합 AI 모델 구축', '산업 도메인 지식 반영'], pos: { x: 922, y: 339 } },
    { name: 'Embodied Intelligence', items: ['Physical AI 지능 구조', '현실 환경과의 상호작용'], pos: { x: 81, y: 365 } },
    { name: 'Simulation & Digital Twin', items: ['산업 환경 디지털 재현', 'AI 학습·검증 환경 구축'], pos: { x: 743, y: 526 } },
    { name: 'World Models', items: ['산업 환경 이해 및 예측', '환경 모델링 기술'], pos: { x: 331, y: 546 } },
  ],
};

/* ── SECTION · RESEARCH FRAMEWORK ──────────────────────────────── */

export const framework = {
  eyebrow: '우리는 어떻게 연구하는가',
  title: '데이터 확보부터 산업 적용까지,\n하나의 연구 체계로 Physical AI를 구현합니다',
  layers: [
    { no: 'L01', name: 'Multimodal Industrial Data', items: ['Vision & Video', 'IoT & Sensor', 'Behavioral Data'], base: true },
    { no: 'L02', name: 'Trusted Data Ecosystem', items: ['MyData & Commons', 'Privacy & Consent', 'Data Quality'] },
    { no: 'L03', name: 'Robust Learning Core', items: ['Self-Supervised Learning', 'Domain Adaptation', 'Generative Models'] },
    { no: 'L04', name: 'Perception & Predictive Intelligence', items: ['Anomaly Detection', 'Spatiotemporal Graph', 'Predictive Modeling'] },
    { no: 'L05', name: 'Industrial Physics AI', items: ['Inspection & Safety', 'Security & Insider Risk', 'Mobility & Energy'], terminal: true },
  ],
};

/* ── SECTION · CORE EXPERTISE ──────────────────────────────────── */

export const expertise = {
  eyebrow: '핵심 연구 역량',
  title: '산업 데이터를 중심으로\n연구 역량을 융합합니다',
  clusters: [
    { name: 'AI Foundation', icon: 'brain', items: ['Multi-modal LLM', 'Industrial Foundation Model', 'Vision-language-action Model'] },
    { name: 'Industrial Intelligence', icon: 'industry', items: ['Industrial Inspection System', 'Generative model for Industries', 'Time-series forecasting'] },
    { name: 'Physical Intelligence', icon: 'robot', items: ['Physics-informed AI', 'World Models', 'Embodied Intelligence'] },
    { name: 'Computer Vision', icon: 'eye', items: ['Vision AI', 'Video Analytics', 'Image Understanding'] },
    { name: 'AI Optimization', icon: 'bolt', items: ['Edge AI', 'Model Optimization', 'AI Deployment'] },
  ],
};

/* ── SECTION · RESEARCH PRINCIPLES ─────────────────────────────── */

export const principles = {
  eyebrow: '연구 철학',
  title: '물리 세계와 산업 현장을 이해하는\n지속 가능한 고지능 기술을 연구합니다',
  // Figma 27:321 — 화이트 카드(r16) 상단 2행 타이틀 + 하단 라인 일러스트
  // hover 시 액센트 틴트 워시 + 설명(desc) 페이드인
  items: [
    { name: 'Industrial\nFirst', illo: 'industrial-first', desc: '산업 현장의 문제에서 연구를 시작합니다.' },
    { name: 'Data\nCentric', illo: 'data-centric', desc: '산업 데이터를 연구의 중심에 둡니다.' },
    { name: 'Research\nDriven', illo: 'research-driven', desc: '연구의 본질을 기반으로 기술을 개발합니다.' },
    { name: 'Engineering\nOriented', illo: 'engineering-oriented', desc: '실제 적용 가능한 기술 구현을 지향합니다.' },
    { name: 'Real-world\nValidation', illo: 'real-world-validation', desc: '현실 환경에서 검증 가능한 AI를 연구합니다.' },
  ],
};

/* ── SECTION · COLLABORATION ───────────────────────────────────── */

export const collaboration = {
  eyebrow: 'Collaboration',
  title: '정부·산업계·학계와 함께\n현장에서 활용되는 기술을 연구합니다',
  // Figma 79:268 — 중앙 로고 허브 + 4개 위성 원(아이콘) 방사형 배치
  partners: [
    { name: 'Government R&D', icon: 'landmark', side: 'left', items: ['국가 전략기술 연구개발', '대형 국가R&D 수행'] },
    { name: 'Industry', icon: 'industry', side: 'left', items: ['산업 현장 공동 연구', '실증 기반 기술 개발'] },
    { name: 'Academia', icon: 'academia', side: 'right', items: ['산학 공동 연구', '기술 검증 및 연구 협력'] },
    { name: 'Technology Transfer', icon: 'transfer', side: 'right', items: ['연구성과 확산', '산업 적용 지원'] },
  ],
};

/* ── FOOTER ────────────────────────────────────────────────────── */

export const footer = {
  // Figma 81:407 — 다크 배너: 헤드라인 + 서브카피 + Contact Us 버튼 + 로고/네비 행
  headline: '함께, 산업의 미래를 연구합니다',
  sub: 'NEXTSTUDIO는 산업 데이터를 기반으로\nPhysical AI의 새로운 가능성을 연구합니다.',
  cta: 'Contact Us',
  copyright: '© 2026 nextstud.io. All rights reserved',
};

/* ── CONTACT FORM (모달) ───────────────────────────────────────── */

export const contactForm = {
  title: 'Contact Us',
  sub: '협력·문의 내용을 남겨주시면 확인 후 회신드리겠습니다.',
  labels: {
    name: '이름',
    email: '이메일',
    organization: '소속 (기관/기업)',
    topic: '문의 유형',
    message: '문의 내용',
  },
  placeholders: {
    name: '홍길동',
    email: 'name@example.com',
    organization: '소속 기관 또는 기업명',
    topic: '문의 유형을 선택해주세요',
    message: '협력 또는 문의하고 싶은 내용을 자유롭게 적어주세요.',
  },
  // Collaboration 섹션의 협력 축과 호응하는 유형 구성
  topics: ['공동연구 협력', '정부 R&D 협력', '기술이전 문의', '데이터 구축·활용 문의', '기타'],
  submit: '보내기',
  submitting: '전송 중…',
  successTitle: '문의가 접수되었습니다',
  successSub: '남겨주신 내용을 확인한 뒤\n입력하신 이메일로 회신드리겠습니다.',
  close: '닫기',
  error: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
};
