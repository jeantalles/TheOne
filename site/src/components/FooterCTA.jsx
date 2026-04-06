import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const INTRO_WORDS = ['NÃO', 'SEJA', 'SÓ', 'MAIS', 'UMA', 'MARCA'];

const DARK_BG = [33, 33, 33];
const WARM_BG = [245, 240, 236];
const ACCENT = [255, 75, 28];

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value));
}

function norm(value, start, end) {
  return clamp((value - start) / (end - start));
}

function lerp(start, end, amount) {
  return start + (end - start) * amount;
}

function easeOut3(value) {
  return 1 - Math.pow(1 - value, 3);
}

function easeInOut3(value) {
  return value < 0.5
    ? 4 * value * value * value
    : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function mixColor(from, to, amount) {
  return `rgb(${Math.round(lerp(from[0], to[0], amount))}, ${Math.round(lerp(from[1], to[1], amount))}, ${Math.round(lerp(from[2], to[2], amount))})`;
}

function rgba(rgb, alpha) {
  return `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, ${alpha})`;
}

function buildParticles(width, height) {
  const spacing = width < 768 ? 36 : width < 1200 ? 46 : 54;
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const offsetX = (width - (cols - 1) * spacing) / 2;
  const offsetY = (height - (rows - 1) * spacing) / 2;
  const particles = [];

  const centerX = width / 2;
  const centerY = height / 2;
  const maxDist = Math.hypot(centerX, centerY);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = offsetX + col * spacing + (row % 2 ? spacing * 0.14 : 0) + (Math.random() - 0.5) * 3;
      const y = offsetY + row * spacing + (Math.random() - 0.5) * 3;
      const dist = Math.hypot(x - centerX, y - centerY);

      particles.push({
        x,
        y,
        dist,
        radius: (width < 768 ? 1.8 : 2.4) + Math.random() * (width < 768 ? 1.5 : 2.7),
        alpha: 0.14 + Math.random() * 0.22,
        delay: dist / maxDist * 0.56 + Math.random() * 0.08,
        pulseOffset: Math.random() * Math.PI * 2,
        pulseSpeed: 0.012 + Math.random() * 0.018,
        isCenter: false,
      });
    }
  }

  let centerIndex = 0;
  let nearest = Number.POSITIVE_INFINITY;

  for (let i = 0; i < particles.length; i += 1) {
    if (particles[i].dist < nearest) {
      nearest = particles[i].dist;
      centerIndex = i;
    }
  }

  particles[centerIndex].isCenter = true;
  return particles;
}

function TheOneMark({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="455 45 340 340"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx="619.102"
        cy="212.796"
        r="134.026"
        transform="rotate(0.0488355 619.102 212.796)"
        stroke="url(#footerMarkRing)"
        strokeWidth="20"
      />
      <path
        d="M574.527 273.95L575.787 287.458H662.663L663.553 273.724L628.936 266.186L610.253 266.186L574.527 273.95Z"
        fill="#FF8464"
      />
      <path
        d="M628.171 269.03L612.727 268.125L618.772 164.989L620.707 131.978L636.151 132.884L628.171 269.03Z"
        fill="url(#footerMarkStem)"
      />
      <path
        d="M616.291 138.235C611.014 155.185 590.388 161.451 579.433 162.098L577.68 195.544C593.895 194.651 608.085 187.972 613.899 183.863L616.291 138.235Z"
        fill="#FF8B6D"
      />
      <defs>
        <linearGradient id="footerMarkRing" x1="453.691" y1="46.7476" x2="769.555" y2="285.732" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD7CD" />
          <stop offset="1" stopColor="#FF4B1C" />
        </linearGradient>
        <linearGradient id="footerMarkStem" x1="467.947" y1="40.996" x2="783.123" y2="90.5032" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FFD7CD" />
          <stop offset="1" stopColor="#FF4B1C" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export default function FooterCTA() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const glowRef = useRef(null);
  const grainRef = useRef(null);
  const introRef = useRef(null);
  const introWordRefs = useRef([]);
  const canvasRef = useRef(null);
  const logoRef = useRef(null);
  const logoShellRef = useRef(null);
  const finalWrapRef = useRef(null);
  const finalTitleRef = useRef(null);
  const finalBodyRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');

    if (!canvas || !ctx) {
      return undefined;
    }

    let rafId = 0;
    let scrollProgress = 0;
    let particles = [];
    let frameTick = 0;
    let viewportWidth = window.innerWidth;
    let viewportHeight = window.innerHeight;

    const resizeCanvas = () => {
      viewportWidth = window.innerWidth;
      viewportHeight = window.innerHeight;

      const dpr = window.devicePixelRatio || 1;
      canvas.width = viewportWidth * dpr;
      canvas.height = viewportHeight * dpr;
      canvas.style.width = `${viewportWidth}px`;
      canvas.style.height = `${viewportHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      particles = buildParticles(viewportWidth, viewportHeight);
    };

    const setSceneStyles = (progress) => {
      const bgShift = easeInOut3(norm(progress, 0, 0.14));
      const introExit = easeOut3(norm(progress, 0.2, 0.32));
      const logoReveal = easeOut3(norm(progress, 0.5, 0.62));
      const takeover = easeInOut3(norm(progress, 0.62, 0.76));
      const clearScene = easeOut3(norm(progress, 0.76, 0.86));
      const finalTitle = easeOut3(norm(progress, 0.84, 0.93));
      const finalBody = easeOut3(norm(progress, 0.9, 1));

      stickyRef.current.style.backgroundColor = mixColor(DARK_BG, WARM_BG, bgShift);

      glowRef.current.style.opacity = `${lerp(0.15, 0.6, bgShift)}`;
      glowRef.current.style.background = `
        radial-gradient(circle at 50% 50%, rgba(255, 109, 64, ${lerp(0.08, 0.16, logoReveal)}) 0%, rgba(255, 109, 64, 0) 38%),
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, ${lerp(0.08, 0.02, bgShift)}) 0%, rgba(255, 255, 255, 0) 34%)
      `;

      grainRef.current.style.opacity = `${lerp(0.12, 0.04, bgShift)}`;

      introRef.current.style.opacity = `${1 - introExit}`;
      introRef.current.style.transform = `translateY(${lerp(0, -28, introExit).toFixed(1)}px)`;

      introWordRefs.current.forEach((word, index) => {
        if (!word) return;

        const wordIn = easeOut3(norm(progress, 0.04 + index * 0.018, 0.12 + index * 0.018));
        const wordOut = easeInOut3(norm(progress, 0.19 + index * 0.012, 0.29 + index * 0.012));
        const opacity = wordIn * (1 - wordOut);
        const blur = lerp(18, 0, wordIn) + lerp(0, 14, wordOut);
        const translateY = lerp(32, 0, wordIn) + lerp(0, -18, wordOut);
        const letterSpacing = lerp(0.18, 0.02, wordIn);

        word.style.opacity = opacity.toFixed(3);
        word.style.filter = `blur(${blur.toFixed(2)}px)`;
        word.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
        word.style.letterSpacing = `${letterSpacing.toFixed(3)}em`;
      });

      const logoOpacity = logoReveal * (1 - clearScene);
      const logoScale = lerp(0.74, 1, logoReveal) * lerp(1, viewportWidth < 768 ? 4 : 5.4, takeover);
      const logoY = lerp(18, 0, logoReveal) - clearScene * 34;
      const logoBlur = lerp(18, 0, logoReveal) + clearScene * 14;

      logoRef.current.style.opacity = logoOpacity.toFixed(3);
      logoRef.current.style.filter = `blur(${logoBlur.toFixed(2)}px)`;
      logoRef.current.style.transform = `translate3d(0, ${logoY.toFixed(1)}px, 0) scale(${logoScale.toFixed(4)})`;

      logoShellRef.current.style.boxShadow = `0 0 ${lerp(60, 140, logoReveal + takeover * 0.5).toFixed(0)}px rgba(255, 94, 51, ${lerp(0.12, 0.28, logoReveal)})`;
      logoShellRef.current.style.opacity = `${lerp(0.88, 1, logoReveal)}`;

      finalTitleRef.current.style.opacity = finalTitle.toFixed(3);
      finalTitleRef.current.style.filter = `blur(${lerp(18, 0, finalTitle).toFixed(2)}px)`;
      finalTitleRef.current.style.transform = `translate3d(0, ${lerp(32, 0, finalTitle).toFixed(1)}px, 0)`;

      finalBodyRef.current.style.opacity = finalBody.toFixed(3);
      finalBodyRef.current.style.filter = `blur(${lerp(14, 0, finalBody).toFixed(2)}px)`;
      finalBodyRef.current.style.transform = `translate3d(0, ${lerp(24, 0, finalBody).toFixed(1)}px, 0)`;

      finalWrapRef.current.style.pointerEvents = progress > 0.95 ? 'auto' : 'none';
    };

    const draw = () => {
      frameTick += 1;
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      const buildGrid = easeOut3(norm(scrollProgress, 0.18, 0.52));
      const logoReveal = easeOut3(norm(scrollProgress, 0.5, 0.62));
      const takeover = easeInOut3(norm(scrollProgress, 0.62, 0.76));
      const clearScene = easeOut3(norm(scrollProgress, 0.76, 0.86));
      const sceneOpacity = 1 - easeOut3(norm(scrollProgress, 0.82, 0.9));

      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      const maxDist = Math.hypot(centerX, centerY);
      const smallCenter = viewportWidth < 768 ? 18 : 22;
      const settledCenter = viewportWidth < 768 ? 82 : 108;
      const logoCenter = viewportWidth < 768 ? 98 : 132;
      const hugeCenter = Math.max(viewportWidth, viewportHeight) * 0.9;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        particle.pulseOffset += particle.pulseSpeed;

        if (particle.isCenter) {
          const revealRadius = lerp(smallCenter, settledCenter, buildGrid);
          const logoRadius = lerp(settledCenter, logoCenter, logoReveal);
          const takeoverRadius = lerp(logoCenter, hugeCenter, takeover);
          const radius = clearScene > 0
            ? lerp(takeoverRadius, hugeCenter * 1.06, clearScene)
            : takeover > 0
              ? takeoverRadius
              : logoReveal > 0
                ? logoRadius
                : revealRadius;

          const alpha = sceneOpacity * lerp(0.14, 1, Math.max(buildGrid, logoReveal)) * (1 - clearScene * 0.92);

          if (alpha > 0.01) {
            const gradient = ctx.createRadialGradient(
              centerX - radius * 0.24,
              centerY - radius * 0.28,
              radius * 0.12,
              centerX,
              centerY,
              radius
            );

            gradient.addColorStop(0, `rgba(255, 215, 205, ${(alpha * 0.96).toFixed(3)})`);
            gradient.addColorStop(0.48, `rgba(255, 127, 84, ${(alpha * 0.92).toFixed(3)})`);
            gradient.addColorStop(1, `rgba(255, 75, 28, ${(alpha * 0.98).toFixed(3)})`);

            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }

          continue;
        }

        const appear = easeOut3(clamp((buildGrid - particle.delay) / 0.24));

        if (appear <= 0.001) {
          continue;
        }

        const distanceFactor = 1 - particle.dist / maxDist;
        const pulse = 0.9 + Math.sin(frameTick * 0.04 + particle.pulseOffset) * 0.12;
        const fadeByTakeover = 1 - takeover * lerp(0.76, 1.08, distanceFactor);
        const fadeByClear = 1 - clearScene;
        const alpha = particle.alpha * appear * fadeByTakeover * fadeByClear * sceneOpacity;

        if (alpha <= 0.01) {
          continue;
        }

        const radius = particle.radius * lerp(0.35, 1, appear) * pulse * lerp(1, 0.84, takeover);
        const tint = 0.18 + 0.18 * appear + 0.12 * distanceFactor;
        const color = [
          Math.round(lerp(196, ACCENT[0], tint)),
          Math.round(lerp(191, ACCENT[1], tint)),
          Math.round(lerp(184, ACCENT[2], tint)),
        ];

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = rgba(color, alpha.toFixed(3));
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      resizeCanvas();
      ScrollTrigger.refresh();
    };

    resizeCanvas();
    setSceneStyles(0);
    draw();

    const fontReady = document.fonts?.ready;
    if (fontReady) {
      fontReady.then(() => {
        resizeCanvas();
        ScrollTrigger.refresh();
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: '+=560%',
      pin: true,
      scrub: 0.85,
      anticipatePin: 1,
      onUpdate(self) {
        scrollProgress = self.progress;
        setSceneStyles(scrollProgress);
      },
    });

    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      trigger.kill();
    };
  }, []);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative border-t border-white/5"
      style={{ height: '560vh', backgroundColor: '#212121' }}
    >
      <div ref={stickyRef} className="sticky top-0 h-screen overflow-hidden">
        <div ref={glowRef} className="pointer-events-none absolute inset-0 z-0 opacity-20" />

        <div
          ref={grainRef}
          className="pointer-events-none absolute inset-0 z-0 opacity-10"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0, 0, 0, 0.06) 0.5px, transparent 0.5px),
              radial-gradient(circle at 80% 60%, rgba(0, 0, 0, 0.05) 0.5px, transparent 0.5px)
            `,
            backgroundSize: '24px 24px, 28px 28px',
            mixBlendMode: 'multiply',
          }}
        />

        <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={{ willChange: 'transform, opacity' }}
        >
          <h2
            className="max-w-[1200px] text-center font-sans font-black uppercase leading-[0.9] text-[#151311]"
            style={{ fontSize: 'clamp(2.7rem, 8.3vw, 8rem)' }}
          >
            {INTRO_WORDS.map((word, index) => (
              <span
                key={word}
                ref={(node) => {
                  introWordRefs.current[index] = node;
                }}
                className="inline-block"
                style={{
                  opacity: 0,
                  filter: 'blur(18px)',
                  transform: 'translate3d(0, 32px, 0)',
                  willChange: 'transform, filter, opacity',
                  marginRight: index === INTRO_WORDS.length - 1 ? 0 : '0.16em',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>

        <div
          ref={logoRef}
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center opacity-0"
          style={{ willChange: 'transform, opacity, filter' }}
        >
          <div
            ref={logoShellRef}
            className="relative flex aspect-square items-center justify-center rounded-full"
            style={{
              width: 'min(20vw, 240px)',
              minWidth: '140px',
              background: 'radial-gradient(circle at 30% 25%, rgba(255, 232, 225, 0.98) 0%, rgba(255, 140, 101, 0.96) 52%, rgba(255, 75, 28, 0.98) 100%)',
            }}
          >
            <div className="absolute inset-[8%] rounded-full border border-white/30" />
            <TheOneMark className="relative z-10 h-[76%] w-[76%]" />
          </div>
        </div>

        <div
          ref={finalWrapRef}
          className="absolute inset-0 z-40 flex items-center justify-center px-6"
          style={{ pointerEvents: 'none' }}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h2
              ref={finalTitleRef}
              style={{
                opacity: 0,
                filter: 'blur(18px)',
                transform: 'translate3d(0, 32px, 0)',
                willChange: 'transform, filter, opacity',
              }}
            >
              <span
                className="block font-sans font-black uppercase leading-[0.9] text-[#151311]"
                style={{ fontSize: 'clamp(3.3rem, 8.6vw, 8rem)', letterSpacing: '-0.06em' }}
              >
                Não seja só mais um.
              </span>
              <span
                className="mt-2 block font-editorial italic leading-[0.92] text-transparent bg-clip-text bg-gradient-to-r from-[#B84E2F] via-[#E56C49] to-[#FF4B1C]"
                style={{ fontSize: 'clamp(3rem, 7.8vw, 7rem)' }}
              >
                Seja TheOne.
              </span>
            </h2>

            <div
              ref={finalBodyRef}
              className="mt-10 flex flex-col items-center"
              style={{
                opacity: 0,
                filter: 'blur(14px)',
                transform: 'translate3d(0, 24px, 0)',
                willChange: 'transform, filter, opacity',
              }}
            >
              <p className="mx-auto max-w-3xl text-[clamp(1.1rem,2vw,1.5rem)] font-halyard font-light leading-[1.5] text-[#4D4642]">
                O topo do mercado não é sorte, é construção. Se você tem visão, ambição e busca transformar sua empresa na escolha inevitável do seu cliente — estamos prontos para construir isso com você.
              </p>

              <a
                href="mailto:contato@theone.com?subject=Agendar%20Diagn%C3%B3stico%20TheOne"
                className="group mt-12 inline-flex items-center gap-3 rounded-full bg-[#151311] px-10 py-5 text-[11px] font-semibold uppercase tracking-[0.26em] text-[#F5F0EC] transition-[transform,background-color,box-shadow] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] hover:bg-[#FF4B1C] hover:shadow-[0_22px_90px_rgba(255,75,28,0.22)] active:scale-[0.97]"
              >
                Agendar Diagnóstico
                <svg
                  className="h-4 w-4 transition-transform duration-200 ease-out group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14m-6-6 6 6-6 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
