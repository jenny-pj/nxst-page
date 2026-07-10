import Nav from './components/Nav.jsx';
import Footer from './components/Footer.jsx';
import Hero from './components/Hero.jsx';
import WhyData from './components/WhyData.jsx';
import ResearchAreas from './components/ResearchAreas.jsx';
import Framework from './components/Framework.jsx';
import Expertise from './components/Expertise.jsx';
import Principles from './components/Principles.jsx';
import Collaboration from './components/Collaboration.jsx';
import CopyVersionToggle from './components/CopyVersionToggle.jsx';

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
        <Hero /> {/* SECTION 01 — 브랜드 선언 */}
        <WhyData /> {/* SECTION 02 — 왜 산업 데이터인가 */}
        <ResearchAreas /> {/* SECTION 03 — 무엇을 연구하는가 */}
        <Framework /> {/* SECTION 04 — 어떻게 연구하는가 */}
        <Expertise /> {/* SECTION 05 — 핵심 연구 역량 */}
        <Principles /> {/* SECTION 06 — 연구 철학 */}
        <Collaboration /> {/* SECTION 07 — 연구 협력 */}
      </main>

      <Footer />
      <CopyVersionToggle /> {/* 카피 v1/v2 비교용 임시 토글 — 확정 시 제거 */}
    </>
  );
}
