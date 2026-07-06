# API

정적 사이트로 자체 API 없음.

## 외부 연동

| 대상 | 용도 | 비고 |
|------|------|------|
| FormSubmit.co (`formsubmit.co/ajax/…`) | Contact 팝업 폼 → 이메일 전달 | 브라우저에서 직접 AJAX 호출. 대상 주소는 빌드 env `VITE_CONTACT_FORM_ID`로 주입 (저장소 비노출) |
| jsdelivr CDN | Pretendard Variable 폰트 | 비동기 로딩 (`media="print"` swap) |
| Figma Dev Mode MCP (`localhost:3845`) | 개발 시 에셋 추출 | 런타임 의존 없음 — 에셋은 `src/assets/figma/`에 다운로드 완료 |

### FormSubmit 연동 상세

- 요청: `POST https://formsubmit.co/ajax/<VITE_CONTACT_FORM_ID>` — JSON body (`_subject`, `_template: table`, `_captcha: false`, 이름/이메일/소속/문의 유형/문의 내용)
- 응답: `{ success: "true" | "false", message }`
- 도메인(사이트)별 최초 1회 이메일 활성화 필요 (localhost와 프로덕션 별개)
- **서버 경유 불가**: FormSubmit 앞단 Cloudflare가 데이터센터(Vercel) IP를 403으로 차단 — 반드시 방문자 브라우저에서 직접 호출해야 함
- `VITE_CONTACT_FORM_ID`는 현재 FormSubmit 랜덤 알리아스 사용 — 번들·저장소 모두 이메일 비노출. 알리아스는 기존 도메인 활성화 상태를 그대로 승계
- 수신처 이메일을 바꾸려면: 새 이메일로 활성화 1회 → 새 알리아스 확보 → env 교체 후 재배포
