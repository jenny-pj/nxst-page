# nextstud.io 회사 소개 홈페이지 제작 스펙

> 이 문서는 Claude Code가 단독으로 작업을 완수할 수 있도록 작성된 제작 지시서입니다.
> 목표: **벡터(SVG) 기반 반응형 싱글페이지 회사 소개 사이트** 구축.
> 디자인 레퍼런스: https://scale.com/ 의 다크·기술적 무게감 + https://www.upstage.ai/ 의 한국형 AI 기업 신뢰감.

---

## 0. 배경과 목적 (반드시 읽고 시작할 것)

이 홈페이지는 일반적인 회사 소개가 아니다. nextstud.io는 정부 대형 R&D 사업
**「인간-AI 협업형 LAM(Large Action Model) 개발·글로벌 실증」**(과기정통부/NIPA, 2026~2030)의
**합성데이터(Synthetic Data) 독립 세부과제** 수행기관으로 참여를 준비 중이다.

발표 평가에서 예상되는 가장 큰 공격 포인트는:
> "관련 실적이 전무한데, 이런 대형 과제를 잘 수행할 수 있느냐?"

이 홈페이지는 그 질문에 대한 **제3자가 검증 가능한 외부 증거물**이다.
따라서 모든 섹션은 아래의 단일 내러티브를 향해야 한다:

> **"우리는 합성데이터를 갑자기 시작한 것이 아니다.
> '데이터 희소·오염 환경에서의 이상탐지 → 적대적/확산 생성모델 → 제조 현장 적용'이라는
> 연구 궤적을 10년간 쌓아왔고, 그 자연스러운 종착점이 물리정합(Physics-grounded) 합성데이터다."**

톤: 과장 없이, 게재 저널·학회명과 수상 실적 등 **검증 가능한 사실**로 무게를 만든다.
평가위원(교수·연구원급)이 보는 사이트이므로 마케팅 수사보다 학술적 정확성이 우선.

---

## 1. 회사 기본 정보 (기존 홈페이지에서 유지할 것)

- 회사명: **nextstud.io** (넥스트스튜디오)
- 주소: Seongsan Hall 904, 197, Inje-ro, Gimhae-si, Gyeongsangnam-do, Republic of Korea
  (경상남도 김해시 인제로 197, 성산관 904호)
- Email: jin@nextstud.io
- Phone: +82 055 320 4132
- 기존 사이트의 다른 콘텐츠(LLM 솔루션 소개 등)는 **모두 폐기**하고 본 스펙으로 대체.
- 참고: 회사 소재지가 **경남(김해)**이라는 점은 전략적 자산이다. LAM 사업 자체가
  "국가 제조거점 경남 중심" 사업이므로, Contact/About에서 자연스럽게 드러낼 것
  (예: "경남 제조벨트의 심장부에서" 같은 카피 한 줄).

---

## 2. 핵심 내러티브: 합성데이터 스토리라인

논문 실적을 아래 5개 연구 필라(pillar)로 재구성한다. 이 구조가 사이트 전체의 정보 설계 기준이다.

### Pillar A — 문제 인식: "비정상 데이터는 본질적으로 희소하다"
제조 현장 데이터의 99%는 정상 상태. 정작 AI가 배워야 할 불량·고장·이상 상황의 데이터는
희소하고, 수집된 데이터마저 오염(contamination)되어 있다.
당사는 이 문제를 10년간 정면으로 연구해 왔다 → **비지도/강건 이상탐지 연구군**

### Pillar B — 해법: "없는 데이터는 생성한다"
적대적 생성(Adversarial) → 확산모델(Diffusion)로 이어지는 생성모델 연구.
이상 상황을 '예측·생성'하여 탐지하는 패러다임은 합성데이터 생성 기술의 직접적 토대다.
→ **생성모델 기반 이상탐지·합성 연구군**

### Pillar C — 검증: "실세계 물리 시스템에서 작동해야 한다"
발전설비 터빈 블레이드, 도로 인프라 결함, 악천후 환경 인지, 산업 ERP 시스템 등
실측 데이터 기반 현장 적용 경험 → **산업·인프라 적용 연구군**

### Pillar D — 연결: "합성과 실측 사이의 간극을 메운다"
합성데이터의 실용성은 도메인 갭 해소에 달려 있다.
멀티소스 도메인 적응, 약지도 대조학습 등 → **도메인 적응·전이학습 연구군**

### Pillar E — 기반: "데이터는 소유권·보안과 함께 흐른다"
데이터 거래 시장 설계, 프라이버시 스코어링, 블록체인 기반 데이터 브로커 연구.
LAM 사업이 요구하는 "소유권과 보안이 보장되는 융합데이터 통합·관리·공유 플랫폼"의
설계 역량에 직결 → **데이터 플랫폼·거버넌스 연구군**

### 정점 — Agentic Manufacturing
Berkeley AgentX Competition(2025) Agent Architecture 부문 **1위**.
수상 논문 제목이 "Agent-based Autonomous Manufacturing from Planning to Production".
합성데이터 → Physical AI → 제조 자율화 에이전트까지 이어지는 풀스택 비전의 증거.

---

## 3. 기술 스택 다이어그램 (Technology 섹션의 핵심 비주얼)

> 사용자의 화이트보드 초안을 기반으로 확정한 구조. 박스 크기·비율은 의미 없음(원작자 명시).
> 추후 변경 가능성에 대비해 **데이터(JSON)와 렌더링(SVG 컴포넌트)을 분리해서 구현할 것.**

**3계층 + 데이터 소스** 구조. 인터랙티브 SVG로 구현하고, 각 레이어/박스에 호버하면
관련 논문이 Research 섹션 미리보기로 하이라이트되는 인터랙션을 넣는다.

```
┌──────────────┬──────────────┬──────────────┬──────────────┐
│  LLM · VLM   │ GNAIX Agent  │ AD (이상탐지)  │ 데이터 라벨링   │   L3 · CAPABILITY
│  파운데이션    │ 자율제조       │ 오염-강건·비지도│ ·큐레이션 등    │   (AI 역량·응용)
│  모델 활용     │ 에이전트       │              │              │
├──────────────┴──────┬───────┴──────────────┴──────────────┤
│        PINN         │        GAN · Diffusion + ···        │   L2 · MODEL CORE
│   물리정보신경망       │     생성모델 기반 합성데이터 생성        │   (물리 × 생성)
├─────────────────────┴─────────────────────────────────────┤
│      제조데이터 Data Space  +  데이터 수집 / 정제              │   L1 · DATA SPACE
│      (상호운용·소유권·보안이 보장되는 융합데이터 기반)            │
└───────┬───────────┬───────────┬───────────┬───────────────┘
        │           │           │           │
     ( 발전설비 )  ( 중장비 )   ( CCTV )    ( ERP )  ···          DATA SOURCES
```

레이어 의미 (다이어그램 설명 패널용):
- **L1 Data Space**: 발전설비·중장비·CCTV·ERP 등 이기종 현장 소스로부터 제조데이터를
  수집·정제하고, 상호운용성과 소유권·보안이 보장되는 Data Space로 통합.
  ("Data Space"는 유럽 Manufacturing-X/Gaia-X 계열 표준 용어 — LAM 사업의
  글로벌 표준화 협력 내러티브와 직결되므로 영문 그대로 표기)
- **L2 Model Core**: 물리법칙을 내재화한 PINN과 GAN·Diffusion 생성모델의 결합 —
  물리정합(Physics-grounded) 합성데이터 생성의 엔진.
- **L3 Capability**: 그 위에서 작동하는 AI 역량들 — LLM·VLM 활용, GNAIX 자율제조
  에이전트(AgentX 1위 아키텍처), 오염-강건 이상탐지(AD), 데이터 라벨링·큐레이션 등.

각 박스 클릭/호버 시 매핑되는 근거 논문(아래 §6의 ID 참조):
- L3 GNAIX Agent: AgentX 2025 수상 논문(News 카드 연결) / AD: P-A1, P-A5, P-A6,
  P-B2, P-B3 / 라벨링·큐레이션: P-D2, P-D3(약지도·대조학습 = 라벨 효율화 근거)
- L2 GAN·Diffusion: P-B1(Diffusion), P-B2, P-B3, P-B4(Adversarial) /
  PINN: 본 사업 수행 영역 — 논문 매핑 대신 "LAM 사업 핵심기술" 배지 표시
- L1 Data Space: P-E1 ~ P-E6(소유권·거래·프라이버시 거버넌스) /
  데이터 소스 원형: 발전설비 → P-C3(터빈 블레이드), ERP → P-B4, P-C4,
  CCTV → P-B2, P-B3(영상 이상탐지), 중장비 → P-C1, P-C2(도로·인프라 결함)

> 포인트: **다이어그램의 모든 박스와 데이터 소스 원형이 실제 논문 실적으로 추적된다.**
> 이 1:1 매핑 자체가 "실적 전무" 반박의 핵심 장치이므로 인터랙션 구현을 생략하지 말 것.

---

## 4. 사이트 구조 및 섹션별 상세 스펙

싱글페이지(원페이지 스크롤) + 고정 상단 네비게이션.
네비 항목: Technology / Research / Use Cases / News / About / Contact
언어: **한국어 전용으로 제작**. (텍스트는 i18n 가능하도록 상수로 분리하되 EN은 작업 범위 외)

### §4.1 Hero
- 풀스크린 다크 배경. 시그니처 비주얼: **물리 시계열 파형이 노이즈에서 정합된 신호로
  수렴하는 SVG 애니메이션** (확산모델의 denoising 과정을 은유 — 무작위 점들이
  점차 사인파+이상 스파이크가 있는 공정 신호로 정렬되는 모션. SMIL 또는 JS 기반).
- 카피(초안):
  - Eyebrow: `SYNTHETIC DATA · PHYSICAL AI`
  - H1: **"현장에 없는 데이터를, 물리 법칙으로 만든다"**
  - Sub: "제조 현장의 희소한 비정상 데이터를 물리정합 합성데이터로 보완하여,
    Physical AI가 미경험 상황에서도 신뢰할 수 있게 합니다."
  - CTA: `연구 보기 ↓` (Research 섹션 앵커)
- H1 영문 병기 소제목: `Physics-Grounded Synthetic Data for Physical AI`

### §4.2 Proof Bar (Hero 바로 아래 얇은 띠)
로고 이미지 없이 타이포그래피로 처리 (모노스페이스/유틸리티 폰트, 저채도):
`Berkeley AgentX 2025 — 1st Place (Agent Architecture)` ·
`IEEE TNNLS` · `Neurocomputing` · `ICRA` · `IEEE T-ITS` · `IEEE TII` · `Information Sciences`

### §4.3 Problem — "제조 AI의 데이터 역설"
2단 구성. 좌측 텍스트, 우측 인터랙티브 비주얼.
- 텍스트 논지(3개 포인트, 짧게):
  1. **정상 편중** — 실측 제조데이터의 대부분은 정상 가동 데이터. 품질 저하·설비 고장 등
     정작 학습이 필요한 비정상 데이터는 희소하다.
  2. **수집 불가능성** — 비정상 상황은 발생 빈도가 낮고 조건 예측이 어려워
     충분한 양의 실측 확보가 구조적으로 불가능하다.
  3. **오염과 비정합** — 수집된 데이터조차 센서 오작동·누락으로 오염되어 있고,
     시계열·제어값·품질결과·경계조건이 연결된 정합 데이터셋 형태가 아니다.
- 비주얼: 정상(밀집된 파란 점군) vs 비정상(희소한 주황 점 몇 개) 산점도 SVG.
  스크롤 트리거로 합성데이터(주황 외곽선 점들)가 비정상 영역을 채우는 애니메이션.
- 마무리 한 줄: "이 간극을 메우는 것이 물리정합 합성데이터입니다."

### §4.4 Technology — 기술 스택 (§3의 다이어그램)
- 섹션 타이틀: "Physics-Grounded Synthetic Data Stack"
- §3의 3계층 + 데이터 소스 SVG 다이어그램. 데스크톱: 가로 풀폭 레이어드 다이어그램
  (하단에 데이터 소스 원형 4개가 L1으로 연결선). 모바일: 세로 스택으로 리플로우.
- 각 레이어/박스/소스 원형 호버·탭 → 우측(모바일: 하단) 패널에 설명 + 근거 논문 2~3건 표시.
- 레이어별 한 줄 설명:
  - L1 Data Space: "발전설비·중장비·CCTV·ERP — 이기종 현장 데이터를 소유권과 보안이
    보장되는 Data Space로 수집·정제·통합합니다."
  - L2 Model Core: "물리법칙을 내재화한 PINN과 GAN·Diffusion 생성모델의 결합 —
    물리에 정합된 합성데이터를 만드는 엔진입니다."
  - L3 Capability: "LLM·VLM, 자율제조 에이전트(GNAIX), 오염-강건 이상탐지, 데이터
    라벨링까지 — 합성데이터 위에서 작동하는 AI 역량입니다."
- PINN 박스에는 논문 대신 `LAM 사업 핵심기술` 배지, GNAIX Agent 박스에는
  `Berkeley AgentX 2025 · 1st Place` 배지를 단다.

### §4.5 Research — 연구 실적 (사이트의 무게중심)
- 섹션 타이틀: "10년의 연구 궤적" / 영문: `A Decade of Research Toward Synthetic Data`
- 상단: Pillar A~E 필터 탭 (전체/이상탐지/생성모델/산업적용/도메인적응/데이터플랫폼).
- 논문 카드 그리드. 카드 구성: 저널·학회명(강조, 상단) / 논문 제목 / 저자 / 연도 / DOI 링크.
- 카드에 Pillar 색상 코드 좌측 보더로 표시.
- 데이터는 §6의 JSON을 `data/publications.json`(또는 ts 상수)으로 분리해서 렌더링.
- 카드 정렬 기본값: 연도 내림차순.
- 섹션 도입부 내러티브(짧은 문단):
  "비정상 데이터의 희소성은 당사가 10년간 풀어온 문제입니다. 비지도 이상탐지에서
  출발해 적대적 생성과 확산모델로, 그리고 실제 산업 현장 적용으로 이어진 연구의
  자연스러운 다음 단계가 물리정합 합성데이터입니다."

### §4.6 Use Cases — 적용 분야
4개 카드 (LAM 사업의 활용 분야와 정렬):
1. **고장진단** — 희소 고장 신호의 물리제약 합성으로 진단 모델 성능 확보
   (진동·전류·토크 시계열)
2. **품질검사** — 정상 이미지 기반 결함 합성으로 비전 검사 모델 학습
   (표면 결함, 비파괴검사)
3. **예지보전 (RUL)** — 열화 동역학 반영 합성데이터로 잔여수명 예측 정밀화
4. **공정·로봇 제어** — 디지털트윈 시뮬레이션 합성데이터로 LAM/PINN 학습 지원
각 카드에 미니멀 라인아이콘(SVG 직접 제작, 외부 아이콘팩 금지 — 파형/렌즈/수명곡선/로봇암).

### §4.7 News
- 카드 1건 (추후 추가 가능한 리스트 구조로):
  **"GNAIX Team, Berkeley AgentX Competition 'Agent Architecture' 부문 1위"**
  - 날짜: 2025. 8. 2 / 장소: San Francisco, US
  - 본문 요약: Berkeley RDI 주최 AgentX – LLM Agents MOOC Competition의
    Agent Architecture 부문에서 1위 수상. 수상 논문 "Agent-based Autonomous
    Manufacturing from Planning to Production"은 계획 수립부터 생산까지
    제조 전 과정을 자율 수행하는 에이전트 프레임워크를 제안.
  - 포인트: 이 수상이 "제조 자율화"를 향한 당사 비전의 글로벌 검증임을 한 줄로 명시.

### §4.8 About — 회사 소개 (개인 정보 없음)
- ⚠️ **멤버 개인 정보(이름·사진·학력·경력)는 일절 넣지 않는다.** 카드형 팀 소개 금지.
- 회사 차원의 짧은 텍스트 섹션으로 구성 (2단: 좌측 헤드라인, 우측 본문 2문단 + 지표 3개):
  - 헤드라인: "연구에서 현장으로"
  - 본문 1: "nextstud.io는 KAIST IT융합연구소에서 다수의 중대형 국책과제를 함께
    수행해 온 연구진이 설립한 AI 연구기업입니다. 이상탐지·생성모델·데이터 플랫폼
    분야에서 축적한 연구를 제조 현장의 합성데이터 기술로 잇고 있습니다."
  - 본문 2: "국가 제조거점 경남에 자리해, 자동차·조선·방산 제조벨트의 현장 데이터와
    가장 가까운 곳에서 Physical AI를 연구합니다."
  - 지표 3개 (카운트업 마이크로 인터랙션 적용, §5 참조):
    `SCI(E)급 게재 20+편` / `Berkeley AgentX 2025 1위` / `국책과제 공동수행 경험`
    ※ 숫자는 §6 데이터에서 자동 집계하지 말고 상수로 — 추후 사용자가 직접 조정.

### §4.9 Contact / Footer
- 주소(국·영문), 이메일, 전화, 구글맵 임베드(기존 사이트의 임베드 URL 재사용 가능).
- Footer: © nextstud.io. All Rights Reserved. (BootstrapMade 크레딧 제거)

---

## 5. 디자인 시스템

### 방향
scale.com의 다크·정밀한 엔지니어링 무드를 기반으로 하되, 그대로 복제하지 말 것.
이 회사의 정체성은 "물리 신호(signal)"다. 디자인 시그니처를 **공정 시계열 파형**으로 잡는다:
Hero 애니메이션, 섹션 디바이더(얇은 파형 라인), Use Case 아이콘에 일관되게 파형 모티프 사용.

### 토큰 (제안 — Claude Code가 빌드 시 미세조정 가능)
- 배경: `#0A0E14` (deep navy-black) / 서피스: `#111722` / 보더: `#1E2736`
- 텍스트: `#E8EDF4` (primary) / `#8B97A8` (secondary)
- 액센트 1 (신호/합성): `#FF6B35` 계열의 시그널 오렌지 — 비정상·합성데이터를 상징
- 액센트 2 (물리/정상): `#4DA3FF` 계열의 블루 — 실측·정상데이터를 상징
- **두 색의 의미 체계를 사이트 전체에서 일관 유지** (산점도, 스택 다이어그램, 카드 보더 등)
- 타이포: 디스플레이 — Pretendard 또는 SUIT (한글 헤드라인 무게감),
  영문 디스플레이 보조 — Space Grotesk, 데이터/유틸리티 — JetBrains Mono (저널명, 라벨, eyebrow)
- 라운딩 최소(2~4px), 헤어라인 보더, 충분한 여백. 그라데이션 남용 금지.

### 모션 · 인터랙션 (사용자 요청: 시각적으로 인터랙티브하되, 내용과 결합될 것)
원칙: **모든 모션은 데이터/물리 개념을 설명하는 장치여야 한다.** 장식용 패럴랙스·과도한
바운스 금지. 섹션별 지정 인터랙션:

1. **Hero — Denoising 애니메이션 (시그니처, 모션 예산의 중심)**
   무작위 노이즈 점들이 공정 시계열 파형(사인파 + 이상 스파이크)으로 수렴.
   루프는 1회 수렴 후 미세한 idle 모션만 유지. 마우스 위치에 따라 파형이 살짝
   반응(저강도 포인터 패럴랙스)하면 좋으나 필수 아님.
2. **Proof Bar** — 항목별 staggered 페이드인(50ms 간격). 호버 시 텍스트 컬러만 전환.
3. **Problem — 스크롤 연동 산점도**
   IntersectionObserver로 진입 감지 → ① 파란 정상 점군 등장 → ② 주황 비정상 점
   소수 등장 → ③ "합성데이터" 외곽선 점들이 비정상 영역을 채움. 3단계가 스크롤
   진행도 또는 순차 타임라인으로 재생. 이 애니메이션이 회사의 가치제안 자체를 시연한다.
4. **Technology — 스택 다이어그램 인터랙션**
   - 레이어 호버: 해당 레이어 하이라이트 + 나머지 디밍, 설명 패널 전환(150ms ease).
   - 데이터 소스 원형 호버: L1로 흐르는 연결선에 점(데이터 패킷) 흐름 애니메이션.
   - 박스 클릭: 근거 논문 미니 카드 표시 + "Research에서 보기" 링크(해당 필터로 스크롤).
5. **Research — 필터 전환 마이크로 인터랙션**
   필터 탭 클릭 시 카드가 FLIP 스타일로 재배열(또는 페이드 크로스). 카드 호버 시
   좌측 Pillar 컬러 보더가 2px→4px 확장 + 살짝 lift(2px translateY).
6. **Use Cases** — 카드 호버 시 SVG 라인아이콘이 드로잉(stroke-dashoffset) 재생.
7. **About — 지표 카운트업** — 뷰포트 진입 시 숫자 카운트업(1회만).
8. **공통** — 섹션 진입 페이드+슬라이드(16px, 400ms)는 전 섹션 동일 규칙으로 통일.
   네비는 현재 섹션 하이라이트(스크롤 스파이). 스크롤 진행 인디케이터를 상단에
   얇은 파형 라인으로 표현하면 시그니처 모티프와 결합됨(선택).

- `prefers-reduced-motion` 시: 수렴/산점도 애니메이션은 최종 프레임 정지 이미지로
  대체, 카운트업은 즉시 최종값, 전환은 페이드만 유지. **필수.**

### 품질 기준
- 완전 반응형 (375px ~ 1440px+), 키보드 포커스 가시화, 시맨틱 HTML, 라이트하우스 90+ 목표.
- 모든 그래픽은 SVG (래스터 이미지는 팀 사진 placeholder 외 사용 금지).

---

## 6. 논문 데이터 (publications.json 원본)

> 표기 규칙: 저널/학회명은 영문 원문 유지. pillar 값: A=이상탐지, B=생성모델,
> C=산업적용, D=도메인적응·강건인지, E=데이터플랫폼. 복수 해당 시 배열.
> featured: true 인 항목은 Research 섹션 상단 고정 + Technology 다이어그램 연결.

```json
[
  {
    "id": "P-A1",
    "title": "Normality-calibrated autoencoder for unsupervised anomaly detection on data contamination",
    "authors": "Jongmin Yu, Minkyung Kim, Junsik Kim, Hyeontaek Oh",
    "venue": "Neurocomputing, Vol. 667, 132249",
    "year": 2026,
    "doi": "10.1016/j.neucom.2025.132249",
    "pillar": ["A"],
    "featured": true
  },
  {
    "id": "P-B1",
    "title": "Adversarial Denoising Diffusion Model for Unsupervised Anomaly Detection",
    "authors": "Jongmin Yu, Hyeontaek Oh, Jinhong Yang",
    "venue": "arXiv:2312.04382",
    "year": 2023,
    "doi": "arXiv:2312.04382",
    "pillar": ["B", "A"],
    "featured": true
  },
  {
    "id": "P-A5",
    "title": "An Iterative Method for Unsupervised Robust Anomaly Detection Under Data Contamination",
    "authors": "Minkyung Kim, Jongmin Yu, Junsik Kim, Tae-Hyun Oh, Jun Kyun Choi",
    "venue": "IEEE Transactions on Neural Networks and Learning Systems, Vol. 35, No. 10",
    "year": 2024,
    "doi": "10.1109/TNNLS.2023.3267028",
    "pillar": ["A"],
    "featured": true
  },
  {
    "id": "P-A6",
    "title": "Active anomaly detection based on deep one-class classification",
    "authors": "Minkyung Kim, Junsik Kim, Jongmin Yu, Jun Kyun Choi",
    "venue": "Pattern Recognition Letters, Vol. 167",
    "year": 2023,
    "doi": "10.1016/j.patrec.2022.12.009",
    "pillar": ["A"]
  },
  {
    "id": "P-B2",
    "title": "Abnormal event detection using adversarial predictive coding for motion and appearance",
    "authors": "Jongmin Yu, Jung-Gyun Kim, Jeonghwan Gwak, Byung-Geun Lee, Moongu Jeon",
    "venue": "Information Sciences, Vol. 586",
    "year": 2022,
    "doi": "10.1016/j.ins.2021.11.001",
    "pillar": ["B", "A"]
  },
  {
    "id": "P-B3",
    "title": "Abnormal Event Detection and Localization via Adversarial Event Prediction",
    "authors": "Jongmin Yu, Younkwan Lee, Kin Chung Yow, Moongu Jeon, Witold Pedrycz",
    "venue": "IEEE Transactions on Neural Networks and Learning Systems, Vol. 33, No. 8",
    "year": 2022,
    "doi": "10.1109/TNNLS.2021.3053563",
    "pillar": ["B", "A"],
    "featured": true
  },
  {
    "id": "P-B4",
    "title": "Unusual Insider Behavior Detection Framework on Enterprise Resource Planning Systems Using Adversarial Recurrent Autoencoder",
    "authors": "Jongmin Yu, Hyeontaek Oh, Minkyung Kim, Sangjin Jung",
    "venue": "IEEE Transactions on Industrial Informatics, Vol. 18, No. 3",
    "year": 2022,
    "doi": "10.1109/TII.2021.3090362",
    "pillar": ["B", "C"]
  },
  {
    "id": "P-C1",
    "title": "Multi-class Road Defect Detection and Segmentation using Spatial and Channel-wise Attention for Autonomous Road Repairing",
    "authors": "Jongmin Yu, C. B. Chi, S. Fichera, P. Paoletti, D. Mehta, S. Luo",
    "venue": "IEEE ICRA 2024, Yokohama",
    "year": 2024,
    "doi": "10.1109/ICRA57147.2024.10611081",
    "pillar": ["C"],
    "featured": true
  },
  {
    "id": "P-C2",
    "title": "Road Surface Defect Detection — From Image-Based to Non-Image-Based: A Survey",
    "authors": "Jongmin Yu et al.",
    "venue": "IEEE Transactions on Intelligent Transportation Systems, Vol. 25, No. 9",
    "year": 2024,
    "doi": "10.1109/TITS.2024.3382837",
    "pillar": ["C"]
  },
  {
    "id": "P-C3",
    "title": "깊은 신경망 기반 객체 검출을 이용한 발전 설비 터빈 블레이드 이상 탐지",
    "authors": "유종민, 이장원, 오현택, 박상기, 양진홍",
    "venue": "한국정보전자통신기술학회 논문지, 15(1)",
    "year": 2022,
    "doi": "",
    "pillar": ["C", "A"],
    "featured": true,
    "note": "발전설비 실측 데이터 기반 — 제조·에너지 현장 적용 실적"
  },
  {
    "id": "P-C4",
    "title": "Real-Time Abnormal Insider Event Detection on Enterprise Resource Planning Systems via Predictive Auto-Regression Model",
    "authors": "Jongmin Yu, Minkyung Kim, Hyeontaek Oh, Jinhong Yang",
    "venue": "IEEE Access, Vol. 9",
    "year": 2021,
    "doi": "10.1109/ACCESS.2021.3074149",
    "pillar": ["C", "A"]
  },
  {
    "id": "P-D1",
    "title": "Multi-source Domain Adaptation for Unsupervised Road Defect Segmentation",
    "authors": "Jongmin Yu, Hyeontaek Oh, S. Fichera, P. Paoletti, S. Luo",
    "venue": "IEEE ICRA 2023, London",
    "year": 2023,
    "doi": "10.1109/ICRA48891.2023.10161099",
    "pillar": ["D", "C"],
    "featured": true
  },
  {
    "id": "P-D2",
    "title": "Weakly Supervised Contrastive Learning for Unsupervised Vehicle Reidentification",
    "authors": "Jongmin Yu, Hyeontaek Oh, Minkyung Kim, Junsik Kim",
    "venue": "IEEE Transactions on Neural Networks and Learning Systems, Vol. 35, No. 11",
    "year": 2024,
    "doi": "10.1109/TNNLS.2023.3288139",
    "pillar": ["D"]
  },
  {
    "id": "P-D3",
    "title": "Learning to Remove Bad Weather: Towards Robust Visual Perception for Self-Driving",
    "authors": "Younkwan Lee, Yeongmin Kim, Jongmin Yu, Moongu Jeon",
    "venue": "IEEE Robotics and Automation Letters",
    "year": 2022,
    "doi": "10.1109/LRA.2022.3154830",
    "pillar": ["D"]
  },
  {
    "id": "P-D4",
    "title": "Camera-Tracklet-Aware Contrastive Learning for Unsupervised Vehicle Re-Identification",
    "authors": "Jongmin Yu, Junsik Kim, Minkyung Kim, Hyeontaek Oh",
    "venue": "IEEE ICRA 2022, Philadelphia",
    "year": 2022,
    "doi": "10.1109/ICRA46639.2022.9812007",
    "pillar": ["D"]
  },
  {
    "id": "P-D5",
    "title": "Graph-structure based multi-label prediction and classification for unsupervised person re-identification",
    "authors": "Jongmin Yu, Hyeontaek Oh",
    "venue": "Applied Intelligence, Vol. 52",
    "year": 2022,
    "doi": "10.1007/s10489-022-03163-6",
    "pillar": ["D"]
  },
  {
    "id": "P-E1",
    "title": "A Profit Maximization Model for Data Consumers with Data Providers' Incentives in Personal Data Trading Market",
    "authors": "H. Park, Hyeontaek Oh, Jun Kyun Choi",
    "venue": "Data, 9(1), 6",
    "year": 2024,
    "doi": "10.3390/data9010006",
    "pillar": ["E"]
  },
  {
    "id": "P-E2",
    "title": "A privacy scoring framework: Automation of privacy compliance and risk evaluation with standard indicators",
    "authors": "Nakyoung Kim, Hyeontaek Oh, Jun Kyun Choi",
    "venue": "Journal of King Saud University - Computer and Information Sciences, Vol. 35, Issue 1",
    "year": 2023,
    "doi": "10.1016/j.jksuci.2022.12.019",
    "pillar": ["E"]
  },
  {
    "id": "P-E3",
    "title": "Deposit Decision Model for Data Brokers in Distributed Personal Data Markets Using Blockchain",
    "authors": "Hyeontaek Oh, S. Park, Jun Kyun Choi, S. Noh",
    "venue": "IEEE Access, Vol. 9",
    "year": 2021,
    "doi": "10.1109/ACCESS.2021.3104870",
    "pillar": ["E"],
    "featured": true
  },
  {
    "id": "P-E4",
    "title": "Robust Operation Scheme of EV Charging Facility With Uncertain User Behavior",
    "authors": "Jangkyum Kim, Hyeontaek Oh",
    "venue": "IEEE Transactions on Industrial Informatics, Vol. 19, No. 10",
    "year": 2023,
    "doi": "10.1109/TII.2023.3240752",
    "pillar": ["E", "C"]
  },
  {
    "id": "P-E5",
    "title": "Learning based cost optimal energy management model for campus microgrid systems",
    "authors": "Jangkyum Kim, Hyeontaek Oh, Jun Kyun Choi",
    "venue": "Applied Energy, Vol. 311, 118630",
    "year": 2022,
    "doi": "10.1016/j.apenergy.2022.118630",
    "pillar": ["E", "C"]
  },
  {
    "id": "P-E6",
    "title": "마이데이터 기반 IoT 데이터 커먼즈 기술 동향",
    "authors": "오현택, 양진홍, 임선환, 박찬원",
    "venue": "정보과학회지, 40(2)",
    "year": 2022,
    "doi": "",
    "pillar": ["E"]
  }
]
```

---

## 7. 기술 구현 요구사항

- **스택**: Vite + React + Tailwind CSS (또는 사용자가 배포 환경상 정적 HTML을 원하면
  순수 HTML/CSS/JS도 허용 — 기본은 React). SSG 불필요, SPA 원페이지로 충분.
- **그래픽**: 모든 다이어그램·아이콘·애니메이션은 인라인 SVG 컴포넌트로 직접 제작.
  외부 아이콘 라이브러리, 스톡 이미지 사용 금지.
- **데이터 분리**: 논문(§6), 기술스택 구조(§3), 카피 텍스트는 모두 `src/data/` 아래
  상수/JSON으로 분리. 기술스택 이미지가 추후 도착하면 데이터 파일만 교체 가능해야 함.
- **성능**: 폰트는 Pretendard CDN + 가변 서브셋, 애니메이션은 CSS/SMIL 우선,
  무거운 라이브러리(three.js, gsap 등) 금지.
- **접근성**: 시맨틱 랜드마크, alt/aria, 포커스 링, reduced-motion 대응.
- **SEO 기본**: title `nextstud.io — Physics-Grounded Synthetic Data for Physical AI`,
  meta description, OG 태그.
- **배포 산출물**: `npm run build`로 정적 번들 생성 가능할 것 (S3 호스팅 가정 —
  기존 사이트가 S3 ap-northeast-2 에셋 사용 중).

## 8. 단계별 작업 지시 (Claude Code 운영 규칙)

> **운영 규칙 (중요):** 한 번에 전체를 만들지 않는다. 아래 단계를 순서대로 수행하되,
> **각 단계가 끝나면 멈추고 산출물과 체크리스트를 사용자에게 보고한 뒤
> "다음 단계로 진행할까요?"라고 묻는다. 사용자 확인 전에는 다음 단계를 시작하지 않는다.**
> 사용자가 수정을 요청하면 해당 단계 안에서 반영 후 다시 확인을 받는다.
> 각 단계 완료 시점에 항상 빌드/렌더 가능한 상태를 유지한다 (깨진 중간 상태로 멈추지 말 것).

### STAGE 1 — 골격: 스캐폴딩 · 디자인 토큰 · 데이터
- Vite + React + Tailwind 프로젝트 생성, 디자인 토큰(§5) 설정.
- `src/data/`에 publications(§6) / techStack(§3) / copy(§4 카피 전문) 작성.
- 네비게이션 + 푸터 + 빈 섹션 셸(앵커 동작 포함), 스크롤 스파이.
- ✅ 확인 항목: 토큰 컬러·폰트 적용 화면, 네비 앵커 이동, 데이터 파일 구조.
- ⏸ 사용자 확인 후 STAGE 2.

### STAGE 2 — 첫인상: Hero + Proof Bar
- Denoising 시그니처 애니메이션(§5-1), 카피(§4.1), Proof Bar(§4.2).
- reduced-motion 대체 처리 포함.
- ✅ 확인 항목: 애니메이션 수렴 모션 품질, 모바일(375px) 레이아웃, 카피 톤.
- ⏸ 사용자 확인 후 STAGE 3.

### STAGE 3 — 논지: Problem + Technology
- 스크롤 연동 산점도(§4.3, §5-3).
- 인터랙티브 스택 다이어그램(§3, §4.4, §5-4): 레이어/소스 호버, 논문 매핑 패널, 배지.
- ✅ 확인 항목: 산점도 3단계 재생, 다이어그램 호버·클릭 → 논문 카드 연결,
  모바일 세로 리플로우.
- ⏸ 사용자 확인 후 STAGE 4.

### STAGE 4 — 증거: Research + Use Cases
- 필터 그리드(§4.5, §5-5), 논문 카드 디자인, Technology 다이어그램과의 필터 연동.
- Use Cases 4종 카드 + 라인아이콘 드로잉 인터랙션(§4.6, §5-6).
- ✅ 확인 항목: 필터 전환 애니메이션, 논문 표기 정확성(저널명·연도·DOI 링크),
  Pillar 색상 일관성.
- ⏸ 사용자 확인 후 STAGE 5.

### STAGE 5 — 마무리 콘텐츠: News + About + Contact
- AgentX 뉴스 카드(§4.7), About(§4.8 — 개인 정보 없음, 카운트업 지표),
  Contact/Footer(§4.9, 구글맵 임베드).
- ✅ 확인 항목: About 문구 톤(과장 없는지), 지표 숫자, 주소·연락처 정확성.
- ⏸ 사용자 확인 후 STAGE 6.

### STAGE 6 — 품질: 반응형 · 접근성 · 성능 · 빌드
- 375/768/1024/1440px 점검, 키보드 내비게이션·포커스 링, aria 라벨,
  reduced-motion 전수 확인, 라이트하우스 측정(90+ 목표), `npm run build` 산출 확인.
- ✅ 확인 항목: 라이트하우스 점수 보고, 발견·수정한 이슈 목록, 배포용 dist 안내.
- 완료 보고 후 종료.

## 9. 보류·확인 필요 사항

1. **KAIST IT융합연구소 과제 수행 내역** (과제명·기간) — 회사 차원의 "Track Record"
   소섹션으로 추가 가능 (개인 정보 아님). 자료 수령 시 About 하위에 배치. 현재는 보류.
2. 영문 페이지 — 작업 범위 외. 텍스트 상수 분리로 추후 대응 가능 상태만 유지.
3. Research 논문 카드의 **저자명 표기 여부** — 서지 정보 표준 관행상 포함이 기본값이나,
   사용자가 팀 개인 정보 비노출을 원하므로 시작 전 확인할 것. 미확인 시 기본값:
   **저자명 포함** (논문 인용 표기는 팀 프로필과 성격이 다르므로).
