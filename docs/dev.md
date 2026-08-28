# Dev

## 로컬 실행

```bash
npm install
npm run dev          # Vite dev 서버 (기본 5173) — 프리렌더 없음, createRoot
npm run build        # 3단계: vite build → vite build --ssr → prerender (dist/index.html에 본문 베이크)
npm run build:client # 프리렌더 생략, 클라이언트만 (디버깅용)
npm run preview      # 빌드 결과 로컬 확인 (프리렌더 + 하이드레이션 검증용)
```

- Node.js LTS 기준.
- 현재 작업 브랜치: `seo` (정본은 `main`, `light`는 병합 완료된 리뉴얼 이력)
- 빌드 검증: `npm run build && npm run preview` 후 preview에서 콘솔에 하이드레이션 불일치
  경고가 없는지, `dist/index.html`에 `<h1>`·본문 텍스트가 들어갔는지 확인

## 환경 변수

| 변수 | 용도 | 위치 |
|------|------|------|
| `VITE_CONTACT_FORM_ID` | Contact 폼 FormSubmit 대상 — **현재 랜덤 알리아스 사용 중** (이메일 비노출) | Vercel env (Production/Preview) + 로컬 `.env.local` |

- `.env.local` 예시: `VITE_CONTACT_FORM_ID=<이메일 또는 알리아스>` — gitignore 대상, 커밋 금지 (public 저장소)
- 빌드 시점에 번들에 주입되므로 값 변경 후 재배포 필요
- FormSubmit은 도메인별 최초 1회 활성화 필요 — localhost와 프로덕션 각각 활성화

## Figma 에셋 워크플로

1. Figma 데스크톱 앱에서 프레임 선택 → Claude Code에서 Figma Dev Mode MCP로 추출
2. 에셋은 `localhost:3845`에서 `src/assets/figma/`로 다운로드해 커밋 (런타임에 MCP 의존 없음)
3. 대형 PNG는 `sips`로 JPEG 압축 (hero-bg 4.7MB→553KB, section-texture 5.1MB→506KB)

## 배포

```bash
npx vercel deploy --prod   # 프로덕션 배포 (jenny-pj Vercel 계정)
```

- GitHub 저장소: `jenny-pj/nxst-page` (정본 브랜치 `main`)
- 프로덕션 URL: https://nxst-page.vercel.app + 연결 도메인 `nextstud.io` / `www.nextstud.io`
- Vercel 프로젝트명: `nxst-page` (팀: `jenny-8405s-projects`)
- 현재 GitHub 자동 배포 연동 없음 — push 후 수동으로 `npx vercel deploy --prod` 실행 필요
- 배포 플로: 작업 브랜치에서 커밋·검증 → `main`으로 병합 → push → `npx vercel deploy --prod`
- `vercel --prod`(deploy 생략형)는 JSON 출력이 잘리는 문제가 있어 `vercel deploy --prod` 사용

## git 인증 (멀티 계정)

- gh에 `booo-st`와 `jenny-pj` 두 계정 로그인됨. 저장소 소유는 `jenny-pj`
- **push 403 (`denied to booo-st`)이 나면**: gh 활성 계정이 booo-st인 상태 — `gh auth switch --user jenny-pj`로 전환하거나, 일회성으로 jenny-pj 토큰을 credential helper로 주입해 push
