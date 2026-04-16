import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Observer } from 'gsap/Observer';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import negocioMediaImage from '../assets/products-step-01/negocio-media.jpeg';
import publicoMediaImage from '../assets/products-step-01/publico-media.jpeg';
import mercadoMediaImage from '../assets/products-step-01/mercado-media.jpeg';

gsap.registerPlugin(ScrollTrigger, Observer);

const STEPS = [
  {
    number: '01',
    label: 'Pesquisa e Diagnóstico',
    description: 'Entendemos o jogo antes para construir uma marca que vai vencê-lo.',
    cards: [
      { label: 'Diagnóstico de negócio', src: negocioMediaImage },
      { label: 'Diagnóstico de público', src: publicoMediaImage },
      { label: 'Diagnóstico de mercado', src: mercadoMediaImage },
    ],
  },
  {
    number: '02',
    label: 'Estratégia de Marca e Posicionamento',
    description: 'Definimos o lugar que a sua marca deve ocupar para deixar de ser só mais uma opção.',
    cards: [
      { label: 'Base estratégica',       src: null },
      { label: 'ICP e posicionamento',   src: null },
      { label: 'Estratégia de conteúdo', src: null },
    ],
  },
  {
    number: '03',
    label: 'Identidade de Marca',
    description: 'Transformamos estratégia em uma marca que o mercado reconhece, lembra e deseja.',
    cards: [
      { label: 'Identidade verbal',    src: null },
      { label: 'Identidade visual',    src: null },
      { label: 'Experiência de marca', src: null },
    ],
  },
  {
    number: '04',
    label: 'Planejamento de Go-to-Market',
    description: 'Levamos posicionamento para o mercado com lógica de presença, crescimento e receita.',
    cards: [
      { label: 'Plano de distribuição',    src: null },
      { label: 'Estratégia de lançamento', src: null },
      { label: 'Arquitetura de receita',   src: null },
    ],
  },
  {
    number: '05',
    label: 'Assessoria & Consultoria de Execução',
    description: 'Garantimos que a estratégia ganhe vida na operação, com seu time ou ao seu lado.',
    cards: [
      { label: 'Playbook de execução',       src: null },
      { label: 'Treinamento do time',        src: null },
      { label: 'Acompanhamento operacional', src: null },
    ],
  },
];

// Both drums share the same row height — keeps them in perfect sync
const ROW_H  = 460;
const CONT_H = ROW_H * 3; // 1140px (overflows 900px viewport on each side; clipped by sticky overflow:hidden)
const STEP_TRANSITION_DURATION = 0.78;
const STEP_PIN_DISTANCE_VH = 160;
const PIN_SCROLL_ANCHOR_RATIO = 0.5;
const EDGE_EXIT_COOLDOWN_MS = 520;
const EDGE_EXIT_ARM_WINDOW_MS = 900;
const EDGE_EXIT_MIN_DELAY_MS = 180;
const STEP_COOLDOWN_MS = 420; // blocks next step while momentum dissipates
const NEAR_SCALE = 0.56;
const NEAR_OPACITY = 0.22;
const FAR_SCALE = 0.32;
const FAR_OPACITY = 0.03;

// Number drum uses the same row height as content drum

// Both drums are vertically centered → active items land at 50vh

function DeliverableCard({ label, src }) {
  return (
    <div
      style={{
        flex: '0 0 calc((100% - 48px) / 3)',
        minWidth: 0,
        width: 'calc((100% - 48px) / 3)',
      }}
    >
      <p
        className="font-halyard font-light"
        style={{
          fontSize: 'clamp(1.1rem, 1.45vw, 1.35rem)',
          color: '#fff',
          marginBottom: '12px',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          lineHeight: 1.2,
        }}
      >
        {label}
      </p>
      <div
        style={{
          borderRadius: '20px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          aspectRatio: '16 / 9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {src && (
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="block w-full h-full object-cover"
          />
        )}
      </div>
    </div>
  );
}

export default function Products() {
  const sectionRef   = useRef(null);
  const headerRef    = useRef(null);
  const stickyRef    = useRef(null);
  const lineFillRef  = useRef(null);
  const numTrackRef  = useRef(null);
  const numRowRefs   = useRef([]);
  const contTrackRef = useRef(null);
  const contRowRefs  = useRef([]);

  const n = STEPS.length;
  const lineInsetForStep = () => 50;

  useEffect(() => {
    const lenis = typeof window !== 'undefined' ? window.__theOneLenis : null;

    const ctx = gsap.context(() => {
      let currentStep = 0;
      let isAnimating = false;
      let stepTween = null;
      let observer = null;
      let pinTrigger = null;
      let isReleasing = false;
      let edgeReleaseDirection = 0;
      let edgeReleaseArmedAt = 0;
      let edgeExitCooldownUntil = 0;

      const resetEdgeRelease = () => {
        edgeReleaseDirection = 0;
        edgeReleaseArmedAt = 0;
      };

      const syncPinAnchor = () => {
        if (!pinTrigger?.isActive || isReleasing) return;

        const anchorPosition = pinTrigger.start + ((pinTrigger.end - pinTrigger.start) * PIN_SCROLL_ANCHOR_RATIO);
        pinTrigger.scroll(anchorPosition);
      };

      /* ── header entrance ─────────────────────────────── */
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 28, filter: 'blur(12px)' },
        {
          opacity: 1, y: 0, filter: 'blur(0px)',
          duration: 0.9, ease: 'power3.out',
          scrollTrigger: { trigger: headerRef.current, start: 'top 88%', once: true },
        }
      );

      /* ── initial row states ──────────────────────────── */
      // Content rows: scale + opacity
      contRowRefs.current.forEach((el, i) => {
        if (!el) return;
        const scale   = i === 0 ? 1 : i === 1 ? NEAR_SCALE : FAR_SCALE;
        const opacity = i === 0 ? 1 : i === 1 ? NEAR_OPACITY : FAR_OPACITY;
        gsap.set(el, { scale, opacity, transformOrigin: 'center center' });
      });
      // Number rows: scale only — no opacity fade
      numRowRefs.current.forEach((el, i) => {
        if (!el) return;
        const scale = i === 0 ? 1 : i === 1 ? NEAR_SCALE : FAR_SCALE;
        gsap.set(el, { scale, opacity: 1, transformOrigin: 'center center' });
      });

      /* ── line pre-filled to center — active circle is always at 50% ── */
      // Starts touching circle 01; grows downward past center as steps advance
      gsap.set(lineFillRef.current, { clipPath: `inset(0 0 ${lineInsetForStep(0)}% 0)` });

      /* ── master timeline ─────────────────────────────── */
      const tl = gsap.timeline({ paused: true });

      // ③ Per-step scale & opacity — content fades, numbers only scale
      for (let i = 0; i < n - 1; i++) {
        const cont = (idx) => [contRowRefs.current[idx]].filter(Boolean);
        const num  = (idx) => [numRowRefs.current[idx]].filter(Boolean);
        const nextStep = i + 1;

        tl.to(
          lineFillRef.current,
          {
            clipPath: `inset(0 0 ${lineInsetForStep(nextStep)}% 0)`,
            duration: 1,
            ease: 'none',
          },
          i
        );
        tl.to(
          [numTrackRef.current, contTrackRef.current],
          {
            y: -(nextStep * ROW_H),
            duration: 1,
            ease: 'none',
          },
          i
        );

        tl.to(cont(i),     { scale: NEAR_SCALE, opacity: NEAR_OPACITY, duration: 1, ease: 'none' }, i);
        tl.to(num(i),      { scale: NEAR_SCALE,                   duration: 1, ease: 'none' }, i);
        tl.to(cont(i + 1), { scale: 1,    opacity: 1,    duration: 1, ease: 'none' }, i);
        tl.to(num(i + 1),  { scale: 1,                   duration: 1, ease: 'none' }, i);

        if (i + 2 < n) {
          tl.to(
            cont(i + 2),
            { scale: NEAR_SCALE, opacity: NEAR_OPACITY, duration: 1, ease: 'none' },
            i
          );
          tl.to(
            num(i + 2),
            { scale: NEAR_SCALE, duration: 1, ease: 'none' },
            i
          );
        }
        if (i - 1 >= 0) {
          tl.to(
            cont(i - 1),
            { scale: FAR_SCALE, opacity: FAR_OPACITY, duration: 1, ease: 'none' },
            i
          );
          tl.to(
            num(i - 1),
            { scale: FAR_SCALE, duration: 1, ease: 'none' },
            i
          );
        }
      }

      tl.totalTime(0);

      const animateToStep = (targetStep) => {
        const clampedStep = gsap.utils.clamp(0, n - 1, targetStep);

        if (clampedStep === currentStep || isAnimating) return;

        isReleasing = false;
        resetEdgeRelease();
        isAnimating = true;
        stepTween?.kill();
        observer?.disable(); // clears accumulated delta; re-enabled after cooldown

        const playhead = { value: tl.totalTime() };

        stepTween = gsap.to(playhead, {
          value: clampedStep,
          duration: STEP_TRANSITION_DURATION,
          ease: 'power2.inOut',
          onUpdate: () => {
            tl.totalTime(playhead.value);
          },
          onComplete: () => {
            currentStep = clampedStep;
            isAnimating = false;
            edgeExitCooldownUntil = performance.now() + EDGE_EXIT_COOLDOWN_MS;
            syncPinAnchor();
            // Re-enable after cooldown with a fresh zero-delta state
            gsap.delayedCall(STEP_COOLDOWN_MS / 1000, () => {
              if (pinTrigger?.isActive && !isReleasing) observer?.enable();
            });
          },
          onInterrupt: () => {
            // Killed externally (releaseScroll / onLeave / unmount) — caller re-enables
            currentStep = Math.round(playhead.value);
            isAnimating = false;
          },
        });
      };

      const shouldReleaseAtEdge = (direction) => {
        const now = performance.now();

        if (now < edgeExitCooldownUntil) {
          return false;
        }

        if (edgeReleaseDirection !== direction || now - edgeReleaseArmedAt > EDGE_EXIT_ARM_WINDOW_MS) {
          edgeReleaseDirection = direction;
          edgeReleaseArmedAt = now;
          return false;
        }

        if (now - edgeReleaseArmedAt < EDGE_EXIT_MIN_DELAY_MS) {
          return false;
        }

        resetEdgeRelease();
        return true;
      };

      const releaseScroll = (direction) => {
        isReleasing = true;
        observer?.disable();
        stepTween?.kill();
        isAnimating = false;
        resetEdgeRelease();
        lenis?.start?.();

        if (!pinTrigger) return;

        requestAnimationFrame(() => {
          pinTrigger.scroll(direction > 0 ? pinTrigger.end + 2 : pinTrigger.start - 2);
        });
      };

      observer = Observer.create({
        type: 'wheel,touch',
        tolerance: 14,
        preventDefault: true,
        wheelSpeed: 1,
        onDown: () => {
          if (!pinTrigger?.isActive || isAnimating) return;

          if (currentStep < n - 1) {
            animateToStep(currentStep + 1);
            return;
          }

          if (shouldReleaseAtEdge(1)) {
            releaseScroll(1);
          }
        },
        onUp: () => {
          if (!pinTrigger?.isActive || isAnimating) return;

          if (currentStep > 0) {
            animateToStep(currentStep - 1);
            return;
          }

          if (shouldReleaseAtEdge(-1)) {
            releaseScroll(-1);
          }
        },
      });
      observer.disable();

      /* ── pin + step navigation ───────────────────────── */
      pinTrigger = ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * STEP_PIN_DISTANCE_VH / 100}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        onEnter: () => {
          isReleasing = false;
          lenis?.stop?.();
          currentStep = 0;
          isAnimating = false;
          stepTween?.kill();
          tl.totalTime(0);
          resetEdgeRelease();
          edgeExitCooldownUntil = performance.now() + EDGE_EXIT_COOLDOWN_MS;
          syncPinAnchor();
          observer?.enable();
        },
        onEnterBack: () => {
          isReleasing = false;
          lenis?.stop?.();
          currentStep = n - 1;
          isAnimating = false;
          stepTween?.kill();
          tl.totalTime(n - 1);
          resetEdgeRelease();
          edgeExitCooldownUntil = performance.now() + EDGE_EXIT_COOLDOWN_MS;
          syncPinAnchor();
          observer?.enable();
        },
        onLeave: () => {
          isReleasing = false;
          lenis?.start?.();
          observer?.disable();
          stepTween?.kill();
          isAnimating = false;
          resetEdgeRelease();
        },
        onLeaveBack: () => {
          isReleasing = false;
          lenis?.start?.();
          observer?.disable();
          stepTween?.kill();
          isAnimating = false;
          resetEdgeRelease();
        },
        onRefresh: () => {
          tl.totalTime(currentStep);
        },
      });

    }, sectionRef);

    return () => {
      lenis?.start?.();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="bg-[#212121] font-halyard border-b border-white/5"
    >

      {/* ── Header ───────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-16 pt-16 pb-10 md:pt-24 md:pb-14">
        <div className="max-w-[1180px] mx-auto">
          <div ref={headerRef}>
            <h1
              className="text-white font-editorial font-normal leading-[1.12] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 3.9rem)' }}
            >
              A jornada que conduziremos
              <br />
              com você para se tornar uma
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">
                marca TheOne
              </span>
            </h1>
            <p
              className="mt-4 text-white font-halyard font-light"
              style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.72rem)' }}
            >
              Da base à efetivação do posicionamento inevitável.
            </p>
          </div>
        </div>
      </div>

      {/* ── Sticky ───────────────────────────────────────── */}
      <div
        ref={stickyRef}
        className="h-screen"
        style={{ overflow: 'hidden' }}
      >
        <div className="absolute inset-0 px-6 md:px-12 lg:px-16">
          <div className="max-w-[1180px] mx-auto h-full flex gap-8 md:gap-14">

            {/* ── Timeline column ──────────────────────── */}
            <div className="shrink-0 relative h-full" style={{ width: '96px' }}>

              {/* Background line — full section height, independent */}
              <div
                className="absolute top-0 bottom-0 w-px bg-white/[0.06] pointer-events-none"
                style={{ left: '47.5px' }}
              />
              {/* Fill line — animates independently of drum */}
              <div
                ref={lineFillRef}
                className="absolute top-0 bottom-0 w-px pointer-events-none"
                style={{
                  left: '47.5px',
                  background:
                    'linear-gradient(to bottom, rgba(254, 209, 197, 0) 0%, rgba(254, 209, 197, 0.5) 10%, rgba(255, 115, 64, 0.88) 24%, #FF7340 50%, #FF5224 100%)',
                }}
              />

              {/* Number drum — explicit 3-slot window, centered in column */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div
                  style={{
                    height: `${ROW_H * 3}px`,
                    overflow: 'hidden',
                    position: 'relative',
                    width: '96px',
                  }}
                >
                  {/* Fade top & bottom edges */}
                  <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, #212121 0%, transparent 31%, transparent 69%, #212121 100%)',
                      zIndex: 10,
                    }}
                  />

                  {/* Number track */}
                  <div
                    ref={numTrackRef}
                    style={{ paddingTop: `${ROW_H}px` }}
                  >
                    {STEPS.map((step, i) => (
                      <div
                        key={step.number}
                        ref={el => { numRowRefs.current[i] = el; }}
                        style={{
                          height: `${ROW_H}px`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <div className="w-24 h-24 rounded-full border border-white/10 bg-[#1c1c1c] flex items-center justify-center">
                          <span
                            className="font-halyard tabular-nums"
                            style={{
                              fontSize: '52px',
                              letterSpacing: '0.03em',
                              background: 'linear-gradient(135deg, #FED1C5, #FF5224)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              backgroundClip: 'text',
                            }}
                          >
                            {step.number}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Content drum ─────────────────────────── */}
            <div className="flex-1 min-w-0 flex items-center">
              <div
                style={{
                  height: `${CONT_H}px`,
                  overflow: 'hidden',
                  position: 'relative',
                  width: '100%',
                }}
              >
                {/* Fade top & bottom edges */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      'linear-gradient(to bottom, #212121 0%, transparent 29%, transparent 71%, #212121 100%)',
                      zIndex: 10,
                    }}
                  />

                {/* Content track */}
                <div ref={contTrackRef} style={{ paddingTop: `${ROW_H}px` }}>
                  {STEPS.map((step, index) => (
                    <div
                      key={step.number}
                      ref={el => { contRowRefs.current[index] = el; }}
                      style={{
                        height: `${ROW_H}px`,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        gap: '16px',
                      }}
                    >
                      <h3
                        className="font-editorial font-normal leading-[1.1]"
                        style={{
                          fontSize: 'clamp(2.55rem, 4.1vw, 3.9rem)',
                          color: '#FF744F',
                          maxWidth: '920px',
                        }}
                      >
                        {step.label}
                      </h3>
                      <p
                        className="font-halyard font-normal leading-[1.5]"
                        style={{
                          fontSize: 'clamp(1.3rem, 1.95vw, 1.7rem)',
                          maxWidth: '760px',
                          marginBottom: '18px',
                          color: '#FFFFFF',
                          textWrap: 'pretty',
                        }}
                      >
                        {step.description}
                      </p>
                      <div style={{ display: 'flex', gap: '24px', width: '100%' }}>
                        {step.cards.map(card => (
                          <DeliverableCard key={card.label} label={card.label} src={card.src} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>
  );
}
