/**
 * POST /api/contact — 문의 폼 제출을 FormSubmit으로 전달하는 프록시.
 * 수신 이메일은 CONTACT_EMAIL 환경 변수로만 관리 (클라이언트/저장소 비노출).
 * FormSubmit은 활성화된 도메인의 Origin을 요구하므로 프로덕션 Origin을 명시해 전달한다.
 */
const SITE_ORIGIN = 'https://nxst-page.vercel.app';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ success: 'false', message: 'Method Not Allowed' });
    return;
  }

  const email = process.env.CONTACT_EMAIL;
  if (!email) {
    res.status(500).json({ success: 'false', message: 'CONTACT_EMAIL is not configured' });
    return;
  }

  try {
    const upstream = await fetch(`https://formsubmit.co/ajax/${email}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Origin: SITE_ORIGIN,
        Referer: `${SITE_ORIGIN}/`,
      },
      body: JSON.stringify(req.body ?? {}),
    });
    const json = await upstream.json();
    res.status(upstream.status).json(json);
  } catch {
    res.status(502).json({ success: 'false', message: 'Upstream request failed' });
  }
}
