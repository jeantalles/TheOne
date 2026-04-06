import { useRef, useState } from 'react';
import { MeshGradient } from '@paper-design/shaders-react';

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
        height: '60px',
        padding: '0 52px',
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
      Quero ser TheOne
    </button>
  );
}

export default function HeroLight() {
  return (
    <section
      data-navbar-theme="light"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
      style={{
        background: '#f2e9e2',
        minHeight: '100dvh',
        height: '100dvh',
      }}
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.95]">
          <MeshGradient
            speed={0.65}
            scale={0.8}
            distortion={0.16}
            swirl={0}
            colors={['#FFB19E', '#F3EBE4', '#F5EDE8', '#F3ECE5']}
            style={{ width: '100%', height: '100%' }}
          />
        </div>
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, rgba(245,240,236,0) 0%, rgba(245,240,236,0) 50%, #F5F0EC 100%)',
          }}
        />
      </div>

      <div className="container relative z-10 px-6 pb-[25px] text-center">
        <h1
          className="font-sans tracking-[-0.035em] text-[#151312]"
          style={{
            fontSize: 'clamp(4.4rem, 8vw, 7rem)',
            lineHeight: 0.9,
            opacity: 0.73,
            fontWeight: 300,
            marginBottom: '6px',
          }}
        >
          <span className="block">Construímos</span>
          <span className="block">
            marcas{' '}
            <span style={{ color: '#FF4B1C' }}>
              TheOne
            </span>
            <span
              className="inline-block align-top font-halyard text-[#FF8E6C]"
              style={{
                fontSize: '0.288em',
                letterSpacing: '0.04em',
                marginLeft: '0.18em',
                marginTop: '0.55em',
                fontWeight: 600,
              }}
            >
              &trade;
            </span>
          </span>
        </h1>

        <h2
          className="font-editorial font-normal"
          style={{
            fontSize: 'clamp(1.9rem, 2.8vw, 3rem)',
            paddingTop: '25px',
            color: '#1A1A1A',
            lineHeight: 1.06,
            opacity: 0.73,
          }}
        >
          A única escolha na mente do seu cliente.
        </h2>

        <p
          className="mx-auto mb-12 max-w-[35rem] leading-[1.35] font-halyard"
          style={{
            fontSize: 'clamp(1.275rem, 1.7vw, 1.875rem)',
            marginTop: '28px',
            color: 'rgba(74, 65, 64, 0.88)',
            fontWeight: 400,
          }}
        >
          Para negócios visionários que não querem ser mais uma opção e buscam se tornar Top 1 no seu mercado.
        </p>

        <div className="flex flex-row items-center justify-center gap-[18px]">
          <CTAButton />
          <a
            href="#o-problema"
            className="group inline-flex items-center justify-center font-sans font-normal transition-colors duration-200 active:scale-[0.98]"
            style={{
              fontSize: '18px',
              height: '60px',
              padding: '0 26px',
              borderRadius: '999px',
              letterSpacing: '0.01em',
              color: 'rgba(26,26,26,0.73)',
              background: 'rgba(255,255,255,0.38)',
              border: '1px solid rgba(26,26,26,0.16)',
              backdropFilter: 'blur(18px)',
              WebkitBackdropFilter: 'blur(18px)',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(26,26,26,0.88)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(26,26,26,0.73)';
              e.currentTarget.style.background = 'rgba(255,255,255,0.38)';
            }}
          >
            Ver como funciona
          </a>
        </div>
      </div>
    </section>
  );
}
