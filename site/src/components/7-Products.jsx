import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    label: 'Pesquisa e Diagnóstico',
    description: 'Entendemos o jogo antes para construir uma marca que vai vencê-lo.',
    cards: [
      { label: 'Diagnóstico de negócio', src: null },
      { label: 'Diagnóstico de público', src: null },
      { label: 'Diagnóstico de mercado', src: null },
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
const ROW_H  = 380;
const CONT_H = ROW_H * 3; // 1140px (overflows 900px viewport on each side; clipped by sticky overflow:hidden)

// Number drum uses the same row height as content drum

// Both drums are vertically centered → active items land at 50vh

function DeliverableCard({ label, src }) {
  return (
    <div style={{ flex: '1 1 0', minWidth: 0 }}>
      <p
        className="font-halyard font-light"
        style={{
          fontSize: '16px',
          color: '#fff',
          marginBottom: '7px',
          letterSpacing: '0.01em',
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {label}
      </p>
      <div
        style={{
          borderRadius: '8px',
          overflow: 'hidden',
          background: 'rgba(255,255,255,0.04)',
          border: '1px solid rgba(255,255,255,0.08)',
          aspectRatio: '4 / 3',
        }}
      >
        {src && (
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
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

  useEffect(() => {
    const ctx = gsap.context(() => {

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
        const scale   = i === 0 ? 1 : i === 1 ? 0.6 : 0.44;
        const opacity = i === 0 ? 1 : i === 1 ? 0.28 : 0.06;
        gsap.set(el, { scale, opacity, transformOrigin: 'center center' });
      });
      // Number rows: scale only — no opacity fade
      numRowRefs.current.forEach((el, i) => {
        if (!el) return;
        const scale = i === 0 ? 1 : i === 1 ? 0.6 : 0.44;
        gsap.set(el, { scale, opacity: 1, transformOrigin: 'center center' });
      });

      /* ── line starts empty ───────────────────────────── */
      gsap.set(lineFillRef.current, { clipPath: 'inset(0 0 100% 0)' });

      /* ── master timeline ─────────────────────────────── */
      const tl = gsap.timeline();

      // ① Background line fills top → bottom over full scroll
      tl.to(lineFillRef.current,
        { clipPath: 'inset(0 0 0% 0)', duration: n - 1, ease: 'none' },
        0
      );

      // ② Both tracks scroll up together (same ROW_H = NUM_ROW_H)
      tl.to(
        [numTrackRef.current, contTrackRef.current],
        { y: -((n - 1) * ROW_H), duration: n - 1, ease: 'none' },
        0
      );

      // ③ Per-step scale & opacity — content fades, numbers only scale
      for (let i = 0; i < n - 1; i++) {
        const cont = (idx) => [contRowRefs.current[idx]].filter(Boolean);
        const num  = (idx) => [numRowRefs.current[idx]].filter(Boolean);

        tl.to(cont(i),     { scale: 0.6,  opacity: 0.28, duration: 1, ease: 'none' }, i);
        tl.to(num(i),      { scale: 0.6,                 duration: 1, ease: 'none' }, i);
        tl.to(cont(i + 1), { scale: 1,    opacity: 1,    duration: 1, ease: 'none' }, i);
        tl.to(num(i + 1),  { scale: 1,                   duration: 1, ease: 'none' }, i);

        if (i + 2 < n) {
          tl.to(cont(i + 2), { scale: 0.6,  opacity: 0.28, duration: 1, ease: 'none' }, i);
          tl.to(num(i + 2),  { scale: 0.6,                 duration: 1, ease: 'none' }, i);
        }
        if (i - 1 >= 0) {
          tl.to(cont(i - 1), { scale: 0.44, opacity: 0.06, duration: 1, ease: 'none' }, i);
          tl.to(num(i - 1),  { scale: 0.44,                duration: 1, ease: 'none' }, i);
        }
      }

      /* ── pin + snap ──────────────────────────────────── */
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top top',
        end: `+=${(n - 1) * 500}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 5,
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.4, max: 0.8 },
          ease: 'power3.inOut',
          delay: 0.3,
        },
        animation: tl,
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="solucoes"
      className="bg-[#212121] font-halyard border-b border-white/5"
    >

      {/* ── Header ───────────────────────────────────────── */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-36">
        <div className="max-w-[860px] mx-auto">
          <div ref={headerRef}>
            <h1
              className="text-white font-editorial font-normal leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 3.9rem)' }}
            >
              A jornada que conduziremos
              <br />
              com você para se tornar uma{' '}
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
        className="h-screen border-t border-white/5"
        style={{ overflow: 'hidden' }}
      >
        <div className="absolute inset-0 px-6 md:px-12 lg:px-16">
          <div className="max-w-[860px] mx-auto h-full flex gap-8 md:gap-14">

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
                  background: 'linear-gradient(to bottom, #FED1C5, #FF7340 50%, #FF5224)',
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
                        'linear-gradient(to bottom, #212121 0%, transparent 28%, transparent 72%, #212121 100%)',
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
                      'linear-gradient(to bottom, #212121 0%, transparent 22%, transparent 78%, #212121 100%)',
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
                        gap: '8px',
                      }}
                    >
                      <h3
                        className="font-editorial font-normal leading-[1.1]"
                        style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)', color: '#FF744F' }}
                      >
                        {step.label}
                      </h3>
                      <p
                        className="font-halyard font-light leading-[1.55]"
                        style={{
                          fontSize: 'clamp(1.1rem, 1.7vw, 1.35rem)',
                          maxWidth: '480px',
                          marginBottom: '4px',
                          color: 'white',
                        }}
                      >
                        {step.description}
                      </p>
                      <div style={{ display: 'flex', gap: '12px' }}>
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
