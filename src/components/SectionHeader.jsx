import Reveal from './Reveal.jsx';

/**
 * 공통 섹션 헤더 — Figma 패턴: 액센트 eyebrow(질문) + 40px 타이틀(답) + 서포트 카피.
 * dark: 다크 섹션(#010a12) 위에서 타이틀/서포트 색 반전.
 */
export default function SectionHeader({ eyebrow, title, support, dark = false }) {
  return (
    <div className="flex w-full flex-col items-center gap-6 text-center md:gap-8">
      <Reveal>
        <p className="text-[17px] font-semibold leading-[1.25] text-accent md:text-[24px]">{eyebrow}</p>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`whitespace-pre-line text-[24px] font-semibold leading-[1.35] md:text-[40px] md:leading-[1.25] ${
            dark ? 'text-ink-light' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {support && (
        <Reveal delay={160}>
          <p
            className={`whitespace-pre-line text-[15px] leading-[1.6] md:text-[24px] md:leading-[1.4] ${
              dark ? 'text-dim-dark' : 'text-ink-dim'
            }`}
          >
            {support}
          </p>
        </Reveal>
      )}
    </div>
  );
}
