import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function ContextoEditavel({ showDesejado, cenarioAtual, setCenarioAtual, cenarioDesejado, setCenarioDesejado }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ctx-card', {
        opacity: 0, y: 30, duration: 0.8, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-white pt-16 md:pt-20 pb-28 md:pb-36 px-6 md:px-12 lg:px-16" style={{ minHeight: '100svh' }}>
      <div className="max-w-[1400px] mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="font-editorial font-normal text-[#181412] text-[clamp(2.5rem,4vw,3.5rem)] leading-[1] tracking-tight">
            Análise de Contexto
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 items-stretch">
          
          <div className="ctx-card bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-10 border border-black/[0.05]">
            <h3 className="font-halyard font-bold text-[#181412]/40 text-[14px] tracking-[0.15em] uppercase mb-8">Cenário Atual</h3>
            <textarea
              value={cenarioAtual}
              onChange={(e) => setCenarioAtual(e.target.value)}
              placeholder="- Digite o cenário atual aqui..."
              className="w-full h-[400px] bg-transparent resize-none font-halyard font-light text-[#181412]/80 text-[18px] md:text-[21px] leading-[1.6] focus:outline-none placeholder:text-black/20"
            />
          </div>

          {showDesejado ? (
            <div className="ctx-card flex items-start justify-center pt-5 md:pt-14">
              <svg className="hidden md:block" width="36" height="36" viewBox="0 0 36 36" fill="none">
                <path d="M7.5 18H28.5M28.5 18L19.5 9M28.5 18L19.5 27" stroke="#FE6942" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          ) : (
            <div className="hidden md:block" />
          )}

          {showDesejado ? (
            <div className="ctx-card bg-[#F8F8F8] rounded-2xl px-8 md:px-10 py-10 border-2 border-[#FE6942]">
              <h3 className="font-halyard font-bold text-[#FE6942] text-[14px] tracking-[0.15em] uppercase mb-8">Cenário Desejado</h3>
              <textarea
                value={cenarioDesejado}
                onChange={(e) => setCenarioDesejado(e.target.value)}
                placeholder="- Digite o cenário desejado aqui..."
                className="w-full h-[400px] bg-transparent resize-none font-halyard font-light text-[#181412]/80 text-[18px] md:text-[21px] leading-[1.6] focus:outline-none placeholder:text-black/20"
              />
            </div>
          ) : (
            <div className="hidden md:block" />
          )}
        </div>
      </div>
    </section>
  );
}
