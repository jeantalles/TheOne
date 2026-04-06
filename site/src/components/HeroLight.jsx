import PrimaryCTAButton from './PrimaryCTAButton';
import { MeshGradient } from '@paper-design/shaders-react';

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

      <div
        className="container relative z-10 px-6 pb-[25px] text-center"
        style={{ transform: 'translateY(15px)' }}
      >
        <h1
          className="font-sans tracking-[-0.035em] text-[#151312]"
          style={{
            fontSize: 'clamp(3.96rem, 7.2vw, 6.3rem)',
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
            fontSize: 'clamp(1.71rem, 2.52vw, 2.7rem)',
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
            fontSize: 'clamp(1.1475rem, 1.53vw, 1.6875rem)',
            marginTop: '38px',
            color: 'rgba(74, 65, 64, 0.88)',
            fontWeight: 400,
          }}
        >
          Para negócios visionários que não querem ser mais uma opção e buscam se tornar Top 1 no seu mercado.
        </p>

        <div className="flex flex-row items-center justify-center gap-[18px]">
          <PrimaryCTAButton style={{ fontSize: '16.2px' }}>Quero ser TheOne</PrimaryCTAButton>
          <a
            href="#o-problema"
            className="group inline-flex items-center justify-center font-sans font-normal transition-colors duration-200 active:scale-[0.98]"
            style={{
              fontSize: '16.2px',
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
