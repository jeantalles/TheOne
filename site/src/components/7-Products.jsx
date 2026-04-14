import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    number: '01',
    label: 'Pesquisa e Diagnóstico',
    description: 'Entendemos o jogo antes para construir uma marca que vai vencê-lo.',
    tags: ['Validações iniciais', 'Diagnóstico de demanda', 'Diagnóstico de mercado', 'Diagnóstico do negócio'],
  },
  {
    number: '02',
    label: 'Estratégia de Marca e Posicionamento',
    description: 'Definimos o lugar que a sua marca deve ocupar para deixar de ser só mais uma opção.',
    tags: ['Construção da base estratégica', 'Definição de ICP e posicionamento', 'Estratégia de conteúdo e canais', 'Definição de formatos de conteúdo'],
  },
  {
    number: '03',
    label: 'Identidade de Marca',
    description: 'Transformamos estratégia em uma marca que o mercado reconhece, lembra e deseja.',
    tags: ['Identidade verbal', 'Identidade visual', 'Experiência de marca'],
  },
  {
    number: '04',
    label: 'Planejamento de Go-to-Market',
    description: 'Levamos posicionamento para o mercado com lógica de presença, crescimento e receita.',
    tags: ['Mapeamento dos pontos de contato', 'Plano de distribuição e crescimento', 'Estratégia de lançamento', 'Arquitetura de receita', 'Funis de aquisição, conversão e retenção'],
  },
  {
    number: '05',
    label: 'Assessoria & Consultoria de Execução',
    description: 'Garantimos que a estratégia ganhe vida na operação, com seu time ou ao seu lado.',
    tags: ['Treinamos seu time para executar com autonomia', 'Executamos a operação para você'],
  },
];

const NODE_CENTER = 31.5; // px — center of the 64px node column

export default function Products() {
  const sectionRef  = useRef(null);
  const headerRef   = useRef(null);
  const stickyRef   = useRef(null);
  const lineFillRef = useRef(null);
  const stepsRef    = useRef([]);

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

      /* ── initial states ──────────────────────────────── */
      const vh = window.innerHeight;

      stepsRef.current.forEach((el, i) => {
        // step 0 centered; all others below the viewport (not behind the current one)
        gsap.set(el, { y: i === 0 ? 0 : vh });
      });

      // line starts fully hidden
      gsap.set(lineFillRef.current, { clipPath: 'inset(0 0 100% 0)' });

      /* ── master scroll-driven timeline ───────────────── */
      const tl = gsap.timeline();
      const n  = STEPS.length;

      for (let i = 0; i < n - 1; i++) {
        // outgoing: exits to the top of the viewport
        tl.to(stepsRef.current[i], {
          y: -vh,
          duration: 1,
          ease: 'none',
        }, i);

        // incoming: rises from the bottom of the viewport to center
        tl.to(stepsRef.current[i + 1], {
          y: 0,
          duration: 1,
          ease: 'none',
        }, i);

        // line fill: grows step by step (top → bottom)
        const fillTo = 100 - ((i + 1) / (n - 1)) * 100;
        tl.to(lineFillRef.current, {
          clipPath: `inset(0 0 ${fillTo}% 0)`,
          duration: 1,
          ease: 'none',
        }, i);
      }

      /* ── pin ─────────────────────────────────────────── */
      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: 'top top',
        end: `+=${(n - 1) * 100}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 1.5,
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

      {/* ── Header (scrolls normally) ─────────────────── */}
      <div className="px-6 md:px-12 lg:px-16 py-20 md:py-36">
        <div className="max-w-[860px] mx-auto">
          <div ref={headerRef}>
            <h1
              className="text-white font-editorial font-normal leading-[1.08] tracking-[-0.02em]"
              style={{ fontSize: 'clamp(2.3rem, 5.5vw, 3.9rem)' }}
            >
              A jornada para se tornar
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">
                a escolha número um
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

      {/* ── Sticky timeline viewer ────────────────────── */}
      <div
        ref={stickyRef}
        className="h-screen border-t border-white/5 overflow-hidden"
      >
        {/* outer centering shell */}
        <div className="absolute inset-0 flex items-center px-6 md:px-12 lg:px-16">
          <div className="max-w-[860px] mx-auto w-full relative h-full">

            {/* ── timeline lines (fixed, not part of any card) ── */}
            <div
              className="absolute top-0 bottom-0 w-px bg-white/[0.07] pointer-events-none"
              style={{ left: `${NODE_CENTER}px` }}
            />
            <div
              ref={lineFillRef}
              className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#FED1C5] via-[#FF7340] to-[#FF5224] pointer-events-none"
              style={{ left: `${NODE_CENTER}px`, clipPath: 'inset(0 0 100% 0)' }}
            />

            {/* ── step cards (all stacked, one visible at a time) ── */}
            {STEPS.map((step, index) => (
              <div
                key={step.number}
                ref={el => { stepsRef.current[index] = el; }}
                className="absolute inset-0 flex items-center gap-10 md:gap-14"
              >
                {/* Node */}
                <div className="shrink-0" style={{ width: '64px' }}>
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center relative z-10 ${
                      index === STEPS.length - 1
                        ? 'border border-[#FF5224]/50 bg-[#1c1c1c] bg-gradient-to-br from-[#FED1C5]/10 to-[#FF5224]/15'
                        : 'border border-white/10 bg-[#1c1c1c]'
                    }`}
                  >
                    <span
                      className="text-transparent bg-clip-text bg-gradient-to-br from-[#FED1C5] to-[#FF5224] font-halyard font-normal tabular-nums"
                      style={{ fontSize: '20px', letterSpacing: '0.03em' }}
                    >
                      {step.number}
                    </span>
                    {index === STEPS.length - 1 && (
                      <div className="absolute inset-0 rounded-full bg-[#FF5224]/10 blur-2xl scale-[2.5] -z-10 pointer-events-none" />
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h3
                    className="text-white font-editorial font-normal leading-[1.1] mb-4"
                    style={{ fontSize: 'clamp(1.85rem, 3.5vw, 2.8rem)' }}
                  >
                    {step.label}
                  </h3>
                  <p
                    className="text-[#B8B8B8] font-halyard font-light leading-[1.6] mb-6"
                    style={{ fontSize: 'clamp(1.1rem, 1.6vw, 1.3rem)', maxWidth: '520px' }}
                  >
                    {step.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {step.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full border border-white/20 bg-white/[0.05] text-white/70 font-halyard font-light"
                        style={{ fontSize: '15px', padding: '7px 18px', letterSpacing: '0.015em' }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </div>

    </section>
  );
}
