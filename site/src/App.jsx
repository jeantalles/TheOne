import { useCallback, useEffect, useRef, useState, lazy, Suspense } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SpeedInsights } from '@vercel/speed-insights/react';

import Navbar from './components/Navbar';
import Hero from './components/1-Hero';
import GradientTransition from './components/2-GradientTransition';
import StorytellingIntro from './components/3a-StorytellingIntro';
import PersonaTrigger from './components/3b-PersonaTrigger';
import PersonaSelector from './components/3c-PersonaSelector';
import Storytelling from './components/3-Storytelling';
import TheOne from './components/4-TheOne';
import SolucoesTheOne from './components/4b-SolucoesTheOne';
import Methodology from './components/5-Methodology';
import Audience from './components/6-Audience';
import { useConstrainedMotion, usePrefersReducedMotion } from './hooks/useMediaQuery';
import { usePathname } from './utils/router';

// Below-fold heavy components — loaded lazily to reduce initial bundle
const Cases = lazy(() => import('./components/8-Cases'));
const Founders = lazy(() => import('./components/9-Founders'));
const FinalCTA = lazy(() => import('./components/10-FinalCTA'));
const DesignSystem = lazy(() => import('./components/DesignSystem'));
const CaseDetailPage = lazy(() => import('./components/cases/CaseDetailPage'));
const PropostaPage = lazy(() => import('./components/PropostaPage'));
const PropostaLacqua = lazy(() => import('./components/PropostaLacqua'));
const PropostaEdifica = lazy(() => import('./components/PropostaEdifica'));
const PropostaEike = lazy(() => import('./components/PropostaEike'));
const PropostaAlexandria = lazy(() => import('./components/PropostaAlexandria'));
const QualificacaoPage = lazy(() => import('./components/QualificacaoPage'));
const AgentOnePage = lazy(() => import('./components/AgentOnePage'));

// Prevent browser from restoring scroll position on reload (must be synchronous,
// before any useEffect, so the browser sees it before scroll restoration fires).
if (typeof window !== 'undefined') {
  window.history.scrollRestoration = 'manual';
}

gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({
  limitCallbacks: true,
  // Avoid mobile browser chrome show/hide from forcing ScrollTrigger refreshes
  // mid-scroll, which can make the page jump in long narrative sections.
  ignoreMobileResize: true,
});

function isReloadNavigation() {
  if (typeof window === 'undefined') {
    return false;
  }

  const navigationEntry = window.performance?.getEntriesByType?.('navigation')?.[0];
  if (navigationEntry && typeof navigationEntry.type === 'string') {
    return navigationEntry.type === 'reload';
  }

  return window.performance?.navigation?.type === 1;
}

export default function App() {
  const lenisRef = useRef(null);
  const pathname = usePathname();
  const isHomeRoute = pathname === '/';
  const isPropostaRoute = pathname === '/proposta' || pathname === '/proposta/';
  const isPropostaLacqua = pathname === '/lacqua-purificadores' || pathname === '/lacqua-purificadores/';
  const isPropostaEdifica = pathname === '/edifica' || pathname === '/edifica/';
  const isPropostaEike = pathname === '/eike' || pathname === '/eike/';
  const isPropostaAlexandria = pathname === '/alexandria-proposta' || pathname === '/alexandria-proposta/';
  const isAgentOne = ['/agent-one', '/agent-one/', '/agentone', '/agentone/'].includes(pathname);
  const isDesignSystem = pathname === '/design-system';
  const isQualificacao = ['/formulario', '/formulario/', '/qualificacao', '/qualificacao/'].includes(pathname);
  const caseSlug = pathname.startsWith('/cases/')
    ? pathname.replace(/^\/cases\//, '').replace(/\/$/, '')
    : null;
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersConstrainedMotion = useConstrainedMotion();
  const shouldUseLightScroll = prefersReducedMotion || prefersConstrainedMotion;
  const shouldUseLenis = isHomeRoute && !shouldUseLightScroll;

  // ── Persona state ──────────────────────────────────────────────────────────
  const [persona, setPersona] = useState(null);
  const [showSelector, setShowSelector] = useState(false);
  const [triggered, setTriggered] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.history) {
      return undefined;
    }

    return () => {
      window.history.scrollRestoration = 'auto';
    };
  }, []);

  // ── Lenis smooth scroll ───────────────────────────────────────────────────
  useEffect(() => {
    if (!shouldUseLenis) {
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
  }, [shouldUseLenis]);

  // ── Bloquear / liberar scroll quando o popup está ativo ───────────────────
  useEffect(() => {
    const lenis = lenisRef.current;

    if (showSelector) {
      // Parar Lenis
      lenis?.stop();
      // Fallback para scroll nativo (modo reduzido)
      document.body.style.overflow = 'hidden';
    } else {
      lenis?.start();
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [showSelector]);

  useEffect(() => {
    if (!isHomeRoute || typeof window === 'undefined') {
      return undefined;
    }

    const reloadedHome = isReloadNavigation();
    const historyState = window.history.state ?? {};
    const hasExplicitRestoreState = Number.isFinite(historyState.restoreScrollY)
      || Number.isFinite(historyState.savedScrollY)
      || Boolean(historyState.restoreCasesOpen || historyState.savedCasesOpen);

    if (hasExplicitRestoreState && !reloadedHome) {
      return undefined;
    }

    let rafId = 0;
    let attempts = 0;
    let cancelled = false;

    const resetToHeroStart = () => {
      if (cancelled) {
        return;
      }

      if (reloadedHome && hasExplicitRestoreState) {
        const nextState = { ...(window.history.state ?? {}) };
        delete nextState.restoreScrollY;
        delete nextState.savedScrollY;
        delete nextState.restoreCasesOpen;
        delete nextState.savedCasesOpen;
        window.history.replaceState(
          nextState,
          '',
          `${window.location.pathname}${window.location.search}${window.location.hash}`
        );
      }

      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });

      if (Math.abs(window.scrollY) > 2 && attempts < 8) {
        attempts += 1;
        rafId = requestAnimationFrame(resetToHeroStart);
        return;
      }

      window.dispatchEvent(new Event('scroll'));
    };

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(resetToHeroStart);
    });

    return () => {
      cancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isHomeRoute, shouldUseLenis]);

  useEffect(() => {
    if (!isHomeRoute || typeof window === 'undefined') {
      return undefined;
    }

    if (isReloadNavigation()) {
      return undefined;
    }

    const historyState = window.history.state ?? {};
    const targetScrollY = Number.isFinite(historyState.restoreScrollY)
      ? historyState.restoreScrollY
      : (Number.isFinite(historyState.savedScrollY) ? historyState.savedScrollY : null);
    const shouldRestoreCasesOpen = Boolean(historyState.restoreCasesOpen || historyState.savedCasesOpen);

    if (targetScrollY == null && !shouldRestoreCasesOpen) {
      return undefined;
    }

    let rafId = 0;
    let attempts = 0;
    let cancelled = false;

    const clearRestoreState = () => {
      const nextState = { ...(window.history.state ?? {}) };
      delete nextState.restoreScrollY;
      delete nextState.savedScrollY;
      delete nextState.restoreCasesOpen;
      delete nextState.savedCasesOpen;
      window.history.replaceState(
        nextState,
        '',
        `${window.location.pathname}${window.location.search}${window.location.hash}`
      );
    };

    const restoreScroll = () => {
      if (cancelled) {
        return;
      }

      window.scrollTo({ top: targetScrollY, left: 0, behavior: 'auto' });

      if (Math.abs(window.scrollY - targetScrollY) > 2 && attempts < 8) {
        attempts += 1;
        rafId = requestAnimationFrame(restoreScroll);
        return;
      }

      clearRestoreState();
      window.dispatchEvent(new Event('scroll'));
    };

    rafId = requestAnimationFrame(() => {
      rafId = requestAnimationFrame(restoreScroll);
    });

    return () => {
      cancelled = true;
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
    };
  }, [isHomeRoute, shouldUseLenis]);

  // ── Callback do trigger (seção vazia) ─────────────────────────────────────
  const handleTrigger = useCallback(() => {
    if (persona) return; // já selecionou — não mostrar de novo
    setTriggered(true);
    setShowSelector(true);
  }, [persona]);

  // ── Callback de seleção de persona ───────────────────────────────────────
  const handlePersonaSelect = useCallback((value) => {
    setPersona(value);
    setShowSelector(false);
    // Deixar o React commitar o Storytelling atualizado antes de recalcular
    requestAnimationFrame(() =>
      requestAnimationFrame(() => ScrollTrigger.refresh())
    );
  }, []);

  if (isDesignSystem) {
    return <Suspense fallback={null}><DesignSystem /></Suspense>;
  }

  if (isQualificacao) {
    return <Suspense fallback={null}><QualificacaoPage /></Suspense>;
  }

  if (isAgentOne) {
    return <Suspense fallback={null}><AgentOnePage /></Suspense>;
  }

  if (isPropostaRoute) {
    return <Suspense fallback={null}><PropostaPage /></Suspense>;
  }

  if (isPropostaLacqua) {
    return <Suspense fallback={null}><PropostaLacqua /></Suspense>;
  }

  if (isPropostaEdifica) {
    return <Suspense fallback={null}><PropostaEdifica /></Suspense>;
  }

  if (isPropostaEike) {
    return <Suspense fallback={null}><PropostaEike /></Suspense>;
  }

  if (isPropostaAlexandria) {
    return <Suspense fallback={null}><PropostaAlexandria /></Suspense>;
  }

  if (caseSlug) {
    return <Suspense fallback={null}><CaseDetailPage slug={caseSlug} /></Suspense>;
  }

  return (
    <div className="bg-[#212121] min-h-screen font-sans selection:bg-accent selection:text-[#050505]">
      <Navbar />
      <main>
        <div style={{ backgroundColor: '#F5EEE9' }}>
          <Hero />
          <StorytellingIntro />
          {/* Seção vazia que dispara o popup de persona */}
          <PersonaTrigger onTrigger={handleTrigger} triggered={triggered} />
          <GradientTransition />
        </div>
        {persona && (
          <>
            <Storytelling persona={persona} />
            <TheOne />
            <SolucoesTheOne />
            <Methodology />
            <Audience />
            <Suspense fallback={null}>
              <Cases />
              <Founders />
              <FinalCTA />
            </Suspense>
          </>
        )}
      </main>
      <footer className="border-t border-white/5 bg-[#212121] py-8 text-center">
        <p className="text-white/38 text-xs font-mono font-bold tracking-[0.3em] uppercase">© 2026 THE ONE CONSULTORIA DE MARCA.</p>
      </footer>

      {/* Popup de seleção de persona — fixo, sem fundo, sem backdrop */}
      {showSelector && (
        <PersonaSelector onSelect={handlePersonaSelect} />
      )}
      <SpeedInsights />
    </div>
  );
}
