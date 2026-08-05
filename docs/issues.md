# Issues

## 해결됨

### Research Areas pin 헤더가 고정 Nav 뒤에 가려짐 (2026-07-21 발견 → 당일 해결)
- 증상: 1440×900 등 흔한 노트북 해상도에서 "Physics-grounded Data & Intelligence" 타이틀이 화면 위쪽 고정 Nav 뒤로 가려져 보임 — 사용자는 처음엔 "위 섹션과 겹쳐 보인다"고 인지
- 원인: pin 콘텐츠가 `h-screen`에서 `justify-center`로 정중앙 배치되는데, Nav(88px, pin 구간 내내 화면에 떠 있음)를 위한 여백이 전혀 없었음. 헤더+이미지+gap 실측 합이 905px라 (뷰포트 높이-905)/2가 88px보다 작은 모든 케이스에서 발생 — 1920×1080도 브라우저 크롬 제외 시 해당
- 해결: 콘텐츠 실측 높이 기준 상단 여백을 `max(Nav여백, 중앙정렬 오프셋)`으로 계산해 항상 Nav 아래로 밀어냄. 이후 2026-07-21 후속 수정으로 "부족하면 축소"의 대상을 텍스트 전체에서 스택 이미지로만 좁힘(상세는 decisions.md)

### Research Areas 스크롤 버벅임 클레임 (2026-07-21 진단 → 당일 해결)
- 증상: "Research Area 스크롤할 때 버벅인다"는 사용자 클레임(개발 머신에서는 재현 안 됨)
- 원인: 마스킹된 스택 이미지·FlowPill의 `opacity`를 매 스크롤 프레임 React state로 직접 갱신하는데 `will-change` 힌트가 없어 매 프레임 재레이어화·래스터 비용 발생 — 저사양 기기·Safari에서 크게 나타날 구조적 문제
- 해결: 해당 엘리먼트에 `will-change: opacity` 추가. Chrome 트레이스 기준 RasterTask 비용 약 82% 감소 확인 (자세한 수치는 decisions.md)

### React `fetchPriority` 경고 (2026-07-02 발견 → 당일 해결)
- 증상: 콘솔에 "React does not recognize the `fetchPriority` prop" 경고
- 원인: React 18은 소문자 `fetchpriority` 표기 필요 (camelCase는 React 19부터)
- 해결: `Hero.jsx`의 img 속성을 `fetchpriority="high"`로 수정

### Contact 내비게이션 하이라이트 미작동 (2026-07-06 발견 → 당일 해결)
- 증상: navbar에서 Contact 클릭 시 이동은 되나 하이라이트가 Collaboration에 머묾. 페이지 끝까지 스크롤해도 동일.
- 원인: footer가 짧아 IntersectionObserver 가시 비율 기준으로는 contact 섹션이 collaboration보다 낮게 측정됨
- 해결: `useScrollSpy`에 `window.scrollY + innerHeight >= scrollHeight - 2` 최하단 감지 추가 → 페이지 끝 도달 시 마지막 id 강제 활성

### Vite CSS 분석 에러 (2026-07-06 발견 → 당일 해결)
- 증상: `[plugin:vite:css-analysis] ENOENT: ...tmp-connector/connector-bottom-left.svg`
- 원인: Figma에서 임시 다운로드한 SVG를 `src/` 내부에서 삭제하면, Vite의 CSS 분석 워처가 스테일 참조를 유지함
- 해결: dev 서버 재시작으로 캐시 초기화
- 예방: 임시 에셋은 `src/` 외부(scratchpad 등)에서 작업 후 필요한 것만 복사

### Contact 폼 "전송 실패" — FormSubmit 도메인별 활성화 (2026-07-06 발견 → 당일 해결)
- 증상: 폼 제출 시 실패 메시지. 활성화 후에도 localhost/프로덕션 중 한쪽만 동작.
- 원인: FormSubmit은 이메일이 아니라 **도메인(사이트)별로** 활성화를 요구 — localhost:5173과 nxst-page.vercel.app은 별개 폼으로 취급됨
- 해결: 각 도메인에서 최초 제출 → 발송되는 활성화 메일의 링크 클릭. 이후 서버리스 프록시 도입으로 실제 FormSubmit 호출 Origin이 프로덕션으로 통일되어 재발 여지 제거
- 참고: 수신처 이메일 변경 시 새 이메일로 활성화 1회 다시 필요

### Contact 프록시 403 — Cloudflare의 Vercel IP 차단 (2026-07-06 발견 → 당일 해결)
- 증상: `/api/contact` 서버리스 프록시가 FormSubmit 호출 시 403 (Cloudflare 차단 페이지 반환)
- 원인: FormSubmit 앞단 Cloudflare가 데이터센터(Vercel) IP를 차단. 브라우저 UA 위장도 무효, 로컬 Node에서는 성공 → IP 기반 차단
- 해결: 프록시 폐기, 브라우저 직접 호출 + 빌드 env(`VITE_CONTACT_FORM_ID`) 주입으로 전환
- 교훈: FormSubmit은 서버 경유 불가 — 반드시 방문자 브라우저에서 직접 호출

### Vite CSS 분석 ENOENT 재발 — 근본 원인은 Tailwind의 public/ 스캔 (2026-07-07 발견 → 당일 해결)
- 증상: `[plugin:vite:css-analysis] ENOENT: ...public/favicon.svg` — dev 서버 재시작 후에도 재발
- 원인: Tailwind v4가 클래스 자동 감지를 위해 `public/`까지 스캔하며 `addWatchFile`로 등록 → `vite:css-analysis`가 등록된 svg 파일 내용을 읽음(`fileToDevUrl`). 배포 플로의 `git checkout main`(구 트리)으로 favicon.svg가 잠깐 되살아났다 사라지면, 프로세스 내 스캐너 캐시가 삭제된 파일을 계속 참조해 매 CSS 변환이 500
- 해결: `src/index.css`에 `@source not "../public";` 추가 — public/은 정적 에셋 폴더라 스캔 불필요. 빌드 산출물 해시 동일(스타일 영향 0) 확인
- 참고: 2026-07-06의 동일 증상(connector svg) 이슈는 "재시작으로 해결"이라 기록했으나 임시방편이었음 — 이 항목이 근본 원인·해결에 해당. 파일 생성→삭제 재현 테스트 및 실제 배포 중 브랜치 전환에서 재발 없음 검증 완료

### 모바일에서 hover 효과 전부 미동작 (2026-07-07 발견 → 당일 해결)
- 증상: 터치 기기에서 카드 리프트·틴트 리빌·칩 필 등 모든 hover 인터랙션 무반응
- 원인: Tailwind v4가 `hover:` 변형을 `@media (hover: hover)`로 감싸 터치 전용 기기에서 스타일 자체를 배제 (v3 → v4 기본값 변경)
- 해결: `@custom-variant hover (&:hover)` 복원 + `touchstart` 트릭 + Principles `focus:` 완화 (근거·트레이드오프는 decisions.md)
- 주의: 새 hover 효과를 추가할 때 "터치에서도 탭으로 발동된다"를 전제로 설계할 것

### WhyData 키워드 마퀴가 와이드 화면에서 중간에 끊김 (2026-07-15 발견 → 당일 해결)
- 증상: `overflow-hidden border-y border-white/10 py-4` 키워드 마퀴가 재생 중 키워드가 사라졌다가 다시 나타남
- 원인: 리스트 2개만 복제해 `-50%` 이동하는 구조였는데, 복제 리스트 1개 너비(~1900px)가 화면 너비보다 좁은 와이드 화면(≥1920px 부근)에서는 이동 도중 트랙 끝의 빈 공간이 화면에 노출됨
- 해결: 복제 개수 2→4, `ticker` 애니메이션 duration 44s→88s(이동 거리 2배 보정)
- 참고: Expertise 파트너 로고 마퀴도 동일 구조(2-복제)라 초와이드 환경에서 같은 증상이 보이면 동일 처방 적용

### CSS `mask-image`가 조용히 드롭됨 — 따옴표 없는 url() 안의 data URI 홑따옴표 (2026-07-20 발견 → 당일 해결)
- 증상: ResearchAreas 3D 스택 렌더 위에 계층별 하이라이트 마스크를 씌웠는데, 스크롤해도 어느 계층도 컬러로 드러나지 않고 전부 흑백으로만 보임
- 원인: Vite 개발 서버가 4KB 미만 SVG를 URL-인코딩 raw data URI로 인라인(`data:image/svg+xml,%3csvg...preserveAspectRatio='none'...`) — 내부에 SVG 자체 속성용 홑따옴표(`'`)가 포함됨. 이를 `mask-image: url(${dataUri})`처럼 따옴표 없이 CSS에 넣으면, 따옴표 없는 `url()` 토큰 안에 홑/쌍따옴표가 나타나는 순간 파싱 오류가 되어 **해당 선언 전체가 조용히 드롭**됨(콘솔 에러 없음). 같은 style 객체의 형제 선언(mask-position, mask-size, mask-mode)은 값 자체엔 따옴표가 없어 정상 적용되었기 때문에, 처음엔 "밝기(luminance) 마스킹으로 반투명하게만 보이는 문제"로 오판해 마스크 fill을 흰색으로 바꾸는 등 잘못된 방향으로 먼저 대응함
- 진단: Playwright로 실제 dev 서버를 스크롤시켜 스크린샷 비교(계속 흑백) → `img.getAttribute('style')`로 인라인 스타일 문자열을 직접 덤프해 `mask-image` 선언 자체가 통째로 빠져 있는 것을 확인 → 컴포넌트에 임시 `console.log(hl.mask)`를 추가해 런타임 값이 홑따옴표 포함 data URI라는 사실을 최종 확정
- 해결: `mask-image`/`-webkit-mask-image` 값을 `url("${dataUri}")`로 따옴표를 씌워 감쌈 — Figma가 자체 생성한 참조 코드도 원래 이 형태(`url("${img}")`)로 따옴표를 씌우고 있었는데, 코드를 옮기며 따옴표를 빠뜨린 것이 직접 원인
- 교훈: Vite/번들러가 반환하는 asset URL(특히 SVG)을 인라인 스타일의 CSS `url()`에 넣을 땐 항상 따옴표로 감쌀 것 — dev 모드 쿼리스트링(`?t=...&import`)이나 소용량 SVG의 특수문자 포함 data URI 인라인 등, 값 자체를 신뢰할 수 없는 경우가 많음

## 알려진 한계

- **Research Areas pin/scrub은 lg(1024px)+ 이면서 뷰포트 높이 790px 이상에서만 동작** — 그 외(미만 해상도·`prefers-reduced-motion`·790px 미만 짧은 뷰포트)는 정적 세로 배치 폴백(pin 없이 스택 1장 + 순차 등장). 2026-07-20 궤도 다이어그램 폐기로 기존 "xl 미만 카드 그리드 폴백" 한계는 해소됨, 2026-07-21 뷰포트 높이 임계값 폴백 추가
- **이미지 용량** — hero-bg.jpg(553KB), section-texture.jpg(506KB), research-stack-3d.png(611KB), research-stack-3d-dim.png(201KB). 추가 최적화 여지 있음 (todo 참고)
- **스크롤 스파이** — WhyData 섹션은 네비 항목이 없어 히어로~WhyData 구간에서 활성 표시 없음 (의도된 동작)
