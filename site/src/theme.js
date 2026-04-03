// ─────────────────────────────────────────────────────────────
// DESIGN TOKENS — The One
// Modifique aqui para propagar mudanças em todo o site.
// ─────────────────────────────────────────────────────────────

export const colors = {
  bg: '#212121',
  bgDark: '#050505',
  bgCard: '#0a0a0a',
  bgSubtle: '#141414',
  border: '#5B5B5B',
  accent: '#FE6942',
  accentHot: '#FF5224',
  accentLight: '#FED1C5',
  text: '#FFFFFF',
  textMuted: '#C7C7C7',
  textDisabled: 'rgba(255,255,255,0.2)',
};

export const fontSizes = {
  // Hero
  heroTag: '10px',
  heroTitle: 'clamp(2.5rem, 8vw, 6rem)',
  heroParagraph: '19px',

  // Seções de storytelling / problema
  storyTag: '14px',
  storyTitle: 'clamp(2.5rem, 4vw, 3.5rem)',
  storyText: '19px',

  // Seção Solução (TheOneConclusion)
  conclusionTag: '14px',
  conclusionTitle: 'clamp(2rem, 4vw, 3.5rem)',
  conclusionText: '18px',

  // Soluções / Produtos (AntigravityProducts)
  productTitleLarge: '48px',   // TheBrand, Consultoria, Assessoria
  productTitleBox: '26px',     // Estratégia, Identidade, etc.
  productTextLarge: '19px',    // Parágrafos principais
  productTextBox: '19px',      // Descrições dentro dos boxes
};

export const animation = {
  // Easing curves
  easeSharp: [0.77, 0, 0.175, 1],
  easeSmooth: [0.23, 1, 0.32, 1],

  // Durações comuns (ms → segundos para framer-motion)
  fast: 0.16,
  normal: 0.3,
  slow: 0.8,
  verySlow: 1.2,

  // Spring config do botão magnético
  magneticSpring: { stiffness: 150, damping: 15 },

  // Scroll scrub padrão para GSAP
  scrub: 1.5,
};
