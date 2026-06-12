/**
 * 사이트 전역 카피 텍스트 (스펙 §4).
 * i18n 대비 상수 분리 — EN 페이지는 작업 범위 외이나 구조상 추후 대응 가능.
 */

export const site = {
  name: 'nextstud.io',
  nameKo: '넥스트스튜디오',
  email: 'jin@nextstud.io',
  phone: '+82 055 320 4132',
  addressKo: '경상남도 김해시 인제로 197, 성산관 904호',
  addressEn: 'Seongsan Hall 904, 197, Inje-ro, Gimhae-si, Gyeongsangnam-do, Republic of Korea',
};

export const nav = [
  { id: 'technology', label: 'Technology' },
  { id: 'research', label: 'Research' },
  { id: 'use-cases', label: 'Use Cases' },
  { id: 'news', label: 'News' },
  { id: 'about', label: 'About' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  eyebrow: 'SYNTHETIC DATA · PHYSICAL AI',
  h1: '현장에 없는 데이터를,\n물리 법칙으로 만든다',
  h1En: 'Physics-Grounded Synthetic Data for Physical AI',
  sub: '제조 현장의 희소한 비정상 데이터를 물리정합 합성데이터로 보완하여,\nPhysical AI가 미경험 상황에서도 신뢰할 수 있게 합니다.',
  cta: '연구 보기 ↓',
  ctaTarget: 'research',
};

export const proofBar = [
  'Berkeley AgentX 2025 — 1st Place (Agent Architecture)',
  'IEEE TNNLS',
  'Neurocomputing',
  'ICRA',
  'IEEE T-ITS',
  'IEEE TII',
  'Information Sciences',
];

export const problem = {
  title: '제조 AI의 데이터 역설',
  titleEn: 'The Data Paradox of Manufacturing AI',
  points: [
    {
      title: '정상 편중',
      body: '실측 제조데이터의 대부분은 정상 가동 데이터. 품질 저하·설비 고장 등 정작 학습이 필요한 비정상 데이터는 희소합니다.',
    },
    {
      title: '수집 불가능성',
      body: '비정상 상황은 발생 빈도가 낮고 조건 예측이 어려워, 충분한 양의 실측 확보가 구조적으로 불가능합니다.',
    },
    {
      title: '오염과 비정합',
      body: '수집된 데이터조차 센서 오작동·누락으로 오염되어 있고, 시계열·제어값·품질결과·경계조건이 연결된 정합 데이터셋 형태가 아닙니다.',
    },
  ],
  closing: '이 간극을 메우는 것이 물리정합 합성데이터입니다.',
};

export const technology = {
  title: 'Physics-Grounded Synthetic Data Stack',
  titleKo: '기술 스택',
  intro: '다이어그램의 모든 박스와 데이터 소스는 실제 논문 실적으로 추적됩니다. 각 항목을 선택하면 근거 논문을 확인할 수 있습니다.',
};

export const research = {
  title: '10년의 연구 궤적',
  titleEn: 'A Decade of Research Toward Synthetic Data',
  intro:
    '비정상 데이터의 희소성은 당사가 10년간 풀어온 문제입니다. 비지도 이상탐지에서 출발해 적대적 생성과 확산모델로, 그리고 실제 산업 현장 적용으로 이어진 연구의 자연스러운 다음 단계가 물리정합 합성데이터입니다.',
  filterAll: '전체',
};

export const useCases = {
  title: '적용 분야',
  titleEn: 'Use Cases',
  items: [
    {
      id: 'fault-diagnosis',
      icon: 'waveform',
      title: '고장진단',
      body: '희소 고장 신호의 물리제약 합성으로 진단 모델 성능 확보 (진동·전류·토크 시계열)',
    },
    {
      id: 'quality-inspection',
      icon: 'lens',
      title: '품질검사',
      body: '정상 이미지 기반 결함 합성으로 비전 검사 모델 학습 (표면 결함, 비파괴검사)',
    },
    {
      id: 'predictive-maintenance',
      icon: 'rul-curve',
      title: '예지보전 (RUL)',
      body: '열화 동역학 반영 합성데이터로 잔여수명 예측 정밀화',
    },
    {
      id: 'process-robot-control',
      icon: 'robot-arm',
      title: '공정·로봇 제어',
      body: '디지털트윈 시뮬레이션 합성데이터로 LAM/PINN 학습 지원',
    },
  ],
};

export const news = {
  title: 'News',
  items: [
    {
      id: 'agentx-2025',
      headline: "GNAIX Team, Berkeley AgentX Competition 'Agent Architecture' 부문 1위",
      date: '2025. 8. 2',
      place: 'San Francisco, US',
      body: 'Berkeley RDI 주최 AgentX – LLM Agents MOOC Competition의 Agent Architecture 부문에서 1위를 수상했습니다. 수상 논문 "Agent-based Autonomous Manufacturing from Planning to Production"은 계획 수립부터 생산까지 제조 전 과정을 자율 수행하는 에이전트 프레임워크를 제안합니다.',
      point: '이 수상은 "제조 자율화"를 향한 당사 비전에 대한 글로벌 검증입니다.',
    },
  ],
};

export const about = {
  headline: '연구에서 현장으로',
  body1:
    'nextstud.io는 KAIST IT융합연구소에서 다수의 중대형 국책과제를 함께 수행해 온 연구진이 설립한 AI 연구기업입니다. 이상탐지·생성모델·데이터 플랫폼 분야에서 축적한 연구를 제조 현장의 합성데이터 기술로 잇고 있습니다.',
  body2:
    '국가 제조거점 경남에 자리해, 자동차·조선·방산 제조벨트의 현장 데이터와 가장 가까운 곳에서 Physical AI를 연구합니다.',
  // 지표 숫자는 자동 집계하지 않고 상수로 유지 — 추후 사용자가 직접 조정 (스펙 §4.8)
  metrics: [
    { value: 20, suffix: '+편', label: 'SCI(E)급 게재' },
    { value: 1, prefix: '', suffix: '위', label: 'Berkeley AgentX 2025' },
    { value: null, text: '국책과제', suffix: '', label: '공동수행 경험' },
  ],
};

export const contact = {
  title: 'Contact',
  tagline: '경남 제조벨트의 심장부에서, Physical AI를 연구합니다.',
  // 구글맵 임베드 URL — 기존 사이트 임베드 재사용 가능 시 교체
  mapEmbedUrl:
    'https://www.google.com/maps?q=197+Inje-ro,+Gimhae-si,+Gyeongsangnam-do,+Republic+of+Korea&output=embed',
};

export const footer = {
  copyright: '© nextstud.io. All Rights Reserved.',
};
