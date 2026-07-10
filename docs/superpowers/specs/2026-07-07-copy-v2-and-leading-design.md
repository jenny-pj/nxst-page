# 메인 카피 v2 정리 + 버전 토글 + 줄간격 확대 — 설계 스펙

- 날짜: 2026-07-07
- 브랜치: `light`
- 배경: 홈 메인 카피(히어로 h1·선언 배너·섹션 타이틀)가 2~3문장 장문이라 헤드카피로 무겁고, 줄간격이 좁아 텍스트가 빽빽함. 의미는 유지하며 카피를 짧게 정리하고, 기존/신규 두 버전을 화면에서 토글로 비교할 수 있게 한다.

## 1. 버전 토글 구조

**방식**: 스냅샷 파일 + 로드 시 선택 + 새로고침 토글 (A안)

- `src/data/copy.v1.js` — 현재 `copy.js` 내용을 그대로 보존한 스냅샷.
- `src/data/copy.v2.js` — 신규 정리 카피. v1과 동일한 export 구조(site, nav, hero, whyData, researchAreas, framework, expertise, principles, collaboration, footer, contactForm).
- `src/data/copy.js` — 선택기로 전환. 모듈 로드 시 `localStorage`의 `copyVersion` 값(`'v1' | 'v2'`, 기본 `'v2'`)을 동기적으로 읽어 해당 버전의 객체들을 re-export. **기존 8개 컴포넌트의 import는 한 줄도 수정하지 않는다.**
- 토글 UI: 화면 우하단에 고정된 작은 `V1 / V2` 버튼 컴포넌트(`CopyVersionToggle.jsx`). 클릭 시 localStorage 저장 후 `location.reload()`. 정적 SPA라 전환 체감은 즉각적.
- 두 버전에서 실제로 달라지는 키만 v1/v2에 차이를 둔다. site, nav, contactForm, 다이어그램 데이터(flow, domains, layers, clusters, partners 등)는 양쪽 동일.

**정리 단계(카피 확정 후, 별도 커밋)**: 토글 버튼·`copy.v1.js`·선택기 로직을 제거하고 `copy.js`에 확정 카피만 남긴다. `public/llms.txt`를 확정 카피로 갱신하고 `docs/`(history, decisions) 기록.

## 2. 신규 카피 v2 (초안 — 비교하며 다듬기 가능)

원칙: **타이틀은 한 호흡, 핵심 설명은 보조문으로 이관, 의미 유지.**

| 위치 | v1 (현재) | v2 (신규) |
|---|---|---|
| hero.h1 | Physical AI는\n산업데이터를 이해하는 것에서\n시작됩니다 | Physical AI는\n산업 데이터에서 시작됩니다 |
| hero.banner | 우리는 산업 데이터를 연구합니다.\n\n산업 데이터 인프라와 합성데이터 기술을 기반으로,\n\nPhysical AI가 산업 현장을 이해하고 활용할 수 있는\n데이터 기반 기술을 만들어갑니다. | 우리는 산업 데이터를 연구합니다.\n산업 데이터 인프라와 합성데이터 기술로\nPhysical AI의 기반을 만듭니다. |
| whyData.title | Physical AI는 산업 환경을 인식하고 이해하여 의사결정을 수행합니다.\n이를 위해서는 현실을 반영한 산업 데이터의 확보와 활용이 필수적입니다. | 현실을 반영한 산업 데이터가\nPhysical AI의 인식과 판단을 만듭니다 |
| whyData.support | 제조 설비, 생산 공정, 작업 환경에서 생성되는 산업 데이터는 … (2문장 장문) | Physical AI의 성능은 산업 데이터를 얼마나 신뢰성 있게\n확보하고 활용하는지에 따라 결정됩니다. |
| researchAreas.title | Physical AI는 하나의 기술만으로 구현되지 않습니다.\n산업 데이터를 중심으로 다양한 연구 분야가 유기적으로 연결될 때,\n신뢰할 수 있는 Physical AI를 구현할 수 있습니다. | 산업 데이터를 중심으로 연구가 연결될 때\n신뢰할 수 있는 Physical AI가 구현됩니다 |
| framework.title | 산업 데이터는 하나의 AI 모델만으로 활용되지 않습니다.\n데이터 확보부터 모델 학습, 산업 적용까지 이어지는 연구 체계를 통해\nPhysical AI를 구현합니다. | 데이터 확보부터 산업 적용까지,\n하나의 연구 체계로 Physical AI를 구현합니다 |
| expertise.title | 다양한 AI 기술을 개별적으로 연구하는 것이 아니라,\n산업 데이터를 중심으로 연구 역량을 융합합니다. | 산업 데이터를 중심으로\n연구 역량을 융합합니다 |
| principles.title | 우리는 새로운 기술보다,\n산업 현장에서 지속적으로 활용 가능한 기술을 연구합니다. | 새로운 기술보다,\n산업 현장에서 지속 가능한 기술을 연구합니다 |
| collaboration.title | Physical AI는 하나의 조직만으로 구현될 수 없습니다.\n정부, 산업계, 학계와의 협력을 통해 산업 현장에서 활용 가능한 기술을 연구합니다. | 정부·산업계·학계와 함께\n현장에서 활용되는 기술을 연구합니다 |
| footer.headline / sub | 유지 (이미 짧음) | 유지 |

## 3. 줄간격 확대 (v1/v2 공통, 데스크톱 md 기준)

| 요소 | 파일 | 현재 | 변경 |
|---|---|---|---|
| 히어로 h1 | `Hero.jsx` | `leading-[1.25]` | `leading-[1.35]` |
| 선언 배너 | `Hero.jsx` | `md:leading-[1.3]` / 모바일 `1.5` | `md:leading-[1.5]` / 모바일 `1.7` |
| 섹션 타이틀 | `SectionHeader.jsx` | `md:leading-[1.25]` / 모바일 `1.35` | `md:leading-[1.4]` / 모바일 `1.5` |
| 보조문 | `SectionHeader.jsx` | `md:leading-[1.4]` / 모바일 `1.6` | `md:leading-[1.6]` / 모바일 `1.75` |
| 헤더 gap | `SectionHeader.jsx` | `gap-6 md:gap-8` | `gap-7 md:gap-10` |

토글은 카피 텍스트만 전환하며 줄간격은 항상 새 값으로 렌더링한다.

## 4. 범위 밖

- 페이지 컨텐츠 구조·섹션 구성·다이어그램 변경 없음.
- `main` 브랜치 및 다크 테마 사이트 영향 없음.
- 배포는 수동 `vercel deploy --prod` (기존 원칙 유지) — 이번 작업 범위에서는 배포하지 않고 로컬 비교까지.

## 5. 완료 기준

1. 로컬 dev 서버에서 우하단 토글로 V1/V2 카피가 오류 없이 전환된다.
2. V2가 기본으로 렌더링되고, 두 버전 모두 각 섹션 레이아웃이 깨지지 않는다.
3. 줄간격 변경이 두 버전 모두에 적용된다.
4. 카피를 소비하는 기존 8개 컴포넌트의 `copy.js` import 문 변경이 없다. 컴포넌트 수정은 Hero·SectionHeader의 leading/gap 클래스 변경과 App.jsx의 토글 버튼 추가 두 가지뿐이다.
