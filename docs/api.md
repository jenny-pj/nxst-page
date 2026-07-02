# API

정적 사이트로 자체 API 없음.

## 외부 연동

| 대상 | 용도 | 비고 |
|------|------|------|
| `mailto:jin@nextstud.io` | Contact CTA | 폼 없음, 메일 클라이언트 호출 |
| jsdelivr CDN | Pretendard Variable 폰트 | 비동기 로딩 (`media="print"` swap) |
| Figma Dev Mode MCP (`localhost:3845`) | 개발 시 에셋 추출 | 런타임 의존 없음 — 에셋은 `src/assets/figma/`에 다운로드 완료 |
