import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ============================================
// CONFIGURAÇÃO DE FONTES - SEÇÃO STORYTELLING
// ============================================
const STORYTELLING_CONFIG = {
  fontSize: {
    tag: "23px",        // Tamanho do rótulo (ex: "Cenário 01")
    titulo: "clamp(3.8rem, 4vw, 4.3rem)",  // Tamanho do título (responsivo)
    texto: "27px",      // Tamanho do texto descritivo
  },
  lineHeight: {
    texto: "1.4",       // Altura da linha do texto descritivo
  },
  spacing: {
    paragrafos: "1.0em",  // Espaçamento entre parágrafos
  }
};
// ============================================

export default function ScrollStorytelling() {
  const containerRef = useRef(null);
  const style = STORYTELLING_CONFIG.fontSize;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-panel').forEach((panel) => {
        const words = panel.querySelectorAll('.rev-word');
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            pin: true,
            pinSpacing: true,
            start: 'center center',
            end: '+=130%',
            scrub: 1.5,
          }
        });
        tl.fromTo(words,
          { opacity: 0.05, filter: 'blur(10px)', y: 8 },
          {
            opacity: 1,
            filter: 'blur(0px)',
            y: 0,
            ease: 'none',
            stagger: { each: 0.05 },
          }
        );
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const stories = [
    {
      tag: '01 ⏤ 04',
      title: 'O mercado tá ficando cada vez mais competitivo... e parecido.',
      content: 'Ter um bom produto, rodar anúncio e produzir conteúdo está cada vez mais acessível. Hoje qualquer empresa faz isso.[WHITE]O problema é que quando todo mundo faz a mesma coisa e se vende do mesmo jeito, ninguém se destaca. [/WHITE] \n Num ambiente assim, só se torna a escolha do cliente quem constrói um posicionamento único, relevante e memorável. Quem não constrói, compete de igual para igual.',
    },
    {
      tag: '02 ⏤ 04',
      title: 'Nós vimos o marketing ruir de dentro pra fora.',
      titleWidth: '750px',
      content: 'Nossa história começou na linha de frente da maior operação de marketing do Brasil,[WHITE]milhares de clientes sendo atendidos de forma industrial com a mesma solução,[/WHITE]como se toda empresa tivesse os mesmos problemas. O que mais vimos foram negócios visionários despejando fortunas em tráfego pago sem ter o básico resolvido. Anunciando a mesma coisa que os concorrentes, com a mesma mensagem, para o mesmo público. \n Do outro lado, estúdios de branding entregando conceitos criativos, mas lavando as mãos na hora de fazer isso funcionar na prática. Um olhava só para o curto prazo. O outro, só para o longo. E no meio desse abismo, empresários com visão de gerar valor e transformação perdendo tempo e dinheiro numa solução que nunca foi feita pra eles.'
    },
    {
      tag: '03 ⏤ 04',
      title: 'Você pode pagar pra aparecer. \n Mas não pode pagar pra ser escolhido.',
      content: 'Tráfego te coloca na frente do seu cliente, mas se o que você comunica é igual ao que o concorrente comunica, você pagou para ser visto e ignorado. Se você parar de anunciar, sua marca some. Não há memória, não há preferência, não há escolha. A empresa existe enquanto anuncia — e precisa anunciar cada vez mais para continuar existindo. Isso não é escala, é dependência.'
    },
    {
      tag: '04 ⏤ 04',
      title: 'Sem se posicionar de forma estratégica, até o melhor negócio vira commodity.',
      content: 'Quando o mercado não consegue enxergar o que te diferencia, ele faz o que sempre faz: te compara pelo preço. Não importa o quanto você entrega, o quanto você se dedicou, o quanto o seu produto ou serviço é superior. Se a percepção não acompanha o valor, você compete de igual pra igual com quem entrega muito menos. E aí fica a pergunta:[WHITE]você quer continuar sendo mais um no mercado?[/WHITE]'
    }
  ];

  const renderWords = (text) =>
    text.split('\n').map((line, lineIdx) => (
      <div key={lineIdx}>
        {line.split(' ').map((word, i) => (
          <span
            key={i}
            className="rev-word inline-block mr-[0.3em]"
            style={{ willChange: 'filter, opacity, transform' }}
          >
            {word}
          </span>
        ))}
      </div>
    ));

  const renderWordsWithParagraphs = (text) => {
    const parseStyledText = (lineText) => {
      const parts = [];
      let currentText = '';
      let i = 0;

      while (i < lineText.length) {
        if (lineText.substring(i, i + 7) === '[WHITE]') {
          if (currentText) parts.push({ text: currentText, style: {} });
          currentText = '';
          i += 7;
          let endIdx = lineText.indexOf('[/WHITE]', i);
          if (endIdx !== -1) {
            parts.push({ text: lineText.substring(i, endIdx), style: { color: '#FFFFFF', fontWeight: '400' } });
            i = endIdx + 8;
          }
        } else {
          currentText += lineText[i];
          i++;
        }
      }
      if (currentText) parts.push({ text: currentText, style: {} });
      return parts;
    };

    return text.split('\n').map((line, lineIdx) => (
      <div key={lineIdx} style={{ marginBottom: lineIdx < text.split('\n').length - 1 ? STORYTELLING_CONFIG.spacing.paragrafos : 0 }}>
        {parseStyledText(line).map((part, partIdx) => (
          part.text.split(' ').map((word, wordIdx) => (
            <span
              key={`${partIdx}-${wordIdx}`}
              className="rev-word inline-block mr-[0.3em]"
              style={{ willChange: 'filter, opacity, transform', ...part.style }}
            >
              {word}
            </span>
          ))
        ))}
      </div>
    ));
  };

  return (
    <div id="o-problema" ref={containerRef} className="bg-[#212121] relative border-b border-white/5">
      {stories.map((story, i) => (
        <div
          key={i}
          className="story-panel min-h-[100svh] relative flex flex-col items-center justify-center px-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-[#212121] -z-10" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,82,36,0.06)_0%,transparent_60%)] pointer-events-none -z-10" />
          <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8 py-16">
            <span className="text-[#FE6942] font-halyard tracking-widest uppercase" style={{ fontSize: style.tag }}>
              {story.tag}
            </span>
            <h2
              className="font-editorial font-normal leading-[1.1] text-white"
              style={{ fontSize: style.titulo, maxWidth: story.titleWidth }}
            >
              {renderWords(story.title)}
            </h2>
            <p
              className="font-halyard font-light text-[#C7C7C7] max-w-3xl mt-6"
              style={{ fontSize: style.texto, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
            >
              {renderWordsWithParagraphs(story.content)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
