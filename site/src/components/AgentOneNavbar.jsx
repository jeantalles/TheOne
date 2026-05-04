import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { gsap } from 'gsap';
import { navigateToPath } from '../utils/router';

const navLinks = [
  { name: 'Para quem', id: 'agentone-para-quem' },
  { name: 'Sobre', id: 'a-theone' },
  { name: 'Produtos', id: 'produtos' },
  { name: 'Lista', id: 'agentone-lista' },
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function useNavbarTheme() {
  const [useDarkLogo, setUseDarkLogo] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    let rafId = null;

    const detectTheme = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const themedElement = document
          .elementsFromPoint(56, 48)
          .map((element) => element.closest?.('[data-navbar-theme]'))
          .find((element) => element && !navRef.current?.contains(element));

        setUseDarkLogo(themedElement?.dataset.navbarTheme === 'light');
      });
    };

    window.addEventListener('scroll', detectTheme, { passive: true });
    window.addEventListener('resize', detectTheme);
    detectTheme();

    return () => {
      window.removeEventListener('scroll', detectTheme);
      window.removeEventListener('resize', detectTheme);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return { navRef, useDarkLogo };
}

export default function AgentOneNavbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [active, setActive] = useState(null);
  const { navRef, useDarkLogo } = useNavbarTheme();
  const pillRef = useRef(null);
  const linksRef = useRef({});
  const menuRef = useRef(null);
  const pillTarget = hovered ?? active;

  useEffect(() => {
    let rafId = null;

    const detectActive = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        rafId = null;
        const threshold = window.innerHeight * 0.44;
        let current = null;

        for (const { id } of navLinks) {
          const el = document.getElementById(id);
          if (!el) continue;
          if (el.getBoundingClientRect().top <= threshold) current = id;
        }

        setActive(current);
      });
    };

    window.addEventListener('scroll', detectActive, { passive: true });
    window.addEventListener('resize', detectActive);
    detectActive();

    return () => {
      window.removeEventListener('scroll', detectActive);
      window.removeEventListener('resize', detectActive);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    const target = pillTarget && linksRef.current[pillTarget];
    if (!target || !pillRef.current) {
      gsap.to(pillRef.current, { opacity: 0, duration: 0.22, ease: 'power2.out' });
      return;
    }

    const item = target.parentElement;
    if (!item) return;

    gsap.to(pillRef.current, {
      x: item.offsetLeft,
      y: item.offsetTop,
      width: item.offsetWidth,
      height: item.offsetHeight,
      opacity: 1,
      duration: 0.32,
      ease: 'power3.out',
    });
  }, [pillTarget]);

  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.set(menu, { pointerEvents: 'auto' });
      gsap.fromTo(menu, { opacity: 0, scale: 0.97 }, { opacity: 1, scale: 1, duration: 0.32, ease: 'power3.out' });
      gsap.fromTo(
        menu.querySelectorAll('.agentone-mobile-link'),
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.34, stagger: 0.045, ease: 'power3.out', delay: 0.04 }
      );
    } else {
      gsap.to(menu, {
        opacity: 0,
        scale: 0.97,
        duration: 0.18,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { pointerEvents: 'none' }),
      });
    }
  }, [menuOpen]);

  const navText = useDarkLogo ? 'rgba(24,20,18,0.64)' : 'rgba(255,255,255,0.72)';
  const navTextActive = useDarkLogo ? '#181412' : '#ffffff';

  return (
    <>
      <div
        className="pointer-events-none fixed left-0 right-0 top-0 z-40"
        style={{
          height: 110,
          background: useDarkLogo ? 'rgba(245,238,232,0.72)' : 'rgba(32,32,32,0.38)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          maskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.72) 42%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.72) 42%, transparent 100%)',
          transition: 'background 240ms ease',
        }}
      />

      <nav
        ref={navRef}
        className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-5 md:px-10 lg:px-16"
        style={{ height: 84, paddingTop: 16 }}
      >
        <button
          type="button"
          className="flex items-center transition-transform duration-150 active:scale-[0.97]"
          onClick={() => navigateToPath('/')}
          aria-label="Voltar para o site da TheOne"
        >
          <img
            src={useDarkLogo ? '/logo-navbar-black.svg' : '/logo-navbar.svg'}
            alt="The One"
            style={{ height: 54, width: 'auto', display: 'block' }}
          />
        </button>

        <ul
          className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 p-1 md:flex"
          style={{
            borderRadius: 999,
            border: useDarkLogo ? '1px solid rgba(24,20,18,0.12)' : '1px solid rgba(255,255,255,0.16)',
            background: useDarkLogo ? 'rgba(255,255,255,0.58)' : 'rgba(128,128,128,0.42)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            transition: 'background 240ms ease, border-color 240ms ease',
          }}
        >
          <div
            ref={pillRef}
            className="pointer-events-none absolute"
            style={{
              top: 0,
              left: 0,
              borderRadius: 999,
              background: useDarkLogo ? 'rgba(24,20,18,0.08)' : 'rgba(255,255,255,0.1)',
              border: useDarkLogo ? '1px solid rgba(24,20,18,0.08)' : '1px solid rgba(255,255,255,0.14)',
              opacity: 0,
              zIndex: 0,
            }}
          />
          {navLinks.map((link) => (
            <li
              key={link.id}
              className="relative z-10"
              onMouseEnter={() => setHovered(link.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <a
                ref={(el) => { linksRef.current[link.id] = el; }}
                href={`#${link.id}`}
                onClick={(event) => {
                  event.preventDefault();
                  scrollToSection(link.id);
                }}
                className="block font-halyard transition-colors duration-150"
                style={{
                  fontSize: 17,
                  padding: '9px 20px',
                  borderRadius: 999,
                  color: pillTarget === link.id ? navTextActive : navText,
                }}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto hidden items-center gap-3 md:flex">
          <button
            type="button"
            onClick={() => navigateToPath('/')}
            className="inline-flex items-center gap-2 rounded-full font-halyard transition-transform duration-150 active:scale-[0.97]"
            style={{
              height: 46,
              padding: '0 18px',
              border: useDarkLogo ? '1px solid rgba(24,20,18,0.12)' : '1px solid rgba(255,255,255,0.16)',
              color: useDarkLogo ? 'rgba(24,20,18,0.78)' : 'rgba(255,255,255,0.74)',
              background: useDarkLogo ? 'rgba(255,255,255,0.42)' : 'rgba(255,255,255,0.06)',
              fontSize: 16,
            }}
          >
            Site TheOne
            <ArrowUpRight size={16} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            onClick={() => scrollToSection('agentone-lista')}
            className="inline-flex items-center rounded-full font-halyard capitalize transition-transform duration-150 active:scale-[0.97]"
            style={{
              height: 46,
              padding: '0 22px',
              color: '#6B2F1D',
              background: 'linear-gradient(135deg, rgba(255,215,205,0.98) 0%, rgba(255,127,86,0.92) 100%)',
              border: '1px solid rgba(255,120,82,0.18)',
              boxShadow: '0 10px 24px rgba(255,120,82,0.12)',
              fontSize: 16,
            }}
          >
            Entrar na lista
          </button>
        </div>

        <button
          type="button"
          className="z-[60] ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full transition-transform duration-150 active:scale-[0.9] md:hidden"
          style={{
            color: menuOpen ? '#fff' : (useDarkLogo ? '#181412' : '#FE6942'),
            background: menuOpen ? 'rgba(255,255,255,0.08)' : 'transparent',
          }}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          {menuOpen ? <X size={23} strokeWidth={1.9} /> : <Menu size={24} strokeWidth={1.9} />}
        </button>
      </nav>

      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col px-8 pt-28"
        style={{
          opacity: 0,
          pointerEvents: 'none',
          background: 'rgba(10,10,10,0.93)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          transformOrigin: 'top right',
        }}
      >
        <div className="mt-8 flex flex-col gap-2">
          {navLinks.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className="agentone-mobile-link border-b border-white/10 py-4 font-halyard text-[34px] leading-none text-white/60"
              onClick={(event) => {
                event.preventDefault();
                setMenuOpen(false);
                scrollToSection(link.id);
              }}
            >
              {link.name}
            </a>
          ))}
        </div>
        <button
          type="button"
          className="agentone-mobile-link mt-10 inline-flex w-fit items-center gap-2 rounded-full border border-white/15 px-5 py-3 font-halyard text-[18px] text-white/78 active:scale-[0.97]"
          onClick={() => {
            setMenuOpen(false);
            navigateToPath('/');
          }}
        >
          Site TheOne
          <ArrowUpRight size={17} strokeWidth={1.8} />
        </button>
      </div>
    </>
  );
}
