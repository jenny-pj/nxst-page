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
src/
├── App.jsx                  # 섹션 조립 (Hero → WhyData → ResearchAreas → Framework
│                            #   → Expertise → Principles → Collaboration → Contact → Footer)
├── index.css                # Tailwind @theme 토큰 + 전역 스타일 + 모션 키프레임
├── data/copy.js             # 전 섹션 카피 단일 소스 (Figma 텍스트 기준)
├── assets/figma/            # Figma에서 추출한 에셋 (hero-bg.jpg, logo-white.png, 궤도 SVG/PNG 등)
├── components/
│   ├── Nav.jsx              # 오버레이 네비 (스크롤 시 다크 반투명 전환, scrollspy)
│   ├── Hero.jsx             # 히어로 + 키워드 마퀴 + 선언 배너
│   ├── WhyData.jsx          # 플로우 다이어그램 (5노드, 산업 데이터 강조)
│   ├── ResearchAreas.jsx    # 궤도 다이어그램 (xl+ 절대배치 / 미만 그리드 폴백)
│   ├── Framework.jsx        # L01~L05 등각 슬랩 스택 (인라인 SVG)
│   ├── Expertise.jsx        # 역량군 카드 5개
│   ├── Principles.jsx       # 다크 섹션, 01~05 원칙 리스트
│   ├── Collaboration.jsx    # 협력 파트너 카드 4개
│   ├── Contact.jsx          # 다크 CTA (이메일 버튼 + 글로우)
│   ├── Footer.jsx           # 다크 푸터
│   ├── SectionHeader.jsx    # 공통 헤더 (eyebrow 질문 + 타이틀 답, dark 변형)
│   ├── Reveal.jsx           # IntersectionObserver 진입 모션 (1회, reduced-motion 대응)
│   └── ScrambleText.jsx     # factory.ai식 영문 디코드 효과 (1회, reduced-motion 대응)
└── hooks/
    ├── useScrollSpy.js
    ├── useMediaQuery.js
    └── usePrefersReducedMotion.js
```

## 배포

- Vercel (vercel/env 파일은 gitignore 처리됨)
- `npm run build` → `dist/` 정적 산출물
