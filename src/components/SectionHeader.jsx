import Reveal from './Reveal.jsx';

/**
 * 공통 섹션 헤더 — Figma 패턴: 액센트 eyebrow(질문) + 40px 타이틀(답) + 서포트 카피.
 * dark: 다크 섹션(#010a12) 위에서 타이틀/서포트 색 반전.
 * tight: 텍스트 간 간격을 16px(gap-4)로 고정 (기본은 32px, md에서 48px).
 */
export default function SectionHeader({ eyebrow, title, support, dark = false, tight = false }) {
  return (
    <div className={`flex w-full flex-col items-center text-center ${tight ? 'gap-4' : 'gap-8 md:gap-12'}`}>
      <Reveal>
        <p className="whitespace-pre-line text-[17px] font-semibold leading-[1.4] text-accent md:text-[24px] md:leading-[1.4]">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={80}>
        <h2
          className={`whitespace-pre-line text-[24px] font-semibold leading-[1.5] md:text-[40px] md:leading-[1.45] ${
            dark ? 'text-ink-light' : 'text-ink'
          }`}
        >
          {title}
        </h2>
      </Reveal>
      {support && (
        <Reveal delay={160}>
          <p
            className={`whitespace-pre-line text-[15px] leading-[1.8] md:text-[24px] md:leading-[1.7] ${
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
