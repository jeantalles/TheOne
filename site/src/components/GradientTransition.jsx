import { useRef, useEffect } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const BOTTOM_TRIM_PX = 100;

export default function GradientTransition() {
  const containerRef = useRef(null);
  const figureRef    = useRef(null);

  useEffect(() => {
    const figure = figureRef.current;

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
      },
    });

    return () => st.kill();
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
        backgroundColor: '#F5F0EB',
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
          width: '100%',
          aspectRatio: '1920 / 2448',
          flex: 'none',
          position: 'relative',
          overflow: 'visible',
          transformOrigin: '50% 0% 0px',
          willChange: 'transform',
          transform: 'rotateX(82.689deg)',
          margin: 0,
          marginBottom: `-${BOTTOM_TRIM_PX}px`,
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
    </div>
  );
}
