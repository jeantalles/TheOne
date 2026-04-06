import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PrimaryCTAButton from './PrimaryCTAButton';

gsap.registerPlugin(ScrollTrigger);

const INTRO_WORDS = ['Não', 'seja', 'só', 'mais', 'uma', 'marca.'];

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
  const spacing = width < 768 ? 52 : width < 1200 ? 62 : 72;
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const offsetX = (width - (cols - 1) * spacing) / 2;
  const offsetY = (height - (rows - 1) * spacing) / 2;
  const particles = [];
  const centerX = width / 2;
  const centerY = height / 2;

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      const x = offsetX + col * spacing + (row % 2 ? spacing * 0.14 : 0) + (Math.random() - 0.5) * 3;
      const y = offsetY + row * spacing + (Math.random() - 0.5) * 3;

      particles.push({
        x,
        y,
        radius: (width < 768 ? 10 : 16) + Math.random() * (width < 768 ? 6 : 8),
        alpha: 0.15 + Math.random() * 0.2,
        delay: Math.random() * 0.6,
        isCenter: false,
      });
    }
  }

  let centerIndex = 0;
  let nearest = Number.POSITIVE_INFINITY;

  for (let i = 0; i < particles.length; i += 1) {
    const distance = Math.hypot(particles[i].x - centerX, particles[i].y - centerY);
    if (distance < nearest) {
      nearest = distance;
      centerIndex = i;
    }
  }

  particles[centerIndex].isCenter = true;
  particles[centerIndex].radius = 16;
  particles[centerIndex].alpha = 0.35;
  return particles;
}

function TheOneMark({ className = '', bgRef, outlineRef, pathRefs }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="449.102 42.796 340 340"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        ref={bgRef}
        cx="619.102"
        cy="212.796"
        r="134.026"
        fill="rgba(140, 140, 140, 0.35)"
      />
      <circle
        ref={outlineRef}
        cx="619.102"
        cy="212.796"
        r="134.026"
        transform="rotate(0.0488355 619.102 212.796)"
        stroke="url(#footerMarkRing)"
        strokeWidth="20"
        strokeDasharray="845"
        strokeDashoffset="845"
      />
      <path
        ref={(el) => { if (el && pathRefs) pathRefs.current[0] = el; }}
        d="M574.527 273.95L575.787 287.458H662.663L663.553 273.724L628.936 266.186L610.253 266.186L574.527 273.95Z"
        fill="#FF8464"
        style={{ opacity: 0 }}
      />
      <path
        ref={(el) => { if (el && pathRefs) pathRefs.current[1] = el; }}
        d="M628.171 269.03L612.727 268.125L618.772 164.989L620.707 131.978L636.151 132.884L628.171 269.03Z"
        fill="url(#footerMarkStem)"
        style={{ opacity: 0 }}
      />
      <path
        ref={(el) => { if (el && pathRefs) pathRefs.current[2] = el; }}
        d="M616.291 138.235C611.014 155.185 590.388 161.451 579.433 162.098L577.68 195.544C593.895 194.651 608.085 187.972 613.899 183.863L616.291 138.235Z"
        fill="#FF8B6D"
        style={{ opacity: 0 }}
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
  const logoBgRef = useRef(null);
  const logoOutlineRef = useRef(null);
  const logoPathRefs = useRef([]);
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
        const bgShift = easeInOut3(norm(progress, 0, 0.16));
        const introExit = easeInOut3(norm(progress, 0.25, 0.40));
        const gridBuild = easeOut3(norm(progress, 0.15, 0.50));
        const logoReveal = easeOut3(norm(progress, 0.46, 0.58));
        const takeover = easeInOut3(norm(progress, 0.58, 0.76));
        const clearScene = easeOut3(norm(progress, 0.74, 0.82));
        const finalTitle = easeOut3(norm(progress, 0.80, 0.88));
        const finalBody = easeOut3(norm(progress, 0.84, 0.94));

      stickyRef.current.style.backgroundColor = mixColor(DARK_BG, WARM_BG, bgShift);

      // Sincroniza o tema da Navbar com a cor de fundo animada
      if (bgShift > 0.5) {
        stickyRef.current.setAttribute('data-navbar-theme', 'light');
      } else {
        stickyRef.current.removeAttribute('data-navbar-theme');
      }

      glowRef.current.style.opacity = `${lerp(0.15, 0.6, bgShift)}`;
      glowRef.current.style.background = `
        radial-gradient(circle at 50% 50%, rgba(255, 109, 64, ${lerp(0.08, 0.16, logoReveal)}) 0%, rgba(255, 109, 64, 0) 38%),
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, ${lerp(0.08, 0.02, bgShift)}) 0%, rgba(255, 255, 255, 0) 34%)
      `;

      grainRef.current.style.opacity = `${lerp(0.12, 0.04, bgShift)}`;

        introRef.current.style.opacity = `${1 - introExit}`;
        introRef.current.style.transform = `translateY(${lerp(0, -44, introExit).toFixed(1)}px) scale(${lerp(1, 0.94, introExit).toFixed(4)})`;

      introWordRefs.current.forEach((word, index) => {
        if (!word) return;

          const wordIn = easeOut3(norm(progress, 0.04 + index * 0.018, 0.13 + index * 0.018));
          const wordOut = easeInOut3(norm(progress, 0.25 + index * 0.016, 0.35 + index * 0.016));
          const opacity = wordIn * (1 - wordOut);
          const blur = lerp(22, 0, wordIn) + lerp(0, 18, wordOut);
          const translateY = lerp(40, 0, wordIn) + lerp(0, -26, wordOut);

        word.style.opacity = opacity.toFixed(3);
        word.style.filter = `blur(${blur.toFixed(2)}px)`;
        word.style.transform = `translate3d(0, ${translateY.toFixed(1)}px, 0)`;
      });

        const baseWidth = Math.max(140, Math.min(viewportWidth * 0.2, 240));
        const svgCircleRatio = 268.052 / 340;
        const initialScale = 32 / (baseWidth * svgCircleRatio);
        const logoScale = lerp(initialScale, 1, logoReveal) * lerp(1, viewportWidth < 768 ? 4 : 5.4, takeover);
        const logoY = -clearScene * 34;
        const logoBlur = clearScene * 14;

      logoRef.current.style.opacity = logoReveal > 0.001 ? (1 - clearScene).toFixed(3) : '0';
      logoRef.current.style.filter = `blur(${logoBlur.toFixed(2)}px)`;
      logoRef.current.style.transform = `translate3d(0, ${logoY.toFixed(1)}px, 0) scale(${logoScale.toFixed(4)})`;

      if (logoBgRef.current) {
        logoBgRef.current.style.fill = `rgba(${lerp(140, 245, logoReveal)}, ${lerp(140, 238, logoReveal)}, ${lerp(140, 235, logoReveal)}, ${lerp(0.35, 1, logoReveal)})`;
      }
      if (logoOutlineRef.current) {
        logoOutlineRef.current.style.strokeDashoffset = `${lerp(845, 0, logoReveal)}`;
      }
      logoPathRefs.current.forEach((path) => {
        if (path) path.style.opacity = logoReveal;
      });

      logoShellRef.current.style.boxShadow = 'none';
      logoShellRef.current.style.opacity = '1';

      const titleBlur = lerp(18, 0, finalTitle);
      const titleY = lerp(32, 0, finalTitle);
      finalTitleRef.current.style.opacity = finalTitle.toFixed(3);
      finalTitleRef.current.style.filter = titleBlur > 0.05 ? `blur(${titleBlur.toFixed(2)}px)` : 'none';
      finalTitleRef.current.style.transform = titleY > 0.1 ? `translate3d(0, ${titleY.toFixed(1)}px, 0)` : 'none';

      const bodyBlur = lerp(14, 0, finalBody);
      const bodyY = lerp(24, 0, finalBody);
      finalBodyRef.current.style.opacity = finalBody.toFixed(3);
      finalBodyRef.current.style.filter = bodyBlur > 0.05 ? `blur(${bodyBlur.toFixed(2)}px)` : 'none';
      finalBodyRef.current.style.transform = bodyY > 0.1 ? `translate3d(0, ${bodyY.toFixed(1)}px, 0)` : 'none';

        finalWrapRef.current.style.pointerEvents = progress > 0.94 ? 'auto' : 'none';
      };

      const draw = () => {
        frameTick += 1;
        ctx.clearRect(0, 0, viewportWidth, viewportHeight);

        const buildGrid = easeOut3(norm(scrollProgress, 0.15, 0.50));
        const logoReveal = easeOut3(norm(scrollProgress, 0.46, 0.58));
        const takeover = easeInOut3(norm(scrollProgress, 0.58, 0.76));
        const clearScene = easeOut3(norm(scrollProgress, 0.74, 0.82));
        const sceneOpacity = easeOut3(norm(scrollProgress, 0.15, 0.25)) * (1 - easeOut3(norm(scrollProgress, 0.78, 0.86)));

        const centerX = viewportWidth / 2;
        const centerY = viewportHeight / 2;
        const logoCenter = viewportWidth < 768 ? 128 : 170;
        const hugeCenter = Math.max(viewportWidth, viewportHeight) * 0.9;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];

        const appear = easeOut3(clamp((buildGrid - particle.delay) / 0.13));

        if (appear <= 0.001) {
          continue;
        }

        const centerDistance = Math.hypot(particle.x - centerX, particle.y - centerY);
        const distanceFactor = 1 - centerDistance / Math.hypot(centerX, centerY);
        const fadeByTakeover = particle.isCenter
          ? (logoReveal > 0.001 ? 0 : 1)
          : 1 - takeover * lerp(0.8, 1.12, distanceFactor);
        const fadeByClear = 1 - clearScene;
        const alpha = particle.alpha * appear * fadeByTakeover * fadeByClear * sceneOpacity;

        if (alpha > 0.01) {
          const radius = particle.radius * appear * lerp(1, 0.82, takeover);
          const color = [140, 140, 140];

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = rgba(color, alpha.toFixed(3));
          ctx.fill();
        }
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
      end: 'bottom bottom',
      scrub: 0.85,
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
            className="max-w-[900px] text-center font-sans font-normal leading-[1.1] text-[#151311]"
            style={{ fontSize: 'clamp(1.8rem, 4.5vw, 4rem)', letterSpacing: '-0.02em' }}
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
                  filter: 'blur(22px)',
                  transform: 'translate3d(0, 40px, 0)',
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
          className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center"
          style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
        >
          <div
            ref={logoShellRef}
            className="relative flex aspect-square items-center justify-center"
            style={{
              width: 'min(20vw, 240px)',
              minWidth: '140px',
            }}
          >
            <TheOneMark 
              className="relative z-10 h-full w-full"
              bgRef={logoBgRef}
              outlineRef={logoOutlineRef}
              pathRefs={logoPathRefs}
            />
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
                className="block font-sans font-medium leading-[0.92] text-[#151311]"
                style={{ fontSize: 'clamp(2.9rem, 7.2vw, 6.6rem)', letterSpacing: '-0.035em' }}
              >
                Não seja só mais um.
              </span>
              <span
                className="mt-2 block font-sans font-medium leading-[0.92]"
                style={{ 
                  fontSize: 'clamp(2.7rem, 6.8vw, 6.2rem)', 
                  letterSpacing: '-0.03em',
                  background: 'linear-gradient(to right, #FED1C5, #FF5224)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  color: 'transparent',
                }}
              >
                Seja TheOne
                <span
                  className="inline-block align-top font-halyard text-[#FF8E6C]"
                  style={{
                    fontSize: '0.288em',
                    letterSpacing: '0.04em',
                    marginLeft: '0.18em',
                    marginTop: '0.55em',
                    fontWeight: 600,
                  }}
                >
                  &trade;
                </span>
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

              <PrimaryCTAButton
                href="mailto:contato@theone.com?subject=Agendar%20Diagn%C3%B3stico%20TheOne"
                className="mt-12"
                style={{
                  minWidth: '320px',
                  color: '#F5F0EC',
                }}
              >
                Agendar Diagnóstico
              </PrimaryCTAButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
