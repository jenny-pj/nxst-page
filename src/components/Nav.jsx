import { useState } from 'react';
import { nav, site } from '../data/copy.js';
import { useScrollSpy } from '../hooks/useScrollSpy.js';

const SECTION_IDS = nav.map((n) => n.id);

export default function Nav() {
  const activeId = useScrollSpy(SECTION_IDS);
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-line bg-bg/85 backdrop-blur-md">
      <nav aria-label="주 메뉴" className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-8">
        <a
          href="#top"
          className="font-display text-lg font-semibold tracking-tight text-ink transition-colors hover:text-signal"
        >
          nextstud<span className="text-signal">.io</span>
        </a>

        {/* 데스크톱 메뉴 */}
        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`rounded-xs px-3 py-2 font-mono text-[13px] tracking-wide transition-colors ${
                  activeId === item.id ? 'text-signal' : 'text-ink-dim hover:text-ink'
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
          className="flex h-10 w-10 items-center justify-center text-ink md:hidden"
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
        <ul className="border-t border-line bg-bg px-5 py-3 md:hidden">
          {nav.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                onClick={() => setMenuOpen(false)}
                aria-current={activeId === item.id ? 'true' : undefined}
                className={`block py-3 font-mono text-sm tracking-wide ${
                  activeId === item.id ? 'text-signal' : 'text-ink-dim'
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
