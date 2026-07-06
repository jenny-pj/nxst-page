import { useEffect, useRef, useState } from 'react';
import { faArrowRight, faXmark, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { contactForm } from '../data/copy.js';

/* 서버리스 프록시(api/contact.js) — 수신 이메일은 서버 환경 변수로만 관리.
   로컬 dev에서는 vite.config의 프록시가 같은 경로를 FormSubmit으로 중계한다. */
const FORM_ENDPOINT = '/api/contact';

const INPUT_CLASS =
  'w-full rounded-lg border border-[#dae5ef] bg-white px-4 py-3 text-[15px] leading-[1.5] text-ink placeholder:text-ink/35 transition-colors duration-200 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/20';

function FaIcon({ icon, className }) {
  const [w, h, , , path] = icon.icon;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className={className} aria-hidden="true" fill="currentColor">
      <path d={path} />
    </svg>
  );
}

/**
 * CONTACT MODAL — Footer CTA에서 열리는 문의 폼 팝업.
 * 제출은 FormSubmit AJAX로 이메일 전달. 성공/실패 상태를 모달 안에서 처리.
 */
export default function ContactModal({ open, onClose }) {
  const [status, setStatus] = useState('idle'); // idle | submitting | success | error
  const panelRef = useRef(null);
  const firstFieldRef = useRef(null);

  /* 열릴 때: 배경 스크롤 잠금 + 첫 필드 포커스 + ESC 닫기 */
  useEffect(() => {
    if (!open) return;
    setStatus('idle');
    document.body.style.overflow = 'hidden';
    firstFieldRef.current?.focus();
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    if (data._honey) return; // 스팸 봇 허니팟
    setStatus('submitting');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          _subject: `[nextstud.io] ${data.topic} — ${data.name}`,
          _template: 'table',
          _captcha: 'false',
          이름: data.name,
          이메일: data.email,
          소속: data.organization || '-',
          '문의 유형': data.topic,
          '문의 내용': data.message,
        }),
      });
      const json = await res.json();
      if (!res.ok || String(json.success) !== 'true') throw new Error(json.message);
      setStatus('success');
    } catch (err) {
      console.error('[ContactModal] 전송 실패:', err?.message ?? err);
      setStatus('error');
    }
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center px-5 py-8"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
    >
      {/* 오버레이 — 클릭 시 닫기 */}
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-dark/70 backdrop-blur-sm"
        tabIndex={-1}
      />

      <div
        ref={panelRef}
        className="relative w-full max-w-[560px] max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_24px_64px_rgba(1,10,18,0.35)] md:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-5 top-5 flex size-9 items-center justify-center rounded-full text-ink/40 transition-colors duration-200 hover:bg-[#f0f4f9] hover:text-ink"
        >
          <FaIcon icon={faXmark} className="h-4 w-4" />
        </button>

        {status === 'success' ? (
          <div className="flex flex-col items-center gap-4 py-10 text-center">
            <FaIcon icon={faCircleCheck} className="h-12 w-12 text-accent" />
            <p className="text-[22px] font-bold leading-[1.3] text-ink">{contactForm.successTitle}</p>
            <p className="whitespace-pre-line text-[15px] leading-[1.6] text-ink/60">{contactForm.successSub}</p>
            <button
              type="button"
              onClick={onClose}
              className="mt-2 rounded-lg bg-dark px-8 py-3 text-[15px] text-white transition-colors duration-300 hover:bg-accent"
            >
              {contactForm.close}
            </button>
          </div>
        ) : (
          <>
            <h2 id="contact-modal-title" className="text-[24px] font-bold leading-[1.3] text-ink md:text-[28px]">
              {contactForm.title}
            </h2>
            <p className="mt-2 text-[15px] leading-[1.6] text-ink/60">{contactForm.sub}</p>

            <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
              {/* 허니팟 — 봇만 채우는 숨김 필드 */}
              <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="grid gap-5 md:grid-cols-2">
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-ink/70">
                    {contactForm.labels.name} <span className="text-accent">*</span>
                  </span>
                  <input
                    ref={firstFieldRef}
                    type="text"
                    name="name"
                    required
                    placeholder={contactForm.placeholders.name}
                    className={INPUT_CLASS}
                  />
                </label>
                <label className="flex flex-col gap-2">
                  <span className="text-[13px] font-semibold text-ink/70">
                    {contactForm.labels.email} <span className="text-accent">*</span>
                  </span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={contactForm.placeholders.email}
                    className={INPUT_CLASS}
                  />
                </label>
              </div>

              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-ink/70">{contactForm.labels.organization}</span>
                <input
                  type="text"
                  name="organization"
                  placeholder={contactForm.placeholders.organization}
                  className={INPUT_CLASS}
                />
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-ink/70">
                  {contactForm.labels.topic} <span className="text-accent">*</span>
                </span>
                <select name="topic" required defaultValue="" className={`${INPUT_CLASS} appearance-none`}>
                  <option value="" disabled>
                    {contactForm.placeholders.topic}
                  </option>
                  {contactForm.topics.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>

              <label className="flex flex-col gap-2">
                <span className="text-[13px] font-semibold text-ink/70">
                  {contactForm.labels.message} <span className="text-accent">*</span>
                </span>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={contactForm.placeholders.message}
                  className={`${INPUT_CLASS} resize-y`}
                />
              </label>

              {status === 'error' && (
                <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-[14px] leading-[1.5] text-red-600">
                  {contactForm.error}
                </p>
              )}

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="group mt-1 inline-flex h-[50px] items-center justify-center gap-3 rounded-lg bg-accent text-[16px] font-medium text-white transition-all duration-300 hover:bg-dark disabled:cursor-not-allowed disabled:opacity-60"
              >
                {status === 'submitting' ? contactForm.submitting : contactForm.submit}
                <FaIcon
                  icon={faArrowRight}
                  className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
                />
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
