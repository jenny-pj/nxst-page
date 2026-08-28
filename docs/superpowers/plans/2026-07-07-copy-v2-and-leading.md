# 메인 카피 v2 + 버전 토글 + 줄간격 확대 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 홈 메인 카피를 짧은 v2로 정리하되 기존 v1을 보존하고, 화면 토글로 두 버전을 비교할 수 있게 하며, 전역 줄간격을 확대한다.

**Architecture:** `src/data/copy.js`(전 섹션 카피 단일 소스, 8개 컴포넌트가 named import)를 v1/v2 선택기로 전환한다. v1은 현재 파일의 스냅샷, v2는 변경 카피만 재정의하고 나머지는 v1을 re-export. 선택은 모듈 로드 시 localStorage에서 동기적으로 읽고, 우하단 고정 토글 버튼이 localStorage 갱신 + 새로고침으로 전환한다. 줄간격은 Hero.jsx/SectionHeader.jsx의 Tailwind leading 클래스 변경(버전 무관 공통 적용).

**Tech Stack:** React 18, Vite 6, Tailwind CSS v4. 테스트 러너 없음 — 검증은 node ESM 스모크 체크 + `npm run build` + dev 서버 육안 확인.

**Spec:** `docs/superpowers/specs/2026-07-07-copy-v2-and-leading-design.md`

## Global Constraints

- 브랜치 `light`에서 작업. `main`은 건드리지 않는다.
- 카피를 소비하는 기존 8개 컴포넌트(Nav, Hero, WhyData, ResearchAreas, Framework, Expertise, Principles, Collaboration, Footer, ContactModal)의 `../data/copy.js` import 문은 한 줄도 수정하지 않는다.
- 기본 렌더링 버전은 **v2**. localStorage 키는 `copyVersion`, 값은 `'v1' | 'v2'`.
- 페이지 구조·섹션 구성·다이어그램 데이터(flow/domains/layers/clusters/partners)는 변경하지 않는다.
- 배포하지 않는다 (배포는 사용자가 수동 `vercel deploy --prod`).
- `public/llms.txt` 갱신은 카피 **확정 후** 정리 단계에서 수행 — 이번 계획 범위 밖.
- 작업 디렉토리 경로에 공백이 있으므로 모든 셸 명령에서 경로를 따옴표로 감싼다.

---

### Task 1: 카피 v1 스냅샷 + v2 신규 + copy.js 선택기 전환

**Files:**
- Create: `src/data/copy.v1.js` (현재 copy.js의 스냅샷)
- Create: `src/data/copy.v2.js`
- Modify: `src/data/copy.js` (전체를 선택기로 재작성)

**Interfaces:**
- Consumes: 없음 (최초 태스크)
- Produces: `copy.js`가 기존과 동일한 named export 세트(`site, nav, hero, whyData, researchAreas, framework, expertise, principles, collaboration, footer, contactForm`)에 더해 `export const copyVersion` (`'v1' | 'v2'`)을 제공. Task 2의 토글 버튼이 `copyVersion`을 사용.

- [ ] **Step 1: 현재 copy.js를 v1로 스냅샷**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
cp src/data/copy.js src/data/copy.v1.js
```

- [ ] **Step 2: copy.v1.js 헤더 주석 갱신**

`src/data/copy.v1.js` 파일 최상단 주석(1~4행)을 다음으로 교체 (Edit 도구, old: 기존 `/** ... */` 블록):

```js
/**
 * 카피 V1 — 2026-07-07 이전 원본 스냅샷 (Figma 시안 "Desktop - 1" 기준).
 * 카피 비교용 보존 파일. v2 확정 시 이 파일과 선택기 로직은 제거 예정.
 * 각 섹션 eyebrow는 질문, 타이틀은 그 답이 되는 구조.
 */
```

- [ ] **Step 3: copy.v2.js 작성**

`src/data/copy.v2.js`를 아래 내용 전체로 생성:

```js
/**
 * 카피 V2 — 2026-07-07 정리안. 타이틀은 한 호흡, 핵심 설명은 보조문으로 이관.
 * 변경되는 키만 재정의하고, 다이어그램 데이터·공통 텍스트는 v1을 그대로 재사용.
 * 확정 시 copy.js로 병합하고 v1/선택기 제거 예정.
 */

import * as v1 from './copy.v1.js';

/* 변경 없는 export는 v1 그대로 */
export { site, nav, footer, contactForm } from './copy.v1.js';

/* ── HERO ── */
export const hero = {
  ...v1.hero,
  h1: 'Physical AI는\n산업 데이터에서 시작됩니다',
  banner:
    '우리는 산업 데이터를 연구합니다.\n산업 데이터 인프라와 합성데이터 기술로\nPhysical AI의 기반을 만듭니다.',
};

/* ── WHY INDUSTRIAL DATA ── */
export const whyData = {
  ...v1.whyData,
  title: '현실을 반영한 산업 데이터가\nPhysical AI의 인식과 판단을 만듭니다',
  support:
    'Physical AI의 성능은 산업 데이터를 얼마나 신뢰성 있게\n확보하고 활용하는지에 따라 결정됩니다.',
};

/* ── RESEARCH AREAS ── */
export const researchAreas = {
  ...v1.researchAreas,
  title: '산업 데이터를 중심으로 연구가 연결될 때\n신뢰할 수 있는 Physical AI가 구현됩니다',
};

/* ── RESEARCH FRAMEWORK ── */
export const framework = {
  ...v1.framework,
  title: '데이터 확보부터 산업 적용까지,\n하나의 연구 체계로 Physical AI를 구현합니다',
};

/* ── CORE EXPERTISE ── */
export const expertise = {
  ...v1.expertise,
  title: '산업 데이터를 중심으로\n연구 역량을 융합합니다',
};

/* ── RESEARCH PRINCIPLES ── */
export const principles = {
  ...v1.principles,
  title: '새로운 기술보다,\n산업 현장에서 지속 가능한 기술을 연구합니다',
};

/* ── COLLABORATION ── */
export const collaboration = {
  ...v1.collaboration,
  title: '정부·산업계·학계와 함께\n현장에서 활용되는 기술을 연구합니다',
};
```

- [ ] **Step 4: copy.js를 선택기로 재작성**

`src/data/copy.js` 전체를 아래 내용으로 교체 (Write 도구):

```js
/**
 * 사이트 전역 카피 선택기 — v1(원본)/v2(2026-07-07 정리안) 비교용.
 * 모듈 로드 시 localStorage.copyVersion을 동기적으로 읽어 해당 버전을 re-export.
 * 기본값은 v2. 소비 컴포넌트들의 import 경로/이름은 기존과 동일하게 유지된다.
 * 카피 확정 시: 확정 버전 내용을 이 파일에 병합하고 v1/v2 파일과 토글을 제거할 것.
 */

import * as v1 from './copy.v1.js';
import * as v2 from './copy.v2.js';

const stored =
  typeof localStorage !== 'undefined' ? localStorage.getItem('copyVersion') : null;

/** 현재 활성 카피 버전 — CopyVersionToggle에서 사용 */
export const copyVersion = stored === 'v1' ? 'v1' : 'v2';

const c = copyVersion === 'v1' ? v1 : v2;

export const site = c.site;
export const nav = c.nav;
export const hero = c.hero;
export const whyData = c.whyData;
export const researchAreas = c.researchAreas;
export const framework = c.framework;
export const expertise = c.expertise;
export const principles = c.principles;
export const collaboration = c.collaboration;
export const footer = c.footer;
export const contactForm = c.contactForm;
```

- [ ] **Step 5: node 스모크 체크 — export 구조 동일성 + 변경 키 확인**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
node --input-type=module -e "
import { pathToFileURL } from 'node:url';
const base = pathToFileURL(process.cwd() + '/');
const v1 = await import(new URL('src/data/copy.v1.js', base));
const v2 = await import(new URL('src/data/copy.v2.js', base));
const sel = await import(new URL('src/data/copy.js', base));
const k1 = Object.keys(v1).sort().join();
const k2 = Object.keys(v2).sort().join();
if (k1 !== k2) throw new Error('v1/v2 export 불일치: ' + k1 + ' vs ' + k2);
if (sel.copyVersion !== 'v2') throw new Error('기본 버전이 v2가 아님');
if (sel.hero.h1 !== v2.hero.h1) throw new Error('선택기가 v2를 반환하지 않음');
if (v2.hero.keywords.length !== v1.hero.keywords.length) throw new Error('keywords 누락');
if (v2.whyData.flow !== v1.whyData.flow) throw new Error('flow가 v1과 다른 참조');
console.log('OK — exports:', k2);
"
```

Expected: `OK — exports: collaboration,contactForm,expertise,footer,framework,hero,nav,principles,researchAreas,site,whyData` 출력.

**주의:** `copyVersion`은 선택기 `copy.js`에만 존재하는 export다 (v1/v2에는 없음). 불일치 에러가 나면 copy.v2.js의 re-export 누락을 확인할 것.

- [ ] **Step 6: 빌드 확인**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
npm run build
```

Expected: `✓ built in ...` 로 성공 종료. (localStorage 가드 덕에 빌드 환경에서도 에러 없음)

- [ ] **Step 7: 커밋**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
git add src/data/copy.js src/data/copy.v1.js src/data/copy.v2.js
git commit -m "카피 v1 스냅샷 보존 + v2 정리안 추가, copy.js를 버전 선택기로 전환"
```

### Task 2: CopyVersionToggle 버튼 + App 연결

**Files:**
- Create: `src/components/CopyVersionToggle.jsx`
- Modify: `src/App.jsx` (import 1줄 + 렌더 1줄 추가)

**Interfaces:**
- Consumes: `copy.js`의 `copyVersion` (`'v1' | 'v2'`, Task 1에서 정의)
- Produces: 화면 우하단 고정 토글 버튼. 클릭 시 `localStorage.copyVersion` 갱신 후 `location.reload()`.

- [ ] **Step 1: CopyVersionToggle.jsx 작성**

`src/components/CopyVersionToggle.jsx`를 아래 내용 전체로 생성:

```jsx
import { copyVersion } from '../data/copy.js';

/**
 * 카피 v1/v2 비교용 임시 토글 — 우하단 고정.
 * 클릭 시 localStorage에 다음 버전을 저장하고 새로고침해 전환한다.
 * 카피 확정 시 이 컴포넌트와 App의 렌더 라인을 제거할 것.
 */
export default function CopyVersionToggle() {
  const next = copyVersion === 'v1' ? 'v2' : 'v1';
  return (
    <button
      type="button"
      onClick={() => {
        localStorage.setItem('copyVersion', next);
        location.reload();
      }}
      className="fixed bottom-4 right-4 z-[70] rounded-full bg-dark/80 px-3.5 py-2 text-xs font-semibold tracking-wide text-ink-light shadow-lg backdrop-blur transition-colors hover:bg-dark"
      aria-label={`카피 버전 전환: 현재 ${copyVersion.toUpperCase()}, 클릭 시 ${next.toUpperCase()}`}
    >
      카피 {copyVersion.toUpperCase()} → {next.toUpperCase()}
    </button>
  );
}
```

- [ ] **Step 2: App.jsx에 토글 추가**

`src/App.jsx`에 Edit 2회:

Edit 1 — import 추가:

```
old: import Collaboration from './components/Collaboration.jsx';
new: import Collaboration from './components/Collaboration.jsx';
     import CopyVersionToggle from './components/CopyVersionToggle.jsx';
```

Edit 2 — 렌더 추가:

```
old:       <Footer />
    </>
new:       <Footer />
      <CopyVersionToggle /> {/* 카피 v1/v2 비교용 임시 토글 — 확정 시 제거 */}
    </>
```

- [ ] **Step 3: 빌드 확인**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
npm run build
```

Expected: 성공 종료.

- [ ] **Step 4: dev 서버 육안 확인**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
npm run dev
```

브라우저에서 http://localhost:5173 열고 확인:
1. 기본 상태에서 히어로 h1이 v2 카피("Physical AI는 / 산업 데이터에서 시작됩니다")로 렌더링.
2. 우하단 `카피 V2 → V1` 버튼 클릭 → 새로고침 후 v1 카피(3줄 h1)로 전환, 버튼 라벨이 `카피 V1 → V2`로 변경.
3. 다시 클릭 → v2 복귀.
4. 두 버전 모두 각 섹션(WhyData~Collaboration) 타이틀이 정상 표시되고 레이아웃 깨짐 없음.

- [ ] **Step 5: 커밋**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
git add src/components/CopyVersionToggle.jsx src/App.jsx
git commit -m "카피 v1/v2 비교용 우하단 토글 버튼 추가 (확정 시 제거 예정)"
```

### Task 3: 줄간격 확대 (Hero + SectionHeader)

**Files:**
- Modify: `src/components/Hero.jsx:44` (h1 leading), `src/components/Hero.jsx:70` (배너 leading)
- Modify: `src/components/SectionHeader.jsx:9` (gap), `:15` (타이틀 leading), `:25` (보조문 leading)

**Interfaces:**
- Consumes: 없음 (스타일 전용 — Task 1·2와 독립)
- Produces: 없음. 버전 무관 공통 적용.

- [ ] **Step 1: Hero.jsx h1 줄간격**

Edit — `src/components/Hero.jsx`:

```
old: className="relative px-5 text-center text-[32px] font-semibold leading-[1.25] text-ink-light md:text-[48px] lg:text-[60px]"
new: className="relative px-5 text-center text-[32px] font-semibold leading-[1.35] text-ink-light md:text-[48px] lg:text-[60px]"
```

- [ ] **Step 2: Hero.jsx 선언 배너 줄간격**

Edit — `src/components/Hero.jsx`:

```
old: <p className="whitespace-pre-line text-center text-[17px] font-semibold leading-[1.5] text-ink-light-soft md:text-[30px] md:leading-[1.3]">
new: <p className="whitespace-pre-line text-center text-[17px] font-semibold leading-[1.7] text-ink-light-soft md:text-[30px] md:leading-[1.5]">
```

- [ ] **Step 3: SectionHeader.jsx gap·타이틀·보조문**

Edit 3회 — `src/components/SectionHeader.jsx`:

```
old: <div className="flex w-full flex-col items-center gap-6 text-center md:gap-8">
new: <div className="flex w-full flex-col items-center gap-7 text-center md:gap-10">
```

```
old: className={`whitespace-pre-line text-[24px] font-semibold leading-[1.35] md:text-[40px] md:leading-[1.25] ${
new: className={`whitespace-pre-line text-[24px] font-semibold leading-[1.5] md:text-[40px] md:leading-[1.4] ${
```

```
old: className={`whitespace-pre-line text-[15px] leading-[1.6] md:text-[24px] md:leading-[1.4] ${
new: className={`whitespace-pre-line text-[15px] leading-[1.75] md:text-[24px] md:leading-[1.6] ${
```

- [ ] **Step 4: 빌드 + 육안 확인**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
npm run build
```

Expected: 성공. dev 서버(실행 중이면 HMR 자동 반영)에서 히어로·배너·섹션 헤더의 줄간격이 넓어졌는지, v1(장문 카피)에서도 타이틀이 어색하게 벌어지지 않는지 확인.

- [ ] **Step 5: 커밋**

```bash
cd "/Users/jaeeun/Library/Mobile Documents/com~apple~CloudDocs/claude-jenny/gai/nxst-page"
git add src/components/Hero.jsx src/components/SectionHeader.jsx
git commit -m "히어로·섹션 헤더 줄간격 확대 — 빽빽한 텍스트 밀도 완화"
```

---

## 후속 (이번 계획 범위 밖 — 카피 확정 후 별도 세션)

1. 확정 버전을 `copy.js`에 병합, `copy.v1.js`/`copy.v2.js`/`CopyVersionToggle.jsx`/App 렌더 라인 제거.
2. `public/llms.txt`를 확정 카피로 갱신 (architecture.md 규칙).
3. `docs/history.md`·`docs/decisions.md` 기록.
4. 사용자가 수동 `vercel deploy --prod`.
