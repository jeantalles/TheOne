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
    <div className={`sol-right w-full relative h-[260px] sm:h-[340px] md:h-[410px] lg:h-[430px] rounded-[28px] overflow-hidden border border-[#5B5B5B] bg-[#141414] shadow-2xl flex items-center justify-center group cursor-pointer ${className}`.trim()}>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,105,66,0.1)_0%,transparent_60%)] mix-blend-screen z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>

      <img
        src="/theone-hand.jpg"
        alt="The One #1 Hand"
        width="1024"
        height="681"
        loading="lazy"
        decoding="async"
        fetchPriority="low"
        sizes="(min-width: 768px) 42vw, 100vw"
        className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
      />
    </div>
  );

  const bullets = [
    {
      title: '+8 Anos',
      text: 'Construindo marcas que lideram, com especialistas formados nas maiores operações de marketing e comunicação do Brasil.',
    },
    {
      title: 'Projetos Personalizados',
      text: 'Nenhum negócio com ambição cabe numa solução industrializada.',
    },
    {
      title: 'Projetos Selecionados',
      text: 'Não atuamos com centenas, nem dezenas de clientes. Nós selecionamos empresas que têm visão de crescimento e propósito de gerar transformação para nos tornarmos aliados.',
    },
  ];

  return (
    <section id="a-theone" ref={containerRef} className="bg-[#212121] text-white relative pt-20 md:pt-[148px] lg:pt-[176px] pb-14 md:pb-20 px-4 overflow-hidden">
      <div className="w-[90%] md:w-[94%] max-w-[1600px] mx-auto flex flex-col gap-12 md:gap-16 relative z-10">

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.9fr)_minmax(420px,0.82fr)] items-start gap-10 md:gap-14">
          {/* Esquerda: Proposta de Valor TheOne */}
          <div className="sol-left w-full flex flex-col items-start text-left gap-8">
            <h2 className="font-editorial font-normal text-white max-w-[850px]" style={{ fontSize: style.titulo, lineHeight: 1.12 }}>
              Existimos para construir marcas TheOne,{' '}
              <span className="text-gradient">a escolha número um.</span>
            </h2>

            <div
              className="flex flex-col gap-6 font-halyard font-light text-[#C7C7C7] w-full text-[clamp(1.24rem,5.15vw,1.42rem)] md:text-[20px]"
              style={{ lineHeight: style.alturaLinhaTexto }}
            >
              <p className="max-w-[720px] relative -top-px">
                Vimos o que acontece quando marketing vira linha de produção e nos recusamos a ser mais um desse modelo.
              </p>
              <p className="max-w-[760px] relative -top-px">
                Estruturamos como você se posiciona nos principais canais para você se tornar a opção inevitável no seu mercado. Seremos seus aliados na efetivação da estratégia para consolidar o seu negócio como o número um do seu mercado.
              </p>
              <p className="max-w-[760px] relative -top-px text-white">
                Não entregamos um PDF e sumimos. Nosso trabalho é orientado para construir uma fundação sólida de estratégia de marca com foco em expansão e geração de receita, que permita crescer os principais canais orgânicos da empresa.
              </p>
            </div>
          </div>

          {imageCard()}
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-9 md:gap-12 lg:gap-20 text-left w-full">
          {bullets.map(item => (
            <li key={item.title} className="theone-proof-item max-w-[430px]">
              <strong className="block font-halyard font-medium text-[#FE6942] text-[clamp(1.42rem,5.2vw,1.75rem)] md:text-[26px] leading-none tracking-[-0.01em]">
                {item.title}
              </strong>
              <span className="mt-4 block font-halyard font-light text-[#A8A8A8] text-[clamp(1rem,3.9vw,1.12rem)] md:text-[18px] leading-[1.5]">
                {item.text}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
