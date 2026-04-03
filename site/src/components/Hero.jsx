import { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

function SpotlightButton() {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: '50%', y: '50%' });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    setPos({
      x: `${e.clientX - rect.left}px`,
      y: `${e.clientY - rect.top}px`,
    });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative font-sans font-normal capitalize text-white cursor-pointer active:scale-[0.97] transition-transform"
      style={{
        fontSize: '18px',
        padding: '18px 52px',
        borderRadius: '100px',
        letterSpacing: '0.01em',
        background: hovered
          ? `radial-gradient(80px circle at ${pos.x} ${pos.y}, rgba(255,82,36,0.28), rgba(255,255,255,0.04) 70%), rgba(255,255,255,0.06)`
          : 'rgba(255,255,255,0.06)',
        border: hovered
          ? `1px solid rgba(255,82,36,0.50)`
          : '1px solid rgba(255,255,255,0.12)',
        boxShadow: hovered
          ? `0 0 24px rgba(255,82,36,0.10)`
          : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      Quero Ser TheOne
    </button>
  );
}

// ─── CONFIGURAÇÃO MANUAL DA HERO ───────────────────────────────────────────
const config = {
  h1FontSize: '64px',   // tamanho do título principal (sans)
  h2FontSize: '42px',   // tamanho do subtítulo em serifa
  h2PaddingTop: '20px',   // espaço entre h1 e h2
  subFontSize: '25px',   // tamanho do parágrafo descritivo
  subMarginTop: '32px',   // espaço entre h2 e parágrafo (mt)
};
// ───────────────────────────────────────────────────────────────────────────

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#212121]"
    >
      <motion.div
        style={{ y, opacity, scale }}
        className="container relative z-10 px-6 pt-28 text-center"
      >
        <h1
          className="font-sans font-normal tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]"
          style={{ fontSize: config.h1FontSize }}
        >
          Construímos marcas TheOne™
        </h1>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.23, 1, 0.32, 1] }}
          className="font-editorial font-normal italic text-white"
          style={{ fontSize: config.h2FontSize, paddingTop: config.h2PaddingTop }}
        >
          A única escolha na mente do seu cliente.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mx-auto max-w-2xl mb-12 text-[#C7C7C7] font-light leading-[1.4] font-halyard"
          style={{ fontSize: config.subFontSize, marginTop: config.subMarginTop }}
        >
          Para negócios visionários que não querem ser mais uma opção e buscam se tornar Top 1 no seu mercado.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="flex flex-row items-center justify-center gap-8"
        >
          <SpotlightButton />
          <a
            href="#o-problema"
            className="group flex items-center gap-2 text-white/50 hover:text-white font-sans font-normal capitalize transition-colors duration-200"
            style={{ fontSize: '18px', letterSpacing: '0.01em' }}
          >
            O Que É A TheOne
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
