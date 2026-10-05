import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

export default function MetodologiaProposta() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.socio-pyramid-item', {
        opacity: 0, y: 28, stagger: 0.1, duration: 0.85, ease: 'power3.out',
      });
      gsap.from('.socio-pyramid-graphic', {
        opacity: 0, scale: 0.92, filter: 'blur(8px)', duration: 0.9, ease: 'power3.out', delay: 0.2,
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#0a0a0a] min-h-[100svh] px-6 md:px-12 lg:px-16 pt-16 md:pt-20 pb-24 flex items-center">
      <div className="max-w-[1400px] w-full mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
        <div>
          <span className="socio-pyramid-item font-halyard text-[15px] tracking-[0.22em] uppercase text-[#FE6942] font-semibold block mb-6">Nossa metodologia</span>
          <h2 className="socio-pyramid-item font-editorial font-normal text-white text-[clamp(2.5rem,4vw,4rem)] leading-[1.05] tracking-tight mb-8">
            A ciência por trás de uma <span className="text-[#FE6942]">marca TheOne</span>
          </h2>
          <p className="socio-pyramid-item text-white/70 font-halyard font-light text-[18px] md:text-[21px] leading-[1.5] mb-8 max-w-[45ch]">
            A estratégia parte de três leituras que precisam se encontrar: o público, o negócio e o mercado. É nessa interseção que uma marca deixa de ser apenas uma opção.
          </p>
          <ul className="space-y-4">
            {[
              'O que o público precisa, deseja e teme.',
              'Como os concorrentes se posicionam e se vendem.',
              'A solução, a transformação e os diferenciais que o negócio sustenta.',
            ].map((item, i) => (
              <li key={item} className="socio-pyramid-item flex items-start gap-3">
                <span className="text-white/40 font-halyard font-medium text-[16px] md:text-[18px] mt-[3px]">0{i + 1}.</span>
                <span className="font-halyard font-light text-white/80 text-[18px] md:text-[19px] leading-[1.5]">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="socio-pyramid-graphic relative w-full aspect-square max-w-[460px] mx-auto flex items-center justify-center">
          <svg width="100%" height="100%" viewBox="0 0 400 400" className="absolute inset-0 pointer-events-none opacity-30" aria-hidden="true">
            <line x1="200" y1="60" x2="350" y2="320" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="350" y1="320" x2="50" y2="320" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="50" y1="320" x2="200" y2="60" stroke="#FFF" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {[
            { label: 'Público', position: 'top-[15%] left-1/2', icon: 'P' },
            { label: 'Negócio', position: 'top-[80%] left-[87.5%]', icon: 'N' },
            { label: 'Mercado', position: 'top-[80%] left-[12.5%]', icon: 'M' },
          ].map((point) => (
            <div key={point.label} className={`absolute ${point.position} -translate-x-1/2 -translate-y-1/2 flex flex-col items-center`}>
              <div className="w-[64px] h-[64px] md:w-[72px] md:h-[72px] rounded-full border border-white/20 bg-[#141414] flex items-center justify-center mb-3">
                <span className="font-editorial text-[28px] text-[#FE6942]">{point.icon}</span>
              </div>
              <span className="text-white font-halyard text-[15px] md:text-[16px] tracking-wide">{point.label}</span>
            </div>
          ))}

          <div className="absolute top-[55%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-[80%]">
            <p className="text-white/60 font-halyard font-semibold tracking-tight text-[22px] md:text-[26px] leading-none mb-2">Posicionamento</p>
            <span className="font-editorial text-white text-[34px] md:text-[42px] leading-none">Inevitável</span>
          </div>
        </div>
      </div>
    </section>
  );
}
