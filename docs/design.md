# Design

기준: 사용자 Figma 시안 "Desktop - 1" 프레임 (Figma Dev Mode MCP로 연동).
Figma에 없는 하위 섹션(Expertise·Principles·Collaboration·Contact·Footer)은 같은 디자인 언어를 확장해 구현.

## 컬러 토큰 (`src/index.css` @theme)

| 토큰 | 값 | 용도 |
|------|-----|------|
| `--color-dark` | `#010A12` | 다크 섹션 배경 |
| `--color-bg` | `#F5F7FA` | 라이트 섹션 배경 |
| `--color-surface` | `#FFFFFF` | 카드 서피스 |
| `--color-line` | `#D6D6D6` | 카드 보더 |
| `--color-ink` | `#010A12` | 라이트 섹션 텍스트 |
| `--color-ink-dim` | `#7C7C7C` | 라이트 섹션 보조 텍스트 |
| `--color-ink-light` | `#FBFFFB` | 다크 섹션 타이틀 |
| `--color-ink-light-soft` | `#EDF5FA` | 다크 섹션 본문 |
| `--color-dim-dark` | `#ABB3B8` | 다크 섹션 보조 텍스트 |
| `--color-accent` | `#5183E8` | 포인트 블루 (유일한 액센트) |
| `--color-accent-soft` | `#F1F6FD` | 칩 배경 |
| `--color-glow` | `#75A3FF` | 다이어그램 글로우 |

## 타이포그래피

- Pretendard 단일 체계. 전역 자간 -2% (`letter-spacing: -0.02em`)
- 줄간격(2026-07-08 확대 — 텍스트 밀도 완화, 2026-07-15 재조정): 히어로 h1 `1.8`(180%, 기존 1.35) / 선언 배너 `1.8`(모바일 1.8) / 섹션 타이틀 `1.5`(모바일 1.5) / 보조문 `1.7`(모바일 1.8)
- **125%→150% 일괄 전환(2026-07-15)**: `leading-[1.25]`를 쓰던 모든 곳(`Framework.jsx`·`ResearchAreas.jsx`·`WhyData.jsx`·`Expertise.jsx`·`Footer.jsx`·`Nav.jsx`)을 `leading-[1.5]`로 변경 — `SectionHeader`처럼 이미 1.4~1.8이던 곳은 대상 아님
- 섹션 헤더 gap: 기본은 `gap-8 md:gap-12`(2026-07-15 재확대분 유지)이나, **`tight` prop(2026-07-15 도입)** 사용 시 `gap-4`(16px)로 고정 — Research/Framework/Core Expertise/Principles 4개 섹션에 적용(처음엔 Research만 32px로 뒀다가 4개 섹션 16px 통일로 조정)
- 한글 어절 단위 줄바꿈: `word-break: keep-all`
- 스케일(데스크톱): 히어로 h1 **54px**(2026-07-15, 기존 60px에서 축소 — 반응형도 비례 축소: 모바일 28px/태블릿 44px) / 섹션 타이틀 40px / eyebrow·서포트 24px / 카드 타이틀 24px / 카드 항목 16px

## 카피 (2026-07-15 재작성)

- 방향 전환: "산업 데이터 인프라 연구기업" 톤에서 **합성데이터 기술로 Physical AI 데이터 병목 해결**을 전면에 내세우는 톤으로 재작성 (Hero h1·배너, WhyData eyebrow/title/support, Research 타이틀, Framework 타이틀, Expertise 타이틀)
- 메타 디스크립션도 동일 문구로 통일 — `index.html`의 `meta[name=description]` / `og:description` / `twitter:description` / JSON-LD `description` 4곳 일치
- 문장이 길어진 만큼 자연스러운 어절 경계에 `\n` 줄바꿈을 넣어 가독성 확보 (whitespace-pre-line 소비처: `SectionHeader`의 eyebrow도 이번에 `whitespace-pre-line` 추가)
- 이전 v2 원칙(타이틀은 한 호흡)은 이번 리라이트로 일부 사문화 — WhyData title·support, Hero 배너는 여러 문장으로 확장됨. `copy.js` 단일 소스 유지, 버전 토글은 재도입하지 않음
- **섹션 eyebrow 4곳 영문화(2026-07-15 추가 라운드)**: '우리는 무엇을 연구하는가' → 'Research Areas' / '우리는 어떻게 연구하는가' → 'Research Framework' / '핵심 연구 역량' → 'Core Expertise' / '연구 철학' → 'Research Principles' (nav 라벨과 톤 통일)
- **Research Areas 타이틀·서포트(Figma 재확인)**: 'Physics-grounded data & Intelligence' → 'Physics-grounded **Data** & Intelligence'(대문자), 서포트 문구 신규 추가("정밀하게 구조화된 실데이터 위에서…")
- **Hero 배너 재조정**: 'Nextstud.io' → 'NEXTSTUDIO' 표기 통일, 결함·이상 상황·극한 조건을 대시(—)에서 괄호로, 문단 사이 빈 줄로 재분리(한 차례 제거했다가 사용자 요청으로 복원)
- **Principles 5원칙 전면 재작성(2026-07-15, 순서 포함)**: Industrial First → Physics Grounded(Core Principle) → Data Centric → Validated, Not Assumed → Research to Deployment. 각 카드에 `subtitle`(항상 노출되는 한 줄 선언, 큰따옴표로 감쌈) 필드 추가 — `desc`(hover 시 펼쳐지는 상세 설명)와 역할 분리
- **Expertise 서포트 텍스트 추가(2026-07-15, Figma 재확인)**: 그동안 eyebrow+title만 있던 유일한 섹션이었으나 Figma Dev Mode MCP로 하단 서포트 문구를 확인해 추가 — "산업 데이터를 중심으로 연구 역량을 융합합니다 / 모든 역량은 연구 파이프라인 L01-L05에 매핑됩니다"

## 섹션 패턴

- 헤더 = 액센트 eyebrow(질문) + 타이틀(답): "왜 → 무엇을 → 어떻게 → 어떤 역량 → 지향"
- 섹션 리듬: 다크(히어로~WhyData) → 라이트(Research·Framework) → 화이트(Expertise) → 다크(Principles·Contact·Footer 북엔드). Collaboration(라이트) 섹션은 2026-07-14 제거 — 협력 기관 로고는 Expertise 하단 마퀴로 흡수
- 카드 언어: `bg-white/80 + border-2 #D6D6D6 + rounded-2xl`, 칩은 `bg #F1F6FD + 액센트 텍스트 + rounded-2xl`
- **Principles 카드(2026-07-15 레이아웃 확정)**: 텍스트 레이어를 `flex-1 flex-col justify-between`으로 — 제목+배지+부제 블록은 카드 상단, desc(설명)는 항상 카드 하단에 고정. 이전엔 `h-full` + `mt-auto` 조합이었으나 부모에 확정 높이가 없어 100%가 계산되지 않아 무효했던 문제를 `flex-1`(남는 공간 채움)로 해결. Core Principle(Physics Grounded) 카드 보더는 Framework L03과 동일한 완전 불투명 액센트(`border-2 border-accent`, `#5183E8`) — 배지 텍스트는 전체 대문자(`CORE PRINCIPLE`)

## 다이어그램

- **WhyData 플로우(2026-07-15 Figma 재동기화)**: 기존 5노드 단순 직선 플로우 → **6노드 분기/합류 구조**로 개편. 산업 환경 → (산업 데이터 / 합성 데이터로 대각선 분기, 각각 서브텍스트 "Real-World Data Collection"/"Physics-Constrained Synthesis") → AI 학습(서브텍스트 포함, 대각선 합류) → 추론 및 의사결정 → Physical AI. 분기 구간은 `FlowArrow`에 추가한 `angle` prop(CSS `rotate()`)으로 대각선 화살표 2개(±22deg) 구현 — 새 벡터 에셋 없이 기존 화살표 아이콘 재사용. 모바일은 분기 표현이 어려워 `flatFlow`로 순차 나열 평탄화
- 아이콘: 160px 원 + Figma 시안 아이콘(industry·database·brain·chart-line·robot, FA solid 계열) — 원은 CSS(호버·펄스 유지), 아이콘만 인라인 SVG `currentColor`
- **Research 궤도**: 중앙 Industrial Data + 글로우 링 PNG + 궤도 SVG, 카드 7개 절대배치(1320×700 캔버스). xl(1280px) 미만은 그리드 폴백
- **Framework 슬랩 — 인터랙티브(2026-07-15)**: 등각 판 SVG 인라인 재현은 유지하되 사용자가 제공한 HTML 목업(`nextstudio-framework-interactive.html`)의 인터랙션을 라이트 톤·Pretendard로 이식
  - 헤더 아래 **파이프라인 크럼**(ACQUISITION → SYNTHESIS → VALIDATION → DEPLOYMENT) — 호버 또는 클릭 고정된 슬랩의 stage가 액센트로 점등
  - 슬랩 **호버 시 디테일 펼침**(role 태그·caption·상세 설명 3줄) — **클릭하면 고정**되어 마우스가 떠나도 유지, 다른 슬랩 클릭 시 이전 고정 해제, 슬랩 바깥 클릭 시 전체 해제(`document` click 리스너, 슬랩 클릭은 `stopPropagation`)
  - 펼침 시 콘텐츠가 슬랩 세로 중앙에 오도록 상단 패딩을 `74px→88px`로 함께 전환(`transition-[padding]`)
  - 슬랩 사이 **흐름 커넥터**(`↓ 구조화된 실측 데이터` 등, 인접 슬랩 on 상태면 점등) — 크럼과 한 그룹으로 묶어 간격을 좁힘(연결된 요소라는 인상)
  - L03~L05 오른쪽 **PHYSICS VALIDATION 세로 레일** — 슬랩 스택 바깥에 절대 배치해 L01·L02와 슬랩 너비를 동일하게 유지. 호버 시 레일 + rail 대상 슬랩 보더 동시 점등
  - CORE(L03)/OUTCOME(L05) **pill 배지** — role 태그와 같은 줄 우측 끝에 정렬(제목 줄바꿈·펼침 여부와 무관하게 정렬 유지). 보더는 CORE만 상시 액센트, OUTCOME은 L01·02·04와 동일한 회색(호버/레일 점등 시에만 액센트)
  - 폰트는 시안의 IBM Plex Mono 대신 **사이트 기본 Pretendard로 통일**(크럼·역할 태그·흐름 라벨·레일 전부)
  - 모바일(lg 미만)은 호버가 없어 **탭으로 디테일 토글**, 세로 레일은 L03 위 가로 라벨로 대체
  - 계층 콘텐츠도 함께 갱신: L02 Trusted Data **Infrastructure**(Standardization & Interop 등), L03 **Physics-Grounded Generative Core**(CORE 배지), L05 칩 Security & Insider Risk → Process Optimization
- **Expertise 역량 그룹 카드 — L01~L05 매핑 시각화(2026-07-15)**: 기존 5칼럼 아이콘 클러스터 그리드를 사용자 제공 HTML 목업(`nextstudio-core-expertise-interactive.html`)의 `.groups` 구조로 전면 교체 — G01~G04 4개 역량 그룹(Data Engineering & Synthesis / Foundation & Generative Models / Perception & Prediction / Optimization & Deployment), 2×2 카드 그리드(`copy.js`의 `expertise.groups`, 각 그룹에 매핑 레이어 `layers: [1,2,3]` 등 명시)
  - 카드 그리드 위에 Framework와 동일한 **L01→L05 파이프라인 축**(Framework `layers[].name`을 그대로 병기) — 카드 hover 시 해당 그룹이 커버하는 레이어가 축에서 액센트 점등(연속 구간이면 연결선도 점등)
  - 각 카드 헤더에는 상시 노출되는 **5칸 커버리지 바**(`CoverageBar`, hover 없이도 매핑 범위 파악 가능) — `G0n / MAPS TO ...` 텍스트 라벨은 정보 중복이라 제거
  - 아이템(역량명) 행은 hover/포커스 시 상세 설명 펼침(좌측 액센트 틱 + 캐럿 회전) + 클릭(탭)으로 고정 — 고정 상태는 **섹션 전역 단일 상태**(`openKey`)라 다른 카드의 아이템을 클릭해도 이전 고정이 자동 해제됨, 카드 바깥 클릭 시도 전체 해제(Framework `pinned` 패턴을 섹션 전역으로 확장)
  - 펼침 애니메이션: hover 150ms 지연 후 펼침 시작(스치듯 지나가면 열리지 않음), duration 500ms `ease-in-out`(휙휙거림 방지)
  - 같은 행 카드 높이는 grid row stretch로 정렬 — 한 카드가 펼쳐지면 같은 행의 카드도 함께 늘어나 행 바닥선 유지(옆 카드만 그대로 두는 `items-start`는 기각)
  - CORE 뱃지는 Framework CORE 배지와 동일 디자인, 카드 모서리는 `rounded-2xl`(목업의 각진 사각형 대체), 폰트는 목업의 IBM Plex Mono 대신 사이트 기본 Pretendard, 카드 hover 시 커서 추적 라디얼 글로우(목업 인터랙션 유지)

## 모션 시스템 (factory.ai 레퍼런스, 2026-07-02 도입)

- 원칙: 무한 애니메이션은 `motion-safe:`로만, 진입 모션은 1회만, 한글에는 스크램블 금지
- 키프레임: `heroZoom`(켄 번즈) · `fadeUp`(타이틀 라인 스태거) · `ticker`(키워드 마퀴) · `nodePulse`/`glowPulse`(다이어그램 호흡) · `floatY`(궤도 카드 부유) · `scrollBob`(스크롤 유도)
- `Reveal`: IntersectionObserver 페이드+슬라이드(16px/400ms), delay로 스태거
- `ScrambleText`: 영문 라벨 디코드 효과 (뷰포트 진입 1회)
- 호버 언어: 카드 리프트(-translate-y) + 액센트 보더 + 소프트 섀도, 네비 언더라인 그로우, 칩 액센트 필
- 터치 대응 (2026-07-07): hover 변형을 `&:hover`로 복원해 모바일에서 탭 = hover 발동 (스티키 — 다른 곳 탭까지 유지). Principles 카드는 탭 포커스로 열고 닫는 토글. 새 hover 효과도 이 전제로 설계할 것
