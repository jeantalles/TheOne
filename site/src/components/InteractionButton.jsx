import Magnetic from './Magnetic';

export default function InteractionButton({ children, href, className = '', isAccent = false }) {
  const baseClasses = `
    inline-flex items-center justify-center gap-3 font-sans uppercase tracking-[0.15em] text-[10px] md:text-xs px-8 md:px-10 py-4 md:py-5
    active:scale-[0.97] transition-transform duration-[160ms] ease-out will-change-transform
    hover:opacity-90 font-bold relative group overflow-hidden
  `;
  const accentClasses = isAccent
    ? 'bg-accent text-[#050505] font-black'
    : 'bg-transparent text-white border border-white/20 hover:border-white/50';

  const Comp = href ? 'a' : 'button';

  return (
    <Magnetic strength={0.2}>
      <Comp href={href} className={`${baseClasses} ${accentClasses} ${className}`} style={{ transformOrigin: 'center' }}>
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {isAccent && (
          <div className="absolute inset-0 bg-white translate-y-[100%] group-hover:translate-y-[0%] transition-transform duration-300 ease-[cubic-bezier(0.77,0,0.175,1)]" />
        )}
      </Comp>
    </Magnetic>
  );
}
