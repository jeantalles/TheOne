import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery } from '../hooks/useMediaQuery';

const BOTTOM_TRIM_PX = 100;
const BOTTOM_SEAM_MASK_PX = 60;

export default function GradientTransition() {
  const containerRef = useRef(null);
  const figureRef    = useRef(null);
  const isMobileViewport = useMediaQuery('(max-width: 767px)');

  useEffect(() => {
    const figure = figureRef.current;
    let currentNavbarTheme = null;

    const updateNavbarTheme = (theme) => {
      if (currentNavbarTheme === theme) {
        return;
      }

      currentNavbarTheme = theme;
      window.dispatchEvent(new CustomEvent('navbar-theme-override', {
        detail: { theme },
      }));
    };

    // Anima rotateX: 82.689deg → 0 enquanto o container entra na viewport
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start:   'top bottom',  // container entra pelo rodapé
      end:     'top top',     // container chega ao topo
      scrub:   1,
      onUpdate(self) {
        const rotX = (1 - self.progress) * 82.689;
        figure.style.transform = rotX > 0.05
          ? `rotateX(${rotX.toFixed(3)}deg)`
          : 'none';

        updateNavbarTheme(self.progress < 0.48 ? 'dark' : 'light');
      },
      onLeave: () => updateNavbarTheme(null),
      onLeaveBack: () => updateNavbarTheme(null),
    });

    return () => {
      updateNavbarTheme(null);
      st.kill();
    };
  }, []);

  return (
    /*
      Estrutura IDÊNTICA ao site de referência (Framer):
      - Container: height auto (min-content), overflow hidden, bg off-white
      - Figura: aspect-ratio 1920/2448 (tamanho real da imagem), width 100%, position relative
      - SEM perspective CSS — o efeito de cúpula vem do gradiente radial da própria imagem
      - objectPosition: center — exatamente como no original
    */
    <div
      ref={containerRef}
      data-navbar-theme="light"
      style={{
        background: 'linear-gradient(to bottom, #F5F0EB 50%, #000000 100%)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-end',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <figure
        ref={figureRef}
        style={{
          width: isMobileViewport ? '114%' : '100%',
          aspectRatio: '1920 / 2448',
          maxHeight: isMobileViewport ? 'min(2448px, 172vw)' : 'min(2448px, 150vw)',
          flex: 'none',
          position: 'relative',
          overflow: 'visible',
          transformOrigin: '50% 0% 0px',
          willChange: 'transform',
          transform: 'rotateX(82.689deg)',
          backfaceVisibility: 'hidden',
          WebkitBackfaceVisibility: 'hidden',
          margin: 0,
          marginBottom: `-${BOTTOM_TRIM_PX}px`,
          marginLeft: isMobileViewport ? '-7%' : 0,
          padding: 0,
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        <div style={{ position: 'absolute', inset: 0 }}>
          <img
            width="1920"
            height="2448"
            loading="lazy"
            decoding="async"
            fetchPriority="low"
            sizes="100vw"
            src="/wv64XhA0rLzc6HRCKNntFNBWT4.png"
            alt=""
            style={{
              display: 'block',
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center',
            }}
          />
        </div>
      </figure>
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          height: `${BOTTOM_SEAM_MASK_PX}px`,
          backgroundColor: '#000000',
          pointerEvents: 'none',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}
