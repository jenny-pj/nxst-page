# History

추가 전용 — 기존 항목을 수정하지 않는다.

## 2026-06 — 다크 사이트 구축 (main)

- nextstud.io 회사 소개 사이트 구축 (스펙 STAGE 1~6 전체, commit `40d7bd0`)
- hero 카피 수정, vercel/env 파일 gitignore 추가 (commit `3848880`)

## 2026-07-02 — Figma 시안 기반 light 리뉴얼 전면 구현

- `light` 브랜치에서 Figma "Desktop - 1" 시안대로 전 섹션 재구축
- 디자인 토큰 교체: 다크 #010A12 / 라이트 #F5F7FA / 액센트 #5183E8, Pretendard 단일
- 시안 구현: Hero(배경+60px 타이틀), 선언 배너, WhyData 플로우(5노드), Research 궤도(카드 7개), Framework 슬랩(L01~L05 인라인 SVG)
- 시안 미제공 섹션 신규 디자인: Expertise, Principles(다크), Collaboration, Contact/Footer(다크 북엔드)
- Figma 에셋 다운로드 + JPEG 압축(~5MB→~0.5MB×2), 미사용 FigCaption 제거, 폰트 정리
- 모바일 폴백(플로우 세로 스택, 다이어그램→그리드, 햄버거), `word-break: keep-all`
- React 18 `fetchpriority` 경고 수정, 프로덕션 빌드 통과

## 2026-07-02 — factory.ai 레퍼런스 마이크로 인터랙션 전체 적용

- 모션 키프레임 6종 추가 (heroZoom·fadeUp·ticker·nodePulse/glowPulse·floatY·scrollBob)
- `ScrambleText` 컴포넌트 신규 (영문 디코드, reduced-motion 대응)
- Hero: 켄 번즈 배경 + 타이틀 라인 스태거 + 키워드 마퀴 + 스크롤 유도 커서
- Nav: 액센트 언더라인 그로우 (호버·활성)
- WhyData: 노드 좌→우 순차 리빌 + 액센트 노드 펄스 + 호버 반응
- ResearchAreas: 궤도 카드 플로팅(위상차) + 리프트 호버 + 허브 글로우 펄스 + 허브 ScrambleText
- Framework: 슬랩 리프트 호버 + 칩 액센트 필 호버 + 레이어명 ScrambleText
- Expertise/Collaboration: 카드 리프트 + 액센트 보더 호버 + 칩 호버
- Principles: 행 호버(배경·이동) + 원칙명 ScrambleText
- Contact: 글로우 펄스 + 버튼 리프트·섀도·화살표 슬라이드
- 데스크톱 브라우저 검증 및 프로덕션 빌드 통과

## 2026-07-02 — WhyData 플로우 아이콘 추가 (Figma 시안 업데이트 반영)

- 5개 노드 원 안에 아이콘 삽입: 산업 환경(industry) · 산업 데이터(database, 액센트) · AI 학습(brain) · 추론 및 의사결정(chart-line) · Physical AI(robot)
- Figma SVG에서 아이콘 패스만 추출해 인라인 SVG(`currentColor`)로 구현 — 기존 CSS 원의 펄스·호버 인터랙션 유지, 호버 시 아이콘도 글로우 색으로 전환
- `copy.js` flow 항목에 `icon` 키 추가
