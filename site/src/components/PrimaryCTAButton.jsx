import { useRef, useState } from 'react';

export default function PrimaryCTAButton({
  children,
  href,
  onClick,
  className = '',
  style = {},
  background = '#FF5224',
  hoverBackground,
  boxShadow = '0 4px 16px rgba(255,82,36,0.22)',
  hoverBoxShadow = '0 8px 32px rgba(255,82,36,0.40)',
  textColor = '#F5F5F5',
  border = 'none',
}) {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: '50%', y: '50%' });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (event) => {
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ x: `${event.clientX - rect.left}px`, y: `${event.clientY - rect.top}px` });
  };

  const Comp = href ? 'a' : 'button';

  return (
    <Comp
      ref={btnRef}
      href={href}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative inline-flex cursor-pointer items-center justify-center font-sans font-normal capitalize text-white active:scale-[0.97] transition-transform ${className}`}
      style={{
        fontSize: '18px',
        height: '60px',
        padding: '0 52px',
        borderRadius: '100px',
        letterSpacing: '0.01em',
        background: hovered
          ? (hoverBackground ?? `radial-gradient(80px circle at ${pos.x} ${pos.y}, rgba(255,120,80,0.35), ${background} 70%)`)
          : background,
        color: textColor,
        border,
        boxShadow: hovered
          ? hoverBoxShadow
          : boxShadow,
        transition: 'box-shadow 0.2s',
        textDecoration: 'none',
        ...style,
      }}
    >
      {children}
    </Comp>
  );
}
