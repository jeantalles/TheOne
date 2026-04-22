import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const SOLUCOES_THEONE = [
  'Construção de Marca',
  'Reposicionamento de Marca',
  'Fundador Posicionado: marca pessoal e founder led growth',
  'Go to Market e Lançamento',
  'Sistema de Produção de Conteúdo para Gerar Receita',
  'Arquitetura de Receita e Produto',
  'Site Brand Experience',
];

export default function SolucoesTheOne() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.solution-title', {
        opacity: 0,
        y: 34,
        stagger: 0.09,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 68%' },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#212121] text-white px-6 md:px-12 lg:px-16 pt-16 pb-24 md:pt-20 md:pb-32 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-12 lg:gap-20 items-start">
          <div className="lg:sticky lg:top-28">
            <span className="font-halyard text-[11px] tracking-[0.22em] uppercase text-[#FE6942] font-medium block mb-5">
              Soluções
            </span>
            <h2 className="font-editorial font-normal text-white text-[clamp(2.1rem,3.35vw,3.1rem)] leading-[1.05] tracking-tight max-w-[16ch]">
              Nossas soluções pra ajudar seu negócio a se tornar a escolha número um
            </h2>
          </div>

          <div className="divide-y divide-white/[0.1] border-y border-white/[0.1]">
            {SOLUCOES_THEONE.map((solucao, i) => (
              <div key={solucao} className="solution-title group flex items-start gap-6 md:gap-10 py-7 md:py-9">
                <span className="font-editorial font-normal text-[#FE6942]/45 text-[1.25rem] md:text-[1.7rem] leading-none mt-2 md:mt-1">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-sans font-medium text-white text-[clamp(1.75rem,3.4vw,3.2rem)] leading-[1.05] tracking-tight transition-colors duration-300 group-hover:text-[#FE6942]">
                  {solucao.includes(':') ? (
                    <>
                      {solucao.split(':')[0]}
                      <span className="block mt-2 font-halyard font-light text-[0.45em] text-white/50 tracking-normal uppercase">
                        {solucao.split(':')[1]}
                      </span>
                    </>
                  ) : (
                    solucao
                  )}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
