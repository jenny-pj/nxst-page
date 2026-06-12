/**
 * 기술 스택 다이어그램 구조 데이터 (스펙 §3).
 * 렌더링(SVG 컴포넌트)과 분리 — 추후 구조가 바뀌면 이 파일만 교체한다.
 * paperIds 는 publications.js 의 id 와 1:1 매핑 (모든 박스가 실적으로 추적되는 것이 핵심 장치).
 */

export const techStack = {
  layers: [
    {
      id: 'L3',
      name: 'CAPABILITY',
      sub: 'AI 역량·응용',
      description:
        'LLM·VLM, 자율제조 에이전트(GNAIX), 오염-강건 이상탐지, 데이터 라벨링까지 — 합성데이터 위에서 작동하는 AI 역량입니다.',
      boxes: [
        {
          id: 'llm-vlm',
          title: 'LLM · VLM',
          sub: '파운데이션 모델 활용',
          description: '대규모 언어·비전 모델을 제조 도메인 과업에 활용하는 응용 역량.',
          paperIds: [],
        },
        {
          id: 'gnaix-agent',
          title: 'GNAIX Agent',
          sub: '자율제조 에이전트',
          description:
            '계획 수립부터 생산까지 제조 전 과정을 자율 수행하는 에이전트 아키텍처. Berkeley AgentX 2025 Agent Architecture 부문 1위 수상 기술.',
          paperIds: [],
          badge: 'Berkeley AgentX 2025 · 1st Place',
          badgeShort: 'AgentX 2025 · 1st', // 박스 내 표기용 (전체 문구는 패널에)
          newsLink: true,
        },
        {
          id: 'anomaly-detection',
          title: 'AD (이상탐지)',
          sub: '오염-강건·비지도',
          description: '오염된 데이터 환경에서도 작동하는 비지도·강건 이상탐지 — 10년 연구의 출발점.',
          paperIds: ['P-A1', 'P-A5', 'P-A6', 'P-B2', 'P-B3'],
        },
        {
          id: 'labeling-curation',
          title: '데이터 라벨링',
          sub: '큐레이션 등',
          description: '약지도·대조학습 기반 라벨 효율화 — 최소 라벨로 데이터셋을 구축·정제하는 역량.',
          paperIds: ['P-D2', 'P-D3'],
        },
      ],
    },
    {
      id: 'L2',
      name: 'MODEL CORE',
      sub: '물리 × 생성',
      description:
        '물리법칙을 내재화한 PINN과 GAN·Diffusion 생성모델의 결합 — 물리에 정합된 합성데이터를 만드는 엔진입니다.',
      boxes: [
        {
          id: 'pinn',
          title: 'PINN',
          sub: '물리정보신경망',
          description:
            '물리법칙(지배방정식·경계조건)을 신경망에 내재화하여 합성데이터의 물리정합성을 보장하는 핵심 기술.',
          paperIds: [],
          badge: 'LAM 사업 핵심기술',
        },
        {
          id: 'gan-diffusion',
          title: 'GAN · Diffusion + ···',
          sub: '생성모델 기반 합성데이터 생성',
          description:
            '적대적 생성에서 확산모델로 이어진 생성모델 연구 — 이상 상황을 예측·생성하는 패러다임이 합성데이터 생성 기술의 직접적 토대.',
          paperIds: ['P-B1', 'P-B2', 'P-B3', 'P-B4'],
        },
      ],
    },
    {
      id: 'L1',
      name: 'DATA SPACE',
      sub: '융합데이터 기반',
      description:
        '발전설비·중장비·CCTV·ERP — 이기종 현장 데이터를 소유권과 보안이 보장되는 Data Space로 수집·정제·통합합니다.',
      boxes: [
        {
          id: 'data-space',
          title: '제조데이터 Data Space + 데이터 수집 / 정제',
          titleShort: '제조데이터 Data Space', // 모바일 세로 리플로우용
          subShort: '데이터 수집·정제 / 소유권·보안 보장',
          sub: '상호운용·소유권·보안이 보장되는 융합데이터 기반',
          description:
            '이기종 현장 소스로부터 제조데이터를 수집·정제하고, 상호운용성과 소유권·보안이 보장되는 Data Space로 통합. (Data Space는 유럽 Manufacturing-X/Gaia-X 계열 표준 용어)',
          paperIds: ['P-E1', 'P-E2', 'P-E3', 'P-E4', 'P-E5', 'P-E6'],
        },
      ],
    },
  ],
  sources: [
    {
      id: 'src-power',
      title: '발전설비',
      description: '발전설비 터빈 블레이드 실측 데이터 기반 이상탐지 적용 실적.',
      paperIds: ['P-C3'],
    },
    {
      id: 'src-heavy',
      title: '중장비',
      description: '도로·인프라 결함 탐지 — 자율 보수 로봇을 위한 현장 인지 연구.',
      paperIds: ['P-C1', 'P-C2'],
    },
    {
      id: 'src-cctv',
      title: 'CCTV',
      description: '영상 기반 이상 이벤트 탐지·국지화 연구.',
      paperIds: ['P-B2', 'P-B3'],
    },
    {
      id: 'src-erp',
      title: 'ERP',
      description: '산업 ERP 시스템의 내부자 이상행위 실시간 탐지 연구.',
      paperIds: ['P-B4', 'P-C4'],
    },
  ],
};
