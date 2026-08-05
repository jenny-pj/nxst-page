# TODO

## 할 일

- [x] **2026-07-15 작업분 커밋·배포** — 카피 재작성(Hero/WhyData/Research/Framework/Expertise) + Framework 인터랙티브 리빌드 + Principles 5원칙 전면 재작성(배지·보더·레이아웃) + 섹션 eyebrow 영문화 + WhyData 플로우 분기 구조 개편(Figma 재동기화) + line-height 150% 전환 + 키워드 마퀴 버그 수정 + Expertise 역량 그룹 카드 전면 교체 — 2026-07-15 완료(commit `68b0463`, push+vercel 프로덕션 배포)
- [x] **Research Areas 등각 레이어 스택 커밋·배포** — 궤도 다이어그램 → System/Synthetic/Model/Foundation 4계층 등각 스택 전면 교체, 스크롤 pin/scrub 전환, 누적 하이라이트 마스크, 흐름 웨이브 애니메이션 — 2026-07-20 완료(commit `9054b35`, `161f234`)
- [x] **Research Areas pin — nav 겹침·스크롤 성능·짧은 뷰포트 대응** — 고정 Nav 뒤에 헤더가 가려지는 문제, 스크롤 버벅임(`will-change` 누락), 짧은 뷰포트에서 텍스트까지 축소되던 문제(이미지만 축소하도록 개선 + 790px 미만 StaticSection 폴백) — 2026-07-21 완료(commit `e2f537b`, `0a9f05f`)
- [x] **Expertise 협력 기관 로고 Figma 재동기화** — 로고 세트 갱신(11→12개), 위치를 논문 리스트 위로 이동, Figma 카드 비율·수동 크롭까지 정확히 재현 — 2026-07-21 완료(commit `e2f537b`)
- [ ] `public/llms.txt`를 2026-07-15 신규 카피 + Framework 계층(L02/L03/L05) + Principles 5원칙 + WhyData 분기 구조 기준으로 갱신, Collaboration 섹션 제거 반영
- [x] 카피 v2 확정 후 정리 — 2026-07-10 완료 (copy.js 병합, v1/v2/토글 제거, llms.txt 갱신)
- [ ] 모바일 실기기에서 인터랙션 검수 (reduced-motion 포함 — 데스크톱은 2026-07-02 검증 완료)
- [ ] 실기기 모바일 QA (iOS Safari 스크롤 성능)
- [ ] **nextstud.io 도메인 DNS를 Vercel로 전환** — 현재 옛 S3/CloudFront 사이트(2025-08 빌드)가 서빙 중. 전환 전까지 검색엔진은 옛 사이트를 색인함 (2026-07-07 발견)
- [ ] 도메인 전환 후 Google Search Console 등록 + sitemap.xml 제출
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
