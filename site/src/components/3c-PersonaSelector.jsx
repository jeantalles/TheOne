import { useRef, useEffect, useState, useCallback } from 'react';
import { gsap } from 'gsap';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery';

const OPTIONS = [
  { value: 'empresario', label: 'Empresário' },
  { value: 'gestor',     label: 'Gestor de Marketing & Growth' },
];

export default function PersonaSelector({ onSelect }) {
  const contentRef = useRef(null);
  const cardsRef = useRef(null);
  const shakingRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isMobileViewport = useMediaQuery('(max-width: 767px)');
  const [selected, setSelected] = useState(null); // valor selecionado (pré-saída)

  // ── Slide-in-up ao montar ─────────────────────────────────────────────────
  useEffect(() => {
    if (!contentRef.current || prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { y: 72, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out', delay: 0.05 }
      );
    });

    return () => ctx.revert();
  }, [prefersReducedMotion]);

  // ── Shake nos cards (compartilhado: idle + scroll/touch) ─────────────────
  const triggerShake = useCallback(() => {
    if (shakingRef.current || prefersReducedMotion || !cardsRef.current) return;
    shakingRef.current = true;
    const cards = Array.from(cardsRef.current.children);
    const shakeX = 10;
    const settleX = 7;
    const tailX = 3;
    const stepDuration = 0.08;
    const tailDuration = 0.06;

    cards.forEach((card, i) => {
      gsap.to(card, {
        delay: i * 0.05,
        keyframes: [
          { x: -shakeX, duration: stepDuration, ease: 'none' },
          { x:  shakeX, duration: stepDuration, ease: 'none' },
          { x: -settleX, duration: stepDuration, ease: 'none' },
          { x:  settleX, duration: stepDuration, ease: 'none' },
          { x: -tailX, duration: tailDuration, ease: 'none' },
          { x:  0, duration: tailDuration, ease: 'none' },
        ],
        onComplete: i === cards.length - 1
          ? () => { shakingRef.current = false; }
          : undefined,
      });
    });
  }, [prefersReducedMotion]);

  // ── Shake idle a cada 2s ──────────────────────────────────────────────────
  useEffect(() => {
    if (prefersReducedMotion || !cardsRef.current) return undefined;

    let intervalId = null;

    // Pequeno delay inicial para não colidir com o slide-in
    const timeoutId = setTimeout(() => {
      triggerShake();
      intervalId = setInterval(triggerShake, 2000);
    }, 1400);

    return () => {
      clearTimeout(timeoutId);
      if (intervalId) clearInterval(intervalId);
    };
  }, [prefersReducedMotion, triggerShake]);

  useEffect(() => {
    const overlay = contentRef.current?.parentElement;
    if (!overlay || prefersReducedMotion) return undefined;

    let touchStartY = 0;

    const onWheel = (e) => {
      e.preventDefault();
      triggerShake();
    };

    const onTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const onTouchMove = (e) => {
      const delta = Math.abs(e.touches[0].clientY - touchStartY);
      if (delta > (isMobileViewport ? 5 : 8)) {
        e.preventDefault();
        triggerShake();
      }
    };

    overlay.addEventListener('wheel', onWheel, { passive: false });
    overlay.addEventListener('touchstart', onTouchStart, { passive: true });
    overlay.addEventListener('touchmove', onTouchMove, { passive: false });

    return () => {
      overlay.removeEventListener('wheel', onWheel);
      overlay.removeEventListener('touchstart', onTouchStart);
      overlay.removeEventListener('touchmove', onTouchMove);
    };
  }, [isMobileViewport, prefersReducedMotion, triggerShake]);

  // ── Selecionar persona ────────────────────────────────────────────────────
  const handleSelect = (value) => {
    if (selected) return; // evitar duplo clique
    setSelected(value);   // mostra checkmark imediatamente

    // Aguarda a animação do checkmark (0.45s) antes de fechar
    const delay = prefersReducedMotion ? 0 : 600;

    setTimeout(() => {
      if (prefersReducedMotion) {
        onSelect(value);
        return;
      }
      gsap.to(contentRef.current, {
        y: 48,
        opacity: 0,
        duration: 0.38,
        ease: 'power2.in',
        onComplete: () => onSelect(value),
      });
    }, delay);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Selecione sua persona"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 80,
        background: 'transparent',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(2rem, 10vh, 6rem) 1.5rem',
        pointerEvents: 'auto',
      }}
    >
      <div
        ref={contentRef}
        style={{
          width: '100%',
          maxWidth: '760px',
          opacity: prefersReducedMotion ? 1 : 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 'clamp(1.25rem, 4vw, 2.5rem)',
          textAlign: 'center',
        }}
      >
        {/* Label */}
        <p
          className="font-halyard tracking-widest uppercase"
          style={{ fontSize: 'clamp(1.1rem, 5vw, 1.875rem)', color: '#FE6942', margin: 0 }}
        >
          Antes de continuar
        </p>

        {/* Heading */}
        <h2
          className="font-editorial font-normal leading-[1.1]"
          style={{
            fontSize: 'clamp(2.2rem, 4.5vw, 3.6rem)',
            color: '#151311',
            margin: 0,
          }}
        >
          Essa história tem dois caminhos. Qual é o seu?
        </h2>

        {/* Cards */}
        <div ref={cardsRef} className="flex flex-col sm:flex-row gap-4 sm:gap-4 w-full">
          {OPTIONS.map((opt) => {
            const isSelected = selected === opt.value;
            const isDimmed   = selected !== null && !isSelected;

            return (
              <PersonaCard
                key={opt.value}
                label={opt.label}
                isSelected={isSelected}
                isDimmed={isDimmed}
                confirmed={selected !== null}
                isMobile={isMobileViewport}
                onClick={() => handleSelect(opt.value)}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ── Card individual ───────────────────────────────────────────────────────────
function PersonaCard({ label, isSelected, isDimmed, confirmed, onClick, isMobile }) {
  const defaultBg = isMobile ? '#F5F0EC' : 'transparent';
  return (
    <button
      onClick={onClick}
      disabled={confirmed}
      className="flex-1 relative flex items-center justify-center rounded-[20px] transition-all duration-300 active:scale-[0.97] cursor-pointer overflow-hidden"
      style={{
        padding: 'clamp(1.25rem, 4vw, 2.5rem) clamp(1rem, 3vw, 2rem)',
        border: isSelected
          ? '1.5px solid #FE6942'
          : '1.5px solid rgba(21, 19, 17, 0.18)',
        backgroundColor: isSelected
          ? 'rgba(254, 105, 66, 0.07)'
          : defaultBg,
        opacity: isDimmed ? 0.3 : 1,
        pointerEvents: confirmed ? 'none' : 'auto',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!isSelected && !confirmed) {
          e.currentTarget.style.backgroundColor = 'rgba(21, 19, 17, 0.04)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !confirmed) {
          e.currentTarget.style.backgroundColor = defaultBg;
        }
      }}
    >
      {/* Label — some quando selecionado */}
      <span
        className="font-editorial font-normal leading-[1.1]"
        style={{
          fontSize: 'clamp(1.5rem, 2.4vw, 2rem)',
          color: '#151311',
          opacity: isSelected && confirmed ? 0 : 1,
          transition: 'opacity 0.2s ease',
        }}
      >
        {label}
      </span>

      {/* Checkmark — aparece quando selecionado */}
      {isSelected && confirmed && <CheckMark />}
    </button>
  );
}

// ── Checkmark animado ─────────────────────────────────────────────────────────
function CheckMark() {
  const ref = useRef(null);

  useEffect(() => {
    if (!ref.current) return;
    gsap.fromTo(
      ref.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.45, ease: 'back.out(1.8)' }
    );
  }, []);

  return (
    <span
      ref={ref}
      className="absolute inset-0 flex items-center justify-center"
      style={{ opacity: 0 }}
    >
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="18" cy="18" r="17" stroke="#FE6942" strokeWidth="1.5" />
        <path
          d="M11 18.5L15.5 23L25 13"
          stroke="#FE6942"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}
