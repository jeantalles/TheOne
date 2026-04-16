import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

// Match the Hero exit window so the intro's top edge is already aligned to the
// viewport when the closing circle starts revealing the next section.
const STORYTELLING_INTRO_OVERLAP = '102svh';

const STORY = {
  tag: '01 ⏤ 04',
  title: 'Você não pode se vender da mesma forma que o restante do seu mercado',
  content: 'Ter um bom produto, rodar anúncio, e produzir conteúdo não é mais um diferencial. O mercado tá ficando cada vez mais competitivo e parecido.\nNum ambiente assim, só se torna a escolha número um quem constrói um posicionamento impossível de ser ignorado.',
};

const TOKEN_STYLES = {
  EMPHASIS: { color: '#000000', fontWeight: 500 },
};

const FONT_CONFIG = {
  tag: '23px',
  titulo: 'clamp(1.8rem, 5vw, 3.8rem)',
  texto: '27px',
  textLineHeight: '1.4',
  paragraphSpacing: '1em',
};

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

    if (endIndex === -1) break;

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

export default function StorytellingIntro() {
  const containerRef = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const isCompactLayout = useMediaQuery('(max-width: 1023px)') || prefersReducedMotion;

  // Desktop pin animation
  useEffect(() => {
    if (isCompactLayout || prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const panel = containerRef.current;
      if (!panel) return;

      const titleWords = panel.querySelectorAll('.si-title-word');
      const copyWords = panel.querySelectorAll('.si-copy-word');

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          pin: true,
          pinSpacing: true,
          start: 'top top',
          end: '+=110%',
          scrub: 1.5,
        },
      });

      const titleContainer = panel.querySelector('.si-title-container');
      if (titleContainer) {
        tl.fromTo(
          titleContainer,
          { filter: 'blur(8px)' },
          { filter: 'blur(0px)', ease: 'none', duration: 0.65 }
        );
      }

      tl.fromTo(
        titleWords,
        { opacity: 0.08, y: 8 },
        { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.045 } },
        '<'
      );

      const copyContainer = panel.querySelector('.si-copy-container');
      if (copyContainer) {
        tl.fromTo(
          copyContainer,
          { filter: 'blur(8px)' },
          { filter: 'blur(0px)', ease: 'none', duration: 0.65 },
          0.16
        );
      }

      tl.fromTo(
        copyWords,
        { opacity: 0.08, y: 8 },
        { opacity: 1, y: 0, ease: 'none', stagger: { each: 0.05 } },
        0.16
      );
    }, containerRef);

    return () => ctx.revert();
  }, [isCompactLayout, prefersReducedMotion]);

  // Mobile scroll-reveal animation
  useEffect(() => {
    if (!isCompactLayout || prefersReducedMotion) return undefined;

    const ctx = gsap.context(() => {
      const panel = containerRef.current?.querySelector('.si-panel-mobile');
      if (!panel) return;

      const titleWords = panel.querySelectorAll('.si-mobile-title-word');
      const copyWords = panel.querySelectorAll('.si-mobile-copy-word');

      gsap.set([...titleWords, ...copyWords], { opacity: 0.08 });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: panel,
          start: 'top 85%',
          end: 'bottom 80%',
          scrub: 1.4,
        },
      });

      if (titleWords.length) {
        tl.to(titleWords, { opacity: 1, ease: 'none', stagger: { each: 0.045 } }, 0);
      }

      if (copyWords.length) {
        tl.to(copyWords, { opacity: 1, ease: 'none', stagger: { each: 0.022 } }, 0.28);
      }
    }, containerRef);

    return () => ctx.revert();
  }, [isCompactLayout, prefersReducedMotion]);

  const renderWords = (text, wordClass) =>
    text.split('\n').map((line, lineIndex) => (
      <div key={lineIndex}>
        {line.split(' ').filter(Boolean).map((word, index) => (
          <span key={index} className={`${wordClass} inline-block mr-[0.3em]`}>
            {word}
          </span>
        ))}
      </div>
    ));

  const renderWordsWithParagraphs = (text, wordClass) =>
    text.split('\n').map((line, lineIndex, lines) => (
      <div
        key={lineIndex}
        style={{
          marginBottom: lineIndex < lines.length - 1 ? FONT_CONFIG.paragraphSpacing : 0,
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

  const renderMobileTitle = () =>
    STORY.title.split('\n').map((line, lineIndex) => (
      <div key={lineIndex}>
        {renderStyledWords(line, `title-${lineIndex}`, 'si-mobile-title-word')}
      </div>
    ));

  const renderMobileBody = () => {
    const lines = STORY.content.split('\n');
    return (
      <div
        className="si-panel-mobile-body mt-6 max-w-4xl font-halyard font-light"
        style={{
          fontSize: 'clamp(1.35rem, 5.2vw, 1.65rem)',
          lineHeight: FONT_CONFIG.textLineHeight,
          color: '#000000',
        }}
      >
        {lines.map((line, lineIndex) => (
          <div
            key={lineIndex}
            style={{ marginBottom: lineIndex < lines.length - 1 ? FONT_CONFIG.paragraphSpacing : 0 }}
          >
            {renderStyledWords(line, `body-${lineIndex}`, 'si-mobile-copy-word')}
          </div>
        ))}
      </div>
    );
  };

  if (isCompactLayout) {
    return (
      <div
        id="o-problema"
        ref={containerRef}
        data-navbar-theme="light"
        className="si-panel-mobile relative flex flex-col items-center justify-center px-6 py-24"
        style={{ backgroundColor: '#F5F0EB' }}
      >
        <div className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8 py-16">
          <span
            className="text-[#FE6942] font-halyard tracking-widest uppercase"
            style={{ fontSize: FONT_CONFIG.tag }}
          >
            {STORY.tag}
          </span>
          <h2
            className="font-editorial font-normal leading-[1.1]"
            style={{ fontSize: FONT_CONFIG.titulo, color: '#000000' }}
          >
            {renderMobileTitle()}
          </h2>
          {renderMobileBody()}
        </div>
      </div>
    );
  }

  return (
    <div
      id="o-problema"
      ref={containerRef}
      data-navbar-theme="light"
      className="min-h-[100svh] relative flex flex-col items-center justify-start px-6 overflow-hidden"
      style={{
        backgroundColor: 'transparent',
        marginTop: `calc(-1 * ${STORYTELLING_INTRO_OVERLAP})`,
        zIndex: 0,
      }}
    >
      <div
        className="absolute left-0 right-0 pointer-events-none z-0"
        style={{
          top: `calc(-1 * ${STORYTELLING_INTRO_OVERLAP})`,
          height: `calc(100% + ${STORYTELLING_INTRO_OVERLAP})`,
          backgroundColor: '#F5F0EB',
        }}
      />
      <div
        className="absolute left-0 right-0 pointer-events-none z-0"
        style={{
          top: `calc(-1 * ${STORYTELLING_INTRO_OVERLAP})`,
          height: `calc(100% + ${STORYTELLING_INTRO_OVERLAP})`,
          background: 'radial-gradient(circle at center, rgba(255,82,36,0.04) 0%, transparent 60%)',
        }}
      />
      <div
        className="relative z-10 max-w-5xl w-full text-center flex flex-col items-center gap-8 py-16"
        style={{ paddingTop: 'clamp(6rem, 18vh, 11rem)' }}
      >
        <span
          className="text-[#FE6942] font-halyard tracking-widest uppercase"
          style={{ fontSize: FONT_CONFIG.tag }}
        >
          {STORY.tag}
        </span>
        <h2
          className="si-title-container font-editorial font-normal leading-[1.1]"
          style={{ fontSize: FONT_CONFIG.titulo, color: '#000000' }}
        >
          {renderWords(STORY.title, 'si-title-word')}
        </h2>
        <p
          className="si-copy-container font-halyard font-light max-w-4xl mt-6"
          style={{
            fontSize: FONT_CONFIG.texto,
            lineHeight: FONT_CONFIG.textLineHeight,
            color: '#000000',
          }}
        >
          {renderWordsWithParagraphs(STORY.content, 'si-copy-word')}
        </p>
      </div>
    </div>
  );
}
