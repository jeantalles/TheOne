import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import HeroLight from './components/HeroLight';
import GradientTransition from './components/GradientTransition';
import ScrollStorytelling from './components/ScrollStorytelling';
import TheOneConclusion from './components/TheOneConclusion';
import Methodology from './components/Methodology';
import Audience from './components/Audience';
import Products from './components/Products';
import Cases from './components/Cases';
import Founders from './components/Founders';
import FooterCTA from './components/FooterCTA';
import DesignSystem from './components/DesignSystem';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const isDesignSystem = window.location.pathname === '/design-system';

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => { lenis.destroy(); };
  }, []);

  if (isDesignSystem) {
    return <DesignSystem />;
  }

  return (
    <div className="bg-[#212121] min-h-screen font-sans selection:bg-accent selection:text-[#050505]">
      <Navbar />
      <main>
        <HeroLight />
        <GradientTransition />
        <ScrollStorytelling />
        <TheOneConclusion />
        <Methodology />
        <Audience />
        <Products />
        <Cases />
        <Founders />
        <FooterCTA />
      </main>
      <footer className="border-t border-black/5 bg-[#F5F0EC] py-8 text-center">
        <p className="text-[#151311]/38 text-xs font-mono font-bold tracking-[0.3em] uppercase">© 2026 THE ONE ASSESSORIA DE MARCA.</p>
      </footer>
    </div>
  );
}
