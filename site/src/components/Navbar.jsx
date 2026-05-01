import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const navLinks = [
  { name: 'O Contexto',    id: 'o-problema'  },
  { name: 'Soluções',      id: 'a-theone'    },
  { name: 'Metodologia',   id: 'metodologia' },
  { name: 'Cases',         id: 'cases'       },
];

function WhatsAppIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M19.05 4.94A9.84 9.84 0 0 0 12.03 2C6.56 2 2.1 6.45 2.1 11.92c0 1.75.46 3.46 1.32 4.97L2 22l5.27-1.38a9.9 9.9 0 0 0 4.75 1.21h.01c5.47 0 9.92-4.45 9.92-9.92a9.86 9.86 0 0 0-2.9-6.97Zm-7.02 15.22h-.01a8.23 8.23 0 0 1-4.19-1.15l-.3-.18-3.13.82.84-3.05-.2-.31a8.21 8.21 0 0 1-1.27-4.38c0-4.54 3.7-8.24 8.25-8.24 2.2 0 4.27.86 5.83 2.42a8.18 8.18 0 0 1 2.41 5.82c0 4.55-3.7 8.25-8.23 8.25Zm4.52-6.17c-.25-.13-1.47-.72-1.7-.81-.23-.08-.4-.12-.57.13-.17.25-.65.81-.8.98-.15.17-.3.19-.56.06-.25-.13-1.06-.39-2.02-1.25-.74-.66-1.24-1.48-1.38-1.73-.14-.25-.01-.39.11-.51.11-.11.25-.3.38-.44.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.44-.06-.13-.57-1.38-.78-1.89-.21-.5-.42-.43-.57-.44h-.49c-.17 0-.44.06-.67.32-.23.25-.88.86-.88 2.11 0 1.25.9 2.45 1.03 2.62.13.17 1.77 2.7 4.29 3.79.6.26 1.07.42 1.44.54.61.19 1.16.16 1.6.1.49-.07 1.47-.6 1.67-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29Z" />
    </svg>
  );
}

function HamburgerIcon({ open }) {
  const ease = 'cubic-bezier(0.23, 1, 0.32, 1)';
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <line
        x1="3" y1="6" x2="21" y2="6"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        style={{
          transformOrigin: '12px 6px',
          transition: `transform 380ms ${ease}`,
          transform: open ? 'translateY(6px) rotate(45deg)' : 'translateY(0) rotate(0)',
        }}
      />
      <line
        x1="3" y1="12" x2="21" y2="12"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        style={{
          transformOrigin: '12px 12px',
          transition: `opacity 220ms ease, transform 380ms ${ease}`,
          opacity: open ? 0 : 1,
          transform: open ? 'scaleX(0.15)' : 'scaleX(1)',
        }}
      />
      <line
        x1="3" y1="18" x2="21" y2="18"
        stroke="currentColor" strokeWidth="2" strokeLinecap="round"
        style={{
          transformOrigin: '12px 18px',
          transition: `transform 380ms ${ease}`,
          transform: open ? 'translateY(-6px) rotate(-45deg)' : 'translateY(0) rotate(0)',
        }}
      />
    </svg>
  );
}

function useActiveSection() {
  const [active, setActive] = useState(null);
  const navigatingTo = useRef(null);
  const rafId = useRef(null);

  const detect = () => {
    if (rafId.current) return;
    rafId.current = requestAnimationFrame(() => {
      rafId.current = null;
      if (window.scrollY < 80) { setActive(null); return; }
      const threshold = window.innerHeight * 0.5;
      let current = null;
      for (const { id } of navLinks) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= threshold) current = id;
      }
      if (!navigatingTo.current || navigatingTo.current === current) {
        navigatingTo.current = null;
        setActive(current);
      }
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', detect, { passive: true });
    detect();
    return () => {
      window.removeEventListener('scroll', detect);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, []);

  const navigateTo = (id) => {
    navigatingTo.current = id;
    setActive(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return { active, navigateTo };
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered] = useState(null);
  const [useDarkLogo, setUseDarkLogo] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [useLightMobileMenuIcon, setUseLightMobileMenuIcon] = useState(false);
  const [navbarThemeOverride, setNavbarThemeOverride] = useState(null);
  const { active, navigateTo } = useActiveSection();

  const navRef = useRef(null);
  const menuRef = useRef(null);
  const pillRef = useRef(null);
  const linksRef = useRef({});

  const pillTarget = hovered ?? active;

  useEffect(() => {
    let themeRafId = null;
    const detectTheme = () => {
      if (themeRafId) return;
      themeRafId = requestAnimationFrame(() => {
        themeRafId = null;
        if (navbarThemeOverride) {
          setUseDarkLogo(navbarThemeOverride === 'light');
          return;
        }

        const probeY = 48;
        const lightSections = document.querySelectorAll('[data-navbar-theme="light"]');
        let isLightBackground = false;
        lightSections.forEach((section) => {
          const rect = section.getBoundingClientRect();
          if (rect.top <= probeY && rect.bottom >= probeY) isLightBackground = true;
        });
        setUseDarkLogo(isLightBackground);
      });
    };

    window.addEventListener('scroll', detectTheme, { passive: true });
    window.addEventListener('resize', detectTheme);
    detectTheme();

    return () => {
      window.removeEventListener('scroll', detectTheme);
      window.removeEventListener('resize', detectTheme);
      if (themeRafId) cancelAnimationFrame(themeRafId);
    };
  }, [navbarThemeOverride]);

  useEffect(() => {
    const onVisibilityChange = (event) => {
      setIsVisible(Boolean(event.detail?.visible));
    };

    window.addEventListener('hero-navbar-visibility', onVisibilityChange);
    return () => {
      window.removeEventListener('hero-navbar-visibility', onVisibilityChange);
    };
  }, []);

  useEffect(() => {
    const onMobileMenuThemeChange = (event) => {
      setUseLightMobileMenuIcon(Boolean(event.detail?.light));
    };

    window.addEventListener('hero-mobile-menu-theme', onMobileMenuThemeChange);
    return () => {
      window.removeEventListener('hero-mobile-menu-theme', onMobileMenuThemeChange);
    };
  }, []);

  useEffect(() => {
    const onNavbarThemeOverride = (event) => {
      setNavbarThemeOverride(event.detail?.theme ?? null);
    };

    window.addEventListener('navbar-theme-override', onNavbarThemeOverride);
    return () => {
      window.removeEventListener('navbar-theme-override', onNavbarThemeOverride);
    };
  }, []);

  useEffect(() => {
    if (!navRef.current) return;

    gsap.to(navRef.current, {
      y: isVisible ? 0 : -20,
      opacity: isVisible ? 1 : 0,
      duration: isVisible ? 0.8 : 0.35,
      ease: isVisible ? 'power3.out' : 'power2.inOut',
      overwrite: 'auto',
      pointerEvents: isVisible ? 'auto' : 'none',
    });
  }, [isVisible]);

  // Pill animation
  useEffect(() => {
    if (pillTarget && linksRef.current[pillTarget]) {
      const linkEl = linksRef.current[pillTarget];
      const liEl = linkEl.parentElement;

      if (!liEl) return;

      const { offsetLeft, offsetTop, offsetWidth, offsetHeight } = liEl;

      gsap.to(pillRef.current, {
        x: offsetLeft,
        y: offsetTop,
        width: offsetWidth,
        height: offsetHeight,
        opacity: 1,
        duration: 0.4,
        ease: "power3.out"
      });
    } else {
      gsap.to(pillRef.current, {
        opacity: 0,
        duration: 0.3
      });
    }
  }, [pillTarget]);

  // Mobile menu animation — scale + opacity + stagger
  useEffect(() => {
    const menu = menuRef.current;
    if (!menu) return;

    if (menuOpen) {
      gsap.killTweensOf(menu);
      gsap.set(menu, { pointerEvents: 'auto' });
      gsap.fromTo(
        menu,
        { opacity: 0, scale: 0.96 },
        { opacity: 1, scale: 1, duration: 0.45, ease: 'power3.out' }
      );

      const items = menu.querySelectorAll('.mobile-link');
      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.055, ease: 'power3.out', delay: 0.1 }
      );
    } else {
      gsap.killTweensOf(menu);
      gsap.to(menu, {
        opacity: 0,
        scale: 0.96,
        duration: 0.22,
        ease: 'power2.in',
        onComplete: () => gsap.set(menu, { pointerEvents: 'none' }),
      });
    }
  }, [menuOpen]);

  return (
    <>
      <div
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          height: '110px',
          background: 'rgba(112,112,112,0.2)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0) 100%)',
          opacity: isVisible ? 1 : 0,
          transition: 'opacity 0.35s ease',
        }}
      />

      <nav
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16"
        style={{ height: '72px', paddingTop: '20px', opacity: 0, pointerEvents: 'none' }}
      >
        <a
          href="#"
          className="flex items-center"
          onClick={(e) => {
            e.preventDefault();
            const target = Math.round(0.82 * 4.6 * window.innerHeight);
            const lenis = window.__theOneLenis;
            if (lenis) {
              lenis.scrollTo(target, {
                duration: 1.6,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
              });
            } else {
              window.scrollTo({ top: target, behavior: 'smooth' });
            }
          }}
        >
          <img
            src={useDarkLogo ? '/logo-navbar-black.svg' : '/logo-navbar.svg'}
            alt="The One"
            style={{ height: '54px', width: 'auto', display: 'block' }}
          />
        </a>

        <ul
          className="absolute left-1/2 hidden -translate-x-1/2 md:flex items-center p-1 gap-1"
          style={{
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(128,128,128,0.5)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        >
          <div
            ref={pillRef}
            className="absolute pointer-events-none"
            style={{
              top: 0,
              left: 0,
              borderRadius: '100px',
              background: 'rgba(255,255,255,0.10)',
              border: '1px solid rgba(255,255,255,0.14)',
              opacity: 0,
              zIndex: 0
            }}
          />

          {navLinks.map((l) => (
            <li key={l.id} className="relative z-10"
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <a
                ref={(el) => (linksRef.current[l.id] = el)}
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); navigateTo(l.id); }}
                className="block font-sans capitalize transition-colors duration-150"
                style={{
                  fontSize: '18px',
                  padding: '10px 22px',
                  borderRadius: '100px',
                  color: pillTarget === l.id ? '#ffffff' : 'rgba(255,255,255,0.72)',
                }}
              >
                {l.name}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-4 ml-auto">
          <a
            href="https://wa.me/5551997513675?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20TheOne%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans capitalize transition-transform duration-150 active:scale-[0.98]"
            style={{
              fontSize: '18px',
              color: '#6B2F1D',
              padding: '6px 22px 6px 8px',
              borderRadius: '999px',
              background: 'linear-gradient(135deg, rgba(255,215,205,0.95) 0%, rgba(255,127,86,0.88) 100%)',
              border: '1px solid rgba(255,120,82,0.18)',
              boxShadow: '0 10px 24px rgba(255,120,82,0.12)',
            }}
          >
            <span
              className="inline-flex items-center justify-center"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '999px',
                background: 'rgba(255,248,244,0.42)',
                color: '#A84B31',
              }}
            >
              <WhatsAppIcon style={{ width: '16px', height: '16px', display: 'block' }} />
            </span>
            Agendar Diagnóstico
          </a>
        </div>

        <button
          className="md:hidden z-[60] transition-transform duration-150 active:scale-[0.88]"
          style={{ color: menuOpen || useLightMobileMenuIcon ? '#FFFFFF' : '#FE6942' }}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
        >
          <HamburgerIcon open={menuOpen} />
        </button>
      </nav>

      {/* Mobile menu — frosted glass overlay */}
      <div
        ref={menuRef}
        className="fixed inset-0 z-40 flex flex-col pt-28 px-8"
        style={{
          opacity: 0,
          pointerEvents: 'none',
          background: 'rgba(10, 10, 10, 0.92)',
          backdropFilter: 'blur(40px) saturate(180%)',
          WebkitBackdropFilter: 'blur(40px) saturate(180%)',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          willChange: 'transform, opacity',
        }}
      >
        <div className="flex flex-col gap-2 mt-8">
          {navLinks.map((l, i) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => { setMenuOpen(false); navigateTo(l.id); }}
              className="mobile-link font-sans capitalize"
              style={{
                fontSize: '36px',
                fontWeight: 400,
                letterSpacing: '-0.02em',
                lineHeight: 1.2,
                padding: '10px 0',
                color: active === l.id ? '#ffffff' : 'rgba(255,255,255,0.5)',
                borderBottom: i < navLinks.length - 1 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                transition: 'color 200ms ease',
              }}
            >
              {l.name}
            </a>
          ))}
        </div>

        <a
          href="https://wa.me/5551997513675?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20TheOne%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => setMenuOpen(false)}
          className="mobile-link mt-10 inline-flex items-center gap-3 font-sans capitalize active:scale-[0.97]"
          style={{
            fontSize: '18px',
            color: '#6B2F1D',
            padding: '10px 22px 10px 10px',
            borderRadius: '999px',
            background: 'linear-gradient(135deg, rgba(255,215,205,0.95) 0%, rgba(255,127,86,0.88) 100%)',
            border: '1px solid rgba(255,120,82,0.18)',
            alignSelf: 'flex-start',
            transition: 'transform 160ms ease-out',
          }}
        >
          <span
            className="inline-flex items-center justify-center"
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '999px',
              background: 'rgba(255,248,244,0.42)',
              color: '#A84B31',
            }}
          >
            <WhatsAppIcon style={{ width: '16px', height: '16px', display: 'block' }} />
          </span>
          Agendar Diagnóstico
        </a>
      </div>
    </>
  );
}
