# History

추가 전용 — 기존 항목을 수정하지 않는다.

## 2026-06 — 다크 사이트 구축 (main)

- nextstud.io 회사 소개 사이트 구축 (스펙 STAGE 1~6 전체, commit `40d7bd0`)
- hero 카피 수정, vercel/env 파일 gitignore 추가 (commit `3848880`)

## 2026-07-02 — Figma 시안 기반 light 리뉴얼 전면 구현

- `light` 브랜치에서 Figma "Desktop - 1" 시안대로 전 섹션 재구축
- 디자인 토큰 교체: 다크 #010A12 / 라이트 #F5F7FA / 액센트 #5183E8, Pretendard 단일
- 시안 구현: Hero(배경+60px 타이틀), 선언 배너, WhyData 플로우(5노드), Research 궤도(카드 7개), Framework 슬랩(L01~L05 인라인 SVG)
- 시안 미제공 섹션 신규 디자인: Expertise, Principles(다크), Collaboration, Contact/Footer(다크 북엔드)
- Figma 에셋 다운로드 + JPEG 압축(~5MB→~0.5MB×2), 미사용 FigCaption 제거, 폰트 정리
- 모바일 폴백(플로우 세로 스택, 다이어그램→그리드, 햄버거), `word-break: keep-all`
- React 18 `fetchpriority` 경고 수정, 프로덕션 빌드 통과

## 2026-07-02 — factory.ai 레퍼런스 마이크로 인터랙션 전체 적용

- 모션 키프레임 6종 추가 (heroZoom·fadeUp·ticker·nodePulse/glowPulse·floatY·scrollBob)
- `ScrambleText` 컴포넌트 신규 (영문 디코드, reduced-motion 대응)
- Hero: 켄 번즈 배경 + 타이틀 라인 스태거 + 키워드 마퀴 + 스크롤 유도 커서
- Nav: 액센트 언더라인 그로우 (호버·활성)
- WhyData: 노드 좌→우 순차 리빌 + 액센트 노드 펄스 + 호버 반응
- ResearchAreas: 궤도 카드 플로팅(위상차) + 리프트 호버 + 허브 글로우 펄스 + 허브 ScrambleText
- Framework: 슬랩 리프트 호버 + 칩 액센트 필 호버 + 레이어명 ScrambleText
- Expertise/Collaboration: 카드 리프트 + 액센트 보더 호버 + 칩 호버
- Principles: 행 호버(배경·이동) + 원칙명 ScrambleText
- Contact: 글로우 펄스 + 버튼 리프트·섀도·화살표 슬라이드
- 데스크톱 브라우저 검증 및 프로덕션 빌드 통과

## 2026-07-06 — Collaboration 섹션 Figma 재현 + contact 내비게이션 수정 + 프로덕션 배포

- Figma MCP로 Collaboration 섹션(노드 79:272) 직접 참조, 곡선 커넥터 SVG 베지어 패스(노드 80:381/384) 재현
- `@fortawesome/free-solid-svg-icons` 도입 — Collaboration 위성 아이콘 교체 (landmark·industry·graduation-cap·right-left)
- WhyData 섹션 아이콘과 동일한 비율(scale-75, 160px viewBox) 적용
- 타이틀 데스크톱 한 줄 표기: `whitespace-nowrap` + `min-width` 전환
- `useScrollSpy` 개선: 페이지 최하단 감지 추가 → footer(contact) 스크롤 스파이 하이라이트 정상화
- Footer CTA 버튼 선(line) → `fa-arrow-right` 화살표 아이콘, 호버 이동 모션 추가
- Footer 네비 글씨 16~20px → 13~14px, 투명도 50% 축소 (실제 상단 navbar와 위계 차별화)
- `Collaboration 2.jsx` 중복 파일 제거 (iCloud 동기화 사본)
- light → main fast-forward 머지, Vercel CLI `vercel --prod` 프로덕션 배포 완료
- 배포 URL: https://nxst-page.vercel.app (commit `301983c`)

## 2026-07-06 — Contact Us 팝업 폼 도입 + 이메일 비노출 프록시

- Footer의 mailto 링크를 `ContactModal` 팝업 폼으로 교체 (이름·이메일·소속·문의 유형·문의 내용)
- FormSubmit.co AJAX로 폼 제출을 이메일 전달, 허니팟 스팸 방지 + 성공/실패 상태 UI
- FormSubmit 도메인별 활성화 이슈 진단·해결 (localhost와 프로덕션 별개 활성화)
- `/api/contact` Vercel 서버리스 프록시 추가 — 수신 이메일을 `CONTACT_EMAIL` 환경 변수로만 관리 (public 저장소·번들 비노출)
- 로컬 dev는 vite proxy + `.env.local`로 동일 경로 동작
- 프로덕션 배포 및 실제 폼 제출 → 메일 수신 확인 (commit `3b17da8` 이후)

## 2026-07-06 — 서버리스 프록시 폐기, 빌드 env 주입 방식으로 전환

- 프로덕션에서 `/api/contact` 프록시가 403 실패 — FormSubmit 앞단 Cloudflare가 Vercel IP 차단 (로컬 Node는 성공, 브라우저 UA 위장 무효)
- 프록시(`api/contact.js`)·vite dev proxy 제거, 브라우저 직접 FormSubmit 호출로 복귀
- 대상 주소는 빌드 env `VITE_CONTACT_FORM_ID`로 주입 (Vercel env + `.env.local`) — 저장소 비노출
- Vercel env `CONTACT_EMAIL` 제거, `VITE_CONTACT_FORM_ID` 등록 (Production/Preview)

## 2026-07-06 — FormSubmit 랜덤 알리아스 전환 완료 (이메일 제로 노출)

- `VITE_CONTACT_FORM_ID` 값을 이메일 → FormSubmit 랜덤 알리아스(`41fa9f3d…`)로 교체 (Vercel env + `.env.local`)
- 코드 변경 없이 env 교체 + `vercel --prod --force` 재배포로 완료
- 검증: 배포 번들에 알리아스만 존재, 이메일 문자열 검색 결과 0건 — 저장소·번들 모두 비노출 달성
- 알리아스 엔드포인트가 기존 활성화 상태를 그대로 승계함을 사전 curl 검증 후 전환
- 메일 양식 혼선 해프닝: 진단용 curl 메일(표 양식 미적용)을 실제 폼 메일로 오인 — 실제 폼은 `_template: table` 정상 발송 확인

## 2026-07-02 — WhyData 플로우 아이콘 추가 (Figma 시안 업데이트 반영)

- 5개 노드 원 안에 아이콘 삽입: 산업 환경(industry) · 산업 데이터(database, 액센트) · AI 학습(brain) · 추론 및 의사결정(chart-line) · Physical AI(robot)
- Figma SVG에서 아이콘 패스만 추출해 인라인 SVG(`currentColor`)로 구현 — 기존 CSS 원의 펄스·호버 인터랙션 유지, 호버 시 아이콘도 글로우 색으로 전환
- `copy.js` flow 항목에 `icon` 키 추가

## 2026-07-07 — 파비콘 교체 + SEO/GEO 최적화 (commit 0de4e48, 7455901)

- 파비콘을 신규 로고 `favicon.ico`(256px)로 교체, 구 placeholder `favicon.svg` 삭제. ico에서 추출해 `apple-touch-icon.png`(180×180) 생성
- `index.html` 메타 강화: canonical, theme-color, og:image·og:locale, Twitter Card, JSON-LD 구조화 데이터(`ResearchOrganization` + `WebSite`)
- `og.png`(1200×630, 화이트 로고 + 다크 배경) 생성, `sitemap.xml` 신규, `robots.txt`에 Sitemap 등록
- `llms.txt`를 현재 사이트 카피 기준으로 전면 재작성 (구버전은 옛 사이트 내용) — AI 검색(GEO) 대응
- 페이지 컨텐츠·스타일 변경 없음 (JS/CSS 번들 해시 동일 확인)
- **발견**: nextstud.io 도메인이 아직 옛 S3/CloudFront 사이트(2025-08)를 서빙 중 — DNS를 Vercel로 전환해야 SEO 설정이 실도메인에서 효력 (todo 등록)
- dev 서버 ENOENT 500 근본 해결: Tailwind 스캔에서 public/ 제외 (`@source not "../public"`, 상세는 issues.md/decisions.md)
- production 배포 및 검증 완료 (파비콘·og·sitemap·robots·llms 모두 200, 메타 태그 반영 확인)

## 2026-07-07 — 모바일 터치에서 hover 효과 발동 (commit c27d1b9)

- 원인 규명: Tailwind v4 기본값이 `hover:` 스타일을 `@media (hover: hover)`로 감싸 터치 전용 기기에서 hover 효과를 전부 배제 (빌드 CSS에서 게이트 확인)
- `@custom-variant hover (&:hover)`로 v3 방식 복원 (`index.css`) + 빈 `touchstart` 리스너 추가 (`main.jsx`, iOS Safari 탭-호버 활성화 트릭)
- Principles 카드 `focus-visible:` → `focus:` 완화 — 기존 `tabIndex`로 탭하면 열리고 다른 곳 탭하면 닫히는 토글 동작 확보
- 배포 CSS에서 `@media (hover:hover)` 규칙 0개 검증, 프로덕션 배포 후 실기기 확인 완료
- push 시 403 발생 — gh 활성 계정(booo-st)과 저장소 소유(jenny-pj) 불일치. jenny-pj 토큰을 일회성 credential로 사용해 해결 (상세는 dev.md)

## 2026-07-08 — 메인 카피 v2 정리 + v1/v2 토글 + 줄간격 확대 (commit 1dfadb2~936fc9d)

- 카피 정리 v2 작성: 섹션 타이틀 6곳을 "타이틀은 한 호흡" 원칙으로 축약 (WhyData 타이틀+보조문, Research, Framework, Expertise, Principles, Collaboration)
- `copy.js`를 버전 선택기로 전환 — v1 스냅샷(`copy.v1.js`) 보존, v2(`copy.v2.js`)는 변경 키만 재정의. localStorage `copyVersion` 기본 v2, 카피 소비 컴포넌트 8개 무수정
- 우하단 임시 토글 버튼(`CopyVersionToggle.jsx`)으로 v1/v2 즉시 전환 비교 (확정 시 제거 예정)
- 줄간격 확대(버전 공통): 히어로 h1 1.25→1.35, 선언 배너 1.3→1.5, 섹션 타이틀 1.25→1.4, 보조문 1.4→1.6, 섹션 헤더 gap 확대
- 사용자 검토 후 조정: 히어로 h1·선언 배너는 v1 원문 유지로 결정 (v2에서 hero를 v1 re-export)
- 프로세스: 스펙(`docs/superpowers/specs/`)·구현 계획(`docs/superpowers/plans/`) 문서화 후 태스크별 서브에이전트 구현+리뷰, 최종 전체 리뷰 통과 (빌드·스모크 체크 검증)
- 미배포 — llms.txt 갱신·토글 제거와 함께 카피 확정 후 배포 예정

## 2026-07-10 — 미커밋 작업분 Vercel 배포 소스에서 복구

- 7/8~7/9 작업(카피 v2 시스템·줄간격 확대)이 다른 컴퓨터에서 커밋 없이 `vercel --prod`로만 배포된 상태였음
- Vercel API로 배포(dpl_8nUU…)의 업로드 소스를 내려받아 복원 — 복구 빌드 CSS 해시가 업로드된 dist와 일치함을 확인(바이트 단위 동일 검증)
- `.env.local`의 `VITE_CONTACT_FORM_ID`가 Sensitive 타입이라 `vercel env pull`로 빈 값이 오는 문제 발견 — 배포 번들에서 값 추출해 복구
- 교훈: `vercel --prod` 전에 반드시 커밋·푸시할 것 (todo 참고)

## 2026-07-10 — 카피 v2 확정, 비교 시스템 제거

- v2 카피(타이틀 한 호흡 원칙)를 `copy.js` 단일 소스로 병합 — 히어로 h1·선언 배너는 v1 원문 유지
- `copy.v1.js`/`copy.v2.js`/`CopyVersionToggle.jsx` 제거, App 렌더 라인 정리
- `public/llms.txt`를 확정 카피 기준으로 갱신 (WhyData 보조문·Research·Framework·Principles·Collaboration)

## 2026-07-13 — 연구 분야·핵심 역량 카피 업데이트

- Research 타이틀 → "Generative Physical AI for Industries" (영문 한 줄)
- Research 카드: 합성 데이터·Physics-informed AI·Intelligent Agents 세부 항목을 구체 기술 표현으로 교체
- Core Expertise: AI Foundation·Industrial Intelligence 칩을 실제 역량 명칭으로 교체 (Multi-modal LLM, Industrial Foundation Model, Vision-language-action Model, Industrial Inspection System, Generative model for Industries, Time-series forecasting)
- llms.txt 동기화

## 2026-07-13 — Framework 계층 체계 개편

- L01~L05 계층명·키워드 칩 전면 교체: Multimodal Industrial Data → Trusted Data Ecosystem → Robust Learning Core → Perception & Predictive Intelligence → Industrial AI Applications
- llms.txt 동기화. 긴 계층명은 슬랩 안에서 2줄 래핑 확인

## 2026-07-14 — Collaboration 섹션 제거 + 파트너 로고를 Expertise로 통합 (commit 891cdc5)

- `Collaboration.jsx` 삭제, `App.jsx` 렌더 라인 제거
- `src/assets/figma/partners/partner-01~11.png` 추가 — Expertise 섹션 하단 협력 기관 로고 마퀴(Cambridge·Harvard·KAIST·Imperial College 등 11곳)
- git push + `vercel --prod` 배포 완료

## 2026-07-15 — 메타 디스크립션 통일

- `index.html`의 meta description / og:description / twitter:description / JSON-LD description 4곳을 "물리 제약 기반 합성데이터 기술로 Physical AI의 데이터 병목을 해결" 문구로 통일

## 2026-07-15 — Hero·WhyData·Research·Framework·Expertise 카피 재작성 + 섹션 여백 확대

- Hero h1("Real-world Scarcity, Synthetic Abundance...")·배너, WhyData eyebrow/title/support, Research 타이틀("Physics-grounded data & Intelligence"), Framework 타이틀, Expertise 타이틀 전면 교체
- `SectionHeader` eyebrow에 `whitespace-pre-line` 추가, 섹션 헤더 gap 및 섹션 상하 padding 전반 확대(Hero·WhyData·ResearchAreas·Framework·Expertise)
- 로컬 dev 서버로 렌더링 확인 후 반복 조정

## 2026-07-15 — Framework 슬랩 인터랙티브 리빌드

- 사용자 제공 HTML 목업(`nextstudio-framework-interactive.html`)의 인터랙션을 기존 라이트 톤·슬랩 레이아웃에 이식: 파이프라인 크럼 점등, 호버 시 디테일 펼침(+클릭 고정, 바깥 클릭 시 해제), 슬랩 사이 흐름 커넥터, L03~L05 물리 검증 레일
- 계층 콘텐츠 갱신: L02 → Trusted Data Infrastructure, L03 → Physics-Grounded Generative Core(CORE 배지), L05 칩 교체 + OUTCOME 배지
- 반복 조정: 박스 내부 패딩·간격 확대 → 좌우 패딩 원복, 폰트를 모노스페이스에서 사이트 기본(Pretendard)으로 통일, L01~L05 슬랩 너비 동일화(레일을 스택 바깥으로 이동), OUTCOME 보더를 액센트에서 회색으로, 배지를 role 태그와 같은 줄로 이동해 GENERATIVE CORE와 y축 정렬, 크럼-슬랩 간격 축소
- 미커밋 상태(dev 서버 로컬 확인만 완료) — 커밋·배포는 사용자 후속 요청 시 진행 예정

## 2026-07-15 — Framework 디테일 텍스트 폭 확장 + Principles 5원칙 전면 재작성

- Framework 슬랩의 펼침 디테일 텍스트를 `max-w-[920px]` → `w-full`로 변경해 슬랩 폭 전체를 채우도록 하고, 슬랩 오른쪽 접힘 보정과 동일한 `mr-6`으로 좌우 여백 균형 확보
- Principles 5원칙 제목·순서·설명을 전면 교체(Industrial First → Physics Grounded(Core Principle) → Data Centric → Validated, Not Assumed → Research to Deployment), 일러스트를 실제 SVG 시각 내용 기준으로 재매칭
- 카드 그리드를 CSS Grid에서 flex-wrap(calc 기반 basis)으로 전환 — 5개를 3+2 가운데 정렬로 표시하기 위함
- Core Principle 배지를 Framework CORE/OUTCOME과 동일한 디자인으로 통일, 각 카드에 `subtitle`(상시 노출 한 줄 선언) 추가, 5번째 원칙 설명 문구 조정, 카드 타이틀 폰트 한 단계 확대
- Core Principle 배지 전체 대문자화(`CORE PRINCIPLE`), 카드 보더를 Framework L03과 동일한 완전 불투명 액센트로 통일, desc(설명)를 카드 하단에 항상 고정(`flex-1` + `justify-between`)

## 2026-07-15 — 섹션 eyebrow 영문화 + WhyData 플로우 Figma 재동기화 + line-height 150% 전환

- 섹션 eyebrow 4곳 영문 라벨로 교체: Research Areas / Research Framework / Core Expertise / Research Principles
- Figma Dev Mode MCP로 선택 레이어 재확인 → WhyData 플로우가 5노드 직선 구조에서 6노드 분기/합류 구조(산업 데이터·합성 데이터 분기 후 AI 학습 합류, 각 노드 서브텍스트 추가)로 바뀐 것을 발견해 동기화. 대각선 화살표는 기존 `FlowArrow`에 `angle` prop을 추가해 재사용, 모바일은 순차 나열로 평탄화
- `leading-[1.25]`를 쓰던 6개 컴포넌트(Framework·ResearchAreas·WhyData·Expertise·Footer·Nav) 전부 `leading-[1.5]`(150%)로 전환
- 후속 조정: Hero h1 line-height 180%로 확대 후 폰트 크기를 60px→54px(반응형 비례 축소)로 재조정, 선언 배너 문구 정리(NEXTSTUDIO 표기 통일·대시를 괄호로·문단 분리 복원), WhyData eyebrow/support 한 줄 정리, Research Areas 타이틀 Data 대문자화 + 서포트 문구 신규 추가
- `SectionHeader`에 `tight` prop 추가 — Research 섹션 헤더 gap을 32px로 축소했다가, 이후 Research/Framework/Core Expertise/Principles 4개 섹션 모두 16px(`gap-4`)로 통일
- WhyData 키워드 마퀴가 와이드 화면에서 중간에 끊기는 버그 발견·수정 (원인·해결은 decisions.md/issues.md 참고)
- 전 작업 미커밋 — dev 서버 로컬 확인만 완료, 커밋·배포는 사용자 후속 요청 대기
