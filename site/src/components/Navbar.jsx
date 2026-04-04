import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, MessageCircle, X } from 'lucide-react';

const navLinks = [
  { name: 'O Diagnóstico', id: 'o-problema'  },
  { name: 'A TheOne',      id: 'a-theone'    },
  { name: 'Metodologia',   id: 'metodologia' },
  { name: 'Produtos',      id: 'solucoes'    },
  { name: 'Cases',         id: 'cases'       },
];

function useActiveSection() {
  const [active, setActive] = useState(null);
  // Guarda o id clicado para ignorar o scroll durante a animação de smooth scroll
  const navigatingTo = useRef(null);

  const detect = () => {
    if (window.scrollY < 80) { setActive(null); return; }
    const threshold = window.innerHeight * 0.5;
    let current = null;
    for (const { id } of navLinks) {
      const el = document.getElementById(id);
      if (!el) continue;
      if (el.getBoundingClientRect().top <= threshold) current = id;
    }
    // Só atualiza se não há navegação em curso, ou se já chegamos ao destino
    if (!navigatingTo.current || navigatingTo.current === current) {
      navigatingTo.current = null;
      setActive(current);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', detect, { passive: true });
    detect();
    return () => window.removeEventListener('scroll', detect);
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
  const { active, navigateTo } = useActiveSection();

  const pillTarget = hovered ?? active;

  useEffect(() => {
    const detectTheme = () => {
      const probeY = 48;
      const lightSections = document.querySelectorAll('[data-navbar-theme="light"]');
      let isLightBackground = false;

      lightSections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom >= probeY) {
          isLightBackground = true;
        }
      });

      setUseDarkLogo(isLightBackground);
    };

    window.addEventListener('scroll', detectTheme, { passive: true });
    window.addEventListener('resize', detectTheme);
    detectTheme();

    return () => {
      window.removeEventListener('scroll', detectTheme);
      window.removeEventListener('resize', detectTheme);
    };
  }, []);

  return (
    <>
      {/* Gradiente fadeout fixo no topo */}
      <div
        className="fixed top-0 left-0 right-0 z-40 pointer-events-none"
        style={{
          height: '110px',
          background: 'rgba(112,112,112,0.2)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          maskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0) 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, rgba(0,0,0,1) 0%, rgba(0,0,0,0.7) 38%, rgba(0,0,0,0) 100%)',
        }}
      />

      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1], delay: 0.2 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-10 md:px-16"
        style={{ height: '72px', paddingTop: '20px' }}
      >
        {/* Logo */}
        <a href="#" className="flex items-center">
          <img
            src={useDarkLogo ? '/logo-navbar-black.svg' : '/logo-navbar.svg'}
            alt="The One"
            style={{ height: '46px', width: 'auto', display: 'block' }}
          />
        </a>

        {/* Links desktop — pill container */}
        <ul
          className="hidden md:flex items-center p-1 gap-1"
          style={{
            borderRadius: '100px',
            border: '1px solid rgba(255,255,255,0.16)',
            background: 'rgba(128,128,128,0.5)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
          }}
        >
          {navLinks.map((l) => (
            <li key={l.id} className="relative"
              onMouseEnter={() => setHovered(l.id)}
              onMouseLeave={() => setHovered(null)}
            >
              <AnimatePresence>
                {pillTarget === l.id && (
                  <motion.div
                    key="pill"
                    layoutId="nav-pill"
                    className="absolute inset-0 pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      borderRadius: '100px',
                      background: 'rgba(255,255,255,0.10)',
                      border: '1px solid rgba(255,255,255,0.14)',
                    }}
                    transition={{ type: 'spring', stiffness: 400, damping: 38 }}
                  />
                )}
              </AnimatePresence>
              <a
                href={`#${l.id}`}
                onClick={(e) => { e.preventDefault(); navigateTo(l.id); }}
                className="relative z-10 block font-sans capitalize transition-colors duration-150"
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

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="https://wa.me/5511999999999"
            target="_blank"
            rel="noreferrer"
            aria-label="WhatsApp"
            className="inline-flex items-center justify-center transition-colors duration-150 hover:text-[#1f1f1f]"
            style={{
              color: useDarkLogo ? 'rgba(44,44,44,0.88)' : '#F5F0ED',
            }}
          >
            <MessageCircle size={20} strokeWidth={1.9} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-sans capitalize hover:text-[#1f1f1f] transition-colors duration-150"
            style={{
              fontSize: '18px',
              color: useDarkLogo ? 'rgba(44,44,44,0.88)' : '#F5F0ED',
            }}
          >
            Agendar Diagnóstico
          </a>
        </div>

        {/* Hamburguer mobile */}
        <button
          className="md:hidden text-white z-[60]"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </motion.nav>

      {/* Menu mobile */}
      <motion.div
        initial={false}
        animate={{ clipPath: menuOpen ? 'inset(0 0 0 0)' : 'inset(0 0 100% 0)' }}
        transition={{ duration: 0.4, ease: [0.77, 0, 0.175, 1] }}
        className="fixed inset-0 z-40 bg-[#212121] pt-32 px-8 flex flex-col pointer-events-none data-[open=true]:pointer-events-auto"
        data-open={menuOpen}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => { setMenuOpen(false); navigateTo(l.id); }}
              className="font-sans capitalize transition-colors"
              style={{
                fontSize: '32px',
                color: active === l.id ? '#ffffff' : 'rgba(255,255,255,0.74)',
              }}
            >
              {l.name}
            </a>
          ))}
        </div>
      </motion.div>
    </>
  );
}
