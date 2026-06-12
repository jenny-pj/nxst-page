import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import ProofBar from './components/ProofBar.jsx';
import Problem from './components/Problem.jsx';
import Technology from './components/Technology.jsx';
import Research from './components/Research.jsx';
import UseCases from './components/UseCases.jsx';
import News from './components/News.jsx';
import About from './components/About.jsx';
import Contact from './components/Contact.jsx';

export default function App() {
  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-surface focus:px-4 focus:py-2 focus:text-sm focus:text-ink"
      >
        본문 바로가기
      </a>
      <Nav />

      <main id="main">
        <Hero /> {/* §4.1 — Denoising 시그니처 */}
        <ProofBar /> {/* §4.2 */}
        <Problem /> {/* §4.3 — 스크롤 연동 산점도 */}
        <Technology /> {/* §4.4 — 인터랙티브 스택 다이어그램 */}
        <Research /> {/* §4.5 — 필터 그리드 */}
        <UseCases /> {/* §4.6 — 라인아이콘 카드 */}
        <News /> {/* §4.7 */}
        <About /> {/* §4.8 — 카운트업 지표 */}
        <Contact /> {/* §4.9 — 구글맵 임베드 */}
      </main>

      <Footer />
    </>
  );
}
