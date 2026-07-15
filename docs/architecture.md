# Architecture

## 개요

- **프로젝트**: nextstud.io 회사 소개 사이트 (NEXTSTUDIO — Industrial Data for Physical AI)
- **형태**: 단일 페이지 SPA, 정적 빌드. 백엔드 없음.
- **스택**: React 18 + Vite 6 + Tailwind CSS v4 (`@theme` 토큰 방식)
- **폰트**: Pretendard Variable (jsdelivr CDN, dynamic subset)

## 브랜치 전략

| 브랜치 | 내용 |
|--------|------|
| `main` | 기존 다크 테마 사이트 (합성데이터 제품 서사) — 보존용 |
| `light` | 2026-06 리뉴얼 (연구기업 포지셔닝). 사용자 Figma 시안 "Desktop - 1" 기반 |

두 브랜치의 콘텐츠는 서로 매핑되지 않으므로 테마 토글로 합치지 않는다.

## 폴더 구조

```
public/                      # 정적 서빙 파일 (Tailwind 스캔 제외 — index.css의 @source not)
├── favicon.ico              # 파비콘 (신규 로고, 2026-07-07)
├── apple-touch-icon.png     # iOS 홈 화면 아이콘 (180×180)
├── og.png                   # SNS 공유 미리보기 (1200×630)
├── sitemap.xml / robots.txt # 검색엔진 크롤링
└── llms.txt                 # AI 검색(GEO)용 사이트 요약 — 카피 변경 시 함께 갱신할 것

src/
├── main.jsx                 # 엔트리 — touchstart 리스너 (iOS 탭-호버 활성화)
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
│   ├── ResearchAreas.jsx    # 궤도 다이어그램 (xl+ 절대배치 / 미만 그리드 폴백)
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

## 배포

- Vercel (vercel/env 파일은 gitignore 처리됨)
- `npm run build` → `dist/` 정적 산출물
