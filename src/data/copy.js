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
