import { footer, site } from '../data/copy.js';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-5 py-8 md:flex-row md:items-center md:px-8">
        <p className="font-display text-sm font-medium text-ink-dim">
          nextstud<span className="text-signal">.io</span>
        </p>
        <p className="font-mono text-xs text-ink-dim">{footer.copyright}</p>
      </div>
    </footer>
  );
}
