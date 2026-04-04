import { useRef, useState } from 'react';

function CTAButton() {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: '50%', y: '50%' });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` });
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
          ? `radial-gradient(80px circle at ${pos.x} ${pos.y}, rgba(255,120,80,0.35), #FF5224 70%)`
          : '#FF5224',
        border: 'none',
        boxShadow: hovered
          ? '0 8px 32px rgba(255,82,36,0.40)'
          : '0 4px 16px rgba(255,82,36,0.22)',
        transition: 'box-shadow 0.2s',
      }}
    >
      Quero Ser TheOne
    </button>
  );
}

export default function HeroLight() {
  return (
    <section
      data-navbar-theme="light"
      className="relative min-h-screen flex items-center justify-center"
      style={{
        background: '#F5F0EB',
        minHeight: 'calc(100vh - 80px)',
      }}
    >
      <div className="container relative z-10 px-6 pt-28 text-center">
        <h1
          className="font-sans font-normal tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-[#FF5224] to-[#CC2200]"
          style={{ fontSize: '64px' }}
        >
          Construímos marcas TheOne
          <span
            style={{
              fontSize: '0.62em',
              verticalAlign: 'top',
            }}
          >
            &trade;
          </span>
        </h1>

        <h2
          className="font-editorial font-normal"
          style={{ fontSize: '42px', paddingTop: '20px', color: '#1A1A1A' }}
        >
          A única escolha na mente do seu cliente.
        </h2>

        <p
          className="mx-auto max-w-2xl mb-12 leading-[1.4] font-halyard"
          style={{ fontSize: '25px', marginTop: '32px', color: '#4A4140', fontWeight: 400 }}
        >
          Para negócios visionários que não querem ser mais uma opção e buscam se tornar Top 1 no seu mercado.
        </p>

        <div className="flex flex-row items-center justify-center gap-8">
          <CTAButton />
          <a
            href="#o-problema"
            className="group flex items-center gap-2 font-sans font-normal capitalize transition-colors duration-200"
            style={{ fontSize: '18px', letterSpacing: '0.01em', color: 'rgba(26,26,26,0.45)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'rgba(26,26,26,0.85)'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(26,26,26,0.45)'}
          >
            O Que É A TheOne
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
