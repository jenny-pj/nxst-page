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
- [x] **www/non-www 정규화** — 2026-08-28 완료. Vercel에서 `nextstud.io`(non-www)를 primary로, `www`는 308 리다이렉트. 모든 태그가 이미 non-www라 코드 수정 없음. 라이브 검증: `www` → `nextstud.io` 308
- [x] **네이버 서치어드바이저 등록** — 2026-08-28 verification 메타 태그 배포(commit `c4edcd1`). content=`d13e45c3af9dc9...`. **남음: 콘솔에서 "확인" 클릭 + 사이트맵 제출**
- [x] **Bing Webmaster Tools 등록** — 2026-08-28 사용자가 GSC 임포트로 완료
- [x] **Google Search Console 등록** — 2026-08-28 완료. GoDaddy 연결로 **도메인 속성**(DNS TXT `google-site-verification=rkDlCvQp...`) 인증 — www·non-www·하위도메인 전부 커버
- [x] **사이트맵 제출** — 2026-08-28 사용자가 GSC·네이버·Bing 3곳 모두 제출. 네이버 소유확인·수집요청도 완료
- [x] **robots.txt AI 크롤러 명시 허용** — 2026-08-28 완료. GPTBot·OAI-SearchBot·ClaudeBot·PerplexityBot·Google-Extended·Applebot-Extended·CCBot 등 15개 명시 Allow 블록
- [x] **이미지 WebP 최적화** — 2026-08-28 완료. `hero-bg`(553KB→62KB, 1920w 리사이즈), `research-stack-3d`(760KB→75KB), `-dim`(409KB→61KB). 합계 1,722KB→198KB. `<img>`·마크업 그대로, import 확장자만 교체. 로컬 preview 시각 확인 OK
- [ ] JSON-LD `sameAs` 추가 — 공식 표면 URL(링크드인 등)이 아직 없음. 생기면 추가
- [~] **한글 브랜드명("넥스트스튜디오") 검색 대응** — 2026-09-09 착수
  - 문제: "넥스트스튜디오"가 크롤 대상 본문에 0회(title·description·h1~·푸터 전부 영문, JSON-LD `alternateName`에만 존재). 동명 선점 경쟁자 `넥스트스튜디오스`(nextstudios.co.kr, 인천 영상 스튜디오, 위키백과·나무위키 보유)가 Google 1페이지 독점
  - 온페이지 완료: `<title>`/og/twitter → `NEXTSTUDIO(넥스트스튜디오) — ...`, 푸터 copyright 위에 `넥스트스튜디오(NEXTSTUDIO)` 1줄(`footer.entity`) 추가
  - meta description(+og/twitter/JSON-LD description) 앞에 `넥스트스튜디오(NEXTSTUDIO)는...` 병기 — 2026-09-09 완료
  - 참고: JSON-LD `address`(PostalAddress 김해)·`telephone`·`email`·`knowsAbout`는 이미 있음(추가 불필요)
  - 온페이지 미완: llms.txt 제목 한글 병기
  - 오프페이지(핵심 레버, 사용자): 구글 비즈니스 프로필(김해), 네이버 스마트플레이스+기업정보, 스타트업 DB(더브이씨·로켓펀치·혁신의숲·잡코리아), 나무위키/위키백과, 한국어 보도자료 — 모두 "넥스트스튜디오" 표기 통일
  - 현실: 정확 일치 "넥스트스튜디오" 1페이지는 수개월+오프페이지 싸움. "넥스트스튜디오 김해/합성데이터/physical ai" 조합은 온페이지만으로 단기 가능
- [x] `public/llms-full.txt` 추가 — 2026-08-28 완료(commit `33b5571`). 전체 카피 평문 + FAQ Q&A 9항목
- [x] `public/llms.txt` 간결화 — 2026-08-28. 기존 상세 내용이 구 카피 버전(L02/L03/역량/철학)과 불일치해 드리프트 중이었음. 안정적인 핵심 정보 + llms-full.txt 링크 구조로 축약, 상세는 llms-full.txt가 담당
- [x] `sitemap.xml` lastmod 빌드 시 자동 갱신 — 2026-08-28 완료(commit `33b5571`). `prerender.mjs`가 빌드 날짜로 갱신. `<loc>`는 리다이렉트 안 되는 non-www
- [ ] **가시 FAQ 섹션 + FAQPage JSON-LD** (AEO) — 현재는 llms-full.txt Q&A로만. Contact 위 접이식 섹션 신설 필요(디자인 작업)
- [ ] 위키데이터 항목 생성 + 스타트업 DB(더브이씨·로켓펀치·크런치베이스) 등재 (GEO — 사용자)
- [ ] 네이버 스마트플레이스 등록 (NEO — 지역 비즈니스, 사용자)
- [x] **IndexNow 도입** — 2026-09-09. `public/<key>.txt` 키 파일 + `scripts/indexnow-ping.mjs`. Bing·Naver·Yandex·Seznam에 URL 갱신 통지(사이트맵 ping은 Google·Bing 모두 2023년 폐기 → IndexNow가 대체). 2026-09-09 배포+첫 통지 완료(202). 이후 크롤 대상 변경 배포마다 실행
- [ ] 측정 기준선 기록(GSC·네이버 노출/클릭·AI 인용 O/X) → 배포 14일 후(2026-09-11) 재측정
  - 2026-09-09 중간 확인: Google 색인 O(홈 1건, 브랜드 검색 1위, 프리렌더 메타 반영). Bing 색인 O(`url:` 확인, 브랜드 검색 1위, 단 마지막 크롤 표기 2026-07-21로 다소 오래됨 → IndexNow로 재크롤 유도). Naver 미확인(콘솔 직접 확인 필요)
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

- 반응형 `srcset` — 이미지는 WebP 전환 완료(2026-08-28). 뷰포트별 다중 해상도까지 갈지는 실측 후 결정
- 미사용 에셋 정리 — `src/assets/figma/`의 `section-texture.jpg`(506KB)·`orbit-union.svg`(45KB)·`ring-{inner,mid,outer}.png`·`logo-dark.png`는 어디서도 import 안 됨(번들엔 미포함, 리포만 커짐). 삭제 여부
- Expertise(화이트) ↔ Principles(다크) 섹션 리듬이 시안 확장으로 적절한지 사용자 확인 필요
