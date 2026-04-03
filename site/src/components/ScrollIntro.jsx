import { useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// ── Phase boundaries (scroll progress 0 → 1) ─────────────────────────────
const P1 = 0.08; // grid estático, mouse reage
const P2 = 0.40; // centro cresce, outras bolinhas são esmagadas
const P3 = 0.50; // hold do círculo central gigante
const P4 = 0.65; // blur bridge (canvas crossfade para DOM "TheOne")
const P5 = 0.85; // o texto "TheOne" escala e movimenta até a posição final da H1
const P6 = 1.00; // hero body fadeIn ("Construímos marcas" + "™" + h2 + p + CTA)

const H1_FONT_SIZE = 64;

function lerp(a, b, t) { return a + (b - a) * Math.max(0, Math.min(1, t)); }
function easeOut3(t) { return 1 - Math.pow(1 - t, 3); }
function easeInOut3(t) {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function SpotlightButton() {
  const btnRef = useRef(null);
  const [pos, setPos] = useState({ x: '50%', y: '50%' });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e) => {
    const rect = btnRef.current.getBoundingClientRect();
    setPos({ x: `${e.clientX - rect.left}px`, y: `${e.clientY - rect.top}px` });
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative font-sans font-normal capitalize text-white cursor-pointer active:scale-[0.97] transition-transform"
      style={{
        fontSize: '18px',
        padding: '18px 52px',
        borderRadius: '100px',
        letterSpacing: '0.01em',
        background: hovered
          ? `radial-gradient(80px circle at ${pos.x} ${pos.y}, rgba(255,82,36,0.28), rgba(255,255,255,0.04) 70%), rgba(255,255,255,0.06)`
          : 'rgba(255,255,255,0.06)',
        border: hovered ? `1px solid rgba(255,82,36,0.50)` : '1px solid rgba(255,255,255,0.12)',
        boxShadow: hovered ? `0 0 24px rgba(255,82,36,0.10)` : 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
      }}
    >
      Quero Ser TheOne
    </button>
  );
}

export default function ScrollIntro() {
  const sectionRef    = useRef(null);
  const canvasRef     = useRef(null);
  const bigTextRef    = useRef(null);
  const h1WrapRef     = useRef(null);
  const targetSpanRef = useRef(null);
  const prefixRef     = useRef(null);
  const suffixRef     = useRef(null);
  const heroBodyRef   = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const DPR    = window.devicePixelRatio || 1;
    const W      = window.innerWidth;
    const H      = window.innerHeight;

    canvas.width        = W * DPR;
    canvas.height       = H * DPR;
    canvas.style.width  = W + 'px';
    canvas.style.height = H + 'px';
    ctx.scale(DPR, DPR);

    const bigFontSize = Math.min(W * 0.22, 320);
    const finalScale  = H1_FONT_SIZE / bigFontSize;

    let targetDx = 0, targetDy = 0;
    const updateTargetPosition = () => {
      if (targetSpanRef.current && bigTextRef.current) {
        const tr = targetSpanRef.current.getBoundingClientRect();
        targetDx = (tr.left + tr.width / 2) - (window.innerWidth / 2);
        targetDy = (tr.top + tr.height / 2) - (window.innerHeight / 2);
      }
    };
    setTimeout(updateTargetPosition, 100);
    window.addEventListener('resize', updateTargetPosition);

    // ── Mouse ────────────────────────────────────────────────────────────
    let mouseX = -9999, mouseY = -9999;
    const onMouseMove = (e) => { mouseX = e.clientX; mouseY = e.clientY; };
    window.addEventListener('mousemove', onMouseMove);

    // ── Partículas (Grid Base) ──────────────────────────────────────────
    function buildParticles() {
      const SPACING = 48;
      const COLS    = Math.ceil(W / SPACING) + 1;
      const ROWS    = Math.ceil(H / SPACING) + 1;
      const list    = [];

      for (let row = 0; row < ROWS; row++) {
        for (let col = 0; col < COLS; col++) {
          list.push({
            originX:     col * SPACING,
            originY:     row * SPACING,
            isCenter:    false,
            radius:      Math.random() * 2.0 + 3.0,
            breathPhase: Math.random() * Math.PI * 2,
            breathSpeed: Math.random() * 0.014 + 0.008,
          });
        }
      }

      let minDiff = Infinity, centerIdx = 0;
      for (let i = 0; i < list.length; i++) {
        const p = list[i];
        const dx = p.originX - W / 2;
        const dy = p.originY - H / 2;
        const d2 = dx * dx + dy * dy;
        if (d2 < minDiff) { minDiff = d2; centerIdx = i; }
      }
      list[centerIdx].isCenter = true;
      return list;
    }

    let particles = [], scrollProgress = 0, rafId;

    document.fonts.ready.then(() => {
      particles = buildParticles();

      function draw() {
        ctx.clearRect(0, 0, W, H);
        const hugeRadius = Math.min(W * 0.40, 500);

        // 2 passes: não-centro primeiro, centro por cima (para cobrir as outras bolinhas)
        for (let pass = 0; pass < 2; pass++) {
          for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            if (pass === 0 &&  p.isCenter) continue;
            if (pass === 1 && !p.isCenter) continue;

            p.breathPhase += p.breathSpeed;
            const breath = Math.sin(p.breathPhase) * 0.12 + 0.88;
            let x, y, r, alpha;
            let cr = 255, cg = 255, cb = 255;

            // Phase 1 — grid estático + reatividade do mouse
            if (scrollProgress < P1) {
              x = p.originX; y = p.originY; r = p.radius;
              if (!p.isCenter) {
                const dx = x - mouseX, dy = y - mouseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 85) {
                  const s = easeOut3(1 - dist / 85);
                  x += dx * s * 0.32; y += dy * s * 0.32;
                  r = p.radius + s * 2.2;
                  cr = 254; cg = Math.round(lerp(255, 130, s)); cb = Math.round(lerp(255, 90, s));
                }
              }
              alpha = breath * (p.isCenter ? 0.7 : 0.45);

            // Phase 2 — O Círculo Eleito Cresce, as Outras São Esmagadas
            } else if (scrollProgress < P2) {
              const t = easeInOut3((scrollProgress - P1) / (P2 - P1));

              if (p.isCenter) {
                // Vai ao centro, cresce brutal e fica laranja
                x = lerp(p.originX, W / 2, t);
                y = lerp(p.originY, H / 2, t);
                r = lerp(p.radius, hugeRadius, t);
                cr = 255; cg = Math.round(lerp(255, 82, t)); cb = Math.round(lerp(255, 36, t));
                alpha = breath * lerp(0.7, 1.0, t);
              } else {
                // ESMAGAMENTO: deriva levemente em direção ao centro e desvanece
                // (o círculo laranja cresce por cima e as suprime visivelmente)
                const crushT = easeOut3((scrollProgress - P1) / (P2 - P1));
                // Deriva 30% do caminho em direção ao centro
                x = lerp(p.originX, W / 2 + (p.originX - W / 2) * 0.7, crushT);
                y = lerp(p.originY, H / 2 + (p.originY - H / 2) * 0.7, crushT);
                r = p.radius * lerp(1, 0.5, crushT);
                alpha = lerp(0.45, 0, crushT);
                if (alpha <= 0.01) continue;
              }

            // Phase 3 — Estabilidade Laranja
            } else if (scrollProgress < P3) {
              if (!p.isCenter) continue;
              x = W / 2; y = H / 2; r = hugeRadius;
              cr = 255; cg = 82; cb = 36;
              alpha = 1.0 * breath;

            // Phase 4 — Blur Bridge Canvas → DOM
            } else if (scrollProgress < P4) {
              if (!p.isCenter) continue;
              const t = easeOut3((scrollProgress - P3) / (P4 - P3));
              x = W / 2; y = H / 2; r = hugeRadius;
              cr = 255; cg = 82; cb = 36;
              alpha = lerp(1.0, 0, t);
              if (alpha <= 0.01) continue;
            } else {
              continue;
            }

            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${cr},${cg},${cb},${alpha.toFixed(3)})`;
            ctx.fill();
          }
        }
      }

      function loop() { draw(); rafId = requestAnimationFrame(loop); }
      loop();
    });

    // ── ScrollTrigger ─────────────────────────────────────────────────────
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start:   'top top',
      end:     '+=420%',
      pin:     true,
      scrub:   0.8,
      onUpdate(self) {
        scrollProgress = self.progress;
        const bigText  = bigTextRef.current;
        const targetSp = targetSpanRef.current;
        const prefix   = prefixRef.current;
        const suffix   = suffixRef.current;
        const heroBody = heroBodyRef.current;

        if (!bigText || !targetSp || !prefix || !suffix || !heroBody) return;

        // ── Hero body: aparece depois de P5 ─────────────────────────────
        if (scrollProgress < P5) {
          heroBody.style.opacity       = '0';
          heroBody.style.transform     = 'translateY(20px)';
          heroBody.style.pointerEvents = 'none';
        } else {
          const t = easeOut3((scrollProgress - P5) / (P6 - P5));
          heroBody.style.opacity       = t.toFixed(3);
          heroBody.style.transform     = `translateY(${lerp(20, 0, t).toFixed(1)}px)`;
          heroBody.style.pointerEvents = scrollProgress >= P6 ? 'auto' : 'none';
        }

        // ── Big "TheOne" DOM + H1 real ────────────────────────────────
        if (scrollProgress < P3) {
          bigText.style.opacity   = '0';
          bigText.style.filter    = 'blur(20px)';
          bigText.style.transform = 'translateX(0px) translateY(0px) scale(1.10)';
          targetSp.style.opacity  = '0';
          prefix.style.opacity    = '0';
          suffix.style.opacity    = '0';

        } else if (scrollProgress < P4) {
          const t    = easeOut3((scrollProgress - P3) / (P4 - P3));
          const blur = Math.max(0, 20 - t * 20);
          bigText.style.opacity   = t.toFixed(3);
          bigText.style.filter    = `blur(${blur.toFixed(1)}px)`;
          bigText.style.transform = `translateX(0px) translateY(0px) scale(${lerp(1.10, 1.0, t).toFixed(4)})`;
          targetSp.style.opacity  = '0';
          prefix.style.opacity    = '0';
          suffix.style.opacity    = '0';

        } else if (scrollProgress < P5) {
          const t     = easeInOut3((scrollProgress - P4) / (P5 - P4));
          const scale = lerp(1, finalScale, t);
          const xPos  = lerp(0, targetDx, t);
          const yPos  = lerp(0, targetDy, t);
          bigText.style.opacity   = '1';
          bigText.style.filter    = 'blur(0px)';
          bigText.style.transform = `translateX(${xPos.toFixed(1)}px) translateY(${yPos.toFixed(1)}px) scale(${scale.toFixed(5)})`;
          targetSp.style.opacity  = '0';
          prefix.style.opacity    = '0';
          prefix.style.transform  = 'translateX(-16px)';
          suffix.style.opacity    = '0';
          suffix.style.transform  = 'translateX(16px)';

        } else if (scrollProgress < P6) {
          const t = easeOut3((scrollProgress - P5) / (P6 - P5));
          bigText.style.opacity   = '0';
          targetSp.style.opacity  = '1';
          prefix.style.opacity    = t.toFixed(3);
          prefix.style.filter     = `blur(${Math.max(0, 4 - t * 4)}px)`;
          prefix.style.transform  = `translateX(${lerp(-16, 0, t).toFixed(1)}px)`;
          suffix.style.opacity    = t.toFixed(3);
          suffix.style.filter     = `blur(${Math.max(0, 4 - t * 4)}px)`;
          suffix.style.transform  = `translateX(${lerp(16, 0, t).toFixed(1)}px)`;

        } else {
          bigText.style.opacity   = '0';
          targetSp.style.opacity  = '1';
          prefix.style.opacity    = '1';
          prefix.style.filter     = 'blur(0px)';
          prefix.style.transform  = 'translateX(0px)';
          suffix.style.opacity    = '1';
          suffix.style.filter     = 'blur(0px)';
          suffix.style.transform  = 'translateX(0px)';
        }
      },
    });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', updateTargetPosition);
      st.kill();
    };
  }, []);

  return (
    <section ref={sectionRef} style={{ height: '420vh' }} className="relative bg-[#212121]">
      <div className="sticky top-0 h-screen overflow-hidden flex items-center justify-center">

        {/* Canvas das partículas */}
        <canvas ref={canvasRef} className="absolute inset-0 z-0 pointer-events-none" />

        {/* "TheOne" gigantesco que faz o blur bridge do canvas → DOM */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
          <span
            ref={bigTextRef}
            className="font-sans font-normal tracking-tight select-none text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224]"
            style={{
              fontSize: 'clamp(110px, 22vw, 320px)',
              lineHeight: 1,
              display: 'block',
              transformOrigin: 'center center',
              opacity: 0,
              willChange: 'transform, opacity, filter',
            }}
          >
            TheOne
          </span>
        </div>

        {/* Hero completo: H1 real + corpo (h2, parágrafo, CTAs) */}
        <div
          ref={h1WrapRef}
          className="absolute inset-0 flex flex-col items-center justify-center z-20 text-center px-6"
          style={{ paddingTop: '112px' }}
        >
          {/* H1 — alvo final da animação do bigText */}
          <h1
            className="font-sans font-normal tracking-tight leading-[1] text-transparent bg-clip-text bg-gradient-to-r from-[#FED1C5] to-[#FF5224] flex items-center pointer-events-none select-none"
            style={{ fontSize: `${H1_FONT_SIZE}px` }}
          >
            <span
              ref={prefixRef}
              className="inline-block"
              style={{ opacity: 0, willChange: 'opacity, transform, filter' }}
            >
              Construímos marcas&nbsp;
            </span>
            <span ref={targetSpanRef} style={{ opacity: 0 }}>
              TheOne
            </span>
            <span
              ref={suffixRef}
              className="inline-block"
              style={{ opacity: 0, willChange: 'opacity, transform, filter' }}
            >
              &trade;
            </span>
          </h1>

          {/* Corpo do Hero — aparece apenas após a animação (P5 → P6) */}
          <div
            ref={heroBodyRef}
            className="flex flex-col items-center"
            style={{ opacity: 0, willChange: 'opacity, transform', pointerEvents: 'none' }}
          >
            <h2
              className="font-editorial font-normal italic text-white"
              style={{ fontSize: '42px', paddingTop: '20px' }}
            >
              A única escolha na mente do seu cliente.
            </h2>

            <p
              className="mx-auto max-w-2xl mb-12 text-[#C7C7C7] font-light leading-[1.4] font-halyard"
              style={{ fontSize: '25px', marginTop: '32px' }}
            >
              Para negócios visionários que não querem ser mais uma opção e buscam se tornar Top 1 no seu mercado.
            </p>

            <div className="flex flex-row items-center justify-center gap-8">
              <SpotlightButton />
              <a
                href="#o-problema"
                className="group flex items-center gap-2 text-white/50 hover:text-white font-sans font-normal capitalize transition-colors duration-200"
                style={{ fontSize: '18px', letterSpacing: '0.01em' }}
              >
                O Que É A TheOne
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
