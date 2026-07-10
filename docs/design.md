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
- 줄간격(2026-07-08 확대 — 텍스트 밀도 완화): 히어로 h1 `1.35` / 선언 배너 `1.5`(모바일 1.7) / 섹션 타이틀 `1.4`(모바일 1.5) / 보조문 `1.6`(모바일 1.75). 섹션 헤더 gap도 `gap-7 md:gap-10`으로 확대
- 한글 어절 단위 줄바꿈: `word-break: keep-all`
- 스케일(데스크톱): 히어로 h1 60px / 섹션 타이틀 40px / eyebrow·서포트 24px / 카드 타이틀 24px / 카드 항목 16px

## 카피 (v1/v2 비교 중 — 2026-07-08)

- 원칙(v2): **타이틀은 한 호흡**, 핵심 설명은 보조문으로 이관, 의미 유지
- v2에서 정리된 곳: WhyData(타이틀+보조문)·Research·Framework·Expertise·Principles·Collaboration 타이틀
- 히어로 h1·선언 배너는 사용자 결정으로 **v1 원문 유지**
- 우하단 임시 토글 버튼으로 v1/v2 전환 비교 가능 (localStorage `copyVersion`, 기본 v2) — 확정 시 토글·v1 제거 예정

## 섹션 패턴

- 헤더 = 액센트 eyebrow(질문) + 타이틀(답): "왜 → 무엇을 → 어떻게 → 어떤 역량 → 지향 → 누구와"
- 섹션 리듬: 다크(히어로~WhyData) → 라이트(Research·Framework) → 화이트(Expertise) → 다크(Principles) → 라이트(Collaboration) → 다크(Contact·Footer 북엔드)
- 카드 언어: `bg-white/80 + border-2 #D6D6D6 + rounded-2xl`, 칩은 `bg #F1F6FD + 액센트 텍스트 + rounded-2xl`

## 다이어그램

- **WhyData 플로우**: 160px 원 5개 + 화살표, 중심(산업 데이터)만 액센트. 원 안에 Figma 시안 아이콘(industry·database·brain·chart-line·robot, FA solid 계열) — 원은 CSS(호버·펄스 유지), 아이콘만 인라인 SVG `currentColor`
- **Research 궤도**: 중앙 Industrial Data + 글로우 링 PNG + 궤도 SVG, 카드 7개 절대배치(1320×700 캔버스). xl(1280px) 미만은 그리드 폴백
- **Framework 슬랩**: 등각 판 SVG 인라인 재현. L01 액센트 스트로크 → L02~04 회색(불투명도 증가) → L05 블랙+솔리드. lg 미만은 카드 폴백

## 모션 시스템 (factory.ai 레퍼런스, 2026-07-02 도입)

- 원칙: 무한 애니메이션은 `motion-safe:`로만, 진입 모션은 1회만, 한글에는 스크램블 금지
- 키프레임: `heroZoom`(켄 번즈) · `fadeUp`(타이틀 라인 스태거) · `ticker`(키워드 마퀴) · `nodePulse`/`glowPulse`(다이어그램 호흡) · `floatY`(궤도 카드 부유) · `scrollBob`(스크롤 유도)
- `Reveal`: IntersectionObserver 페이드+슬라이드(16px/400ms), delay로 스태거
- `ScrambleText`: 영문 라벨 디코드 효과 (뷰포트 진입 1회)
- 호버 언어: 카드 리프트(-translate-y) + 액센트 보더 + 소프트 섀도, 네비 언더라인 그로우, 칩 액센트 필
- 터치 대응 (2026-07-07): hover 변형을 `&:hover`로 복원해 모바일에서 탭 = hover 발동 (스티키 — 다른 곳 탭까지 유지). Principles 카드는 탭 포커스로 열고 닫는 토글. 새 hover 효과도 이 전제로 설계할 것
