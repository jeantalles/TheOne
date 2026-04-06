import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PrimaryCTAButton from './PrimaryCTAButton';

gsap.registerPlugin(ScrollTrigger);

const INTRO_WORDS = ['Não', 'seja', 'só', 'mais', 'uma', 'marca.'];

const DARK_BG = [33, 33, 33];
const WARM_BG = [245, 240, 236];
const ORANGE_START = [255, 182, 163];
const ORANGE_END = [255, 84, 39];
const PARTICLE_GRAY = [140, 140, 140];

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

function blendRgb(from, to, amount) {
  return [
    Math.round(lerp(from[0], to[0], amount)),
    Math.round(lerp(from[1], to[1], amount)),
    Math.round(lerp(from[2], to[2], amount)),
  ];
}

function mixColor(from, to, amount) {
  const [r, g, b] = blendRgb(from, to, amount);
  return `rgb(${r}, ${g}, ${b})`;
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
  particles[centerIndex].x = centerX;
  particles[centerIndex].y = centerY;
  particles[centerIndex].radius = 16;
  particles[centerIndex].alpha = 0.35;
  return particles;
}

export default function FooterCTA() {
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const glowRef = useRef(null);
  const grainRef = useRef(null);
  const introRef = useRef(null);
  const introWordRefs = useRef([]);
  const canvasRef = useRef(null);
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
    let centerParticle = null;
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
      centerParticle = particles.find((particle) => particle.isCenter) ?? null;
    };

    const setSceneStyles = (progress) => {
      const bgShift = easeInOut3(norm(progress, 0, 0.16));
      const introExit = easeInOut3(norm(progress, 0.24, 0.39));
      const centerAccent = easeInOut3(norm(progress, 0.44, 0.56));
      const centerExpand = easeInOut3(norm(progress, 0.60, 0.76));
      const takeover = easeInOut3(norm(progress, 0.68, 0.88));
      const finalTitle = easeOut3(norm(progress, 0.80, 0.90));
      const finalBody = easeOut3(norm(progress, 0.84, 0.96));
      const baseBg = blendRgb(DARK_BG, WARM_BG, bgShift);

      stickyRef.current.style.backgroundColor = mixColor(baseBg, ORANGE_END, takeover);

      // Sincroniza o tema da Navbar com a cor de fundo animada
      if (bgShift > 0.5 || takeover > 0.08) {
        stickyRef.current.setAttribute('data-navbar-theme', 'light');
      } else {
        stickyRef.current.removeAttribute('data-navbar-theme');
      }

      glowRef.current.style.opacity = `${lerp(0.08, 0.34, Math.max(centerAccent * 0.8, centerExpand, takeover))}`;
      glowRef.current.style.background = `
        radial-gradient(circle at 50% 50%, rgba(255, 84, 39, ${lerp(0, 0.22, Math.max(centerAccent, centerExpand, takeover))}) 0%, rgba(255, 84, 39, 0) 46%),
        radial-gradient(circle at 50% 50%, rgba(255, 182, 163, ${lerp(0, 0.12, centerAccent * (1 - takeover * 0.35))}) 0%, rgba(255, 182, 163, 0) 20%),
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, ${lerp(0.08, 0.02, bgShift)}) 0%, rgba(255, 255, 255, 0) 34%)
      `;

      grainRef.current.style.opacity = `${lerp(0.1, 0.05, Math.max(bgShift, takeover))}`;

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

      finalWrapRef.current.style.pointerEvents = progress > 0.9 ? 'auto' : 'none';
    };

    const draw = () => {
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      const buildGrid = easeOut3(norm(scrollProgress, 0.15, 0.50));
      const centerAccent = easeInOut3(norm(scrollProgress, 0.44, 0.56));
      const centerExpand = easeInOut3(norm(scrollProgress, 0.60, 0.76));
      const takeover = easeInOut3(norm(scrollProgress, 0.68, 0.88));
      const clearScene = easeOut3(norm(scrollProgress, 0.88, 0.98));
      const sceneOpacity = easeOut3(norm(scrollProgress, 0.15, 0.25)) * (1 - easeOut3(norm(scrollProgress, 0.94, 1)));

      const centerX = viewportWidth / 2;
      const centerY = viewportHeight / 2;
      const hugeCenter = Math.hypot(centerX, centerY) * 1.06;

      for (let i = 0; i < particles.length; i += 1) {
        const particle = particles[i];
        if (particle.isCenter) {
          continue;
        }

        const appear = easeOut3(clamp((buildGrid - particle.delay) / 0.13));

        if (appear <= 0.001) {
          continue;
        }

        const centerDistance = Math.hypot(particle.x - centerX, particle.y - centerY);
        const distanceFactor = 1 - centerDistance / Math.hypot(centerX, centerY);
        const fadeByTakeover = 1 - takeover * lerp(0.8, 1.12, distanceFactor);
        const fadeByClear = 1 - clearScene;
        const alpha = particle.alpha * appear * fadeByTakeover * fadeByClear * sceneOpacity;

        if (alpha > 0.01) {
          const radius = particle.radius * appear * lerp(1, 0.82, takeover);

          ctx.beginPath();
          ctx.arc(particle.x, particle.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = rgba(PARTICLE_GRAY, alpha.toFixed(3));
          ctx.fill();
        }
      }

      if (centerParticle) {
        const appear = easeOut3(clamp((buildGrid - centerParticle.delay) / 0.13));

        if (appear > 0.001) {
          const baseRadius = centerParticle.radius * appear;
          const expandedRadius = baseRadius * lerp(1, viewportWidth < 768 ? 4.8 : 5.8, centerExpand);
          const orbRadius = lerp(expandedRadius, hugeCenter, takeover);
          const orbAlpha = clamp(centerParticle.alpha * appear * sceneOpacity * (1 - clearScene), 0, 1);

          const grayAlpha = orbAlpha * (1 - centerAccent);
          if (grayAlpha > 0.005) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2);
            ctx.fillStyle = rgba(PARTICLE_GRAY, grayAlpha.toFixed(3));
            ctx.fill();
          }

          if (centerAccent > 0.005) {
            const orangeAlpha = clamp(centerAccent * sceneOpacity * (1 - clearScene));
            const orbGradient = ctx.createLinearGradient(
              centerX - orbRadius,
              centerY,
              centerX + orbRadius,
              centerY
            );
            orbGradient.addColorStop(0, `rgba(${ORANGE_START[0]}, ${ORANGE_START[1]}, ${ORANGE_START[2]}, ${orangeAlpha.toFixed(3)})`);
            orbGradient.addColorStop(1, `rgba(${ORANGE_END[0]}, ${ORANGE_END[1]}, ${ORANGE_END[2]}, ${orangeAlpha.toFixed(3)})`);

            ctx.beginPath();
            ctx.arc(centerX, centerY, orbRadius, 0, Math.PI * 2);
            ctx.fillStyle = orbGradient;
            ctx.fill();
          }
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
                className="mt-2 block font-sans font-medium leading-[0.92] text-[#151311]"
                style={{ 
                  fontSize: 'clamp(2.7rem, 6.8vw, 6.2rem)', 
                  letterSpacing: '-0.03em',
                }}
              >
                Seja TheOne
                <span
                  className="inline-block align-top font-halyard text-[#FFF2EC]"
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
              <p className="mx-auto max-w-3xl text-[clamp(1.1rem,2vw,1.5rem)] font-halyard font-light leading-[1.5] text-[#2E1A14]">
                O topo do mercado não é sorte, é construção. Se você tem visão, ambição e busca transformar sua empresa na escolha inevitável do seu cliente — estamos prontos para construir isso com você.
              </p>

              <PrimaryCTAButton
                href="mailto:contato@theone.com?subject=Agendar%20Diagn%C3%B3stico%20TheOne"
                className="mt-12"
                background="#FFF3EC"
                hoverBackground="linear-gradient(135deg, #FFF8F4 0%, #FFE2D7 100%)"
                boxShadow="0 18px 42px rgba(121, 38, 11, 0.18)"
                hoverBoxShadow="0 24px 56px rgba(121, 38, 11, 0.24)"
                textColor="#5F2412"
                border="1px solid rgba(122, 42, 17, 0.10)"
                style={{
                  minWidth: '320px',
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
