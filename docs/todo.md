# TODO

## 할 일

- [ ] **카피 v2 확정 후 정리** — 확정 버전을 `copy.js`에 병합, `copy.v1.js`/`copy.v2.js`/`CopyVersionToggle.jsx` 제거 → `public/llms.txt`를 확정 카피로 갱신 → 배포 (2026-07-08 토글 도입, 확정 대기)
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

- 카피 v2(축약 타이틀) 확정 여부 — 우하단 토글로 v1/v2 비교 중. 히어로는 v1 유지로 결정됨, 섹션 타이틀 6곳이 판단 대상
- 궤도 다이어그램의 태블릿(1024~1280px) 대응 — 현재 xl 미만은 그리드 폴백인데, 스케일 축소 방식도 검토 가능
- hero-bg/section-texture 추가 최적화 (WebP 변환, 반응형 srcset)
- Expertise(화이트) ↔ Principles(다크) 섹션 리듬이 시안 확장으로 적절한지 사용자 확인 필요
