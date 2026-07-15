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
  { id: 'contact', label: 'Contact' },
];

/* ── HERO ──────────────────────────────────────────────────────── */

export const hero = {
  h1: 'Real-world Scarcity, Synthetic Abundance.\nPhysical AI의 데이터 병목을 합성데이터로 해결합니다',
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
    'NEXTSTUDIO는 물리 시뮬레이션과 생성형 AI를 결합해,\n실제 현장에서 수집이 불가능하거나 극히 희소한 산업 데이터(결함, 이상 상황, 극한 조건)를\n물리적으로 타당한 합성데이터로 구현합니다\n\n데이터 수집 인프라부터 합성·검증·공급까지,\nPhysical AI를 위한 데이터 파이프라인 전체를 제공합니다',
};

/* ── SECTION · WHY INDUSTRIAL DATA ─────────────────────────────── */

export const whyData = {
  eyebrow: '현실이 데이터를 충분히 내어주지 않을 때, Physical AI는 무엇으로 학습하는가',
  title: '현실을 반영한 산업 데이터가\nPhysical AI의 인식과 판단을 만듭니다\n우리는 그 데이터를 \'생성\'하는 방법을 연구합니다',
  support:
    'Physical AI의 성능은 데이터의 양이 아니라, 데이터가 물리적 현실을 얼마나 충실히 담고 있는지가 결정합니다\nNEXTSTUDIO는 물리 제약 기반 생성 모델과 정량 검증 방법론을 통해,\n현장에서 수집할 수 없는 희소 데이터를 과학적으로 합성하는 방법을 연구합니다',
  // Flow의 중심은 AI가 아니라 산업 데이터 — accent: true 노드만 강조
  // 2026-07-15 Figma 동기화: 산업 환경 → (산업 데이터 / 합성 데이터) 분기 → AI 학습 합류 → 추론 및 의사결정 → Physical AI
  flow: [
    { ko: '산업 환경', icon: 'industry' },
    {
      branch: [
        { ko: '산업 데이터', icon: 'database', accent: true, subtitle: 'Real-World Data Collection' },
        { ko: '합성 데이터', icon: 'network', accent: true, subtitle: 'Physics-Constrained Synthesis' },
      ],
    },
    { ko: 'AI 학습', icon: 'brain', subtitle: '합성데이터 기반 도메인 커버리지 확대 및 모델 성능 개선' },
    { ko: '추론 및 의사결정', icon: 'chart' },
    { ko: 'Physical AI', icon: 'robot' },
  ],
};

/* ── SECTION · RESEARCH AREAS ──────────────────────────────────── */

export const researchAreas = {
  eyebrow: 'Research Areas',
  title: 'Physics-grounded Data & Intelligence',
  support:
    '정밀하게 구조화된 실데이터 위에서 물리 정합 생성 모델을 연구하고,\n검증된 합성 데이터로 Physical AI의 학습을 완성합니다',
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
  eyebrow: 'Research Framework',
  title: '실측에서 합성으로, 검증에서 적용까지\n하나의 연구 체계로 Physical AI를 구현합니다',
  // 파이프라인 크럼 — 슬랩 호버 시 해당 stage가 점등
  stages: [
    { key: 'acq', label: 'ACQUISITION' },
    { key: 'syn', label: 'SYNTHESIS' },
    { key: 'val', label: 'VALIDATION' },
    { key: 'dep', label: 'DEPLOYMENT' },
  ],
  // L03~L05 오른쪽 물리 검증 레일
  railLabel: 'PHYSICS VALIDATION — 물리 검증',
  railNote: 'Physics validation은 L03에서 L05까지 전 단계에 적용됩니다',
  layers: [
    {
      no: 'L01',
      role: 'DATA ACQUISITION',
      stage: 'acq',
      name: 'Multimodal Industrial Data',
      caption: '산업 현장의 다중 모달 데이터 수집',
      items: ['Vision & Video', 'IoT & Sensor', 'Process & Quality Records'],
      detailTag: 'DETAIL // 수집 체계',
      detail:
        '비전·영상, IoT 시계열, 공정·품질 이력을 단일 파이프라인으로 수집합니다. 엣지 수집기와 스트리밍 적재 구조를 연구하며, 이 단계의 실측 데이터가 물리 상호작용 합성의 원료가 됩니다.',
      flow: '구조화된 실측 데이터',
    },
    {
      no: 'L02',
      role: 'TRUST FOUNDATION',
      stage: 'acq',
      name: 'Trusted Data Infrastructure',
      caption: '표준 기반 상호운용성과 데이터 신뢰 체계',
      items: ['Standardization & Interop', 'Privacy & Consent', 'Data Quality'],
      detailTag: 'DETAIL // 신뢰 기반',
      detail:
        'AAS 등 산업 표준 기반의 시맨틱 상호운용성, 접근 권한·동의 관리, 결측·이상 정제와 품질 지표화를 연구합니다. 신뢰할 수 있는 합성은 실데이터의 정밀한 구조화에서 시작됩니다.',
      flow: '학습 가능한 정제 데이터',
    },
    {
      no: 'L03',
      role: 'GENERATIVE CORE',
      stage: 'syn',
      name: 'Physics-Grounded Generative Core',
      caption: '물리 상호작용 합성 데이터 생성 — 원인 변수까지 포함한 인과적 합성',
      badge: 'CORE',
      core: true,
      rail: true,
      items: ['Physics-informed Learning', 'Physics-aligned Transformer', 'Physics-informed Diffusion'],
      detailTag: 'DETAIL // 물리 상호작용 합성',
      detail:
        '장면·센서값의 외형적 다양성을 넘어, 공정 조건·물리 상태 변수·결과 변수를 함께 생성합니다. 물리 제약 학습을 기반으로 트랜스포머(멀티모달 시계열)와 디퓨전 모델(테이블 데이터)이 합성을 구현하고, 에너지 보존·접촉 조건·열전달 경계조건 등 물리 검증 함수로 사후 검증합니다.',
      flow: '검증된 합성 데이터',
    },
    {
      no: 'L04',
      role: 'INTELLIGENCE',
      stage: 'val',
      name: 'Perception & Predictive Intelligence',
      caption: '합성·실측 데이터로 학습되는 인식·예측 지능',
      rail: true,
      items: ['Anomaly Detection', 'Spatiotemporal Graph', 'Predictive Modeling'],
      detailTag: 'DETAIL // 지능 학습',
      detail:
        '합성과 실측을 혼합 학습해 희소한 이상 상황에 대한 대응력을 확보합니다. 이상 탐지, 시공간 그래프, 예측 모델링을 통해 물리적으로 타당한 인식·판단을 수행하는 지능을 연구합니다.',
      flow: '학습된 지능',
    },
    {
      no: 'L05',
      role: 'DEPLOYMENT',
      stage: 'dep',
      name: 'Industrial Physics AI',
      caption: '산업 현장에 배치되는 Physical AI 응용',
      badge: 'OUTCOME',
      terminal: true,
      rail: true,
      items: ['Inspection & Safety', 'Process Optimization', 'Mobility & Energy'],
      detailTag: 'DETAIL // 현장 적용',
      detail:
        '검사·안전, 공정 최적화, 모빌리티·에너지 영역에서 도메인 파트너와 함께 실증합니다. 연구 체계의 산출물이 현장의 판단과 행동으로 이어지는 단계입니다.',
    },
  ],
};

/* ── SECTION · CORE EXPERTISE ──────────────────────────────────── */

export const expertise = {
  eyebrow: 'Core Expertise',
  title: '데이터를 만드는 역량에서,\n현장에 배치하는 역량까지',
  support: '산업 데이터를 중심으로 연구 역량을 융합합니다\n모든 역량은 연구 파이프라인 L01-L05에 매핑됩니다',
  // 역량 그룹 카드 — 연구 파이프라인 L01~L05 매핑. badge: 'CORE' = 핵심 그룹
  groups: [
    {
      layers: [1, 2, 3],
      badge: 'CORE',
      name: 'Data Engineering & Synthesis',
      cap: '물리 상호작용 합성 데이터를 만들고 검증하는 역량',
      items: [
        {
          name: 'Physical-interaction Synthetic Data Generation',
          detail:
            '장면·센서값을 넘어 공정 조건, 물리 상태 변수, 품질 결과를 함께 생성하는 인과적 합성. 결과와 원인이 연결된 학습 데이터를 만듭니다.',
        },
        {
          name: 'Physics Simulation & Validation Metrics',
          detail: '에너지 보존, 접촉 조건, 열전달 경계조건 등 물리 검증 함수와 합성 품질의 정량 지표를 설계합니다.',
        },
        {
          name: 'Multimodal Data Infrastructure',
          detail: '비전·센서·공정 이력 등 이기종 데이터의 수집, 표준화, 자산화 파이프라인을 구축합니다.',
        },
        {
          name: 'Data Quality Engineering',
          detail: '결측·이상 정제, 라벨 일관성 관리, 학습 기여도 평가로 데이터의 신뢰성을 정량 관리합니다.',
        },
      ],
    },
    {
      layers: [3],
      name: 'Foundation & Generative Models',
      cap: '합성을 구현하는 물리 정합 생성 모델 역량',
      items: [
        {
          name: 'Physics-informed Generative Models',
          detail: '물리 제약 트랜스포머(멀티모달 시계열)와 디퓨전 모델(테이블 데이터)로 물리 정합 데이터를 생성합니다.',
        },
        {
          name: 'Industrial Foundation Model',
          detail: '산업 도메인 데이터로 특화된 파운데이션 모델을 구축하고 현장 과업에 적응시킵니다.',
        },
        {
          name: 'Multi-modal LLM',
          detail: '텍스트·비전·센서 신호를 통합 이해하는 멀티모달 언어 모델을 연구합니다.',
        },
        {
          name: 'Vision-Language-Action Model',
          detail: '인식과 언어 이해를 물리적 행동으로 연결하는 VLA 모델로 Physical AI의 판단-행동 고리를 연구합니다.',
        },
      ],
    },
    {
      layers: [4],
      name: 'Perception & Prediction',
      cap: '합성·실측 데이터로 학습되는 인식·예측 역량',
      items: [
        {
          name: 'Industrial Vision Inspection',
          detail: '결함 검출과 품질 판정을 위한 비전 검사. 영상 분석과 이미지 이해 역량을 산업 검사 문제로 통합했습니다.',
        },
        {
          name: 'Time-series Forecasting',
          detail: '공정·설비 시계열의 미래 상태를 예측해 운전 조건 최적화와 사전 대응을 지원합니다.',
        },
        {
          name: 'Anomaly Detection',
          detail: '희소한 이상 상황을 탐지하고 조기 경보하는 모델. 합성 데이터로 이상 사례의 부족을 보완합니다.',
        },
      ],
    },
    {
      layers: [5],
      name: 'Optimization & Deployment',
      cap: '현장에 배치되는 경량화·운영 역량',
      items: [
        {
          name: 'Edge AI',
          detail: '현장 엣지 디바이스에서 동작하는 추론 최적화. 네트워크 단절 환경에서도 판단이 이어지도록 합니다.',
        },
        {
          name: 'Model Optimization',
          detail: '경량화·양자화·지연시간 최적화로 연구 모델을 현장 요구 사양에 맞춥니다.',
        },
        {
          name: 'On-site AI Deployment',
          detail: '현장 배치, 모니터링, 재학습을 포함한 AI 수명주기 운영. 연구 산출물이 현장 성과로 이어지는 마지막 단계입니다.',
        },
      ],
    },
  ],
  // 연구 성과 하이라이트 — Figma 155:1574: 타이틀 + 지표 3종 + 논문 리스트 + 로고 스트립
  research: {
    title: '글로벌 연구 협력을 통해\n신뢰할 수 있는 연구 성과를 만들어 갑니다',
    stats: [
      { value: '12+', label: 'Peer-reviewed Publications' },
      { value: '20+', label: 'Global Research Partners' },
      { value: '10+', label: 'Years of Research Experience' },
    ],
    publicationsTitle: '주요 논문 및 협력 기관',
    publications: [
      {
        year: '2026',
        venue: 'Neurocomputing',
        title: 'Normality-calibrated autoencoder for unsupervised anomaly detection on data contamination',
        partners: ['KAIST', 'Harvard Medical School', 'Harvard University'],
      },
      {
        year: '2026',
        venue: 'The International Journal of Advanced Manufacturing Technology',
        title: 'Resource-Efficient Adaptation of Large Vision–Language Models for Multimodal Defect Inspection in LNG Tank Manufacturing',
        partners: ['INJE University', 'Kyungnam University'],
      },
      {
        year: '2026',
        venue: 'IEEE Access',
        title: 'Beyond Simple Character Recognition: A Comparative Study of Vision-Language Models and Dedicated OCR Systems in Edge Cases',
        partners: ['INJE University', 'Kyungnam University', 'Sortech'],
      },
      {
        year: '2025',
        venue: "Proceedings of ICAIF '25",
        title: 'From News to Returns: A Granger-Causal Hypergraph Transformer on the Sphere',
        partners: ['University of Cambridge', 'University of Kent'],
      },
      {
        year: '2025',
        venue: 'ACML (PMLR 304)',
        title: 'MagicMask: A Fast and High-fidelity Face Swapping Method Robust to Face Pose',
        partners: [
          'University of Cambridge',
          'Imperial College London',
          "King's College London",
          'Inje University',
          'University of Kent',
        ],
      },
      {
        year: '2025',
        venue: 'ACM Web Conference 2025 (Companion)',
        title: 'Advanced Hypergraph Mining for Web Applications Using Sphere Neural Networks',
        partners: ['University of Cambridge', 'University of Oxford', 'University of Kent', 'Durham University'],
      },
      {
        year: '2024',
        venue: 'IEEE ICRA 2024',
        title:
          'Multi-class Road Defect Detection and Segmentation using Spatial and Channel-wise Attention for Autonomous Road Repairing',
        partners: [
          'University of Cambridge',
          "King's College London",
          'University of Liverpool',
          'Robotiz3D Ltd.',
        ],
      },
      {
        year: '2024',
        venue: 'Pattern Recognition Letters',
        title: 'Denoising diffusion model with adversarial learning for unsupervised anomaly detection on brain MRI images',
        partners: ['KAIST', 'Gwangju Institute of Science and Technology (GIST)', 'Inje University'],
      },
      {
        year: '2024',
        venue: 'IEEE Transactions on Intelligent Transportation Systems',
        title: 'Road surface defect detection—From image-based to non-image-based: A survey',
        partners: ['University of Cambridge', "King's College London", 'Robotiz3D Ltd.'],
      },
      {
        year: '2024',
        venue: 'NeurIPS 2024 Workshop on Behavioral Machine Learning',
        title: 'Monitoring Behavioral Changes Using Spatiotemporal Graphs: A Case Study on the StudentLife Dataset',
        partners: ['University of Cambridge', 'University of Kent', 'Durham University'],
      },
      {
        year: '2024',
        venue: 'IEEE Transactions on Neural Networks and Learning Systems',
        title: 'Weakly supervised contrastive learning for unsupervised vehicle re-identification',
        partners: ['KAIST', 'Harvard University'],
      },
      {
        year: '2024',
        venue: 'IEEE Transactions on Neural Networks and Learning Systems',
        title: 'An iterative method for unsupervised robust anomaly detection under data contamination',
        partners: ['KAIST', "King's College London", 'Harvard University', 'POSTECH', 'Yonsei University'],
      },
    ],
    caption: '국내외 유수 연구기관과의 지속적인 협력을 통해 연구의 깊이와 영역을 확장하고 있습니다',
  },
};

/* ── SECTION · RESEARCH PRINCIPLES ─────────────────────────────── */

export const principles = {
  eyebrow: 'Research Principles',
  title: '물리 세계와 산업 현장을 이해하는\n지속 가능한 고지능 기술을 연구합니다',
  // Figma 27:321 — 화이트 카드(r16) 상단 2행 타이틀 + 하단 라인 일러스트
  // hover 시 액센트 틴트 워시 + 설명(desc) 페이드인. core: true = 핵심 원칙 배지 표시
  // subtitle: 카드에 항상 노출되는 한 줄 선언, desc: hover 시 펼쳐지는 상세 설명
  items: [
    {
      name: 'Industrial\nFirst',
      illo: 'industrial-first',
      subtitle: '연구 질문은 논문이 아니라 산업 현장에서 나옵니다',
      desc: '현장에서 정의되지 않은 문제는 연구 과제로 채택하지 않습니다.\n모든 연구는 실제 공정·설비·품질 문제에서 출발하고, 그 현장으로 돌아가 끝납니다.',
    },
    {
      name: 'Physics\nGrounded',
      tag: 'CORE PRINCIPLE',
      core: true,
      illo: 'research-driven',
      subtitle: '물리 법칙에 정합하지 않는 데이터는 학습 데이터가 아닙니다',
      desc: '모든 생성 결과는 지배 방정식과 경계조건의 제약 안에서 만들어집니다.\n그럴듯한 이미지가 아니라 물리적으로 성립하는 데이터를 만드는 것이 우리의 기준입니다.',
    },
    {
      name: 'Data\nCentric',
      illo: 'data-centric',
      subtitle: 'Physical AI의 성능은 모델이 아니라 데이터가 결정합니다',
      desc: '결과값만이 아니라 결과가 발생한 물리적 원인 변수(공정 조건, 물리 상태, 품질 결과)까지 데이터에 담습니다.\n인과가 연결된 데이터만이 판단할 수 있는 지능을 만듭니다.',
    },
    {
      name: 'Validated,\nNot Assumed',
      illo: 'real-world-validation',
      subtitle: '검증되지 않은 합성 데이터는 공급하지 않습니다',
      desc: '에너지 보존, 접촉 조건, 열전달 경계조건 기반의 물리 검증 함수를 통과한 데이터만 학습에 사용합니다.\n최종 검증은 시뮬레이션이 아니라 현장에서 완결합니다.',
    },
    {
      name: 'Research to\nDeployment',
      illo: 'engineering-oriented',
      subtitle: '배치되지 않은 연구는 미완성입니다',
      desc: '논문의 엄밀함으로 시작해, 현장의 제약 조건(엣지 환경, 지연시간, 운영 안정성)에서 끝냅니다.\n연구의 엄밀함과 엔지니어링의 실용성은 선택이 아니라 순서입니다.',
    },
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
  topics: ['공동연구 협력', '정부 R&D 협력', '기술이전 문의', '데이터 구축·활용 문의', '기타'],
  submit: '보내기',
  submitting: '전송 중…',
  successTitle: '문의가 접수되었습니다',
  successSub: '남겨주신 내용을 확인한 뒤\n입력하신 이메일로 회신드리겠습니다.',
  close: '닫기',
  error: '전송에 실패했습니다. 잠시 후 다시 시도해주세요.',
};
