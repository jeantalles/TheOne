import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../hooks/useMediaQuery';
import negocioMediaImage from '../assets/products-step-01/negocio-media.jpeg';
import publicoMediaImage from '../assets/products-step-01/publico-media.jpeg';
import mercadoMediaImage from '../assets/products-step-01/mercado-media.jpeg';
import posicionamentoImage from '../assets/products-step-01/posicionamento.jpeg';
import icpImage from '../assets/products-step-01/icp.jpeg';
import conteudoImage from '../assets/products-step-01/estrategia de conteudo.jpeg';
import hierarquiaDiscursoImage from '../assets/products-step-01/hierarquia-discurso.jpg';
import namingImage from '../assets/products-step-01/naming.png';
import estrategiaCanaisImage from '../assets/products-step-01/estrategia-canais.jpg';
import narrativaTheOneImage from '../assets/products-step-02/narrativa-theone.jpg';
import plataformaMarcaImage from '../assets/products-step-02/plataforma-de-marca.jpg';
import identidadeVisualImage from '../assets/products-step-03/identidade-visual.jpg';
import cobrandingImage from '../assets/products-step-04/co-branding.jpg';
import estrategiaLancamentoImage from '../assets/products-step-04/estrategia-de-lancamento.jpg';
import arquiteturaReceitaImage from '../assets/products-step-04/arquitetura-de-receita.jpg';
import siteBrandExperienceImage from '../assets/products-step-04/site-brand-experience.jpg';
import playbookImage from '../assets/products-step-05/playbook.jpg';
import sistemaDeConteudoImage from '../assets/products-step-05/sistema-de-conteudo.jpeg';
import treinamentoDoTimeImage from '../assets/products-step-05/treinamento-do-time.jpeg';
import assessoriaImage from '../assets/products-step-05/assessoria.jpg';




gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    label: 'Pesquisa e Diagnóstico',
    description: 'Antes de ir a campo entendemos o jogo, para construir uma marca que vai vencê-lo.',
    cards: [
      { label: 'Diagnóstico de negócio e marca', src: negocioMediaImage },
      { label: 'Diagnóstico de público', src: publicoMediaImage },
      { label: 'Diagnóstico de mercado', src: mercadoMediaImage },
    ],
  },
  {
    number: '02',
    label: 'Estratégia de Marca e Posicionamento',
    description: 'Definimos o lugar que a sua marca deve ocupar para deixar de ser só mais uma opção.',
    cards: [
      { label: 'Posicionamento estratégico', src: posicionamentoImage },
      { label: 'Atração de ICP',   src: icpImage },
      { label: 'Estratégia de conteúdo', src: conteudoImage },
      { label: 'Estratégia de canais', src: estrategiaCanaisImage },
      { label: 'Narrativa TheOne', src: narrativaTheOneImage },
      { label: 'Plataforma de marca', src: plataformaMarcaImage },
    ],
  },
  {
    number: '03',
    label: 'Identidade de Marca',
    description: 'Transformamos estratégia em uma marca que o mercado reconhece, lembra e deseja.',
    cards: [
      { label: 'Narrativa e identidade verbal',    src: hierarquiaDiscursoImage },
      { label: 'Identidade visual',    src: identidadeVisualImage },
      { label: 'Naming', src: namingImage },
    ],
  },
  {
    number: '04',
    label: 'Lançamento e Go-to-Market',
    description: 'É onde seremos vistos, lembrados, desejados e comprados.',
    cards: [
      { label: 'Distribuição e Collabs',    src: cobrandingImage },
      { label: 'Estratégia de lançamento', src: estrategiaLancamentoImage },
      { label: 'Arquitetura de receita e produtos',   src: arquiteturaReceitaImage },
      { label: 'Site Brand Experience',   src: siteBrandExperienceImage },
    ],
  },
  {
    number: '05',
    label: 'Assessoria ou Consultoria TheOne',
    description: 'Ficamos ao seu lado para garantir que o seu posicionamento seja efetivado rumo a se tornar a marca número um.',
    cards: [
      { label: 'Playbook de execução',       src: playbookImage },
      { label: 'Consultoria e treinamento de time', src: treinamentoDoTimeImage },
      { label: 'Assessoria',                 src: assessoriaImage },
      { label: 'Sistema de Conteúdo',        src: sistemaDeConteudoImage },
    ],
  },
];

// Both drums share the same row height — keeps them in perfect sync
const ROW_H  = 540;
const CONT_H = ROW_H * 3; // 1140px (overflows 900px viewport on each side; clipped by sticky overflow:hidden)
const STEP_SCROLL_VH = 100; // vh of scroll per step transition; 4 transitions = 400vh total
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

// ── Mobile: card compacto 2-col ──────────────────────────────────────────────
function MobileDeliverableCard({ label, src }) {
  return (
    <div className="min-w-0">
      <p
        className="font-halyard font-light text-white mb-2 leading-[1.2]"
        style={{ fontSize: 'clamp(0.8rem, 3.5vw, 0.95rem)' }}
      >
        {label}
      </p>
      <div
        style={{
          borderRadius: '14px',
          overflow: 'hidden',
          border: '1px solid rgba(255,255,255,0.08)',
          aspectRatio: '16 / 9',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={label}
            loading="lazy"
            decoding="async"
            className="block w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full bg-[#1c1c1c]" />
        )}
      </div>
    </div>
  );
}

// ── Mobile: lista vertical de steps com timeline ─────────────────────────────
function ProductsMobileList({ steps }) {
  const stepRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      stepRefs.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el.querySelector('.step-header'),
          { opacity: 0, y: 20 },
          {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: el, start: 'top 88%', once: true },
          }
        );
        gsap.fromTo(
          el.querySelectorAll('.mobile-card'),
          { opacity: 0, y: 24 },
          {
            opacity: 1, y: 0, duration: 0.55, ease: 'power3.out',
            stagger: 0.1,
            scrollTrigger: { trigger: el, start: 'top 80%', once: true },
          }
        );
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="px-5 pt-10 pb-12">
      {steps.map((step, i) => {
        const isLast = i === steps.length - 1;
        return (
          <div key={step.number} className="flex gap-4 pb-5" ref={(el) => { stepRefs.current[i] = el; }}>

            {/* Coluna da timeline */}
            <div className="flex flex-col items-center shrink-0 w-12">
              <div className="shrink-0 w-12 h-12 rounded-full border border-white/10 bg-[#1c1c1c] flex items-center justify-center">
                <span
                  className="font-halyard tabular-nums"
                  style={{
                    fontSize: '18px',
                    background: 'linear-gradient(135deg, #FED1C5, #FF5224)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                  }}
                >
                  {step.number}
                </span>
              </div>
              {!isLast && (
                <div
                  className="w-px flex-1 my-3"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(255,82,36,0.5), rgba(255,82,36,0.08))',
                    minHeight: '48px',
                  }}
                />
              )}
            </div>

            {/* Coluna de conteúdo */}
            <div className="flex-1 min-w-0 pb-12">
              <div className="step-header">
                <h3
                  className="font-editorial font-normal leading-[1.1] text-[#FF744F] pt-1 mb-3"
                  style={{ fontSize: 'clamp(2.02rem, 7.25vw, 2.58rem)' }}
                >
                  {step.label}
                </h3>
          <p
            className="font-halyard font-normal text-white leading-[1.5] mb-5"
            style={{ fontSize: 'clamp(1.18rem, 4.95vw, 1.38rem)' }}
          >
            {step.description}
          </p>
              </div>

              {/* Cards 1 por linha */}
              <div className="flex flex-col gap-4">
                {step.cards.map((card) => (
                  <div key={card.label} className="mobile-card">
                    <MobileDeliverableCard label={card.label} src={card.src} />
                  </div>
                ))}
              </div>
            </div>

          </div>
        );
      })}
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

  const isMobile = useMediaQuery('(max-width: 767px)');
  const n = STEPS.length;

  useEffect(() => {
    if (isMobile) return undefined;

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
      contRowRefs.current.forEach((el, i) => {
        if (!el) return;
        const scale   = i === 0 ? 1 : i === 1 ? NEAR_SCALE : FAR_SCALE;
        const opacity = i === 0 ? 1 : i === 1 ? NEAR_OPACITY : FAR_OPACITY;
        gsap.set(el, { scale, opacity, transformOrigin: 'center center' });
      });
      numRowRefs.current.forEach((el, i) => {
        if (!el) return;
        const scale = i === 0 ? 1 : i === 1 ? NEAR_SCALE : FAR_SCALE;
        gsap.set(el, { scale, opacity: 1, transformOrigin: 'center center' });
      });

      gsap.set(lineFillRef.current, { clipPath: 'inset(0 0 50% 0)' });

      /* ── master timeline (driven by scroll via scrub) ── */
      const tl = gsap.timeline({ paused: true });

      for (let i = 0; i < n - 1; i++) {
        const cont = (idx) => [contRowRefs.current[idx]].filter(Boolean);
        const num  = (idx) => [numRowRefs.current[idx]].filter(Boolean);

        tl.to(lineFillRef.current,                    { clipPath: 'inset(0 0 50% 0)', duration: 1, ease: 'none' }, i);
        tl.to([numTrackRef.current, contTrackRef.current], { y: -((i + 1) * ROW_H),  duration: 1, ease: 'none' }, i);

        tl.to(cont(i),     { scale: NEAR_SCALE, opacity: NEAR_OPACITY, duration: 1, ease: 'none' }, i);
        tl.to(num(i),      { scale: NEAR_SCALE,                        duration: 1, ease: 'none' }, i);
        tl.to(cont(i + 1), { scale: 1, opacity: 1,                     duration: 1, ease: 'none' }, i);
        tl.to(num(i + 1),  { scale: 1,                                 duration: 1, ease: 'none' }, i);

        if (i + 2 < n) {
          tl.to(cont(i + 2), { scale: NEAR_SCALE, opacity: NEAR_OPACITY, duration: 1, ease: 'none' }, i);
          tl.to(num(i + 2),  { scale: NEAR_SCALE,                        duration: 1, ease: 'none' }, i);
        }
        if (i - 1 >= 0) {
          tl.to(cont(i - 1), { scale: FAR_SCALE, opacity: FAR_OPACITY, duration: 1, ease: 'none' }, i);
          tl.to(num(i - 1),  { scale: FAR_SCALE,                       duration: 1, ease: 'none' }, i);
        }
      }

      /* ── pin + scrub — same architecture as Storytelling ── */
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top top',
        end: () => `+=${window.innerHeight * STEP_SCROLL_VH / 100 * (n - 1)}`,
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
        scrub: 1,
        snap: {
          snapTo: 1 / (n - 1),
          duration: { min: 0.3, max: 0.6 },
          ease: 'power2.inOut',
          delay: 0.05,
        },
        onUpdate: (self) => {
          tl.totalTime(self.progress * (n - 1));
        },
        onRefresh: (self) => {
          tl.totalTime(self.progress * (n - 1));
        },
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

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
              com você para se tornar uma{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">
                marca TheOne
              </span>
            </h1>
            <p
              className="mt-4 text-white font-halyard font-light"
              style={{ fontSize: 'clamp(1.25rem, 2.3vw, 1.72rem)' }}
            >
              Cada projeto é personalizado. Da construção da base a efetivação do posicionamento inevitável.
            </p>
            <div className="mt-10 md:mt-12 flex flex-col gap-3">
              <span className="text-white/50 font-halyard font-medium text-[0.95rem] md:text-[1.1rem] mb-1 uppercase tracking-[0.12em]">
                te ajudamos em:
              </span>
              {[
                'Construção de marca e go-to-market',
                'Reposicionamento de marca',
                'Construção de marca pessoal',
                'Geração de demanda com sistema de conteúdo',
                'Arquitetura de receita e produtos'
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 md:gap-4">
                  <ArrowRight className="text-[#FF5224] shrink-0" style={{ width: 'clamp(1.4rem, 2.6vw, 1.95rem)', height: 'clamp(1.4rem, 2.6vw, 1.95rem)' }} strokeWidth={2} />
                  <span
                    className="text-white font-halyard font-normal tracking-[-0.01em]"
                    style={{ fontSize: 'clamp(1.4rem, 2.6vw, 1.95rem)' }}
                  >
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile list (< 768px) ────────────────────────── */}
      {isMobile && <ProductsMobileList steps={STEPS} />}

      {/* ── Desktop sticky drum (≥ 768px) ────────────────── */}
      <div
        ref={stickyRef}
        className="h-screen hidden md:block"
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
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '24px', width: '100%' }}>
                        {step.cards.map((card) => (
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
