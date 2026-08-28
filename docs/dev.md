# Dev

## 로컬 실행

```bash
npm install
npm run dev          # Vite dev 서버 (기본 5173)
npm run build        # dist/ 프로덕션 빌드
npm run preview      # 빌드 결과 로컬 확인
```

- Node.js LTS 기준.
- 현재 작업 브랜치: `light` (main은 다크 버전 보존용)

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

- GitHub 저장소: `jenny-pj/nxst-page` (main 브랜치)
- 프로덕션 URL: https://nxst-page.vercel.app
- Vercel 프로젝트명: `nxst-page` (팀: `jenny-8405s-projects`)
- 현재 GitHub 자동 배포 연동 없음 — push 후 수동으로 `npx vercel deploy --prod` 실행 필요
- 배포 플로: `light`에서 커밋 → push → `main`으로 checkout 후 `--ff-only` 머지 → 양쪽 push → `light` 복귀 → vercel 배포
- `vercel --prod`(deploy 생략형)는 JSON 출력이 잘리는 문제가 있어 `vercel deploy --prod` 사용

## git 인증 (멀티 계정)

- gh에 `booo-st`와 `jenny-pj` 두 계정 로그인됨. 저장소 소유는 `jenny-pj`
- **push 403 (`denied to booo-st`)이 나면**: gh 활성 계정이 booo-st인 상태 — `gh auth switch --user jenny-pj`로 전환하거나, 일회성으로 jenny-pj 토큰을 credential helper로 주입해 push
