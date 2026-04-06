import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PrimaryCTAButton from './PrimaryCTAButton';
import { usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const INTRO_WORDS = ['Não', 'seja', 'só', 'mais', 'um.'];

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
  const gap = 20;
  const size = width < 768 ? 48 : 72;
  const spacing = size + gap;
  const cols = Math.ceil(width / spacing) + 2;
  const rows = Math.ceil(height / spacing) + 2;
  const offsetX = (width - (cols - 1) * spacing) / 2;
  const offsetY = (height - (rows - 1) * spacing) / 2;
  const centerX = width / 2;
  const centerY = height / 2;
  const particles = [];

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      particles.push({
        x: offsetX + col * spacing,
        y: offsetY + row * spacing,
        size,
        alpha: 0.12 + Math.random() * 0.12,
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

  // Keep the particle at its natural grid position — no forced centering
  particles[centerIndex].isCenter = true;
  particles[centerIndex].alpha = 0.38;
  return particles;
}

export default function FooterCTA() {
  const prefersReducedMotion = usePrefersReducedMotion();
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
    const section = sectionRef.current;
    const canvas = canvasRef.current;

    if (!section) {
      return undefined;
    }

    if (prefersReducedMotion) {
      stickyRef.current?.setAttribute('data-navbar-theme', 'light');
      if (stickyRef.current) stickyRef.current.style.backgroundColor = 'rgb(245, 240, 236)';
      if (glowRef.current) glowRef.current.style.opacity = '0.18';
      if (grainRef.current) grainRef.current.style.opacity = '0.05';
      if (finalWrapRef.current) finalWrapRef.current.style.pointerEvents = 'auto';
      if (finalTitleRef.current) {
        finalTitleRef.current.style.opacity = '1';
        finalTitleRef.current.style.filter = 'none';
        finalTitleRef.current.style.transform = 'none';
      }
      if (finalBodyRef.current) {
        finalBodyRef.current.style.opacity = '1';
        finalBodyRef.current.style.filter = 'none';
        finalBodyRef.current.style.transform = 'none';
      }
      return undefined;
    }

    if (!canvas) {
      return undefined;
    }

    let cleanupScene;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || cleanupScene) {
          return;
        }

        const ctx = canvas.getContext('2d');

        if (!ctx) {
          return;
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

          // Cap DPR to keep the canvas effect crisp without overpainting on retina displays.
          const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
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

          // Background transitions to a gradient (not solid) so canvas gradient stays visible
          const gradStart = mixColor(baseBg, ORANGE_START, takeover);
          const gradEnd = mixColor(baseBg, ORANGE_END, takeover);
          stickyRef.current.style.background = `linear-gradient(to right, ${gradStart}, ${gradEnd})`;

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

        const CORNER = 4;

        const draw = () => {
          ctx.clearRect(0, 0, viewportWidth, viewportHeight);

          const buildGrid = easeOut3(norm(scrollProgress, 0.15, 0.50));
          const centerToCircle = easeInOut3(norm(scrollProgress, 0.36, 0.44));
          const centerAccent = easeInOut3(norm(scrollProgress, 0.44, 0.56));
          const centerExpand = easeInOut3(norm(scrollProgress, 0.60, 0.76));
          const takeover = easeInOut3(norm(scrollProgress, 0.68, 0.88));
          const clearScene = easeOut3(norm(scrollProgress, 0.88, 0.98));
          const sceneOpacity = easeOut3(norm(scrollProgress, 0.15, 0.25)) * (1 - easeOut3(norm(scrollProgress, 0.94, 1)));

          const screenCenterX = viewportWidth / 2;
          const screenCenterY = viewportHeight / 2;

          for (let i = 0; i < particles.length; i += 1) {
            const particle = particles[i];
            if (particle.isCenter) {
              continue;
            }

            const appear = easeOut3(clamp((buildGrid - particle.delay) / 0.13));

            if (appear <= 0.001) {
              continue;
            }

            const centerDistance = Math.hypot(particle.x - screenCenterX, particle.y - screenCenterY);
            const distanceFactor = 1 - centerDistance / Math.hypot(screenCenterX, screenCenterY);
            const fadeByTakeover = 1 - takeover * lerp(0.8, 1.12, distanceFactor);
            const fadeByClear = 1 - clearScene;
            const alpha = particle.alpha * appear * fadeByTakeover * fadeByClear * sceneOpacity;

            if (alpha > 0.01) {
              const half = (particle.size / 2) * appear * lerp(1, 0.82, takeover);

              ctx.beginPath();
              ctx.roundRect(particle.x - half, particle.y - half, half * 2, half * 2, CORNER * appear);
              ctx.fillStyle = rgba(PARTICLE_GRAY, alpha.toFixed(3));
              ctx.fill();
            }
          }

          if (centerParticle) {
            const appear = easeOut3(clamp((buildGrid - centerParticle.delay) / 0.13));

            if (appear > 0.001) {
              const cpx = centerParticle.x;
              const cpy = centerParticle.y;
              // Diagonal from center particle to farthest corner of the viewport
              const hugeCenter = Math.max(
                Math.hypot(cpx, cpy),
                Math.hypot(viewportWidth - cpx, cpy),
                Math.hypot(cpx, viewportHeight - cpy),
                Math.hypot(viewportWidth - cpx, viewportHeight - cpy)
              ) * 1.06;

              const baseHalf = (centerParticle.size / 2) * appear;
              const expandedHalf = baseHalf * lerp(1, viewportWidth < 768 ? 4.8 : 5.8, centerExpand);
              const orbHalf = lerp(expandedHalf, hugeCenter, takeover);
              const orbAlpha = clamp(centerParticle.alpha * appear * sceneOpacity * (1 - clearScene), 0, 1);

              // Square → circle morph before becoming orange
              const cornerRadius = lerp(CORNER * appear, orbHalf, centerToCircle);

              const grayAlpha = orbAlpha * (1 - centerAccent);
              if (grayAlpha > 0.005) {
                ctx.beginPath();
                ctx.roundRect(cpx - orbHalf, cpy - orbHalf, orbHalf * 2, orbHalf * 2, Math.min(cornerRadius, orbHalf));
                ctx.fillStyle = rgba(PARTICLE_GRAY, grayAlpha.toFixed(3));
                ctx.fill();
              }

              if (centerAccent > 0.005) {
                const orangeAlpha = clamp(centerAccent * sceneOpacity * (1 - clearScene));
                const orbGradient = ctx.createLinearGradient(
                  cpx - orbHalf,
                  cpy,
                  cpx + orbHalf,
                  cpy
                );
                orbGradient.addColorStop(0, `rgba(${ORANGE_START[0]}, ${ORANGE_START[1]}, ${ORANGE_START[2]}, ${orangeAlpha.toFixed(3)})`);
                orbGradient.addColorStop(1, `rgba(${ORANGE_END[0]}, ${ORANGE_END[1]}, ${ORANGE_END[2]}, ${orangeAlpha.toFixed(3)})`);

                ctx.beginPath();
                ctx.roundRect(cpx - orbHalf, cpy - orbHalf, orbHalf * 2, orbHalf * 2, Math.min(cornerRadius, orbHalf));
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
        observer.disconnect();

        cleanupScene = () => {
          cancelAnimationFrame(rafId);
          window.removeEventListener('resize', onResize);
          trigger.kill();
        };
      },
      { rootMargin: '1200px 0px' }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      cleanupScene?.();
    };
  }, [prefersReducedMotion]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative border-t border-white/5"
      style={{ height: prefersReducedMotion ? '100vh' : '560vh', backgroundColor: '#212121' }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 h-screen overflow-hidden"
        style={prefersReducedMotion ? { backgroundColor: '#F5F0EC' } : undefined}
      >
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

        {!prefersReducedMotion ? (
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />
        ) : null}

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={prefersReducedMotion ? { display: 'none' } : { willChange: 'transform, opacity' }}
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
          style={{ pointerEvents: prefersReducedMotion ? 'auto' : 'none' }}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            <h2
              ref={finalTitleRef}
              style={{
                opacity: prefersReducedMotion ? 1 : 0,
                filter: prefersReducedMotion ? 'none' : 'blur(18px)',
                transform: prefersReducedMotion ? 'none' : 'translate3d(0, 32px, 0)',
                willChange: 'transform, filter, opacity',
              }}
            >
              <span
                className="block font-sans font-medium leading-[0.92] text-white"
                style={{ fontSize: 'clamp(2.9rem, 7.2vw, 6.6rem)', letterSpacing: '-0.035em' }}
              >
                Não seja só mais um.
              </span>
              <span
                className="mt-2 block font-sans font-medium leading-[0.92] text-white"
                style={{
                  fontSize: 'clamp(2.7rem, 6.8vw, 6.2rem)',
                  letterSpacing: '-0.03em',
                }}
              >
                Seja TheOne
                <span
                  className="inline-block align-top font-halyard text-white/70"
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
                opacity: prefersReducedMotion ? 1 : 0,
                filter: prefersReducedMotion ? 'none' : 'blur(14px)',
                transform: prefersReducedMotion ? 'none' : 'translate3d(0, 24px, 0)',
                willChange: 'transform, filter, opacity',
              }}
            >
              <p className="mx-auto max-w-3xl text-[clamp(1.1rem,2vw,1.5rem)] font-halyard font-light leading-[1.5] text-white/80">
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
