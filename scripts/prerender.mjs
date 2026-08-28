/**
 * 빌드 타임 프리렌더링 (자체 SSG).
 *
 * 흐름:
 *   1) vite build            → dist/ (클라이언트 번들 + index.html 템플릿)
 *   2) vite build --ssr      → dist/server/entry-server.js
 *   3) node scripts/prerender.mjs (이 파일):
 *        - SSR 번들의 render()로 <App/> 마크업 문자열 생성
 *        - dist/index.html 의 <div id="root"></div> 안에 주입
 *        - dist/sitemap.xml 의 <lastmod>를 빌드 날짜로 갱신
 *        - dist/server/ 정리
 *
 * 라우트가 홈('/') 하나뿐이라 크롤러/헤드리스 브라우저 없이 renderToString만 쓴다.
 */
import { readFileSync, writeFileSync, rmSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const templatePath = resolve(root, 'dist/index.html');
const sitemapPath = resolve(root, 'dist/sitemap.xml');
const serverEntry = resolve(root, 'dist/server/entry-server.js');
const MARKER = '<div id="root"></div>';

const { render } = await import(serverEntry);
const appHtml = render();

const template = readFileSync(templatePath, 'utf-8');
if (!template.includes(MARKER)) {
  throw new Error(`prerender: dist/index.html에서 "${MARKER}" 앵커를 찾지 못함`);
}

writeFileSync(
  templatePath,
  template.replace(MARKER, `<div id="root">${appHtml}</div>`),
  'utf-8',
);
rmSync(resolve(root, 'dist/server'), { recursive: true, force: true });

// sitemap.xml <lastmod>를 빌드 날짜(UTC, YYYY-MM-DD)로 갱신 — 배포 때마다 최신 신호 유지
if (existsSync(sitemapPath)) {
  const today = new Date().toISOString().slice(0, 10);
  const sitemap = readFileSync(sitemapPath, 'utf-8');
  const patched = sitemap.replace(/<lastmod>.*?<\/lastmod>/g, `<lastmod>${today}</lastmod>`);
  if (patched !== sitemap) {
    writeFileSync(sitemapPath, patched, 'utf-8');
    console.log(`prerender: sitemap.xml lastmod → ${today}`);
  }
}

const textLen = appHtml.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim().length;
console.log(`prerender: 본문 주입 완료 — 마크업 ${appHtml.length}자 / 텍스트 ${textLen}자`);
if (textLen < 500) {
  throw new Error('prerender: 주입된 텍스트가 비정상적으로 짧음 (SSR 렌더 실패 의심)');
}
