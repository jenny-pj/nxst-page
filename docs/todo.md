# TODO

## 할 일

- [ ] 모바일 실기기에서 인터랙션 검수 (reduced-motion 포함 — 데스크톱은 2026-07-02 검증 완료)
- [ ] `light` 브랜치 커밋 (리뉴얼 + 인터랙션)
- [ ] 파비콘(`/favicon.svg`) 존재 확인 및 신규 로고 반영
- [ ] OG 이미지 제작·적용
- [ ] Vercel 프리뷰 배포 → 확인 후 production
- [ ] 실기기 모바일 QA (iOS Safari 스크롤 성능)

## 안 하기로 한 것

- **main/light 테마 토글 통합** — 콘텐츠가 서로 매핑되지 않음, 브랜치 분리 유지
- **한글 텍스트 스크램블 효과** — 자소 분해 없이는 어색함, 영문 라벨에만 적용
- **Noto Serif KR / JetBrains Mono** — Figma 시안이 Pretendard 단일 체계

## 고민 중

- 궤도 다이어그램의 태블릿(1024~1280px) 대응 — 현재 xl 미만은 그리드 폴백인데, 스케일 축소 방식도 검토 가능
- hero-bg/section-texture 추가 최적화 (WebP 변환, 반응형 srcset)
- Expertise(화이트) ↔ Principles(다크) 섹션 리듬이 시안 확장으로 적절한지 사용자 확인 필요
