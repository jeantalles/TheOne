// ─── CONFIGURAÇÃO DO GLOW BUTTON ───────────────────────────────────────────
const config = {
  fontSize:        '22px',
  paddingX:        '48px',
  paddingY:        '20px',
  borderRadius:    '28px',

  // Cor do texto e do glow
  textColor:       '#ffffff',
  glowColor:       'rgba(210, 65, 10, 0.65)',   // intensidade do fundo iluminado
  glowSpread:      '120%',                       // quanto o glow sobe (100% = toca o centro)

  // Borda (captura a luz nas bordas)
  borderColorBottom: 'rgba(200, 80, 20, 0.45)',
  borderColorTop:    'rgba(255, 255, 255, 0.06)',

  // Sombra externa
  outerGlow:       'rgba(180, 55, 0, 0.22)',
};
// ───────────────────────────────────────────────────────────────────────────

export default function GlowButton({ children, onClick, href }) {
  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      href={href}
      onClick={onClick}
      className="relative inline-flex items-center justify-center font-sans font-normal capitalize overflow-hidden transition-all duration-300 hover:brightness-110 active:scale-[0.98] cursor-pointer"
      style={{
        fontSize: config.fontSize,
        padding: `${config.paddingY} ${config.paddingX}`,
        borderRadius: config.borderRadius,
        color: config.textColor,
        background: `radial-gradient(ellipse at 50% ${config.glowSpread}, ${config.glowColor} 0%, #181818 58%, #181818 100%)`,
        boxShadow: `
          inset 0 1px 0 ${config.borderColorTop},
          inset 0 -1px 0 ${config.borderColorBottom},
          inset 0 0 0 1px rgba(180, 60, 10, 0.12),
          0 0 0 1px rgba(130, 40, 5, 0.20),
          0 8px 32px rgba(0, 0, 0, 0.70),
          0 0 60px ${config.outerGlow}
        `,
      }}
    >
      {/* reflexo superior (gloss) */}
      <span
        className="pointer-events-none absolute inset-0"
        style={{
          borderRadius: config.borderRadius,
          background: 'radial-gradient(ellipse at 50% -30%, rgba(255,255,255,0.06) 0%, transparent 55%)',
        }}
      />
      {children}
    </Tag>
  );
}
