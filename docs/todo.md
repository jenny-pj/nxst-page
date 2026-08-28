# TODO

## 할 일

- [x] **2026-07-15 작업분 커밋·배포** — 카피 재작성(Hero/WhyData/Research/Framework/Expertise) + Framework 인터랙티브 리빌드 + Principles 5원칙 전면 재작성(배지·보더·레이아웃) + 섹션 eyebrow 영문화 + WhyData 플로우 분기 구조 개편(Figma 재동기화) + line-height 150% 전환 + 키워드 마퀴 버그 수정 + Expertise 역량 그룹 카드 전면 교체 — 2026-07-15 완료(commit `68b0463`, push+vercel 프로덕션 배포)
- [x] **Research Areas 등각 레이어 스택 커밋·배포** — 궤도 다이어그램 → System/Synthetic/Model/Foundation 4계층 등각 스택 전면 교체, 스크롤 pin/scrub 전환, 누적 하이라이트 마스크, 흐름 웨이브 애니메이션 — 2026-07-20 완료(commit `9054b35`, `161f234`)
- [x] **Research Areas pin — nav 겹침·스크롤 성능·짧은 뷰포트 대응** — 고정 Nav 뒤에 헤더가 가려지는 문제, 스크롤 버벅임(`will-change` 누락), 짧은 뷰포트에서 텍스트까지 축소되던 문제(이미지만 축소하도록 개선 + 790px 미만 StaticSection 폴백) — 2026-07-21 완료(commit `e2f537b`, `0a9f05f`)
- [x] **Expertise 협력 기관 로고 Figma 재동기화** — 로고 세트 갱신(11→12개), 위치를 논문 리스트 위로 이동, Figma 카드 비율·수동 크롭까지 정확히 재현 — 2026-07-21 완료(commit `e2f537b`)
- [x] **Framework 슬랩 SVG → CSS 재구현 + 좌우 여백 대칭화** — 모바일 헤더가 접힘 시임선을 뚫는 문제, 앞면/대각선 테두리 두께 불일치, hover 색상 회귀, 앞면 콘텐츠 좌우 여백 비대칭·L05 태그 오버플로우 — 2026-08-05 완료(commit `447d418`, `91c5614`, push+vercel 프로덕션 배포)
- [x] `public/llms.txt`를 신규 카피(연구기업 포지셔닝, 7개 연구분야 + L01~L05 + Core Expertise + Principles + Collaboration)로 갱신 — `light` 브랜치에서 완료, `main` 병합됨
- [x] **빌드 타임 프리렌더링 도입** — CSR SPA를 정적 HTML로 서빙, JS 미실행 크롤러(네이버·Bing·AI)가 본문을 보게. 자체 SSG(`renderToString`) — 2026-08-28 완료·배포. 라이브 `curl` 검증: `<h1>`×1, h2×5, h3×18, 본문 텍스트 ~18,400자 (기존 ~2,600 → 대부분 메타)
- [x] 카피 v2 확정 후 정리 — 2026-07-10 완료 (copy.js 병합, v1/v2/토글 제거, llms.txt 갱신)
- [ ] 모바일 실기기에서 인터랙션 검수 (reduced-motion 포함 — 데스크톱은 2026-07-02 검증 완료)
- [ ] 실기기 모바일 QA (iOS Safari 스크롤 성능)
- [x] **nextstud.io 도메인 DNS를 Vercel로 전환** — 2026-07~08 완료. 현재 `nextstud.io`/`www.nextstud.io` 모두 Vercel 프로젝트 빌드 서빙 (`x-vercel-cache` 확인)

### SEO·AEO·GEO·LLMO·NEO 최적화 (fire-your-seo-agency 진단 기반, 2026-08-28)

- [x] **프리렌더링 배포** — 2026-08-28 `seo` → `main` fast-forward 병합, `vercel deploy --prod` (dpl_A9S3cD77...). 라이브 검증 완료
- [ ] **www/non-www 정규화** — canonical·og:url·sitemap은 non-www인데 서버는 308로 www 강제. 한쪽으로 통일 (Vercel 도메인 설정 + 태그)
- [ ] **네이버 서치어드바이저 등록** (searchadvisor.naver.com) — 사용자 계정 필요, verification 메타 태그는 삽입 대행. Yeti 크롤 허용·사이트맵 제출
- [ ] **Bing Webmaster Tools 등록** — GSC에서 원클릭 임포트. Copilot·ChatGPT 검색이 Bing 색인 의존
- [ ] Google Search Console 등록 + sitemap.xml 제출 (기준선 측정용)
- [ ] JSON-LD `sameAs` 추가 — 링크드인·유튜브·보도자료 등 공식 표면 연결
- [ ] `public/llms-full.txt` 추가 + 회사소개 FAQPage JSON-LD (가시 텍스트와 100% 일치)
- [ ] `sitemap.xml` lastmod 빌드 시 자동 갱신 + 최종 URL(리다이렉트 안 되는) 사용
- [ ] 측정 기준선 기록(GSC·네이버 노출/클릭·AI 인용 O/X) → 배포 14일 후 재측정
- [x] 모바일 터치에서 hover 효과 발동 — 2026-07-07 완료 (실기기 확인, commit c27d1b9)
- [x] `light` 브랜치 커밋 (리뉴얼 + 인터랙션) — 2026-07-06 완료
- [x] 파비콘 신규 로고 반영 — 2026-07-07 완료 (`favicon.ico` + `apple-touch-icon.png`)
- [x] OG 이미지 제작·적용 — 2026-07-07 완료 (`og.png` 1200×630, 화이트 로고 + 다크 배경)
- [x] Vercel production 배포 — 2026-07-06~07 완료 (수동 `npx vercel deploy --prod` 플로)

## 안 하기로 한 것

- **main/light 테마 토글 통합** — 콘텐츠가 서로 매핑되지 않음, 브랜치 분리 유지
- **한글 텍스트 스크램블 효과** — 자소 분해 없이는 어색함, 영문 라벨에만 적용
- **Noto Serif KR / JetBrains Mono** — Figma 시안이 Pretendard 단일 체계

## 고민 중

- hero-bg/section-texture/research-stack-3d 추가 최적화 (WebP 변환, 반응형 srcset) — 3D 렌더 PNG 2장(611KB+201KB) 추가로 필요성 커짐
- Expertise(화이트) ↔ Principles(다크) 섹션 리듬이 시안 확장으로 적절한지 사용자 확인 필요
