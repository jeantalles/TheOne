import { useEffect, useRef } from 'react';

/**
 * Seção vazia (100svh) que serve como gatilho para o PersonaSelector popup.
 * Usa um ref interno (hasTriggered) para garantir disparo único —
 * evita race condition entre IntersectionObserver e re-render do React.
 */
export default function PersonaTrigger({ onTrigger, triggered }) {
  const ref = useRef(null);
  const hasTriggered = useRef(triggered); // sincroniza com prop inicial

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
        rootMargin: '0px 0px -85% 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [onTrigger]); // sem 'triggered' — o ref cuida do guard

  return (
    <div
      ref={ref}
      aria-hidden="true"
      style={{
        backgroundColor: '#F5F0EC',
        height: '100svh',
      }}
    />
  );
}
