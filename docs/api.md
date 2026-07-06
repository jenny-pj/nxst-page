# API

## 자체 API

### POST `/api/contact`

Contact 팝업 폼 제출을 FormSubmit으로 중계하는 Vercel 서버리스 함수 (`api/contact.js`).

- 요청: JSON body (폼 필드 그대로 — `_subject`, `_template`, 이름/이메일/소속/문의 유형/문의 내용)
- 응답: FormSubmit AJAX 응답 그대로 (`{ success: "true" | "false", message }`)
- 수신 이메일은 `CONTACT_EMAIL` 환경 변수로만 관리 — 클라이언트 번들·저장소에 비노출 (저장소가 public이므로 필수)
- FormSubmit이 활성화된 도메인의 Origin을 요구하므로, 프록시가 `https://nxst-page.vercel.app` Origin을 명시해 전달
- 로컬 dev: `vite.config.js`의 `server.proxy`가 같은 경로를 FormSubmit으로 중계 (`.env.local`의 `CONTACT_EMAIL` 사용)

## 외부 연동

| 대상 | 용도 | 비고 |
|------|------|------|
| FormSubmit.co (`formsubmit.co/ajax/…`) | Contact 폼 → 이메일 전달 | 가입 불필요, 도메인별 최초 1회 활성화 필요 |
| jsdelivr CDN | Pretendard Variable 폰트 | 비동기 로딩 (`media="print"` swap) |
| Figma Dev Mode MCP (`localhost:3845`) | 개발 시 에셋 추출 | 런타임 의존 없음 — 에셋은 `src/assets/figma/`에 다운로드 완료 |
