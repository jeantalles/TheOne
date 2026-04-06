import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { Users, Briefcase, Target } from 'lucide-react';

// Comprimentos aproximados de cada linha no viewBox 400x400
// Linha 1: (200,52)→(356,334)  √(156²+282²) ≈ 322
// Linha 2: (356,334)→(44,334)  312
// Linha 3: (44,334)→(200,52)   ≈ 322
const LINE_LEN = [322, 312, 322];

export default function Methodology() {
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Inicializa as linhas com dashoffset = comprimento (invisíveis)
      gsap.set('.meth-line-1', { strokeDasharray: LINE_LEN[0], strokeDashoffset: LINE_LEN[0] });
      gsap.set('.meth-line-2', { strokeDasharray: LINE_LEN[1], strokeDashoffset: LINE_LEN[1] });
      gsap.set('.meth-line-3', { strokeDasharray: LINE_LEN[2], strokeDashoffset: LINE_LEN[2] });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=200%',
          pin: true,
          scrub: 1.2,
        }
      });

      // ── Headline some ────────────────────────────────────────────────────
      tl.to('.meth-headline', {
        opacity: 0, y: -40, filter: 'blur(14px)', duration: 0.3
      });

      // ── Abertura: primeiro texto centralizado ──────────────────────────
      tl.fromTo('.meth-bullet-1',
        { opacity: 0, y: 32, filter: 'blur(18px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.45, ease: 'power3.out' }
      );
      tl.to({}, { duration: 0.35 });

      // ══ PILAR 1 — Pirâmide surge com o primeiro texto em cena ══════════
      tl.fromTo('.meth-pyramid-shell',
        { opacity: 0, scale: 0.84, filter: 'blur(22px)' },
        { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 0.65, ease: 'power3.out' }
      );
      tl.fromTo('.meth-node-1',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      , '-=0.3');
      tl.to('.meth-line-1',
        { strokeDashoffset: 0, duration: 0.5, ease: 'none' },
        '-=0.15'
      );
      tl.to({}, { duration: 0.7 });

      // ══ PILAR 2 — Troca para o segundo texto ════════════════════════════
      tl.to('.meth-bullet-1',
        { opacity: 0, y: -24, filter: 'blur(12px)', duration: 0.35, ease: 'power2.inOut' }
      );
      tl.fromTo('.meth-node-2',
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      , '-=0.15');
      tl.to('.meth-line-2',
        { strokeDashoffset: 0, duration: 0.5, ease: 'none' },
        '-=0.15'
      );
      tl.fromTo('.meth-bullet-2',
        { opacity: 0, y: 24, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' },
        '-=0.25'
      );
      tl.to({}, { duration: 0.7 });

      // ══ PILAR 3 — Troca para o terceiro texto + centro ══════════════════
      tl.to('.meth-bullet-2',
        { opacity: 0, y: -24, filter: 'blur(12px)', duration: 0.35, ease: 'power2.inOut' }
      );
      tl.fromTo('.meth-node-3',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      , '-=0.15');
      tl.to('.meth-line-3',
        { strokeDashoffset: 0, duration: 0.5, ease: 'none' },
        '-=0.15'
      );
      tl.fromTo('.meth-bullet-3',
        { opacity: 0, y: 24, filter: 'blur(16px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.4, ease: 'power3.out' },
        '-=0.2'
      );
      tl.to({}, { duration: 0.45 });
      tl.to('.meth-bullet-3',
        { opacity: 0, y: -24, filter: 'blur(12px)', duration: 0.35, ease: 'power2.inOut' }
      );
      tl.to({}, { duration: 0.22 });
      tl.fromTo('.meth-center',
        { scale: 1.12, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.55, ease: 'power4.out' }
      );
      tl.to({}, { duration: 0.9 });

      // Pausa de leitura do resultado final
      tl.to({}, { duration: 0.8 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metodologia"
      ref={containerRef}
      className="bg-[#212121] relative font-halyard h-screen overflow-hidden"
    >
      {/* Headline */}
      <div className="meth-headline absolute inset-0 flex flex-col items-center justify-center z-50 px-6 pointer-events-none">
        <span className="text-[#FE6942] text-[19px] md:text-[21px] font-halyard tracking-widest uppercase block mb-8">
          Nossa Metodologia
        </span>
        <h2 className="font-editorial text-[43px] md:text-[58px] lg:text-[74px] text-white text-center leading-[1.1] max-w-5xl">
          A ciência por trás de uma <br />
          marca <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] italic">TheOne.</span>
        </h2>
      </div>

      {/* Textos da sequência */}
      <div
        className="meth-bullet-1 absolute inset-0 z-40 pointer-events-none hidden lg:flex items-center justify-center px-6 pt-24 md:pt-28"
        style={{ opacity: 0 }}
      >
        <p className="font-sans font-normal text-[24px] xl:text-[30px] leading-[1.45] text-[#C7C7C7] text-center max-w-[680px]">
          Nossa metodologia de construção de marca é baseada em{' '}
          <span className="text-white">pesquisa aprofundada em 3 pilares:</span>{' '}
          Seu cliente, seu negócio, seu mercado.
        </p>
      </div>

      <div
        className="meth-bullet-2 absolute inset-0 z-40 pointer-events-none hidden lg:flex items-center justify-center px-6 pt-24 md:pt-28"
        style={{ opacity: 0 }}
      >
        <p className="font-sans font-normal text-[24px] xl:text-[30px] leading-[1.45] text-[#C7C7C7] text-center max-w-[620px]">
          Nós construímos marca baseado em{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">dados.</span>
        </p>
      </div>

      <div
        className="meth-bullet-3 absolute inset-0 z-40 pointer-events-none hidden lg:flex items-center justify-center px-6 pt-24 md:pt-28"
        style={{ opacity: 0 }}
      >
        <p className="font-sans font-normal text-[22px] xl:text-[28px] leading-[1.55] text-[#C7C7C7] text-center max-w-[980px]">
          Se entendemos profundamente:
          <br />
          1. O que o público precisa, deseja, tem medo
          <br />
          2. Como os concorrentes se posicionam e se vendem
          <br />
          3. Nossa solução, transformação e onde nos diferenciamos
          <br />
          Conseguimos construir um...
        </p>
      </div>

      {/* ── Pirâmide centrada ─────────────────────────────────────────────── */}
      <div className="relative w-full h-full flex items-center justify-center pt-24 md:pt-28">
        <div
          className="meth-pyramid-shell relative flex-shrink-0 opacity-0"
          style={{ width: 'min(96vh, 960px)', height: 'min(96vh, 960px)' }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 400 400"
            className="absolute inset-0 pointer-events-none"
          >
            <line
              x1="200" y1="52" x2="356" y2="334"
              stroke="rgba(255,82,36,0.45)" strokeWidth="1.2"
              className="meth-line-1"
            />
            <line
              x1="356" y1="334" x2="44" y2="334"
              stroke="rgba(255,82,36,0.45)" strokeWidth="1.2"
              className="meth-line-2"
            />
            <line
              x1="44" y1="334" x2="200" y2="52"
              stroke="rgba(255,82,36,0.45)" strokeWidth="1.2"
              className="meth-line-3"
            />
          </svg>

          {/* Nó 1 — Topo (Cliente) */}
          <div className="meth-node-1 absolute top-[11.6%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 opacity-0">
            <div className="relative w-[92px] h-[92px] flex items-center justify-center mb-2">
              <svg
                width="92"
                height="92"
                viewBox="0 0 92 92"
                fill="none"
                className="absolute inset-0 drop-shadow-[0_0_34px_rgba(255,82,36,0.18)]"
              >
                <circle cx="46" cy="46" r="37" stroke="url(#methodNodeGradient)" strokeWidth="5" />
              </svg>
              <div className="absolute inset-[9px] rounded-full bg-[#212121]" />
              <Users size={33} className="relative z-10 text-[#FED1C5]" />
            </div>
            <span className="text-white font-sans font-normal text-[19px] tracking-[0.02em] px-3 py-1 rounded-full shadow-[0_0_34px_rgba(33,33,33,0.98)] bg-[radial-gradient(circle,rgba(33,33,33,0.98)_0%,rgba(33,33,33,0.78)_46%,rgba(33,33,33,0)_82%)]">Cliente</span>
          </div>

          {/* Nó 2 — Baixo Direita (Negócio) */}
          <div className="meth-node-2 absolute top-[83%] left-[89%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 opacity-0">
            <div className="relative w-[92px] h-[92px] flex items-center justify-center mb-2">
              <svg
                width="92"
                height="92"
                viewBox="0 0 92 92"
                fill="none"
                className="absolute inset-0 drop-shadow-[0_0_34px_rgba(255,82,36,0.18)]"
              >
                <circle cx="46" cy="46" r="37" stroke="url(#methodNodeGradient)" strokeWidth="5" />
              </svg>
              <div className="absolute inset-[9px] rounded-full bg-[#212121]" />
              <Briefcase size={33} className="relative z-10 text-[#FED1C5]" />
            </div>
            <span className="text-white font-sans font-normal text-[19px] tracking-[0.02em]">Negócio</span>
          </div>

          {/* Nó 3 — Baixo Esquerda (Mercado) */}
          <div className="meth-node-3 absolute top-[83%] left-[11%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 opacity-0">
            <div className="relative w-[92px] h-[92px] flex items-center justify-center mb-2">
              <svg
                width="92"
                height="92"
                viewBox="0 0 92 92"
                fill="none"
                className="absolute inset-0 drop-shadow-[0_0_34px_rgba(255,82,36,0.18)]"
              >
                <circle cx="46" cy="46" r="37" stroke="url(#methodNodeGradient)" strokeWidth="5" />
              </svg>
              <div className="absolute inset-[9px] rounded-full bg-[#212121]" />
              <Target size={33} className="relative z-10 text-[#FED1C5]" />
            </div>
            <span className="text-white font-sans font-normal text-[19px] tracking-[0.02em]">Mercado</span>
          </div>

          {/* Centro — Posicionamento Inevitável */}
          <div className="meth-center absolute top-[54%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center w-[300px] md:w-[390px] opacity-0">
            <p className="text-white font-editorial tracking-tight text-[30px] md:text-[40px] leading-none">
              Posicionamento
            </p>
            <span className="font-editorial text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] text-[56px] md:text-[82px] block mt-2 leading-none">
              Inevitável
            </span>
          </div>

          <svg width="0" height="0" className="absolute">
            <defs>
              <linearGradient id="methodNodeGradient" x1="4" y1="4" x2="80" y2="62" gradientUnits="userSpaceOnUse">
                <stop stopColor="#FFD7CD" />
                <stop offset="1" stopColor="#FF4B1C" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </div>
    </section>
  );
}
