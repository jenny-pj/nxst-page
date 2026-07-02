# Dev

## 로컬 실행

```bash
npm install
npm run dev          # Vite dev 서버 (기본 5173)
npm run build        # dist/ 프로덕션 빌드
npm run preview      # 빌드 결과 로컬 확인
```

- Node.js LTS 기준. 환경 변수 없음.
- 현재 작업 브랜치: `light` (main은 다크 버전 보존용)

## Figma 에셋 워크플로

1. Figma 데스크톱 앱에서 프레임 선택 → Claude Code에서 Figma Dev Mode MCP로 추출
2. 에셋은 `localhost:3845`에서 `src/assets/figma/`로 다운로드해 커밋 (런타임에 MCP 의존 없음)
3. 대형 PNG는 `sips`로 JPEG 압축 (hero-bg 4.7MB→553KB, section-texture 5.1MB→506KB)

## 배포

- Vercel 연동 (CLI: `vercel`). 프리뷰 배포 후 production promote 방식 권장.
