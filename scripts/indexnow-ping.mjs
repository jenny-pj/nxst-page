// IndexNow 핑 — Bing·Yandex·Naver·Seznam에 URL 갱신을 한 번에 통지
// 참여 검색엔진: https://www.indexnow.org/ (Naver 포함)
// 사용법: node scripts/indexnow-ping.mjs   (배포 완료 후 실행 — 키 파일이 라이브여야 함)

const HOST = 'nextstud.io';
const KEY = '3afc99f4fc184de783fd70bf5f4e1db9606ed3c7959a4b3094b0eaee62c4a8bb';
const URLS = [`https://${HOST}/`];

const body = {
  host: HOST,
  key: KEY,
  keyLocation: `https://${HOST}/${KEY}.txt`,
  urlList: URLS,
};

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify(body),
});

// 200/202 = 접수됨, 422 = 키/URL 불일치, 403 = 키 검증 실패
console.log(`IndexNow: ${res.status} ${res.statusText}`);
console.log(await res.text().catch(() => ''));
if (![200, 202].includes(res.status)) process.exit(1);
