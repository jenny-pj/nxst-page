import { useEffect, useState } from 'react';
import { nav } from '../data/copy.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';
import logoWhite from '../assets/figma/logo-white.png';

const SECTION_IDS = nav.map((n) => n.id);

/**
 * 다크 히어로 위에 얹히는 오버레이 네비 — 스크롤 시 다크 반투명 배경으로 전환.
 */
export default function Nav() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? 'bg-dark/85 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <nav
        aria-label="주 메뉴"
        className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-5 md:h-[88px] md:px-[60px]"
      >
        <a href="#top" className="shrink-0" aria-label="NEXTSTUDIO 홈">
          <img src={logoWhite} alt="NEXTSTUDIO" className="h-[20px] w-auto md:h-[26px]" />
        </a>

        {/* 데스크톱 메뉴 */}
        <ul className="hidden items-center gap-8 lg:flex xl:gap-[46px]">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`relative text-[16px] font-medium leading-[1.5] transition-colors after:absolute after:-bottom-1.5 after:left-0 after:h-px after:bg-accent after:transition-[width] after:duration-300 xl:text-[18px] ${
                  activeId === item.id
                    ? 'text-accent after:w-full'
                    : 'text-ink-light-soft after:w-0 hover:text-glow hover:after:w-full'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* 모바일 햄버거 */}
        <button
          type="button"
          aria-expanded={menuOpen}
          aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
          onClick={() => setMenuOpen((v) => !v)}
          className="flex h-10 w-10 items-center justify-center text-ink-light-soft lg:hidden"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
            {menuOpen ? (
              <path d="M4 4 L16 16 M16 4 L4 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            ) : (
              <path d="M3 5.5 H17 M3 10 H17 M3 14.5 H17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </nav>

      {/* 모바일 드로어 */}
      {menuOpen && (
        <ul className="border-t border-white/10 bg-dark/95 px-5 py-3 backdrop-blur-md lg:hidden">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`block py-3 text-[15px] font-medium ${
                  activeId === item.id ? 'text-accent' : 'text-ink-light-soft'
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
