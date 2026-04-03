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

      // ══ PILAR 1 — Nó + Linha + Bullet esquerda passa pela tela ══════════
      tl.fromTo('.meth-node-1',
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      );
      tl.to('.meth-line-1',
        { strokeDashoffset: 0, duration: 0.5, ease: 'none' },
        '-=0.15'
      );
      // Bullet 1 entra de baixo (começa fora da tela), vai ao centro, sai pelo topo
      tl.fromTo('.meth-bullet-1',
        { y: '110vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
      tl.to({}, { duration: 0.8 }); // pausa de leitura no centro
      tl.to('.meth-bullet-1',
        { y: '-110vh', opacity: 0, duration: 0.5, ease: 'power2.in' }
      );

      // ══ PILAR 2 — Nó + Linha + Bullet direita ═══════════════════════════
      tl.fromTo('.meth-node-2',
        { x: 20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      );
      tl.to('.meth-line-2',
        { strokeDashoffset: 0, duration: 0.5, ease: 'none' },
        '-=0.15'
      );
      tl.fromTo('.meth-bullet-2',
        { y: '110vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
      tl.to({}, { duration: 0.8 });
      tl.to('.meth-bullet-2',
        { y: '-110vh', opacity: 0, duration: 0.5, ease: 'power2.in' }
      );

      // ══ PILAR 3 — Nó + Linha + Bullet esquerda ══════════════════════════
      tl.fromTo('.meth-node-3',
        { x: -20, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.3, ease: 'power3.out' }
      );
      tl.to('.meth-line-3',
        { strokeDashoffset: 0, duration: 0.5, ease: 'none' },
        '-=0.15'
      );
      // Bullet 3 e centro aparecem juntos
      tl.fromTo('.meth-bullet-3',
        { y: '110vh', opacity: 0 },
        { y: '0vh', opacity: 1, duration: 0.5, ease: 'power2.out' },
        '-=0.2'
      );
      tl.fromTo('.meth-center',
        { scale: 1.12, opacity: 0, filter: 'blur(20px)' },
        { scale: 1, opacity: 1, filter: 'blur(0px)', duration: 0.5, ease: 'power4.out' },
        '-=0.4'
      );
      tl.to({}, { duration: 0.8 });
      tl.to('.meth-bullet-3',
        { y: '-110vh', opacity: 0, duration: 0.5, ease: 'power2.in' }
      );

      // Pausa de leitura do resultado final
      tl.to({}, { duration: 0.5 });

      // ── Saída geral ───────────────────────────────────────────────────────
      tl.to(
        ['.meth-node-1', '.meth-node-2', '.meth-node-3',
         '.meth-line-1', '.meth-line-2', '.meth-line-3', '.meth-center'],
        { opacity: 0, y: -60, stagger: 0.03, duration: 0.5 }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="metodologia"
      ref={containerRef}
      className="bg-[#212121] border-b border-white/5 relative font-halyard h-screen overflow-hidden"
    >
      {/* Headline */}
      <div className="meth-headline absolute inset-0 flex flex-col items-center justify-center z-50 px-6 pointer-events-none">
        <span className="text-[#FE6942] text-[12px] md:text-sm font-halyard tracking-widest uppercase block mb-4">
          Nossa Metodologia
        </span>
        <h2 className="font-editorial text-4xl md:text-5xl lg:text-6xl text-white text-center leading-[1.1] max-w-5xl">
          A ciência por trás de uma <br />
          marca <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] italic">TheOne.</span>
        </h2>
      </div>

      {/* ── Bullets que passam pela tela ─────────────────────────────────── */}

      {/* Bullet 1 — esquerda */}
      <div
        className="meth-bullet-1 absolute z-40 pointer-events-none hidden lg:block"
        style={{ left: '5%', top: '50%', transform: 'translateY(-50%)', width: '300px', opacity: 0 }}
      >
        <p className="font-sans font-normal text-[20px] xl:text-[24px] leading-relaxed text-[#C7C7C7]">
          Nossa metodologia de construção de marca é baseada em{' '}
          <span className="text-white">pesquisa aprofundada em 3 pilares:</span>{' '}
          Seu cliente, seu negócio, seu mercado.
        </p>
      </div>

      {/* Bullet 2 — direita */}
      <div
        className="meth-bullet-2 absolute z-40 pointer-events-none hidden lg:block"
        style={{ right: '5%', top: '50%', transform: 'translateY(-50%)', width: '280px', opacity: 0 }}
      >
        <p className="font-sans font-normal text-[20px] xl:text-[24px] leading-relaxed text-[#C7C7C7] text-right">
          Nós construímos marca baseado em{' '}
          <span className="text-[#FF5224]">DADOS.</span>
        </p>
      </div>

      {/* Bullet 3 — esquerda */}
      <div
        className="meth-bullet-3 absolute z-40 pointer-events-none hidden lg:block"
        style={{ left: '5%', top: '50%', transform: 'translateY(-50%)', width: '300px', opacity: 0 }}
      >
        <p className="font-sans font-normal text-[20px] xl:text-[24px] leading-relaxed text-[#C7C7C7]">
          O entendimento profundo desses contextos nos permite posicionar sua marca de forma{' '}
          <span className="text-white">inevitável.</span>
        </p>
      </div>

      {/* ── Pirâmide centrada ─────────────────────────────────────────────── */}
      <div className="relative w-full h-full flex items-center justify-center">
        <div
          className="relative flex-shrink-0"
          style={{ width: 'min(82vh, 720px)', height: 'min(82vh, 720px)' }}
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
          <div className="meth-node-1 absolute top-[13%] left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 opacity-0">
            <div className="w-[72px] h-[72px] bg-[#212121] border border-[#FF5224]/40 flex items-center justify-center mb-3 rounded-full shadow-[0_0_48px_rgba(255,82,36,0.25)]">
              <Users size={26} className="text-[#FED1C5]" />
            </div>
            <span className="text-white font-sans font-normal uppercase tracking-widest text-[14px]">Cliente</span>
          </div>

          {/* Nó 2 — Baixo Direita (Negócio) */}
          <div className="meth-node-2 absolute top-[83%] left-[89%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 opacity-0">
            <div className="w-[72px] h-[72px] bg-[#212121] border border-[#FF5224]/40 flex items-center justify-center mb-3 rounded-full shadow-[0_0_48px_rgba(255,82,36,0.25)]">
              <Briefcase size={26} className="text-[#FED1C5]" />
            </div>
            <span className="text-white font-sans font-normal uppercase tracking-widest text-[14px]">Negócio</span>
          </div>

          {/* Nó 3 — Baixo Esquerda (Concorrentes) */}
          <div className="meth-node-3 absolute top-[83%] left-[11%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 opacity-0">
            <div className="w-[72px] h-[72px] bg-[#212121] border border-[#FF5224]/40 flex items-center justify-center mb-3 rounded-full shadow-[0_0_48px_rgba(255,82,36,0.25)]">
              <Target size={26} className="text-[#FED1C5]" />
            </div>
            <span className="text-white font-sans font-normal uppercase tracking-widest text-[14px]">Concorrentes</span>
          </div>

          {/* Centro — Posicionamento Inevitável */}
          <div className="meth-center absolute top-[57%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 text-center w-[280px] md:w-[360px] opacity-0">
            <p className="text-white font-editorial tracking-tight text-2xl md:text-3xl leading-none">
              Posicionamento
            </p>
            <span className="font-editorial text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] italic text-4xl md:text-6xl block mt-2 drop-shadow-[0_0_24px_rgba(255,82,36,0.35)]">
              Inevitável
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
