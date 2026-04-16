import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function SpotlightButton() {
  const btnRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    btnRef.current.style.setProperty('--x', `${x}px`);
    btnRef.current.style.setProperty('--y', `${y}px`);
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      className="spotlight-btn relative font-sans font-normal capitalize text-white cursor-pointer active:scale-[0.97] transition-transform"
      style={{
        fontSize: '18px',
        padding: '18px 52px',
        borderRadius: '100px',
        letterSpacing: '0.01em',
        background: 'rgba(255,255,255,0.06)',
        border: '1px solid rgba(255,255,255,0.12)',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      Quero Ser TheOne
      <style>{`
        .spotlight-btn:hover {
          background: radial-gradient(80px circle at var(--x) var(--y), rgba(255,82,36,0.28), rgba(255,255,255,0.04) 70%), rgba(255,255,255,0.06);
          border-color: rgba(255,82,36,0.50);
          box-shadow: 0 0 24px rgba(255,82,36,0.10);
        }
      `}</style>
    </button>
  );
}

const config = {
  h1FontSize: '64px',
  h2FontSize: '42px',
  h2PaddingTop: '20px',
  subFontSize: '29px',
  subMarginTop: '32px',
};

export default function Hero() {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(contentRef.current, {
        y: '30%',
        opacity: 0,
        scale: 0.95,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative min-h-[100vh] flex items-center justify-center overflow-hidden bg-[#212121]"
    >
      <div
        ref={contentRef}
        className="container relative z-10 px-6 pt-28 text-center"
      >
        <h1
          className="font-sans font-normal tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]"
          style={{ fontSize: config.h1FontSize }}
        >
          Construímos marcas TheOne™
        </h1>

        <h2
          className="font-editorial font-normal italic text-white opacity-0"
          style={{ fontSize: config.h2FontSize, paddingTop: config.h2PaddingTop }}
          ref={(el) => {
            if (el) {
              gsap.to(el, { opacity: 1, y: 0, duration: 1, delay: 0.2, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 90%" } });
            }
          }}
        >
          Torne-se a escolha número um.
        </h2>

        <p
          className="mx-auto max-w-2xl mb-12 text-[#C7C7C7] font-light leading-[1.4] font-halyard opacity-0"
          style={{ fontSize: config.subFontSize, marginTop: config.subMarginTop }}
          ref={(el) => {
            if (el) {
              gsap.to(el, { opacity: 1, duration: 1, delay: 0.8, scrollTrigger: { trigger: el, start: "top 90%" } });
            }
          }}
        >
          Para negócios visionários que não querem ser só mais uma opção e querem se tornar a marca número um e alternativa inevitável em seu mercado.
        </p>

        <div
          className="flex flex-row items-center justify-center gap-8 opacity-0"
          ref={(el) => {
            if (el) {
              gsap.to(el, { opacity: 1, y: 0, duration: 0.8, delay: 1, scrollTrigger: { trigger: el, start: "top 95%" } });
            }
          }}
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
        </div>
      </div>
    </section>
  );
}
