import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TheOne() {
  const containerRef = useRef(null);

  const style = {
    titulo: "clamp(2rem, 3.2vw, 2.9rem)",
    textoDesktop: "20px",
    alturaLinhaTexto: "1.4",
  };

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Animação imersiva de entrada lado a lado
      gsap.fromTo('.sol-left > *',
        { opacity: 0, x: -30, filter: "blur(10px)" },
        { opacity: 1, x: 0, filter: "blur(0px)", duration: 1, stagger: 0.15, scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
      );
      gsap.fromTo('.sol-right',
        { opacity: 0, x: 40, scale: 0.95 },
        { opacity: 1, x: 0, scale: 1, duration: 1.2, delay: 0.3, ease: "power4.out", scrollTrigger: { trigger: containerRef.current, start: 'top 75%' } }
      );

      // Animação da frase destaque: fica laranja palavra por palavra
      gsap.to('.conclusion-highlight-word', {
        color: '#FE6942',
        fontWeight: 500,
        duration: 0.4,
        stagger: 0.08,
        delay: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const imageCard = (className = '') => (
    <div className={`sol-right w-full md:w-[45%] relative h-[280px] sm:h-[380px] md:h-[650px] rounded-[32.7px] overflow-hidden border border-[#5B5B5B] bg-[#141414] shadow-2xl flex items-center justify-center group cursor-pointer ${className}`.trim()}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,105,66,0.1)_0%,transparent_60%)] mix-blend-screen z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>

      <img
        src="/theone-hand.jpg"
        alt="The One #1 Hand"
        width="1024"
        height="681"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(min-width: 768px) 45vw, 100vw"
        className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
    </div>
  );

  return (
    <section id="a-theone" ref={containerRef} className="bg-[#212121] text-white relative pt-20 md:pt-[164px] lg:pt-[200px] pb-12 md:pb-16 px-4 overflow-hidden">
      <div className="w-[90%] md:w-[94%] max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">

        {/* Esquerda: Proposta de Valor TheOne */}
        <div className="sol-left w-full md:w-[55%] flex flex-col items-start text-left gap-8">
          <h2 className="font-editorial font-normal leading-[1.05] text-white" style={{ fontSize: style.titulo }}>
            Vimos o que acontece quando marketing vira linha de produção e <span className="text-gradient">nos recusamos a ser mais um desse modelo.</span>
          </h2>

          {imageCard('md:hidden')}

          <div
            className="flex flex-col gap-6 font-halyard font-light text-[#C7C7C7] w-full text-[clamp(1.24rem,5.15vw,1.42rem)] md:text-[20px]"
            style={{ lineHeight: style.alturaLinhaTexto }}
          >
            <p className="max-w-[620px] relative -top-px">
              {"A TheOne é a assessoria de marca que nasceu para construir marcas TheOne™: a escolha número um na mente do seu público.".split(' ').map((word, i) => (
                <span key={`second-${i}`} className="conclusion-highlight-word inline-block mr-[0.2em] whitespace-nowrap">
                  {word}
                </span>
              ))}
            </p>
            <p className="max-w-[620px] relative -top-px">
              Não entregamos um PDF e sumimos. Estruturamos como você se posiciona nos principais canais para você se tornar a opção inevitável no seu mercado. Seremos seus aliados na efetivação da estratégia para consolidar o seu negócio como o número um do seu mercado.
            </p>
            <ul className="pt-4 md:pt-6 flex flex-col gap-y-4 md:gap-y-5 text-left text-white font-light w-full text-[clamp(1.14rem,4.75vw,1.3rem)] md:text-[22px]">
              <li className="flex items-start gap-3 min-w-0">
                <span className="mt-[0.55em] h-2 w-2 flex-shrink-0 rounded-full bg-[#FE6942]" />
                <span>
                  São +8 anos construindo marcas que lideram, com profissionais formados nas maiores operações de marketing e comunicação do Brasil.
                </span>
              </li>
              <li className="flex items-start gap-3 min-w-0">
                <span className="mt-[0.55em] h-2 w-2 flex-shrink-0 rounded-full bg-[#FE6942]" />
                <span>
                  Nossos projetos são personalizados. Nenhum negócio com ambição cabe numa solução industrializada.
                </span>
              </li>
              <li className="flex items-start gap-3 min-w-0">
                <span className="mt-[0.55em] h-2 w-2 flex-shrink-0 rounded-full bg-[#FE6942]" />
                <span>
                  Não atuamos com centenas, nem dezenas de clientes. Nós selecionamos empresas que têm visão de crescimento e propósito de gerar transformação para nos tornarmos aliados.
                </span>
              </li>
            </ul>
          </div>
        </div>

        {imageCard('hidden md:flex')}

      </div>
    </section>
  );
}
