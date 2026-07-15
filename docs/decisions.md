# Decisions

최신순. 각 항목은 "무엇을, 왜"를 기록한다.

## 2026-07-15 — Expertise 섹션: 아이콘 클러스터 그리드 → L01~L05 매핑 역량 그룹 카드로 전면 교체

- 배경: 기존 5칼럼 아이콘 그리드(AI Foundation·Industrial Intelligence 등)가 Framework의 L01~L05 파이프라인과 아무 매핑 관계를 보여주지 못함. 사용자가 제공한 HTML 목업(`nextstudio-core-expertise-interactive.html`)의 `.groups` 구조(G01~G04, 아이템별 hover 상세 펼침)를 이식해 매핑을 시각화하기로 결정
- 1차 이식: 목업 구조를 그대로 옮기며 카드 헤더에 `G01 / MAPS TO L01–L03` 텍스트 라벨만 표시. 사용자 피드백("G01·G02가 무슨 의미인지 안 보인다")에 따라 매핑을 텍스트가 아니라 시각 요소로 표현해야 한다고 판단
- UI 시안 2종을 같은 화면에 나란히 배치해 비교 후 **시안 A 채택**:
  - 시안 A(채택): 카드 그리드 위에 Framework와 동일한 L01→L05 파이프라인 축(축 아래 실제 Framework 레이어명 병기) + 각 카드 헤더에 상시 노출되는 5칸 커버리지 바(매핑된 세그먼트만 액센트로 채움). 카드 hover 시 해당 레이어가 축에서 점등. 모든 반응형 구간에서 동일하게 동작
  - 시안 B(기각): 카드의 그리드 위치·폭 자체가 커버 범위가 되는 간트 차트 레이아웃. 매핑이 구조적으로 가장 직관적이지만 좁은 칼럼에서 아이템명이 여러 줄로 감기고, 모바일에서는 세로 스택으로 무너져 매핑 표현 자체가 사라지는 문제로 기각
- 확정 후 `G01 / MAPS TO ...` 텍스트 라벨은 완전 제거(커버리지 바+축 점등과 정보 중복) — `copy.js`의 `idx` 필드도 함께 삭제
- CORE 뱃지는 Framework L03과 동일 디자인(`rounded-full bg-accent`)으로 통일, 카드 모서리는 사이트의 다른 카드와 동일한 `rounded-2xl`(목업의 각진 사각형 대체), 폰트는 목업의 IBM Plex Mono 대신 사이트 기본 Pretendard로 통일
- 아이템 펼침: hover/포커스 시 디테일 펼침 + 좌측 액센트 틱 + 캐럿 회전, 클릭(탭)으로 고정. 고정 상태는 카드별 로컬이 아니라 **섹션 전역 단일 상태**(`openKey`, `카드idx-아이템idx` 형태)로 관리 — 다른 카드의 아이템을 클릭해도 이전 카드의 고정이 자동 해제됨. 카드 바깥 클릭 시 전체 해제(`document` 클릭 리스너 + 아이템 클릭은 `stopPropagation`) — Framework 슬랩의 `pinned` 패턴과 같은 계열이나 카드 경계를 넘어 섹션 전역으로 확장한 점이 다름
- "펼침이 휙휙거려 정신없다"는 피드백에 따라 hover 150ms 지연 후 펼침 시작(스치듯 지나가면 안 열림), 펼침/닫힘 duration 300ms→500ms(`ease-in-out`)로 완화
- 같은 행 카드 높이 정렬: 처음엔 `items-start`로 펼친 카드만 커지게 했다가, "옆 카드도 같이 늘어나는 게 자연스러울 것 같다"는 사용자 재검토 요청으로 grid row stretch(`items-start` 제거)로 되돌림 — 한 카드가 펼쳐지면 같은 행의 카드도 함께 늘어나 행 바닥선이 계속 정렬 유지됨
- Figma Dev Mode MCP로 섹션 헤더 하단 서포트 텍스트를 추가 확인해 반영("산업 데이터를 중심으로 연구 역량을 융합합니다 / 모든 역량은 연구 파이프라인 L01-L05에 매핑됩니다") — Expertise는 그동안 유일하게 `support` 없이 eyebrow+title만 있던 섹션이었음
- 카드 텍스트 전반 한 단계 확대: 그룹명 18→20px, 캡션 13→14px, 아이템명 14→15px, 상세설명 13→14px, 축 레이어명도 11→14px로 확대(가독성 부족 피드백)

## 2026-07-15 — WhyData 키워드 마퀴 끊김 버그 수정 (2-복제 → 4-복제)

- 증상: `overflow-hidden border-y border-white/10 py-4` 마퀴가 와이드 화면(≥1920px 부근)에서 중간에 키워드가 사라졌다가 다시 나타남
- 원인: 동일 리스트를 2개만 복제해 `-50%`(리스트 1개 너비)씩 이동하는 구조인데, 리스트 1개 너비(~1900px)가 화면 너비보다 좁으면 이동 도중 트랙 오른쪽 끝이 화면 안으로 들어와 빈 구간이 노출됨
- 해결: 복제 개수를 2→4로 늘려 이동 후에도 항상 리스트 2개 분량이 화면을 덮도록 함. 이동 거리가 2배가 된 만큼 `ticker` duration도 44s→88s로 늘려 체감 속도 유지
- 참고: Expertise 하단 파트너 로고 마퀴도 동일 구조(2-복제 + `-50%`)지만 세트 폭이 훨씬 넓어 일반 해상도에서는 재현되지 않음 — 같은 증상이 보이면 동일 처방 적용

## 2026-07-15 — Principles 카드: 제목/부제 vs 설명을 `justify-between`으로 분리

- 배경: "설명을 카드 하단에 붙여달라"는 요청을 `h-full` + `mt-auto` 조합으로 처리했었으나, 부모 카드가 `min-h-[420px]`(최소 높이)만 갖고 확정 높이가 없어 자식의 `h-full`이 계산할 기준이 없었음 — 그 결과 텍스트 레이어가 내용만큼만 커져 `mt-auto`가 밀어낼 여백 자체가 생기지 않았고, 실제로는 하단 고정이 되지 않았음
- 해결: 텍스트 레이어를 `h-full` 대신 **`flex-1`**로 바꿔 카드의 남는 높이를 확실히 채우고, 제목+배지+부제 블록과 desc를 `justify-between`으로 배치 — 제목 블록 길이와 무관하게 desc가 항상 카드 바닥에 위치
- Core Principle(Physics Grounded) 카드 보더는 Framework L03과 동일한 색으로 통일: `ring-1 ring-accent/25`(반투명) → `border-2 border-accent`(완전 불투명 `#5183E8`) — `slabStroke(layer, lit)`가 CORE/lit 상태일 때 반환하는 색과 동일선상에 놓기 위함
- 배지 텍스트는 `Core Principle` → `CORE PRINCIPLE` 전체 대문자로 변경 — Framework의 CORE/OUTCOME 배지 표기 관례와 통일

## 2026-07-15 — Principles 5원칙 콘텐츠 전면 재작성 + 순서 변경

- 배경: 기존 원칙 5종(제목·순서)이 회사가 강조하고 싶은 연구 철학(현장 기반 → 물리 정합 → 데이터 중심 → 실증 검증 → 배포 지향)의 논리적 흐름을 반영하지 못한다고 판단
- Industrial First → Physics Grounded(Core Principle) → Data Centric → Validated, Not Assumed → Research to Deployment 순서로 전면 교체, 각 카드에 사용자가 제공한 정확한 한국어 설명문 반영
- 카드마다 `subtitle`(항상 노출되는 한 줄 선언, 큰따옴표로 감쌈)을 새로 추가 — 카드 크기가 커진 만큼 hover 하기 전에도 원칙의 핵심을 전달하기 위함. `desc`는 hover 시 펼쳐지는 상세 설명으로 역할 분리
- 일러스트-원칙 매핑을 필名 대신 **각 SVG의 실제 시각 내용**을 보고 재배정(공장 건물→Industrial First, 레이어드 피라미드→Physics Grounded, 동심원/네트워크→Data Centric, 지형 그라디언트→Validated Not Assumed, 점선 설계도→Research to Deployment) — 기존 파일명-제목 매핑이 새 제목 세트와 더 이상 맞지 않았기 때문
- 카드 그리드를 CSS Grid(`grid-cols-5`, 고정 높이)에서 **flex-wrap + calc 기반 basis**(`sm:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)]`)로 전환 — 설명 문장이 길어져 고정 높이가 불가능해졌고, 5개를 3+2로 가운데 정렬하는 것은 Grid의 기본 동작으로는 안 됨

## 2026-07-15 — 섹션 eyebrow 4곳 영문화 + Figma 재동기화로 WhyData 플로우 구조 변경

- 배경: nav 라벨(Research/Framework/Core Expertise/Principles)은 이미 영문인데 각 섹션 eyebrow는 한글 질문형이라 어투가 어긋남 — 4곳을 영문 라벨로 통일
- Figma Dev Mode MCP로 "현재 선택된 레이어"를 다시 확인하는 과정에서 WhyData 섹션 시안이 기존 5노드 단순 플로우가 아니라 **산업 데이터/합성 데이터 분기 → AI 학습 합류** 구조로 바뀌어 있음을 발견 — 코드가 구버전 시안을 따라가고 있었던 것으로 판단해 동기화
- 분기·합류 화살표는 Figma의 정확한 벡터 패스를 그대로 옮기지 않고, 기존 `FlowArrow` 컴포넌트에 `angle` prop(단순 `rotate()`)을 얹어 재사용 — 새 SVG 에셋 추가 없이 동일한 화살표 언어(흰색 라인+화살촉) 유지
- 모바일에서는 분기 구조를 표현하기 어렵다고 판단해 `flatFlow`로 순차 나열로 평탄화(기존 수직 플로우 패턴과 동일)

## 2026-07-15 — Framework 슬랩을 인터랙티브로 리빌드 (사용자 제공 HTML 목업 반영)

- 배경: 사용자가 `nextstudio-framework-interactive.html`(다크 톤 + IBM Plex Mono)을 제공하며 기존 슬랩 레이아웃을 유지한 채 그 인터랙션·콘텐츠를 반영해달라고 요청
- 채택: 레이아웃(등각 슬랩 스택)은 그대로 두고 인터랙션 4종만 이식 — 파이프라인 크럼 점등, 호버 시 디테일 펼침, 슬랩 사이 흐름 커넥터, L03~L05 물리 검증 레일. 톤은 목업의 다크를 가져오지 않고 기존 라이트(#F5F7FA) 유지, 폰트도 IBM Plex Mono 대신 사이트 기본 Pretendard로 통일 — 사용자 확인 후 결정
- 디테일 펼침은 호버 유지로 확정하되, **클릭하면 고정**되도록 추가(원본 HTML 동작과 동일) — `pinned` state + 슬랩 바깥 클릭 시 해제(`document` 클릭 리스너, 슬랩 자체는 `stopPropagation`)
- 레일을 슬랩 스택 안쪽이 아니라 `absolute left-full`로 바깥에 배치 — L03~L05 슬랩 너비를 L01·L02와 동일하게 유지하기 위함(레일을 flex 형제로 넣으면 스택 너비가 줄어듦)
- OUTCOME(L05) 배지 보더는 애초 액센트로 넣었다가, 사용자 피드백으로 L01·02·04와 동일한 회색으로 변경(호버/레일 점등 시에만 액센트) — CORE(L03)만 상시 강조 유지
- 배지는 처음 절대 위치(우측 상단)로 뒀다가, "GENERATIVE CORE와 같은 선상" 요청에 따라 role 태그와 같은 flex 줄에 배치하는 방식으로 전환 — 절대 위치는 펼침/줄바꿈에 따라 어긋날 수 있어 flex 정렬이 더 안정적
- 계층 콘텐츠도 목업 기준으로 갱신: L02 Trusted Data Ecosystem → **Infrastructure**, L03 Robust Learning Core → **Physics-Grounded Generative Core**(CORE 배지), L05 칩 Security & Insider Risk → Process Optimization(OUTCOME 배지)

## 2026-07-15 — Hero·WhyData·Research·Framework·Expertise 카피 전면 재작성

- 배경: 사용자가 "물리 제약 기반 합성데이터로 Physical AI 데이터 병목 해결"을 핵심 메시지로 앞세우고 싶어함 — 기존 카피는 산업 데이터 인프라 자체를 주어로 삼아 방향이 다름
- Hero h1·배너, WhyData eyebrow/title/support, Research 타이틀, Framework 타이틀, Expertise 타이틀 교체. 문장이 길어진 곳(Hero 배너, WhyData support)은 자연스러운 어절 경계에 줄바꿈을 넣어 가독성 확보
- 부수 조치: 문장이 길어지며 좁아 보이는 문제를 막기 위해 섹션 상하 padding·헤더-콘텐츠 gap을 전반적으로 확대(`design.md` 참고), `SectionHeader`의 eyebrow에 `whitespace-pre-line` 추가(이전엔 title/support에만 있었음 — eyebrow에 줄바꿈이 필요해진 건 이번이 처음)
- 메타 디스크립션(`index.html`)도 새 카피 결의 문구로 통일 — meta description / og:description / twitter:description / JSON-LD description 4곳 모두 동일 문구로 맞춤 (사용자 확인 후 4곳 일괄 적용)

## 2026-07-14 — Collaboration 섹션 제거, 협력 기관 로고를 Expertise 하단 마퀴로 통합

- 배경: 협력 기관 카드 섹션(정부 R&D·산업계·학계·기술이전 4개 카드)을 별도 섹션으로 유지하는 대신, Expertise 섹션의 "연구 성과 하이라이트"에 실제 협력 기관 11곳(Cambridge, Harvard, KAIST, Imperial College 등) 로고 마퀴로 대체
- `Collaboration.jsx` 삭제, `App.jsx`에서 렌더 라인 제거, `src/assets/figma/partners/` 로고 이미지 11장 추가
- 이유: 카드 4개짜리 축(Government/Industry/Academia/Transfer)보다 실제 협력 기관 로고를 보여주는 편이 신뢰도 측면에서 더 구체적인 근거가 된다고 판단

## 2026-07-08 — 메인 카피 v2 정리 + v1/v2 화면 토글 비교 방식 채택

- 배경: 히어로·섹션 타이틀이 2~3문장 장문이라 헤드카피로 무겁고 텍스트가 빽빽함. 의미는 유지하며 축약하되, 확정 전 두 버전을 실제 렌더링으로 비교하고 싶다는 요구
- 채택: `copy.js`를 localStorage(`copyVersion`, 기본 v2) 기반 **버전 선택기**로 전환 — v1은 스냅샷 보존, v2는 변경 키만 재정의(다이어그램 데이터는 v1 spread 재사용). 우하단 토글 버튼이 localStorage 갱신 + 새로고침으로 전환. **카피 소비 컴포넌트 8개는 무수정**
- 대안 검토: ① React Context 실시간 전환 — 8개 컴포넌트 import 전면 수정 필요, 기각 ② Vercel 프리뷰 배포 2개 비교 — 전환이 번거로움, 기각 ③ 문서 대조표만 — 실제 렌더링(줄간격 포함)으로 판단 불가, 기각
- 카피 v2 원칙: 타이틀은 한 호흡, 핵심 설명은 보조문으로 이관. 단 **히어로 h1·선언 배너는 사용자 결정으로 v1 원문 유지** (2026-07-08 조정)
- 줄간격 확대는 버전 무관 공통 적용 (h1 1.25→1.35, 배너 1.3→1.5, 타이틀 1.25→1.4, 보조문 1.4→1.6)
- 유의: `public/llms.txt`는 아직 v1 카피 기준 — 카피 확정 후 갱신 필요 (확정 전 배포 시 AI 크롤러가 보는 요약과 화면이 일시 불일치)
- 확정 후 정리: 확정 버전을 copy.js에 병합, v1/v2 파일·토글 제거 (코드 주석에 제거 표시 있음)

## 2026-07-07 — hover 변형을 v3 방식(`&:hover`)으로 복원 — 모바일 탭 발동

- 배경: Tailwind v4 기본값은 `hover:`를 `@media (hover: hover)`로 감싸 터치 기기에서 hover 스타일을 전부 배제. 이 사이트는 카드 리프트·틴트 리빌 등 핵심 인터랙션이 hover 기반이라 모바일에서 무반응이었음
- 채택: `@custom-variant hover (&:hover)` (index.css) + 빈 `touchstart` 리스너 (main.jsx — iOS Safari는 "클릭 가능" 요소에만 탭-호버를 적용하므로 일반 div 카드도 반응하도록)
- Principles 카드는 hover 없이는 설명 텍스트가 안 보이는 유일한 곳 — `focus-visible:` → `focus:` 완화로 탭 포커스 토글(열기/닫기) 이중 안전장치
- 수용한 트레이드오프: ① 모바일에서 탭 후 hover 상태가 다른 곳 탭까지 유지(스티키 호버 — v3 시절 웹 표준 동작) ② 데스크톱에서 Principles 카드 클릭 시 다른 곳 클릭까지 열림 유지
- 대안 검토: JS 터치 핸들러로 클래스 토글 — 모든 컴포넌트 수정 필요, 과함. 기각

## 2026-07-07 — Tailwind 소스 스캔에서 public/ 제외 (`@source not "../public"`)

- 배경: git 브랜치 전환으로 public 파일이 생겼다 사라지면 Tailwind 스캐너의 프로세스 내 캐시가 삭제된 svg를 계속 참조 → dev 서버 CSS 변환이 ENOENT 500 (재시작 무효, 상세는 issues.md)
- public/은 정적 에셋(이미지·sitemap·robots 등) 폴더라 Tailwind 클래스가 존재할 수 없음 — 스캔 제외가 안전하고 빌드 결과도 동일 (CSS 해시 불변 확인)
- 대안 검토: dev 서버 재시작(임시방편, 재발), Vite/Tailwind 버전 업(원인 미해결) — 모두 기각

## 2026-07-07 — SEO/GEO 메타데이터: canonical은 nextstud.io 기준으로 선반영

- canonical·og:url·og:image를 최종 도메인 `https://nextstud.io` 절대 URL로 지정 — 도메인 전환 후 수정 없이 그대로 유효하도록
- 트레이드오프: 전환 전까지는 og:image 등이 옛 S3 사이트(현재 nextstud.io를 서빙 중)를 가리켜 SNS 미리보기가 깨질 수 있음 — 임시 URL(vercel.app) 기준으로 썼다가 재수정하는 것보다 낫다고 판단
- 구조화 데이터는 JSON-LD `ResearchOrganization` + `WebSite` 채택 — 연구기업 포지셔닝에 맞는 가장 구체적인 schema.org 타입
- GEO: `llms.txt`를 현재 사이트 카피(연구 분야·프레임워크·역량·철학·협력) 기준으로 전면 재작성 — 이전 버전은 옛 사이트(GNAIX·논문 실적) 내용이라 AI 검색이 잘못된 정보를 인용할 위험
- OG 이미지는 화이트 로고 + 다크(#010A12) 배경의 1200×630 단순 구성 — 별도 디자인 없이 sips로 생성, 추후 교체 가능

## 2026-07-06 — Contact 이메일 비노출: 빌드 env 주입 채택 (서버리스 프록시는 폐기)

- 배경: 저장소가 public이라 수신 이메일을 코드에 하드코딩할 수 없음
- 1차 시도 — `/api/contact` Vercel 서버리스 프록시: **폐기**. FormSubmit 앞단 Cloudflare가 Vercel 데이터센터 IP를 403 차단 (브라우저 UA 위장도 무효). 로컬 Node에서는 성공 → IP 기반 차단으로 확정.
- 채택 — 브라우저 직접 호출 + 대상 주소를 빌드 env `VITE_CONTACT_FORM_ID`로 주입: 저장소 비노출, 값 교체 시 코드 수정 불필요 (Vercel env 변경 + 재배포)
- 잔여 노출: 번들 JS에는 값이 포함됨 — FormSubmit 랜덤 알리아스로 교체하면 번들에서도 이메일 제거 가능 (알리아스는 공개되어도 무방한 값)
- **후속 적용 완료 (당일)**: env 값을 랜덤 알리아스로 교체 — 번들·저장소 모두 이메일 제로 노출. 알리아스는 기존 활성화 상태를 승계하므로 재활성화 불필요.

## 2026-07-06 — Contact CTA를 mailto에서 팝업 폼(FormSubmit)으로 전환

- mailto는 메일 클라이언트 설정이 없는 방문자에게 동작하지 않고, 문의 정보(소속·유형)를 구조화해 받을 수 없음
- 백엔드 없는 정적 사이트라 가입·API 키가 필요 없는 FormSubmit.co 채택 (Formspree는 가입 필요, 자체 메일 서버는 과함)
- 폼 유형 항목은 Collaboration 섹션의 협력 축(공동연구·정부 R&D·기술이전)과 호응하게 구성
- 주의: FormSubmit은 도메인(사이트)별로 최초 1회 이메일 활성화 필요

## 2026-07-06 — Collaboration 커넥터를 직선에서 Figma 곡선으로 교체

- Figma MCP에서 커넥터 노드(80:381, 80:384) SVG를 직접 다운로드해 실제 베지어 패스 추출 후 인라인 적용
- 이유: 단순 기울기 직선으로는 시안의 "위성 쪽 수평→허브 쪽 하강" 곡률 재현 불가. Figma 패스를 그대로 쓰는 것이 가장 정확.
- flip/up prop으로 4방향 대칭 처리 — 추가 SVG 파일 없이 CSS transform 반전만으로 해결

## 2026-07-06 — Footer 네비를 주 네비보다 시각적으로 낮게 조정

- 글씨 크기 16~20px → 13~14px, 투명도 50% 적용
- 이유: 주 navbar보다 footer 네비가 더 눈에 띄어 시각적 위계가 역전됨. 보조 정보로 처리.
- 호버 시 원래 밝기로 전환 — 완전 숨김은 아니고 "조용히" 존재하는 수준 유지

## 2026-07-06 — @fortawesome/free-solid-svg-icons 도입

- 기존 Collaboration 아이콘: 손으로 그린 SVG 패스 (160×160 좌표계 직접 작성)
- 교체: Font Awesome solid 공식 패스 (landmark·industry·graduation-cap·right-left)
- 이유: WhyData 섹션에서 이미 같은 방식으로 사용 중이고, 패키지에서 관리되는 패스가 유지보수에 유리
- WhyData의 아이콘 크기 비율(scale-75, 72/512 스케일)을 그대로 적용해 두 섹션 일관성 확보

## 2026-07-02 — factory.ai 레퍼런스로 마이크로 인터랙션 도입

- 플랫한 UI에 모션 레이어 추가: 히어로 켄 번즈·타이틀 스태거, 키워드 마퀴, 노드/글로우 펄스, 궤도 카드 플로팅, 카드 리프트 호버, 네비 언더라인, ScrambleText(영문 디코드)
- 이유: factory.ai의 산업적 무드(스태거 리빌, 마퀴, 글로우)가 사이트 톤과 맞음. 사용자 요청.
- 제약: 무한 애니메이션은 `motion-safe:` 전용, 진입 모션 1회, **한글 스크램블 금지**(자소 분해 없이 어색함 — 영문 라벨에만 적용)

## 2026-07-02 — Figma 시안 기준으로 light 브랜치 전면 재구축

- 이전 방향(Editorial × Technical: 웜 오프화이트 #FAF9F6 + Noto Serif KR + 딥 잉크 블루 #24408E) **폐기**
- 사용자 Figma 시안 "Desktop - 1"로 교체: 다크 #010A12 × 라이트 #F5F7FA × 액센트 #5183E8, Pretendard 단일
- Noto Serif KR·JetBrains Mono 폰트 로딩 제거 (성능 + 단일 체계)
- Figma에 없는 섹션은 시안 언어 확장으로 신규 디자인: Expertise(화이트 카드), Principles(다크 리스트 — Framework L01~L05와 번호 호응), Collaboration(라이트 카드), Contact/Footer(다크 북엔드로 히어로와 수미상관)

## 2026-07-02 — Figma 에셋 로컬 다운로드 + JPEG 압축

- MCP localhost 서버 URL을 코드에 직접 쓰지 않고 `src/assets/figma/`로 다운로드해 커밋
- 이유: 런타임/빌드가 Figma MCP에 의존하면 안 됨. 대형 PNG 2장은 sips로 JPEG 변환(각 ~5MB → ~0.5MB)
- Framework 슬랩·WhyData 화살표는 에셋 대신 인라인 SVG로 재현 — 색·투명도를 코드에서 제어하기 위함

## 2026-06 — 브랜치 이원화

- `main` = 다크 제품 서사 보존, `light` = 연구기업 리뉴얼
- 이유: 두 버전의 콘텐츠가 서로 매핑되지 않아 테마 토글 통합이 불가능. 브랜치로 분리 유지
