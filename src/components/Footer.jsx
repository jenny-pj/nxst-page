import { footer, site } from '../data/copy.js';
import logoWhite from '../assets/figma/logo-white.png';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-dark">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-4 px-5 py-10 md:flex-row md:items-center md:justify-between md:px-[60px]">
        <img src={logoWhite} alt="NEXTSTUDIO" className="h-[18px] w-auto self-start md:self-auto" />
        <p className="text-[13px] leading-[1.25] text-dim-dark">{site.tagline}</p>
        <p className="text-[13px] leading-[1.25] text-dim-dark">{footer.copyright}</p>
      </div>
    </footer>
  );
}
