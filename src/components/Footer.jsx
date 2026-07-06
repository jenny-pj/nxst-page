import { useState } from 'react';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { footer, nav } from '../data/copy.js';
import logoWhite from '../assets/figma/logo-white.png';
import ContactModal from './ContactModal.jsx';

/**
 * FOOTER — Figma 81:407 다크 배너.
 * 헤드라인 + 서브카피 + 카피라이트 (좌) / Contact Us 버튼 (우) / 로고 + 네비 행 (하단).
 * Contact Us 버튼은 문의 폼 모달을 연다.
 */
export default function Footer() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <footer id="contact" className="scroll-mt-[72px] bg-dark">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-16 px-5 py-24 md:px-[60px] md:py-[140px]">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col gap-4">
            <p className="text-[24px] font-bold leading-[1.25] text-ink-light-soft md:text-[30px]">{footer.headline}</p>
            <p className="whitespace-pre-line text-[16px] font-medium leading-[1.5] text-ink-light-soft md:text-[20px]">
              {footer.sub}
            </p>
            <p className="mt-2 text-[14px] font-medium leading-[1.25] text-ink-light-soft/70 md:text-[16px]">
              {footer.copyright}
            </p>
          </div>

          <button
            type="button"
            onClick={() => setModalOpen(true)}
            className="group inline-flex h-[50px] w-full max-w-[300px] items-center justify-center gap-3 self-start rounded-lg bg-white text-[18px] leading-[1.25] text-ink transition-all duration-300 hover:bg-accent hover:text-white md:text-[20px]"
          >
            {footer.cta}
            <svg
              viewBox="0 0 448 512"
              aria-hidden="true"
              className="h-4 w-4 shrink-0 transition-transform duration-300 group-hover:translate-x-1"
              fill="currentColor"
            >
              <path d={faArrowRight.icon[4]} />
            </svg>
          </button>
        </div>

        <div className="flex flex-col gap-6 border-t border-white/10 pt-8 md:flex-row md:items-center md:justify-between">
          <img src={logoWhite} alt="NEXTSTUDIO" className="h-[24px] w-auto self-start md:h-[31px]" />
          <nav aria-label="푸터 내비게이션">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 md:gap-x-12">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-[13px] font-medium leading-[1.25] text-ink-light-soft/50 transition-colors duration-300 hover:text-ink-light-soft md:text-[14px]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <ContactModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </footer>
  );
}
