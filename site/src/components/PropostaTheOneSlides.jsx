import { useEffect, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroSection from './1-Hero';
import StorytellingSection from './3-Storytelling';

export function AberturaTheOne({ scrollerRef }) {
  const [scroller, setScroller] = useState(null);

  useEffect(() => {
    if (scrollerRef?.current) setScroller(scrollerRef.current);
  }, [scrollerRef]);

  useEffect(() => {
    if (!scroller) return;
    const id = setTimeout(() => ScrollTrigger.refresh(), 860);
    return () => clearTimeout(id);
  }, [scroller]);

  return scroller && <HeroSection disableNavEvents showTopLogo scroller={scroller} hideFinalScrollHint />;
}

export function NarrativaTheOne({ panelIndex, persona = 'empresario' }) {
  return <StorytellingSection persona={persona} panelIndex={panelIndex} staticMode />;
}

export function ContextoDeMercado() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#352B27] px-6 md:px-12 lg:px-16 py-8 flex items-center justify-center">
      <div className="absolute inset-0 opacity-70 pointer-events-none" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(254,105,66,.12), transparent 52%)' }} />
      <div className="relative max-w-5xl mx-auto text-center flex flex-col items-center gap-5 py-8">
        <span className="text-[#FE6942] font-halyard tracking-widest uppercase text-[23px]">
          01 ⏤ 04
        </span>
        <h2 className="font-editorial font-normal text-[clamp(2.2rem,4.35vw,3.8rem)] leading-[1.1] tracking-tight max-w-[920px]">
          <span className="text-[#FE6942]">Você não pode se vender<br />da mesma forma</span>{' '}
          <span className="text-white">que o restante do seu mercado.</span>
        </h2>

        <div className="font-halyard font-light text-[#C7C7C7] text-[clamp(1.1rem,1.65vw,1.45rem)] leading-[1.42] space-y-5 max-w-[44rem] mx-auto">
          <p>
            Ter um bom produto, rodar anúncio e produzir conteúdo não é mais um diferencial. O mercado está ficando cada vez mais competitivo e parecido.
          </p>
          <p>
            <strong className="font-semibold text-white">A maioria das empresas se posiciona na mesma prateleira que seus concorrentes</strong>, com ofertas parecidas. Se a embalagem de todos na prateleira for igual, os clientes vão escolher pelo quê? <strong className="font-semibold text-white">Preço.</strong>
          </p>
          <p>
            E o pior: você pode até ser foda no que faz, referência pra quem já te conhece, e <strong className="font-semibold text-white">mesmo assim continuar invisível pro resto do mercado.</strong>
          </p>
        </div>
      </div>
    </section>
  );
}

export function ExistimosTheOne() {
  const bullets = [
    { title: '+8 Anos', text: 'Construindo marcas que lideram, com especialistas formados nas maiores operações de marketing e comunicação do Brasil.' },
    { title: 'Projetos Personalizados', text: 'Nenhum negócio com ambição cabe numa solução industrializada.' },
    { title: 'Projetos Selecionados', text: 'Não atuamos com centenas, nem dezenas de clientes. Selecionamos empresas que têm visão de crescimento e propósito de gerar transformação.' },
  ];

  return (
    <section className="bg-[#212121] text-white min-h-[100svh] px-6 md:px-12 lg:px-16 py-10 md:py-14 flex flex-col justify-center">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-10 md:gap-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_460px] gap-10 lg:gap-16 items-start">
          <div className="flex flex-col gap-6">
            <h2 className="font-editorial font-normal text-white text-[clamp(2.2rem,3.8vw,3.8rem)] leading-[1.06] tracking-tight">
              Existimos para construir marcas TheOne,{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]">a escolha número um.</span>
            </h2>
            <p className="font-halyard font-light text-[#C7C7C7] text-[18px] md:text-[20px] leading-[1.45] max-w-[680px]">
              Vimos o que acontece quando marketing vira linha de produção e nos recusamos a ser mais um desse modelo.
            </p>
            <p className="font-halyard font-light text-[#C7C7C7] text-[18px] md:text-[20px] leading-[1.45] max-w-[680px]">
              Estruturamos como você se posiciona nos principais canais para se tornar a opção inevitável no seu mercado. Seremos seus aliados na efetivação da estratégia para consolidar o seu negócio como o número um.
            </p>
            <p className="font-halyard font-light text-white text-[18px] md:text-[20px] leading-[1.45] max-w-[680px]">
              Não entregamos um PDF e sumimos. Nosso trabalho é orientado para construir uma fundação sólida de estratégia de marca com foco em expansão e geração de receita.
            </p>
          </div>
          <div className="hidden lg:block">
            <div className="relative rounded-[24px] overflow-hidden border border-[#5B5B5B]" style={{ height: 'clamp(300px, 38vh, 460px)' }}>
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(254,105,66,0.12)_0%,transparent_60%)] z-10" />
              <img src="/theone-hand.jpg" alt="TheOne" className="w-full h-full object-cover opacity-90" />
            </div>
          </div>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {bullets.map(item => (
            <li key={item.title}>
              <strong className="block font-halyard font-medium text-[#FE6942] text-[1.4rem] md:text-[1.65rem] leading-none mb-3">{item.title}</strong>
              <span className="block font-halyard font-light text-[#A8A8A8] text-[16px] md:text-[17px] leading-[1.5]">{item.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

