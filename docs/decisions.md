# Decisions

최신순. 각 항목은 "무엇을, 왜"를 기록한다.

## 2026-07-06 — Contact 이메일 비노출: 빌드 env 주입 채택 (서버리스 프록시는 폐기)

- 배경: 저장소가 public이라 수신 이메일을 코드에 하드코딩할 수 없음
- 1차 시도 — `/api/contact` Vercel 서버리스 프록시: **폐기**. FormSubmit 앞단 Cloudflare가 Vercel 데이터센터 IP를 403 차단 (브라우저 UA 위장도 무효). 로컬 Node에서는 성공 → IP 기반 차단으로 확정.
- 채택 — 브라우저 직접 호출 + 대상 주소를 빌드 env `VITE_CONTACT_FORM_ID`로 주입: 저장소 비노출, 값 교체 시 코드 수정 불필요 (Vercel env 변경 + 재배포)
- 잔여 노출: 번들 JS에는 값이 포함됨 — FormSubmit 랜덤 알리아스로 교체하면 번들에서도 이메일 제거 가능 (알리아스는 공개되어도 무방한 값)

## 2026-07-06 — Contact CTA를 mailto에서 팝업 폼(FormSubmit)으로 전환

- mailto는 메일 클라이언트 설정이 없는 방문자에게 동작하지 않고, 문의 정보(소속·유형)를 구조화해 받을 수 없음
- 백엔드 없는 정적 사이트라 가입·API 키가 필요 없는 FormSubmit.co 채택 (Formspree는 가입 필요, 자체 메일 서버는 과함)
- 폼 유형 항목은 Collaboration 섹션의 협력 축(공동연구·정부 R&D·기술이전)과 호응하게 구성
- 주의: FormSubmit은 도메인(사이트)별로 최초 1회 이메일 활성화 필요

## 2026-07-06 — Collaboration 커넥터를 직선에서 Figma 곡선으로 교체

- Figma MCP에서 커넥터 노드(80:381, 80:384) SVG를 직접 다운로드해 실제 베지어 패스 추출 후 인라인 적용
- 이유: 단순 기울기 직선으로는 시안의 "위성 쪽 수평→허브 쪽 하강" 곡률 재현 불가. Figma 패스를 그대로 쓰는 것이 가장 정확.
- flip/up prop으로 4방향 대칭 처리 — 추가 SVG 파일 없이 CSS transform 반전만으로 해결

## 2026-07-06 — Footer 네비를 주 네비보다 시각적으로 낮게 조정

- 글씨 크기 16~20px → 13~14px, 투명도 50% 적용
- 이유: 주 navbar보다 footer 네비가 더 눈에 띄어 시각적 위계가 역전됨. 보조 정보로 처리.
- 호버 시 원래 밝기로 전환 — 완전 숨김은 아니고 "조용히" 존재하는 수준 유지

## 2026-07-06 — @fortawesome/free-solid-svg-icons 도입

- 기존 Collaboration 아이콘: 손으로 그린 SVG 패스 (160×160 좌표계 직접 작성)
- 교체: Font Awesome solid 공식 패스 (landmark·industry·graduation-cap·right-left)
- 이유: WhyData 섹션에서 이미 같은 방식으로 사용 중이고, 패키지에서 관리되는 패스가 유지보수에 유리
- WhyData의 아이콘 크기 비율(scale-75, 72/512 스케일)을 그대로 적용해 두 섹션 일관성 확보

## 2026-07-02 — factory.ai 레퍼런스로 마이크로 인터랙션 도입

- 플랫한 UI에 모션 레이어 추가: 히어로 켄 번즈·타이틀 스태거, 키워드 마퀴, 노드/글로우 펄스, 궤도 카드 플로팅, 카드 리프트 호버, 네비 언더라인, ScrambleText(영문 디코드)
- 이유: factory.ai의 산업적 무드(스태거 리빌, 마퀴, 글로우)가 사이트 톤과 맞음. 사용자 요청.
- 제약: 무한 애니메이션은 `motion-safe:` 전용, 진입 모션 1회, **한글 스크램블 금지**(자소 분해 없이 어색함 — 영문 라벨에만 적용)

## 2026-07-02 — Figma 시안 기준으로 light 브랜치 전면 재구축

- 이전 방향(Editorial × Technical: 웜 오프화이트 #FAF9F6 + Noto Serif KR + 딥 잉크 블루 #24408E) **폐기**
- 사용자 Figma 시안 "Desktop - 1"로 교체: 다크 #010A12 × 라이트 #F5F7FA × 액센트 #5183E8, Pretendard 단일
- Noto Serif KR·JetBrains Mono 폰트 로딩 제거 (성능 + 단일 체계)
- Figma에 없는 섹션은 시안 언어 확장으로 신규 디자인: Expertise(화이트 카드), Principles(다크 리스트 — Framework L01~L05와 번호 호응), Collaboration(라이트 카드), Contact/Footer(다크 북엔드로 히어로와 수미상관)

## 2026-07-02 — Figma 에셋 로컬 다운로드 + JPEG 압축

- MCP localhost 서버 URL을 코드에 직접 쓰지 않고 `src/assets/figma/`로 다운로드해 커밋
- 이유: 런타임/빌드가 Figma MCP에 의존하면 안 됨. 대형 PNG 2장은 sips로 JPEG 변환(각 ~5MB → ~0.5MB)
- Framework 슬랩·WhyData 화살표는 에셋 대신 인라인 SVG로 재현 — 색·투명도를 코드에서 제어하기 위함

## 2026-06 — 브랜치 이원화

- `main` = 다크 제품 서사 보존, `light` = 연구기업 리뉴얼
- 이유: 두 버전의 콘텐츠가 서로 매핑되지 않아 테마 토글 통합이 불가능. 브랜치로 분리 유지
