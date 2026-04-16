import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const STORYTELLING_CONFIG = {
  fontSize: {
    tag: '23px',
    titulo: 'clamp(1.8rem, 5vw, 3.8rem)',
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
    fontSize: 'clamp(1.7rem, 2.5vw, 2.6rem)',
    fontWeight: 400,
    lineHeight: '1.05',
    letterSpacing: '-0.02em',
  },
};

const PANEL_03 = {
  tag: '03 ⏤ 04',
  title: 'O problema é que o marketing tradicional não foi feito para negócios visionários.',
  titleWidth: '820px',
  content: 'Nossa história começou na linha de frente de uma das maiores assessorias de marketing da América Latina. Vimos empresas despejando rios de dinheiro em uma solução industrializada que prometia resultado, mas não resolviam os problemas de cada negócio. [WHITE]Nós vimos o marketing ruir de dentro pra fora.[/WHITE]\n\nDo outro lado, vemos agências de branding entregando conceitos poéticos, mas abandonando o cliente na execução. Um focando só na performance, e o outro só no branding.\n\nE no meio desse abismo ficam empresas como a sua, com potencial e produto valioso, investindo e sem atingir a visão que buscam.',
};

const PANEL_04 = {
  tag: '04 ⏤ 04',
  title: 'Você pode pagar para aparecer. Mas não pode pagar para ser escolhido.',
  titleWidth: '920px',
  titleSizeDesktop: 'clamp(1.4rem, 3.5vw, 2.5rem)',
  titleSizeMobile: 'clamp(1.2rem, 4.5vw, 2.2rem)',
  textSizeDesktop: '23px',
  textSizeMobile: 'clamp(1.25rem, 4.8vw, 1.5rem)',
  content: 'O tráfego te coloca na frente do cliente, mas se a sua oferta parece igual à do concorrente, você pagou pra ser visto e ignorado. E se parar de anunciar a qualquer momento pode pôr sua empresa em risco, você não está escalando, está dependente.\n\n[WHITE]Ser visto não é suficiente. Você precisa ser lembrado. E desejado.[/WHITE]\n\nE quando o mercado não enxerga o que te diferencia, ele faz o de sempre, te compara pelo preço. Não importa o quanto seu produto é superior. Sem um posicionamento inevitável, você compete de igual para igual com quem entrega menos.\n\n[QUESTION]E aí fica a pergunta: Você quer ser só mais um?[/QUESTION]',
};

const STORIES = {
  empresario: [
    {
      tag: '02 ⏤ 04',
      title: 'Sabemos que você quer construir um legado.',
      titleWidth: '700px',
      content: 'Você é ambicioso, tem visão, mas sente que seu negócio vale mais do que o mercado valoriza. As pessoas ao redor não entendem por que você não se acomoda, não aceita entregar o básico e [WHITE]sempre está buscando elevar o nível do seu negócio.[/WHITE]\n\nVocê não quer apenas bater metas no fim do mês, você quer gerar riqueza, transformação, ditar as regras do seu mercado e ser a referência número um. [WHITE]Afinal, você é um visionário.[/WHITE]',
    },
    PANEL_03,
    PANEL_04,
  ],
  gestor: [
    {
      tag: '02 ⏤ 04',
      title: 'Você sabe o que precisa mudar pra atingir a visão da empresa que atua.',
      titleWidth: '820px',
      content: 'Você está à frente de uma empresa com produto bom e visão de crescimento, [WHITE]mas sem uma marca bem estruturada.[/WHITE] Quando olha pra comunicação, sente que o mercado não enxerga o valor que a empresa entrega e que cada área tem uma visão diferente da marca, porque o posicionamento não está claro pra ninguém.\n\nO tráfego pago está ficando cada vez mais caro e não podem depender disso. Você não pode só entregar resultado no fim do mês. Você quer construir uma marca que seja a escolha número um e que faça a empresa ser a referência no mercado em que atua.',
    },
    PANEL_03,
    PANEL_04,
  ],
};

// 350vh per panel — all panels share ONE pin, so total = N × 350
// More vh = slower, more deliberate scroll pace per panel.
const VH_PER_PANEL = 350;

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
  return renderStyledWords(title.replace(/\n/g, ' '), 'title', 'story-mobile-title-word');
}

export default function Storytelling() {
  const containerRef = useRef(null);
  const style = STORYTELLING_CONFIG.fontSize;
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCompactLayout = useMediaQuery('(max-width: 1023px)') || prefersReducedMotion;
  const stories = STORIES['empresario'];

  // ─── Desktop: SINGLE PIN wrapping all panels ──────────────────────────────
  // The canonical GSAP pattern for multi-panel scroll storytelling.
  // One ScrollTrigger creates one pin spacer for the whole section,
  // avoiding the cascade-of-pin-spacers bug caused by per-panel pins.
  // Panels are stacked absolutely inside the pinned container;
  // the master timeline fades them in/out sequentially.
  useEffect(() => {
    if (isCompactLayout || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.story-panel', containerRef.current);
      if (!panels.length) return;

      // Start with all panels hidden except the first
      gsap.set(panels, { autoAlpha: 0 });
      gsap.set(panels[0], { autoAlpha: 1 });

      // Master timeline – linked to ONE ScrollTrigger on the whole container
      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: `+=${stories.length * VH_PER_PANEL}vh`,
          scrub: 1.5,
          invalidateOnRefresh: true,
        },
      });

      panels.forEach((panel, panelIndex) => {
        const story = stories[panelIndex];
        const titleWords = panel.querySelectorAll('.story-title-word');
        const copyWords  = panel.querySelectorAll('.story-copy-word');
        const swapFirst  = panel.querySelector('.story-swap-first');
        const swapSecond = panel.querySelector('.story-swap-second');
        const swapMode   = panel.dataset.transition === 'swapParagraphs';
        const titleContainer = panel.querySelector('.story-title-container');
        const copyContainer  = panel.querySelector('.story-copy-container');

        // Add a label at the start of this panel's section in the timeline
        const label = `panel${panelIndex}`;
        masterTl.addLabel(label);

        // Blur-clear the title block
        if (titleContainer) {
          masterTl.fromTo(
            titleContainer,
            { filter: 'blur(8px)' },
            { filter: 'blur(0px)', ease: 'none', duration: 0.65 },
            label
          );
        }

        // Fade / lift title words in
        masterTl.fromTo(
          titleWords,
          { opacity: 0.05, y: 8 },
          { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.045 } },
          `${label}` // same time as title container
        );

        // Blur-clear the copy block, slightly after title starts
        const firstCopyWords = swapMode && swapFirst
          ? swapFirst.querySelectorAll('.story-copy-word')
          : copyWords;

        const copyEl = swapMode ? swapFirst : copyContainer;
        if (copyEl) {
          masterTl.fromTo(
            copyEl,
            { filter: 'blur(8px)' },
            { filter: 'blur(0px)', ease: 'none', duration: 0.65 },
            `${label}+=0.16`
          );
        }

        // Fade / lift copy words in
        masterTl.fromTo(
          firstCopyWords,
          { opacity: 0.05, y: 8 },
          { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.05 } },
          `${label}+=0.16`
        );

        // Swap-paragraph mode: cross-fade two copies within this panel
        if (swapFirst && swapSecond) {
          const secondWords = swapSecond.querySelectorAll('.story-copy-word');
          gsap.set(secondWords, { opacity: 0.05, y: 8 });

          masterTl.to({}, { duration: 0.3 });
          masterTl.to(swapFirst, {
            xPercent: -18,
            opacity: 0,
            filter: 'blur(12px)',
            ease: 'none',
            duration: 0.35,
          });
          masterTl.fromTo(
            swapSecond,
            { xPercent: 18, opacity: 0, filter: 'blur(14px)' },
            { xPercent: 0, opacity: 1, filter: 'blur(0px)', ease: 'none', duration: 0.4 },
            '<'
          );
          masterTl.fromTo(
            secondWords,
            { opacity: 0.05, y: 8 },
            { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.05 } },
            '<0.08'
          );
          masterTl.to({}, { duration: 0.28 });
        }

        // Hold so the reader has time with fully-revealed content
        masterTl.to({}, { duration: 0.4 });

        // Cross-fade to the next panel (skip for the last one)
        if (panelIndex < panels.length - 1) {
          masterTl.to(panel, {
            autoAlpha: 0,
            filter: 'blur(10px)',
            ease: 'none',
            duration: 0.25,
          });
          // Instantly make the next panel visible
          masterTl.set(panels[panelIndex + 1], { autoAlpha: 1, filter: 'blur(0px)' }, '<0.1');
        }
      });
    }, containerRef);

    // Two rAF frames guarantee the browser has fully laid out the new
    // content (including any pin spacer from StorytellingIntro) before
    // we ask ScrollTrigger to recalculate all positions.
    let raf1;
    let raf2;
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    });

    return () => {
      cancelAnimationFrame(raf1);
      cancelAnimationFrame(raf2);
      ctx.revert();
    };
  }, [isCompactLayout, prefersReducedMotion]);

  // ─── Mobile: simple per-panel scroll reveal (no pin) ──────────────────────
  useEffect(() => {
    if (!isCompactLayout || prefersReducedMotion) {
      return undefined;
    }

    const ctx = gsap.context(() => {
      gsap.utils.toArray('.story-panel-mobile', containerRef.current).forEach((panel) => {
        const titleWords = panel.querySelectorAll('.story-mobile-title-word');
        const copyWords  = panel.querySelectorAll('.story-mobile-copy-word');

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



  // ─── Render helpers ────────────────────────────────────────────────────────

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
    const fontSize = story.textSizeDesktop || style.texto;

    if (story.transitionMode === 'swapParagraphs') {
      return (
        <div className="relative mt-6 w-full max-w-4xl min-h-[22rem] md:min-h-[18rem]">
          <div className="story-swap-first absolute inset-0 flex items-center justify-center">
            <div
              className="font-halyard font-light text-[#C7C7C7] text-center"
              style={{ fontSize, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
            >
              {renderWordsWithParagraphs(story.paragraphs[0])}
            </div>
          </div>
          <div className="story-swap-second absolute inset-0 flex items-center justify-center opacity-0">
            <div
              className="font-halyard font-light text-[#C7C7C7] text-center"
              style={{ fontSize, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
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
        style={{ fontSize, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
      >
        {renderWordsWithParagraphs(story.content)}
      </p>
    );
  };

  const renderCompactBody = (story) => {
    const fontSize = story.textSizeMobile || 'clamp(1.35rem, 5.2vw, 1.65rem)';
    const paragraphs = story.transitionMode === 'swapParagraphs'
      ? story.paragraphs
      : story.content.split('\n').filter(Boolean);

    return (
      <div
        className="story-mobile-body mt-6 max-w-4xl font-halyard font-light text-[#C7C7C7]"
        style={{ fontSize, lineHeight: STORYTELLING_CONFIG.lineHeight.texto }}
      >
        {renderCompactParagraphs(paragraphs)}
      </div>
    );
  };

  // ─── JSX ──────────────────────────────────────────────────────────────────
  //
  // DESKTOP: The containerRef is the single pinned element.
  //   - height="100svh" so it exactly fills the viewport when pinned.
  //   - Panels are stacked via "position:absolute; inset:0".
  //   - GSAP handles visibility; only one panel is autoAlpha:1 at a time.
  //
  // MOBILE: Panels flow vertically; no pinning; simple scroll reveal.

  if (isCompactLayout) {
    return (
      <div
        ref={containerRef}
        className="relative"
        style={{ background: 'linear-gradient(to bottom, #010000 0%, #212121 100%)' }}
      >
        {stories.map((story) => (
          <div
            key={story.tag}
            className="story-panel-mobile relative flex flex-col items-center justify-center px-6 py-24"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,82,36,0.06)_0%,transparent_60%)] pointer-events-none z-0" />
            <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8 py-16">
              <span className="text-[#FE6942] font-halyard tracking-widest uppercase" style={{ fontSize: style.tag }}>
                {story.tag}
              </span>
              <h2
                className="story-title-container font-editorial font-normal leading-[1.1] text-white story-mobile-title"
                style={{ fontSize: story.titleSizeMobile || 'clamp(1.4rem, 5vw, 3.8rem)', maxWidth: story.titleWidth }}
              >
                {renderCompactTitle(story.title)}
              </h2>
              {renderCompactBody(story)}
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="relative overflow-hidden"
      style={{
        height: '100svh',
        background: 'linear-gradient(to bottom, #010000 0%, #212121 100%)',
      }}
    >
      {/* Shared radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,82,36,0.06)_0%,transparent_60%)] pointer-events-none z-0" />

      {/* Story panels – stacked absolutely, one visible at a time */}
      {stories.map((story) => (
        <div
          key={story.tag}
          className="story-panel absolute inset-0 flex flex-col items-center justify-center px-6 overflow-hidden"
          data-transition={story.transitionMode}
        >
          <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8 py-16">
            <span className="text-[#FE6942] font-halyard tracking-widest uppercase" style={{ fontSize: style.tag }}>
              {story.tag}
            </span>
            <h2
              className="story-title-container font-editorial font-normal leading-[1.1] text-white"
              style={{
                fontSize: story.titleSizeDesktop || style.titulo,
                maxWidth: story.titleWidth,
              }}
            >
              {renderWords(story.title, 'story-title-word')}
            </h2>
            {renderDesktopBody(story)}
          </div>
        </div>
      ))}
    </div>
  );
}
