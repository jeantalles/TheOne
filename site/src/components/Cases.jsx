import { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EASE_EXPO = 'expo.out';

const CASES = [
  {
    id: 1,
    title: 'TechNova',
    subtitle: 'Reposicionamento e Escala',
    result: '+300% de percepção de valor',
    image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 2,
    title: 'Studio Alpha',
    subtitle: 'Construção de Marca Zero',
    result: 'Liderança regional garantida',
    image: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?q=80&w=2940&auto=format&fit=crop',
  },
  {
    id: 3,
    title: 'Nexus Data',
    subtitle: 'Rebranding Internacional',
    result: 'Aquisição Série A de $10M',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2940&auto=format&fit=crop',
  },
];

export default function Cases() {
  const sectionRef         = useRef(null);
  const folderWrapRef      = useRef(null);
  const folderShellRef     = useRef(null);
  const folderBackRef      = useRef(null);
  const folderFrontRef     = useRef(null);
  const folderPocketRef    = useRef(null);
  const folderPreviewRefs  = useRef([]);
  const stackRef           = useRef(null);
  const caseItemsRef       = useRef([]);
  const folderSTRef        = useRef(null);
  const folderTriggerRefs  = useRef([]);
  const isOpenRef          = useRef(false);
  const breatheRef         = useRef(null);

  const [openState, setOpenState] = useState('closed');
  const isOpen = openState === 'open';

  // ── 1. Initial states + scroll entrance + idle breathing ─────────────────
  useEffect(() => {
    // Case items hidden
    caseItemsRef.current.forEach((item) => {
      if (!item) return;
      gsap.set(item, { opacity: 0, pointerEvents: 'none' });
    });

    // Preview cards inside pocket
    folderPreviewRefs.current.forEach((card, i) => {
      if (!card) return;
      gsap.set(card, {
        y: 56 + i * 16,
        scale: 0.84 - i * 0.04,
        rotate: (i - 1) * -6,
        opacity: 0.86 - i * 0.14,
        filter: 'blur(6px)',
        transformOrigin: 'center bottom',
      });
    });

    gsap.set(folderBackRef.current,  { transformOrigin: 'center bottom' });
    gsap.set(folderFrontRef.current, { transformOrigin: 'center bottom', transformStyle: 'preserve-3d' });
    gsap.set(folderShellRef.current, { transformOrigin: 'center bottom' });

    const ctx = gsap.context(() => {
      folderTriggerRefs.current = [];
      const reg = (anim) => {
        if (anim?.scrollTrigger) folderTriggerRefs.current.push(anim.scrollTrigger);
        return anim;
      };

      // Heading scrub
      gsap.fromTo('.cases-heading',
        { opacity: 0, y: 64, filter: 'blur(18px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', ease: 'none',
          scrollTrigger: { trigger: '.cases-heading', start: 'top 88%', end: 'top 44%', scrub: 1.2 } }
      );

      // Folder entrance scrub
      // end: 'top 52%' → animação termina antes da pasta chegar ao centro, garantindo blur zerado
      const st = reg(gsap.fromTo(folderWrapRef.current,
        { opacity: 0.3, y: 120, scale: 0.76, filter: 'blur(6px)' },
        { opacity: 1, y: 0, scale: 1.06, filter: 'blur(0px)', ease: 'none',
          scrollTrigger: {
            trigger: folderWrapRef.current, start: 'top 94%', end: 'top 52%', scrub: 0.9,
            onUpdate: (self) => {
              if (self.progress > 0.85 && breatheRef.current && !isOpenRef.current) {
                if (breatheRef.current.paused()) breatheRef.current.play();
              } else if (self.progress < 0.8 && breatheRef.current) {
                breatheRef.current.pause();
              }
            },
          },
        }
      ));
      folderSTRef.current = st.scrollTrigger;

      reg(gsap.fromTo(folderShellRef.current,
        { y: 24, scale: 0.93, rotateX: 7, filter: 'brightness(0.94)' },
        { y: -8, scale: 1.02, rotateX: 0, filter: 'brightness(1.06)', ease: 'none',
          scrollTrigger: { trigger: folderWrapRef.current, start: 'top 92%', end: 'top 50%', scrub: 0.9 } }
      ));

      reg(gsap.fromTo(folderBackRef.current,
        { y: 24, scale: 0.94 },
        { y: -10, scale: 1.03, ease: 'none',
          scrollTrigger: { trigger: folderWrapRef.current, start: 'top 92%', end: 'top 52%', scrub: 1.0 } }
      ));

      reg(gsap.fromTo(folderFrontRef.current,
        { y: 16, scaleY: 0.94 },
        { y: -4, scaleY: 1.01, ease: 'none',
          scrollTrigger: { trigger: folderWrapRef.current, start: 'top 92%', end: 'top 52%', scrub: 1.0 } }
      ));

      reg(gsap.fromTo(folderPocketRef.current,
        { y: 16, scale: 0.94, filter: 'brightness(0.9)' },
        { y: 0, scale: 1, filter: 'brightness(1)', ease: 'none',
          scrollTrigger: { trigger: folderWrapRef.current, start: 'top 92%', end: 'top 50%', scrub: 0.9 } }
      ));

      folderPreviewRefs.current.forEach((card, i) => {
        if (!card) return;
        reg(gsap.fromTo(card,
          { y: 56 + i * 16, scale: 0.84 - i * 0.04, rotate: (i - 1) * -6, filter: 'blur(4px)' },
          { y: 8 + i * 8, scale: 0.96 - i * 0.03, rotate: (i - 1) * -2.5, filter: 'blur(0px)', ease: 'none',
            scrollTrigger: { trigger: folderWrapRef.current, start: 'top 92%', end: 'top 50%', scrub: 0.9 } }
        ));
      });
    }, sectionRef);

    // Idle breathing — subtle y + scale pulse
    breatheRef.current = gsap.timeline({ repeat: -1, yoyo: true, paused: true })
      .to(folderShellRef.current, { y: -9, scale: 1.016, duration: 2.4, ease: 'sine.inOut' })
      .to(folderShellRef.current, { rotateX: 1.5, duration: 2.4, ease: 'sine.inOut' }, '<');

    return () => {
      ctx.revert();
      breatheRef.current?.kill();
    };
  }, []);

  // ── 2. Scroll stack animations — only after folder opens ─────────────────
  useEffect(() => {
    if (!isOpen) return;
    ScrollTrigger.refresh();

    const ctx = gsap.context(() => {
      caseItemsRef.current.forEach((item, i) => {
        if (!item) return;
        const card    = item.querySelector('.case-card');
        const image   = item.querySelector('.case-image');
        const overlay = item.querySelector('.case-card-overlay');
        const meta    = item.querySelector('.case-meta');

        if (i > 0 && card) {
          gsap.fromTo(card,
            { y: 80, scale: 0.97, rotate: i % 2 === 0 ? -0.8 : 0.8, filter: 'blur(6px)' },
            { y: 0, scale: 1, rotate: 0, filter: 'blur(0px)', ease: 'none',
              scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 26%', scrub: 1.08 } }
          );
        }
        if (image) {
          gsap.fromTo(image,
            { scale: i === 0 ? 1.04 : 1.08, y: i === 0 ? 10 : 24 },
            { scale: 1, y: 0, ease: 'none',
              scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 26%', scrub: 1.2 } }
          );
        }
        if (overlay) {
          gsap.fromTo(overlay,
            { opacity: i === 0 ? 0.26 : 0.34 },
            { opacity: 0.16, ease: 'none',
              scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 26%', scrub: 1.1 } }
          );
        }
        if (meta) {
          gsap.fromTo(meta,
            { y: i === 0 ? 0 : 32, opacity: i === 0 ? 1 : 0.5 },
            { y: 0, opacity: 1, ease: 'none',
              scrollTrigger: { trigger: item, start: 'top 92%', end: 'top 26%', scrub: 1 } }
          );
        }
      });
    }, stackRef);

    return () => ctx.revert();
  }, [isOpen]);

  // ── 3. Click handler — FLIP-style: cards emerge from folder preview size ──
  const handleOpen = () => {
    if (isOpenRef.current) return;
    isOpenRef.current = true;
    setOpenState('opening');

    // Stop breathing immediately
    breatheRef.current?.kill();
    breatheRef.current = null;

    // Kill all scroll triggers so they don't fight click animation
    folderSTRef.current?.kill();
    folderTriggerRefs.current.forEach((t) => t?.kill());
    folderTriggerRefs.current = [];

    // Snapshot folder pocket bounds (this is the "mouth" the cards emerge from)
    const pocketBounds    = folderPocketRef.current?.getBoundingClientRect();
    const pocketCenterX = pocketBounds ? pocketBounds.left + pocketBounds.width  * 0.5 : window.innerWidth  * 0.5;
    const pocketCenterY = pocketBounds ? pocketBounds.top  + pocketBounds.height * 0.52 : window.innerHeight * 0.45;
    const pocketW       = pocketBounds ? pocketBounds.width  : 320;
    const pocketH       = pocketBounds ? pocketBounds.height : 260;

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    // — Press micro-impact: lento e deliberado
    tl.to(folderShellRef.current, { scale: 0.958, y: 9, duration: 0.18, ease: 'power2.in' }, 0);
    tl.to(folderShellRef.current, { scale: 1.008, y: 0, duration: 0.38, ease: EASE_EXPO  }, 0.18);

    // — Preview cards sobem devagar antes da tampa abrir
    tl.to(folderPreviewRefs.current, {
      y: -140,
      scale: 0.78,
      opacity: 0,
      filter: 'blur(18px)',
      rotate: (i) => (i - 1) * 10,
      duration: 0.62,
      stagger: 0.07,
      ease: 'power3.in',
    }, 0.14);

    // — Tampa dobra pra fora devagar (rotação 3D na borda inferior)
    tl.to(folderFrontRef.current, {
      rotateX: 32,
      y: 82,
      scaleY: 0.68,
      opacity: 0,
      filter: 'blur(12px)',
      transformOrigin: 'center bottom',
      duration: 0.82,
      ease: 'expo.out',
    }, 0.18);

    // — Fundo da pasta implode enquanto os cards escapam
    tl.to(folderBackRef.current, {
      scale: 0.7,
      y: 64,
      opacity: 0,
      filter: 'blur(18px)',
      duration: 0.9,
      ease: 'power3.out',
    }, 0.24);

    tl.to(folderWrapRef.current, {
      y: 22,
      scale: 0.9,
      opacity: 0,
      duration: 0.88,
      ease: 'power3.out',
    }, 0.26);

    // — Cards saltam suavemente pra cima a partir do tamanho/posição da pasta
    const CARD_START = 0.36; // quando o primeiro card começa a surgir
    const CARD_STAGGER = 0.22; // intervalo entre cada card

    caseItemsRef.current.forEach((item, i) => {
      if (!item) return;
      const card       = item.querySelector('.case-card');
      const itemBounds = item.getBoundingClientRect();
      const cardCenterX = itemBounds.left + itemBounds.width  * 0.5;
      const cardCenterY = itemBounds.top  + itemBounds.height * 0.5;

      const deltaX    = pocketCenterX - cardCenterX;
      const deltaY    = pocketCenterY - cardCenterY;
      const scaleStart = Math.min(pocketW / itemBounds.width, pocketH / itemBounds.height) * (0.82 + i * 0.05);
      const startTime  = CARD_START + i * CARD_STAGGER;

      gsap.set(item, { opacity: 0, pointerEvents: 'none', willChange: 'transform, opacity' });

      if (card) {
        gsap.set(card, {
          x: deltaX,
          y: deltaY,
          scale: scaleStart,
          rotate: (i - 1) * -6,
          rotateX: 16,
          filter: `blur(${12 + i * 3}px)`,
          transformOrigin: 'center center',
          willChange: 'transform, opacity, filter',
        });
      }

      // Item aparece
      tl.to(item, { opacity: 1, pointerEvents: 'auto', duration: 0.22 }, startTime);

      if (card) {
        // Y com overshoot leve — sensação de salto que pousa
        tl.to(card, {
          y: 0,
          duration: 1.6,
          ease: 'back.out(1.15)',
        }, startTime);

        // Resto resolve suave sem bounce
        tl.to(card, {
          x: 0,
          scale: 1,
          rotate: 0,
          rotateX: 0,
          filter: 'blur(0px)',
          duration: 1.4,
          ease: 'power4.out',
        }, startTime);
      }
    });

    const lastCardEnd = CARD_START + (CASES.length - 1) * CARD_STAGGER + 1.0;

    tl.call(() => { setOpenState('open'); },   null, lastCardEnd - 0.4);
    tl.call(() => {
      stackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, null, lastCardEnd - 0.2);
  };

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="bg-[#212121] py-32 px-6 md:px-12 lg:px-16 border-b border-white/5 font-halyard relative overflow-hidden"
    >
      <div className="max-w-[1920px] mx-auto">

        {/* Heading */}
        <div className="flex flex-col items-center text-center mb-24 lg:mb-32 overflow-x-clip">
          <h2 className="cases-heading text-white text-[clamp(2.8rem,5.2vw,5rem)] xl:text-[clamp(3.6rem,4.8vw,5.75rem)] font-editorial font-normal leading-[1.02] mb-6 will-change-transform whitespace-nowrap">
            Marcas construídas{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] font-normal">
              para liderar
            </span>
          </h2>
        </div>

        {/* Folder scene */}
        <div className="relative mb-20 md:mb-28 flex justify-center">
          <div ref={folderWrapRef} className="will-change-transform" style={{ width: 'min(520px, 88vw)' }}>
            <motion.button
              type="button"
              onClick={handleOpen}
              disabled={openState !== 'closed'}
              aria-expanded={isOpen}
              whileHover={openState === 'closed' ? { scale: 1.015, y: -3 } : undefined}
              whileTap={openState === 'closed' ? { scale: 0.975 } : undefined}
              transition={{ type: 'spring', stiffness: 320, damping: 20, mass: 0.85 }}
              className={`group relative block w-full focus:outline-none ${openState === 'closed' ? 'cursor-pointer' : 'cursor-default'}`}
              style={{ aspectRatio: '1.18 / 1', perspective: '1600px' }}
            >
              {/* Ambient glow */}
              <div className="pointer-events-none absolute inset-[-9%_-6%_2%_-6%] rounded-[42px] bg-[radial-gradient(circle_at_center,rgba(254,105,66,0.22),rgba(254,105,66,0.08)_36%,transparent_72%)] blur-3xl" />

              <div ref={folderShellRef} className="relative h-full w-full will-change-transform" style={{ transformStyle: 'preserve-3d' }}>

                {/* Folder back */}
                <div
                  ref={folderBackRef}
                  className="absolute inset-0 overflow-hidden border border-white/10 shadow-[0_40px_110px_rgba(0,0,0,0.45)]"
                  style={{
                    clipPath: 'polygon(0% 18%, 21% 18%, 29% 10%, 100% 10%, 100% 100%, 0% 100%)',
                    borderRadius: '42px',
                    background: 'linear-gradient(135deg, #FFD7CD 0%, #FF845C 42%, #FF4B1C 100%)',
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.35),transparent_32%)]" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),transparent_36%,rgba(0,0,0,0.12)_100%)]" />
                </div>

                {/* Folder tab */}
                <div
                  className="absolute left-[5.5%] top-[7.5%] h-[19%] w-[30%] border border-white/12 shadow-[0_18px_36px_rgba(0,0,0,0.18)]"
                  style={{
                    clipPath: 'polygon(0% 100%, 0% 28%, 63% 28%, 74% 0%, 100% 0%, 100% 100%)',
                    borderRadius: '28px',
                    background: 'linear-gradient(180deg, rgba(255,233,226,0.95) 0%, rgba(255,164,136,0.95) 100%)',
                  }}
                />

                {/* Pocket — dark interior, card previews live here */}
                <div
                  ref={folderPocketRef}
                  className="absolute left-[7%] right-[7%] top-[19%] bottom-[17%] overflow-hidden rounded-[30px] border border-black/10"
                  style={{
                    background: 'linear-gradient(180deg, rgba(32,18,12,0.34) 0%, rgba(17,11,9,0.72) 100%)',
                    boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -18px 60px rgba(0,0,0,0.24)',
                  }}
                >
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,219,208,0.18),transparent_45%)]" />
                  {CASES.map((c, i) => (
                    <div
                      key={`preview-${c.id}`}
                      ref={(el) => { folderPreviewRefs.current[i] = el; }}
                      className="absolute left-1/2 top-[18%] h-[64%] w-[62%] -translate-x-1/2 overflow-hidden rounded-[24px] border border-white/12 shadow-[0_26px_50px_rgba(0,0,0,0.34)]"
                      style={{
                        zIndex: CASES.length - i,
                        marginLeft: `${(i - 1) * 8}%`,
                        backgroundImage: `linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.42) 100%), url(${c.image})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    >
                      <div className="absolute inset-x-0 bottom-0 h-[54%] bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(0,0,0,0.7)_100%)]" />
                      <div className="absolute left-4 right-4 bottom-4">
                        <p className="text-[9px] font-bold tracking-[0.28em] text-[#FFD8CF] uppercase font-mono">{c.subtitle}</p>
                        <p className="mt-1 text-lg font-editorial text-white leading-none">{c.title}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Front flap */}
                <div
                  ref={folderFrontRef}
                  className="absolute inset-x-[4%] bottom-[4.5%] h-[46%] overflow-hidden border border-white/12 shadow-[0_26px_60px_rgba(0,0,0,0.25)]"
                  style={{
                    clipPath: 'polygon(0% 13%, 100% 0%, 100% 100%, 0% 100%)',
                    borderRadius: '34px',
                    background: 'linear-gradient(180deg, rgba(255,210,198,0.92) 0%, rgba(255,134,100,0.95) 24%, rgba(255,75,28,0.98) 100%)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),transparent_34%,rgba(0,0,0,0.12)_100%)]" />
                  <div className="absolute left-6 right-6 top-6 flex items-center justify-between md:left-10 md:right-10 md:top-8">
                    <div>
                      <p className="text-[10px] md:text-[11px] uppercase tracking-[0.28em] text-[#3E1308]/70 font-mono">Cases Vault</p>
                      <p className="mt-2 text-[clamp(1.5rem,3.4vw,2.6rem)] text-[#180C09] font-editorial leading-none">The One</p>
                    </div>
                    <div className="rounded-full border border-[#3E1308]/15 bg-white/20 px-4 py-2 text-[10px] md:text-[11px] uppercase tracking-[0.22em] text-[#2D1009]/70">
                      Click to open
                    </div>
                  </div>
                  <div className="absolute inset-x-0 bottom-0 h-[38%] bg-[linear-gradient(180deg,rgba(40,14,7,0)_0%,rgba(40,14,7,0.16)_100%)]" />
                </div>

                {/* Edge highlight */}
                <div className="pointer-events-none absolute inset-[1px] rounded-[42px] border border-white/10 opacity-70" />
              </div>
            </motion.button>
          </div>
        </div>

        {/* Cases stack */}
        <div ref={stackRef} className="relative w-full pb-10 md:pb-20 scroll-mt-28">
          <div className="mx-auto w-full md:w-[96%] lg:w-[90%]">
            {CASES.map((c, i) => (
              <div
                key={c.id}
                ref={(el) => { caseItemsRef.current[i] = el; }}
                className="case-stack-item sticky top-[108px] md:top-[124px]"
                style={{
                  zIndex: 20 + i,
                  marginTop: i === 0 ? 0 : '-22vh',
                  paddingBottom: i === CASES.length - 1 ? '16vh' : '22vh',
                }}
              >
                <div className="relative mx-auto w-full h-[54vh] md:h-[68vh]" style={{ perspective: '1400px' }}>
                  <div className="case-card relative h-full rounded-[32px] overflow-hidden group cursor-pointer border border-white/10 bg-[#111111]">
                    <div
                      className="case-image absolute inset-0 bg-cover bg-center transition-transform duration-[1.2s] ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:scale-[1.03]"
                      style={{ backgroundImage: `url(${c.image})` }}
                    />
                    <div className="case-card-overlay absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors duration-700" />
                    <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(0,0,0,0.02) 0%, rgba(0,0,0,0.08) 36%, rgba(0,0,0,0.48) 100%)' }} />

                    <div className="case-meta absolute bottom-6 left-6 right-6 md:bottom-10 md:left-10 md:right-10">
                      <div className="backdrop-blur-xl bg-black/40 border border-white/10 rounded-[20px] p-6 md:p-8 flex flex-col md:flex-row md:items-end justify-between transition-colors duration-500 group-hover:bg-black/50 group-hover:border-white/20">
                        <div className="mb-4 md:mb-0">
                          <p className="text-accent text-[11px] md:text-sm font-bold tracking-[0.2em] uppercase font-mono mb-2 md:mb-3">{c.subtitle}</p>
                          <h3 className="text-white text-3xl md:text-5xl font-editorial font-normal leading-none mb-2 md:mb-3">{c.title}</h3>
                          <p className="text-[#C7C7C7] text-lg md:text-xl font-light leading-snug">{c.result}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-white text-[13px] tracking-[0.1em] uppercase font-bold opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]">Explorar</span>
                          <div className="w-[50px] h-[50px] rounded-full flex items-center justify-center bg-white/10 border border-white/20 backdrop-blur-md group-hover:bg-white group-hover:text-[#212121] transition-all duration-500 text-white">
                            <ArrowUpRight size={22} className="transition-transform duration-500 group-hover:scale-110" strokeWidth={1.5} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
