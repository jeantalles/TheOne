import { useEffect, useRef } from 'react';
import { useMediaQuery } from '../hooks/useMediaQuery';

/**
 * Seção vazia (100svh) que serve como gatilho para o PersonaSelector popup.
 * Usa um ref interno (hasTriggered) para garantir disparo único —
 * evita race condition entre IntersectionObserver e re-render do React.
 */
export default function PersonaTrigger({ onTrigger, triggered }) {
  const ref = useRef(null);
  const hasTriggered = useRef(triggered); // sincroniza com prop inicial
  const isMobileViewport = useMediaQuery('(max-width: 767px)');
  const triggerHeight = isMobileViewport ? '64svh' : '100svh';

  // Atualiza o ref quando a prop muda (ex: depois da seleção)
  useEffect(() => {
    hasTriggered.current = triggered;
  }, [triggered]);

  useEffect(() => {
    if (hasTriggered.current) return undefined;
    const el = ref.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasTriggered.current) return;
        // Marca imediatamente via ref (síncrono) antes de qualquer re-render
        hasTriggered.current = true;
        observer.disconnect();
        onTrigger();
      },
      {
        rootMargin: isMobileViewport ? '0px 0px -10% 0px' : '0px 0px -85% 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isMobileViewport, onTrigger]); // sem 'triggered' — o ref cuida do guard

  return (
    <div
      ref={ref}
      aria-hidden="true"
      data-navbar-theme="light"
      style={{
        backgroundColor: '#F5F0EC',
        height: triggerHeight,
      }}
    />
  );
}
