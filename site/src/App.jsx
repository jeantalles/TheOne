import { useEffect, lazy, Suspense } from 'react';
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
import { usePrefersReducedMotion } from './hooks/useMediaQuery';

// Below-fold heavy components — loaded lazily to reduce initial bundle
const Cases = lazy(() => import('./components/Cases'));
const Founders = lazy(() => import('./components/Founders'));
const FooterCTA = lazy(() => import('./components/FooterCTA'));
const DesignSystem = lazy(() => import('./components/DesignSystem'));

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });

export default function App() {
  const isDesignSystem = window.location.pathname === '/design-system';
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return undefined;
    }

    const lenis = new Lenis({
      duration: 1.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.8,
    });

    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [prefersReducedMotion]);

  if (isDesignSystem) {
    return <Suspense fallback={null}><DesignSystem /></Suspense>;
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
        <Suspense fallback={null}>
          <Cases />
          <Founders />
          <FooterCTA />
        </Suspense>
      </main>
      <footer className="border-t border-white/5 bg-[#212121] py-8 text-center">
        <p className="text-white/38 text-xs font-mono font-bold tracking-[0.3em] uppercase">© 2026 THE ONE ASSESSORIA DE MARCA.</p>
      </footer>
    </div>
  );
}
