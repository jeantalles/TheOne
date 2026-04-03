import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function TheOneConclusion() {
  const containerRef = useRef(null);

  const style = {
    titulo: "clamp(2.5rem, 4vw, 3.5rem)",
    texto: "24px",
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
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="a-theone" ref={containerRef} className="bg-[#212121] text-white relative py-24 md:py-32 px-4 border-b border-white/5 overflow-hidden">
      <div className="w-[90%] md:w-[94%] max-w-[1600px] mx-auto flex flex-col md:flex-row items-center gap-10 md:gap-14 relative z-10">

        {/* Esquerda: Proposta de Valor TheOne */}
        <div className="sol-left w-full md:w-[55%] flex flex-col items-start text-left gap-8">
          <h2 className="font-editorial font-normal leading-[1.05] text-white" style={{ fontSize: style.titulo }}>
            Dessa inconformidade <br />
            nasceu a <span className="italic text-[#FE6942]">TheOne</span>.
          </h2>

          <div className="flex flex-col gap-6 font-halyard font-light text-[#C7C7C7] max-w-2xl" style={{ fontSize: style.texto, lineHeight: style.alturaLinhaTexto }}>
            <p>
              Vimos de perto o que acontece quando marketing vira linha de produção, e nos recusamos a ser mais um desse modelo. A TheOne é uma assessoria de marca que nasceu para construir marcas TheOne, a escolha inevitável na mente de seus clientes.
            </p>
            <p>
              Não entregamos um PDF e sumimos. Estruturamos a narrativa, o posicionamento e a presença da sua marca em todos os principais pontos de contato, e seremos seus aliados na efetivação do seu posicionamento.
            </p>
            <p>
              São mais de 8 anos construindo marcas que lideram, com profissionais formados nas maiores operações de marketing e comunicação do Brasil. E tudo isso aplicado de forma personalizada — porque nenhum negócio com ambição cabe numa solução industrializada. Não atendemos centenas de clientes, nós selecionamos empresas que têm visão de crescimento, ambição de escala e propósito de gerar transformação para nos tornarmos aliados.
            </p>
          </div>
        </div>

        {/* Direita: Foto / Imagem Representativa */}
        <div className="sol-right w-full md:w-[45%] relative h-[500px] md:h-[650px] rounded-[32.7px] overflow-hidden border border-[#5B5B5B] bg-[#141414] shadow-2xl flex items-center justify-center group cursor-pointer">
          {/* Glow / Efeito de Luz Interno (Reforça o estilo Apple/Premium) */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,105,66,0.1)_0%,transparent_60%)] mix-blend-screen z-10 transition-opacity duration-700 group-hover:opacity-100 opacity-50"></div>

          {/* Imagem Placeholder Premium */}
          <img
            src="/theone-hand.jpg"
            alt="The One #1 Hand"
            className="w-full h-full object-cover opacity-90 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
          />


        </div>

      </div>
    </section>
  );
}
