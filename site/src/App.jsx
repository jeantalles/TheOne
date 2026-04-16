import { useEffect, useRef, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './components/Navbar';
import Hero from './components/1-Hero';
import GradientTransition from './components/2-GradientTransition';
import StorytellingIntro from './components/3a-StorytellingIntro';
import Storytelling from './components/3-Storytelling';
import TheOne from './components/4-TheOne';
import Methodology from './components/5-Methodology';
import Audience from './components/6-Audience';
import Products from './components/7-Products';
import { useConstrainedMotion, usePrefersReducedMotion } from './hooks/useMediaQuery';

// Below-fold heavy components — loaded lazily to reduce initial bundle
const Cases = lazy(() => import('./components/8-Cases'));
const Founders = lazy(() => import('./components/9-Founders'));
const FinalCTA = lazy(() => import('./components/10-FinalCTA'));
const DesignSystem = lazy(() => import('./components/DesignSystem'));

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ limitCallbacks: true });

export default function App() {
  const lenisRef = useRef(null);
  const isDesignSystem = window.location.pathname === '/design-system';
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersConstrainedMotion = useConstrainedMotion();
  const shouldUseLightScroll = prefersReducedMotion || prefersConstrainedMotion;

  useEffect(() => {
    if (shouldUseLightScroll) {
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

    lenisRef.current = lenis;
    window.__theOneLenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;

    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisRef.current = null;
      if (window.__theOneLenis === lenis) {
        delete window.__theOneLenis;
      }
      lenis.destroy();
    };
  }, [shouldUseLightScroll]);

  if (isDesignSystem) {
    return <Suspense fallback={null}><DesignSystem /></Suspense>;
  }

  return (
    <div className="bg-[#212121] min-h-screen font-sans selection:bg-accent selection:text-[#050505]">
      <Navbar />
      <main>
        <div style={{ backgroundColor: '#F5EEE9' }}>
          <Hero />
          <StorytellingIntro />
          <GradientTransition />
        </div>
        <Storytelling />
        <TheOne />
        <Methodology />
        <Audience />
        <Products />
        <Suspense fallback={null}>
          <Cases />
          <Founders />
          <FinalCTA />
        </Suspense>
      </main>
      <footer className="border-t border-white/5 bg-[#212121] py-8 text-center">
        <p className="text-white/38 text-xs font-mono font-bold tracking-[0.3em] uppercase">© 2026 THE ONE ASSESSORIA DE MARCA.</p>
      </footer>
    </div>
  );
}
