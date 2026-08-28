# Architecture

## 개요

- **프로젝트**: nextstud.io 회사 소개 사이트 (NEXTSTUDIO — Industrial Data for Physical AI)
- **형태**: 단일 페이지 SPA (React), **빌드 타임 프리렌더링**으로 정적 HTML 서빙. 백엔드 없음.
- **스택**: React 18 + Vite 6 + Tailwind CSS v4 (`@theme` 토큰 방식)
- **폰트**: Pretendard Variable (jsdelivr CDN, dynamic subset)
- **렌더링**: `renderToString` 기반 자체 SSG. `dist/index.html`의 `#root`에 전체 마크업이
  베이크되고, 브라우저는 `hydrateRoot`로 이어받는다. JS 미실행 크롤러도 본문을 본다.

## 브랜치 전략

| 브랜치 | 내용 |
|--------|------|
| `main` | **정본 브랜치.** 2026-08-28 `light`(2026 리뉴얼)를 `--no-ff` 병합해 일원화. 프로덕션 배포 대상 |
| `light` | 리뉴얼 개발 이력 보존용 (병합 완료, 더는 작업 안 함) |
| `seo` | 검색·AI 인용 최적화 작업 브랜치 (2026-08, `main`에서 분기) |

> 구 다크 테마 사이트(합성데이터 제품 서사)는 `main`의 병합 이전 이력(`3848880` 및 그 이전)에만 존재.

## 폴더 구조

```
public/                      # 정적 서빙 파일 (Tailwind 스캔 제외 — index.css의 @source not)
├── favicon.ico              # 파비콘 (신규 로고, 2026-07-07)
├── apple-touch-icon.png     # iOS 홈 화면 아이콘 (180×180)
├── og.png                   # SNS 공유 미리보기 (1200×630)
├── sitemap.xml / robots.txt # 검색엔진 크롤링 (<lastmod>는 빌드 시 prerender.mjs가 자동 갱신)
├── llms.txt                 # AI 검색용 간결 요약 + llms-full.txt 링크 (거의 안 바뀜)
└── llms-full.txt            # 전체 카피 평문 + FAQ Q&A — 카피(copy.js) 변경 시 이 파일만 동기화

src/
├── main.jsx                 # 클라이언트 엔트리 — 프리렌더 마크업 있으면 hydrateRoot,
│                            #   없으면(dev) createRoot. touchstart 리스너(iOS 탭-호버)
├── entry-server.jsx         # SSG 엔트리 — renderToString(<App/>). scripts/prerender.mjs가 사용
├── App.jsx                  # 섹션 조립 (Hero → WhyData → ResearchAreas → Framework
│                            #   → Expertise → Principles → Footer)
├── index.css                # Tailwind @theme 토큰 + 전역 스타일 + 모션 키프레임
│                            #   (@custom-variant hover — 터치 기기 hover 발동)
├── data/copy.js             # 전체 카피 단일 소스 (버전 토글 없음)
├── assets/figma/            # Figma에서 추출한 에셋 (hero-bg.jpg, logo-white.png, 궤도 SVG/PNG 등)
│   └── partners/            # 협력 기관 로고 11장 (구 Collaboration → Expertise로 이관, 2026-07-14)
├── components/
│   ├── Nav.jsx              # 오버레이 네비 (스크롤 시 다크 반투명 전환, scrollspy)
│   ├── Hero.jsx             # 히어로 + 키워드 마퀴 + 선언 배너
│   ├── WhyData.jsx          # 플로우 다이어그램 (5노드, 산업 데이터 강조)
│   ├── ResearchAreas.jsx    # 등각 레이어 스택(2026-07-20): System→Synthetic→Model→Foundation,
│   │                        #   스크롤 pin/scrub 전환 + 누적 하이라이트 마스크 + 흐름 웨이브
│   ├── Framework.jsx        # L01~L05 등각 슬랩 스택 — 인터랙티브(2026-07-15): 파이프라인
│   │                        #   크럼, 호버/클릭-고정 디테일 펼침, 흐름 커넥터, 물리 검증 레일
│   ├── Expertise.jsx        # L01~L05 파이프라인 축 + 역량 그룹 카드 2×2(G01~G04, 커버리지 바,
│   │                        #   hover/클릭-고정 아이템 펼침) + 연구 성과 하이라이트(통계·논문·로고 마퀴)
│   ├── Principles.jsx       # 다크 섹션, 01~05 원칙 리스트
│   ├── Footer.jsx           # 다크 푸터 (#contact 앵커, Contact Us 버튼 → 모달)
│   ├── ContactModal.jsx     # 문의 폼 팝업 (FormSubmit.co AJAX, env 주입 알리아스)
│   ├── SectionHeader.jsx    # 공통 헤더 (eyebrow 질문 + 타이틀 답, dark 변형)
│   ├── Reveal.jsx           # IntersectionObserver 진입 모션 (1회, reduced-motion 대응)
│   └── ScrambleText.jsx     # factory.ai식 영문 디코드 효과 (1회, reduced-motion 대응)
└── hooks/
    ├── useScrollSpy.js
    ├── useMediaQuery.js
    └── usePrefersReducedMotion.js
```

> `Collaboration.jsx`는 2026-07-14 제거됨 (협력 파트너 카드 → Expertise 섹션의 로고 마퀴로 통합). `copy.v1.js`/`copy.v2.js`/`CopyVersionToggle.jsx`는 2026-07-10 카피 확정 시 제거됨 — git 히스토리 참고.

## 빌드 파이프라인

`npm run build` 3단계 (Vercel 빌드도 동일):

1. `vite build` — 클라이언트 번들 + `dist/index.html` 템플릿
2. `vite build --ssr src/entry-server.jsx --outDir dist/server` — SSR 번들
3. `node scripts/prerender.mjs` — SSR 렌더 결과를 `dist/index.html`의 `<div id="root">`에
   주입, `dist/sitemap.xml`의 `<lastmod>`를 빌드 날짜(UTC)로 갱신, `dist/server` 정리,
   텍스트 길이 sanity check (500자 미만이면 빌드 실패)

- 추가 npm 의존성·헤드리스 브라우저 불필요 (라우트가 `/` 하나뿐이라 `renderToString`만 사용)
- `npm run build:client` — 프리렌더 없이 클라이언트만 빌드 (디버깅용)

## 배포

- Vercel (vercel/env 파일은 gitignore 처리됨)
- `npm run build` → `dist/` 정적 산출물
- 도메인 `nextstud.io` / `www.nextstud.io` 는 Vercel 프로젝트에 연결됨. **정본은 non-www** —
  `www`는 308로 `nextstud.io`에 리다이렉트 (2026-08-28 정규화). 모든 메타 태그·sitemap도 non-www
- DNS: GoDaddy(ns51/52.domaincontrol.com). GSC는 이 DNS의 TXT 레코드로 도메인 속성 인증됨
