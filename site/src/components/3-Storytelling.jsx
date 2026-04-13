import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const STORYTELLING_CONFIG = {
  fontSize: {
    tag: '23px',
    titulo: 'clamp(2rem, 5.5vw, 4.3rem)',
    texto: '27px',
  },
  lineHeight: {
    texto: '1.4',
  },
  spacing: {
    paragrafos: '1em',
  },
};

const TOKEN_STYLES = {
  WHITE: { color: '#FFFFFF', fontWeight: 400 },
  QUESTION: {
    color: '#FFFFFF',
    fontFamily: '"PP Editorial New", serif',
    fontSize: 'clamp(2rem, 3vw, 3rem)',
    fontWeight: 400,
    lineHeight: '1.05',
    letterSpacing: '-0.02em',
  },
};

const STORIES = [
  {
    tag: '02 ⏤ 04',
    title: 'Nós vimos o marketing ruir de dentro pra fora.',
    titleWidth: '750px',
    transitionMode: 'swapParagraphs',
    paragraphs: [
      'Nossa história começou na linha de frente de uma das maiores assessorias de marketing da América Latina. Vimos [WHITE]milhares de clientes sendo atendidos de forma industrial com soluções prontas, como se toda empresa tivesse os mesmos problemas[/WHITE]. Eram negócios visionários despejando fortunas em tráfego pago sem ter o básico resolvido: anunciando o que o concorrente anuncia, com a mesma mensagem, para o mesmo público.',
      'Do outro lado, estúdios de branding entregando conceitos criativos, mas lavando as mãos na hora de fazer isso funcionar na prática. Um olhando só para o longo prazo e o outro, só para o curto prazo. \n\n E no meio desse abismo, [WHITE]empresários com visão de gerar valor e transformação perdendo tempo e dinheiro em soluções que não foram pensadas para resolver seus próprios problemas.[/WHITE]',
    ],
  },
  {
    tag: '03 ⏤ 04',
    title: 'Você pode pagar pra aparecer. \n Mas não pode pagar pra ser escolhido.',
    content: 'Tráfego te coloca na frente do seu cliente, mas se a sua oferta é igual à do concorrente, você pagou pra ser visto e ignorado. Se você gasta rios de dinheiro com mídia paga e se parar de anunciar a qualquer momento pode por sua empresa em risco, você não está escalando, está dependente.\n\n[WHITE]Não adianta só ser visto, você precisa ser visto, lembrado e desejado.[/WHITE]',
  },
  {
    tag: '04 ⏤ 04',
    title: 'Sem se posicionar de forma estratégica, até o melhor negócio vira commodity.',
    content: 'Quando o mercado não consegue enxergar o que te diferencia, ele faz o que sempre faz: te compara pelo preço.\n\nNão importa o quanto você entrega, o quanto você se dedicou ou se seu produto/serviço é superior. Se a percepção não acompanha o valor, você compete de igual pra igual com quem entrega muito menos.\n\nE aí fica a pergunta:\n[QUESTION]Você quer ser só mais um?[/QUESTION]',
  },
];

function parseStyledText(lineText) {
  const parts = [];
  let currentText = '';
  let index = 0;

  while (index < lineText.length) {
    const token = Object.keys(TOKEN_STYLES).find(
      (key) => lineText.substring(index, index + key.length + 2) === `[${key}]`
    );

    if (!token) {
      currentText += lineText[index];
      index += 1;
      continue;
    }

    if (currentText) {
      parts.push({ text: currentText, style: {} });
      currentText = '';
    }

    index += token.length + 2;
    const endIndex = lineText.indexOf(`[/${token}]`, index);

    if (endIndex === -1) {
      break;
    }

    parts.push({
      text: lineText.substring(index, endIndex),
      style: TOKEN_STYLES[token],
    });

    index = endIndex + token.length + 3;
  }

  if (currentText) {
    parts.push({ text: currentText, style: {} });
  }

  return parts;
}

function renderStyledWords(line, keyPrefix, wordClass = '') {
  return parseStyledText(line).flatMap((part, partIndex) =>
    part.text.split(' ').filter(Boolean).map((word, wordIndex) => (
      <span
        key={`${keyPrefix}-${partIndex}-${wordIndex}`}
        className={wordClass ? `${wordClass} inline-block mr-[0.3em]` : 'inline-block mr-[0.3em]'}
        style={part.style}
      >
        {word}
      </span>
    ))
  );
}

function renderCompactLine(line, keyPrefix) {
  return (
    <div
      key={keyPrefix}
      style={{
        minHeight: line.includes('[QUESTION]') ? '1.4em' : undefined,
      }}
    >
      {renderStyledWords(line, keyPrefix, 'story-mobile-copy-word')}
    </div>
  );
}

function renderCompactParagraphs(paragraphs) {
  return paragraphs.map((paragraph, paragraphIndex) => {
    const lines = paragraph.split('\n');

    return (
      <div
        key={paragraphIndex}
        style={{
          marginBottom: paragraphIndex < paragraphs.length - 1 ? STORYTELLING_CONFIG.spacing.paragrafos : 0,
        }}
      >
        {lines.map((line, lineIndex) => renderCompactLine(line, `${paragraphIndex}-${lineIndex}`))}
      </div>
    );
  });
}

function renderCompactTitle(title) {
  return title.split('\n').map((line, lineIndex) => (
    <div key={lineIndex}>
      {renderStyledWords(line, `title-${lineIndex}`, 'story-mobile-title-word')}
    </div>
  ));
}

export default function Storytelling() {
  const containerRef = useRef(null);
  const style = STORYTELLING_CONFIG.fontSize;
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCompactLayout = useMediaQuery('(max-width: 1023px)') || prefersReducedMotion;

  useEffect(() => {
    if (isCompactLayout || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-panel').forEach((panel, panelIndex) => {
        const titleWords = panel.querySelectorAll('.story-title-word');
        const copyWords = panel.querySelectorAll('.story-copy-word');
        const swapFirst = panel.querySelector('.story-swap-first');
        const swapSecond = panel.querySelector('.story-swap-second');
        const swapMode = panel.dataset.transition === 'swapParagraphs';

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            pin: true,
            pinSpacing: true,
            start: panelIndex === 0 ? 'top top' : 'center center',
            end: swapMode ? '+=165%' : '+=130%',
            scrub: 1.5,
          },
        });

        const titleContainer = panel.querySelector('.story-title-container');
        if (titleContainer) {
          tl.fromTo(
            titleContainer,
            { filter: 'blur(8px)' },
            { filter: 'blur(0px)', ease: 'none', duration: 0.65 }
          );
        }

        tl.fromTo(
          titleWords,
          { opacity: 0.05, y: 8 },
          { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.045 } },
          '<'
        );

        const firstCopyWords = swapMode && swapFirst
          ? swapFirst.querySelectorAll('.story-copy-word')
          : copyWords;

        const copyContainer = swapMode ? swapFirst : panel.querySelector('.story-copy-container');
        if (copyContainer) {
          tl.fromTo(
            copyContainer,
            { filter: 'blur(8px)' },
            { filter: 'blur(0px)', ease: 'none', duration: 0.65 },
            0.16
          );
        }

        tl.fromTo(
          firstCopyWords,
          { opacity: 0.05, y: 8 },
          { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.05 } },
          0.16
        );

        if (swapFirst && swapSecond) {
          const secondWords = swapSecond.querySelectorAll('.story-copy-word');
          gsap.set(secondWords, { opacity: 0.05, y: 8 });

          tl.to({}, { duration: 0.3 });
          tl.to(swapFirst, {
            xPercent: -18,
            opacity: 0,
            filter: 'blur(12px)',
            ease: 'none',
            duration: 0.35,
          });
          tl.fromTo(
            swapSecond,
            { xPercent: 18, opacity: 0, filter: 'blur(14px)' },
            {
              xPercent: 0,
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'none',
              duration: 0.4,
            },
            '<'
          );
          tl.fromTo(
            secondWords,
            { opacity: 0.05, y: 8 },
            { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.05 } },
            '<0.08'
          );
          tl.to({}, { duration: 0.28 });
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isCompactLayout, prefersReducedMotion]);

  useEffect(() => {
    if (!isCompactLayout || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-panel-mobile').forEach((panel) => {
        const titleWords = panel.querySelectorAll('.story-mobile-title-word');
        const copyWords = panel.querySelectorAll('.story-mobile-copy-word');

        gsap.set([...titleWords, ...copyWords], { opacity: 0.06 });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            start: 'top 85%',
            end: 'bottom 80%',
            scrub: 1.4,
          },
        });

        if (titleWords.length) {
          tl.to(titleWords, {
            opacity: 1,
            ease: 'none',
            stagger: { each: 0.045 },
          }, 0);
        }

        if (copyWords.length) {
          tl.to(copyWords, {
            opacity: 0.78,
            ease: 'none',
            stagger: { each: 0.022 },
          }, titleWords.length ? 0.28 : 0);
        }
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isCompactLayout, prefersReducedMotion]);

  const renderWords = (text, wordClass = 'rev-word') =>
    text.split('\n').map((line, lineIndex) => (
      <div key={lineIndex}>
        {line.split(' ').filter(Boolean).map((word, index) => (
          <span key={index} className={`${wordClass} inline-block mr-[0.3em]`}>
            {word}
          </span>
        ))}
      </div>
    ));

  const renderWordsWithParagraphs = (text, wordClass = 'story-copy-word') =>
    text.split('\n').map((line, lineIndex, lines) => (
      <div
        key={lineIndex}
        style={{
          marginBottom: lineIndex < lines.length - 1 ? STORYTELLING_CONFIG.spacing.paragrafos : 0,
          minHeight: line.includes('[QUESTION]') ? '1.4em' : undefined,
        }}
      >
        {parseStyledText(line).map((part, partIndex) =>
          part.text.split(' ').filter(Boolean).map((word, wordIndex) => (
            <span
              key={`${partIndex}-${wordIndex}`}
              className={`${wordClass} inline-block mr-[0.3em]`}
              style={part.style}
            >
              {word}
            </span>
          ))
        )}
      </div>
    ));

  const renderDesktopBody = (story) => {
    if (story.transitionMode === 'swapParagraphs') {
      return (
        <div className="relative mt-6 w-full max-w-4xl min-h-[22rem] md:min-h-[18rem]">
          <div className="story-swap-first absolute inset-0 flex items-center justify-center">
            <div
              className="font-halyard font-light text-[#C7C7C7] text-center"
              style={{ fontSize: style.texto, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
            >
              {renderWordsWithParagraphs(story.paragraphs[0])}
            </div>
          </div>
          <div className="story-swap-second absolute inset-0 flex items-center justify-center opacity-0">
            <div
              className="font-halyard font-light text-[#C7C7C7] text-center"
              style={{ fontSize: style.texto, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
            >
              {renderWordsWithParagraphs(story.paragraphs[1])}
            </div>
          </div>
        </div>
      );
    }

    return (
      <p
        className="story-copy-container font-halyard font-light text-[#C7C7C7] max-w-4xl mt-6"
        style={{ fontSize: style.texto, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
      >
        {renderWordsWithParagraphs(story.content)}
      </p>
    );
  };

  const renderCompactBody = (story) => {
    const paragraphs = story.transitionMode === 'swapParagraphs'
      ? story.paragraphs
      : story.content.split('\n').filter(Boolean);

    return (
      <div
        className="story-mobile-body mt-6 max-w-4xl font-halyard font-light text-[#C7C7C7]"
        style={{ fontSize: 'clamp(1.35rem, 5.2vw, 1.65rem)', lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
      >
        {renderCompactParagraphs(paragraphs)}
      </div>
    );
  };

  return (
    <div ref={containerRef} className="relative border-b border-white/5" style={{ background: 'linear-gradient(to bottom, #010000 0%, #212121 8%)' }}>
      {STORIES.map((story, index) => (
        <div
          key={story.tag}
          className={`${isCompactLayout ? 'story-panel-mobile relative flex flex-col items-center justify-center px-6 py-24' : `story-panel min-h-[100svh] relative flex flex-col items-center px-6 overflow-hidden ${index === 0 ? 'justify-start' : 'justify-center'}`}`}
          data-transition={isCompactLayout ? undefined : story.transitionMode}
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,82,36,0.06)_0%,transparent_60%)] pointer-events-none z-0" />
          <div
            className={`relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8 ${index === 0 ? 'pt-14 pb-16' : 'py-16'}`}
          >
            <span className="text-[#FE6942] font-halyard tracking-widest uppercase" style={{ fontSize: style.tag }}>
              {story.tag}
            </span>
            <h2
              className={`story-title-container font-editorial font-normal leading-[1.1] text-white ${isCompactLayout ? 'story-mobile-title' : ''}`}
              style={{ fontSize: style.titulo, maxWidth: story.titleWidth }}
            >
              {isCompactLayout ? renderCompactTitle(story.title) : renderWords(story.title, 'story-title-word')}
            </h2>
            {isCompactLayout ? renderCompactBody(story) : renderDesktopBody(story)}
          </div>
        </div>
      ))}
    </div>
  );
}
