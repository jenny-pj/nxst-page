# Issues

## 해결됨

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

## 알려진 한계

- **궤도 다이어그램은 xl(1280px)+ 전용** — 미만 해상도는 카드 그리드 폴백 (Figma 절대좌표 기반이라 축소 시 카드 겹침)
- **이미지 용량** — hero-bg.jpg(553KB), section-texture.jpg(506KB). 추가 최적화 여지 있음 (todo 참고)
- **스크롤 스파이** — WhyData 섹션은 네비 항목이 없어 히어로~WhyData 구간에서 활성 표시 없음 (의도된 동작)
