import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PrimaryCTAButton from './PrimaryCTAButton';
import { useConstrainedMotion, useMediaQuery, usePrefersReducedMotion } from '../hooks/useMediaQuery';

gsap.registerPlugin(ScrollTrigger);

const INTRO_WORDS = ['Não', 'seja', 'só', 'mais', 'um'];
const NAVBAR_REVEAL_PROGRESS = 0.78;
const HERO_SCROLL_HEIGHT = '560vh';
const HERO_SCROLL_HEIGHT_MOBILE = '380svh';
const HERO_STICKY_HEIGHT_MOBILE = '100svh';
const HERO_MAIN_PROGRESS_END = 0.82;

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

function maxCircleRadius(x, y, width, height) {
  return Math.max(
    Math.hypot(x, y),
    Math.hypot(width - x, y),
    Math.hypot(x, height - y),
    Math.hypot(width - x, height - y)
  ) * 1.12;
}

function circleClipPath(radius, x, y) {
  return `circle(${Math.max(0, radius).toFixed(1)}px at ${x.toFixed(1)}px ${y.toFixed(1)}px)`;
}

function buildParticles(width, height) {
  const gap = 20;
  const size = width < 768 ? 48 : 72;
  const spacing = size + gap;
  const centerX = width / 2;
  const centerY = height / 2;
  // Anchor the grid so that one cell always lands exactly on the viewport center.
  const offsetX = centerX - Math.round(centerX / spacing) * spacing;
  const offsetY = centerY - Math.round(centerY / spacing) * spacing;
  const cols = Math.ceil((width - offsetX) / spacing) + 2;
  const rows = Math.ceil((height - offsetY) / spacing) + 2;
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

export default function Hero({ introPhrases = [], showLogo = false }) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const prefersConstrainedMotion = useConstrainedMotion();
  const isMobileViewport = useMediaQuery('(max-width: 767px)');
  const shouldUseStaticScene = prefersReducedMotion || prefersConstrainedMotion;
  const sectionRef = useRef(null);
  const stickyRef = useRef(null);
  const glowRef = useRef(null);
  const grainRef = useRef(null);
  const introRef = useRef(null);
  const introWordRefs = useRef([]);
  const introPhraseRefs = useRef([]);
  const canvasRef = useRef(null);
  const finalWrapRef = useRef(null);
  const finalTitleRef = useRef(null);
  const finalBodyRef = useRef(null);
  const scrollHintRef = useRef(null);
  const logoRef = useRef(null);
  const navbarVisibleRef = useRef(null);
  const mobileMenuLightRef = useRef(false);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const updateNavbarVisibility = (isVisible) => {
      if (navbarVisibleRef.current === isVisible) {
        return;
      }

      navbarVisibleRef.current = isVisible;
      window.dispatchEvent(new CustomEvent('hero-navbar-visibility', {
        detail: { visible: isVisible },
      }));
    };
    const updateMobileMenuTheme = (isLight) => {
      if (mobileMenuLightRef.current === isLight) {
        return;
      }

      mobileMenuLightRef.current = isLight;
      window.dispatchEvent(new CustomEvent('hero-mobile-menu-theme', {
        detail: { light: isLight },
      }));
    };

    if (!section) {
      return undefined;
    }

    if (shouldUseStaticScene) {
      updateNavbarVisibility(true);
      stickyRef.current?.setAttribute('data-navbar-theme', 'light');
      if (stickyRef.current) stickyRef.current.style.backgroundColor = 'rgb(245, 240, 236)';
      if (stickyRef.current) stickyRef.current.style.clipPath = 'none';
      if (glowRef.current) glowRef.current.style.opacity = '0.18';
      if (grainRef.current) grainRef.current.style.opacity = '0.05';
      if (finalWrapRef.current) {
        finalWrapRef.current.style.pointerEvents = 'auto';
        finalWrapRef.current.style.opacity = '1';
      }
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
      if (logoRef.current) {
        logoRef.current.style.opacity = '1';
        logoRef.current.style.filter = 'none';
        logoRef.current.style.transform = 'none';
      }
      updateMobileMenuTheme(false);
      return undefined;
    }

    updateNavbarVisibility(false);

    if (!canvas) {
      return undefined;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
      return undefined;
    }

    let rafId = 0;
    let scrollProgress = 0;
    let mainScrollProgress = 0;
    let exitScrollProgress = 0;
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

      // Position final wrap to appear just below where the heading lands after its travel.
      // Heading lands at 50vh - 20vh (max travel) = 30vh from top.
      // headingHeightEst uses Math.max so narrow viewports (where text may wrap to 2 lines)
      // get at least 96px — enough for two lines of the 2.25rem mobile font size.
      if (finalWrapRef.current) {
        const headingLandY = viewportHeight * 0.30;
        const headingHeightEst = Math.max(viewportHeight * 0.09, 96);
        finalWrapRef.current.style.paddingTop = `${headingLandY + headingHeightEst - 8}px`;
      }
    };

    const setSceneStyles = (progress, exitProgress = 0) => {
      const centerAccent = easeInOut3(norm(progress, 0.44, 0.56));
      const centerExpand = easeInOut3(norm(progress, 0.60, 0.76));
      const takeover = easeInOut3(norm(progress, 0.68, 0.88));
      const finalTitle = easeOut3(norm(progress, 0.80, 0.90));
      const finalBody = easeOut3(norm(progress, 0.84, 0.96));
      const shouldUseLightMobileMenu = takeover > 0.28 && exitProgress < 0.12;

      updateMobileMenuTheme(shouldUseLightMobileMenu);

      // Background starts warm white and transitions to orange gradient
      const gradStart = mixColor(WARM_BG, ORANGE_START, takeover);
      const gradEnd = mixColor(WARM_BG, ORANGE_END, takeover);
      stickyRef.current.style.background = `linear-gradient(to right, ${gradStart}, ${gradEnd})`;

      stickyRef.current.setAttribute('data-navbar-theme', takeover > 0.25 ? 'dark' : 'light');

      glowRef.current.style.opacity = `${lerp(0.08, 0.34, Math.max(centerAccent * 0.8, centerExpand, takeover))}`;
      glowRef.current.style.background = `
        radial-gradient(circle at 50% 50%, rgba(255, 84, 39, ${lerp(0, 0.22, Math.max(centerAccent, centerExpand, takeover))}) 0%, rgba(255, 84, 39, 0) 46%),
        radial-gradient(circle at 50% 50%, rgba(255, 182, 163, ${lerp(0, 0.12, centerAccent * (1 - takeover * 0.35))}) 0%, rgba(255, 182, 163, 0) 20%),
        radial-gradient(circle at 22% 18%, rgba(255, 255, 255, 0.02) 0%, rgba(255, 255, 255, 0) 34%)
      `;

      grainRef.current.style.opacity = `${lerp(0.08, 0.05, takeover)}`;

      if (scrollHintRef.current) {
        const scrollHintFade = 1 - easeOut3(norm(progress, 0, 0.06));
        scrollHintRef.current.style.opacity = scrollHintFade.toFixed(3);
      }

      // Heading travels from 34vh to 30vh from top (above the circle throughout)
      const headingTravel = easeInOut3(norm(progress, 0.32, 0.80));
      const headingY = lerp(viewportHeight * -0.16, viewportHeight * -0.20, headingTravel);
      introRef.current.style.transform = `translateY(${headingY.toFixed(1)}px)`;
      introRef.current.style.opacity = '1';


      // Intro phrases (proposta only) — each occupies ~10% of progress
      const PHRASE_STEP = 0.10;
      const wordsOffset = introPhrases.length * PHRASE_STEP;

      introPhraseRefs.current.forEach((el, idx) => {
        if (!el) return;
        const base = idx * PHRASE_STEP;
        const inFactor  = easeOut3(norm(progress, base, base + 0.035));
        const outFactor = easeOut3(norm(progress, base + 0.065, base + PHRASE_STEP));
        el.style.opacity = Math.max(0, inFactor - outFactor).toFixed(3);
      });

      // Words — shifted when phrases are present, starting from 0 instead of 0.85
      introWordRefs.current.forEach((word, index) => {
        if (!word) return;

        const startP  = wordsOffset + index * 0.014;
        const endP    = wordsOffset + 0.10 + index * 0.014;
        const revealIn = easeOut3(norm(progress, startP, endP));
        const baseOpacity = introPhrases.length > 0 ? 0 : 0.85;
        const opacity = lerp(baseOpacity, 1.0, revealIn);
        const translateY = lerp(6, 0, revealIn);
        const wordColor = blendRgb([21, 19, 17], [255, 255, 255], Math.min(1, takeover * 2.2));

        word.style.opacity = opacity.toFixed(3);
        word.style.filter = 'none';
        word.style.transform = translateY > 0.1 ? `translate3d(0, ${translateY.toFixed(1)}px, 0)` : 'none';
        word.style.color = `rgb(${wordColor[0]}, ${wordColor[1]}, ${wordColor[2]})`;
      });

      const titleBlur = lerp(18, 0, finalTitle);
      const titleY = lerp(32, 0, finalTitle);
      finalTitleRef.current.style.opacity = finalTitle.toFixed(3);
      finalTitleRef.current.style.filter = titleBlur > 0.05 ? `blur(${titleBlur.toFixed(2)}px)` : 'none';
      finalTitleRef.current.style.transform = titleY > 0.1 ? `translate3d(0, ${titleY.toFixed(1)}px, 0)` : 'none';

      if (logoRef.current) {
        logoRef.current.style.opacity = finalTitle.toFixed(3);
        logoRef.current.style.transform = titleY > 0.1 ? `translate3d(0, ${titleY.toFixed(1)}px, 0)` : 'none';
        logoRef.current.style.filter = titleBlur > 0.05 ? `invert(1) blur(${titleBlur.toFixed(2)}px)` : 'invert(1)';
      }

      const bodyBlur = lerp(14, 0, finalBody);
      const bodyY = lerp(24, 0, finalBody);
      finalBodyRef.current.style.opacity = finalBody.toFixed(3);
      finalBodyRef.current.style.filter = bodyBlur > 0.05 ? `blur(${bodyBlur.toFixed(2)}px)` : 'none';
      finalBodyRef.current.style.transform = bodyY > 0.1 ? `translate3d(0, ${bodyY.toFixed(1)}px, 0)` : 'none';

      finalWrapRef.current.style.pointerEvents = progress > 0.9 ? 'auto' : 'none';
    };

    const setExitStyles = (exitP) => {
      const close = easeInOut3(clamp(exitP));
      const circleCenterX = centerParticle?.x ?? viewportWidth / 2;
      const circleCenterY = centerParticle?.y ?? viewportHeight / 2;
      const fullRadius = maxCircleRadius(circleCenterX, circleCenterY, viewportWidth, viewportHeight);
      const radius = lerp(fullRadius, 0, close);
      const contentFade = 1 - easeOut3(norm(close, 0, 0.38));

      stickyRef.current.style.opacity = '1';
      stickyRef.current.style.clipPath = close <= 0.001
        ? circleClipPath(fullRadius, circleCenterX, circleCenterY)
        : circleClipPath(radius, circleCenterX, circleCenterY);

      if (finalWrapRef.current) {
        finalWrapRef.current.style.opacity = contentFade.toFixed(3);
        finalWrapRef.current.style.pointerEvents = close > 0.02 ? 'none' : (mainScrollProgress > 0.9 ? 'auto' : 'none');
      }

      if (introRef.current) {
        introRef.current.style.opacity = contentFade.toFixed(3);
      }
    };

    const CORNER = 4;

    const draw = () => {
      ctx.clearRect(0, 0, viewportWidth, viewportHeight);

      const buildGrid = easeOut3(norm(mainScrollProgress, 0.15, 0.50));
      const centerToCircle = easeInOut3(norm(mainScrollProgress, 0.36, 0.44));
      const centerAccent = easeInOut3(norm(mainScrollProgress, 0.44, 0.56));
      const centerExpand = easeInOut3(norm(mainScrollProgress, 0.60, 0.76));
      const takeover = easeInOut3(norm(mainScrollProgress, 0.68, 0.88));
      const clearScene = easeOut3(norm(mainScrollProgress, 0.88, 0.98));
      const sceneOpacity = easeOut3(norm(mainScrollProgress, 0.15, 0.25)) * (1 - easeOut3(norm(mainScrollProgress, 0.94, 1)));

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
    };

    const scheduleDraw = () => {
      if (rafId) {
        return;
      }

      rafId = requestAnimationFrame(() => {
        rafId = 0;
        draw();
      });
    };

    const onResize = () => {
      const nextWidth = window.innerWidth;
      const nextHeight = window.innerHeight;
      const widthDelta = Math.abs(nextWidth - viewportWidth);
      const heightDelta = Math.abs(nextHeight - viewportHeight);

      // Mobile browsers frequently fire resize events while the URL bar expands
      // or collapses. Ignoring those height-only changes keeps downstream
      // sections from jumping during scroll, while still allowing real resizes
      // like orientation changes to reflow normally.
      if (isMobileViewport && widthDelta < 2 && heightDelta > 0 && heightDelta < 160) {
        return;
      }

      resizeCanvas();
      mainScrollProgress = Math.min(1, scrollProgress / HERO_MAIN_PROGRESS_END);
      exitScrollProgress = Math.max(0, (scrollProgress - HERO_MAIN_PROGRESS_END) / (1 - HERO_MAIN_PROGRESS_END));
      updateNavbarVisibility(mainScrollProgress >= NAVBAR_REVEAL_PROGRESS);
      setSceneStyles(mainScrollProgress, exitScrollProgress);
      setExitStyles(exitScrollProgress);
      scheduleDraw();
      ScrollTrigger.refresh();
    };

    resizeCanvas();
    setSceneStyles(0);
    canvas.style.visibility = 'hidden';
    scheduleDraw();

    const fontReady = document.fonts?.ready;
    if (fontReady) {
      fontReady.then(() => {
        resizeCanvas();
        setSceneStyles(mainScrollProgress, exitScrollProgress);
        setExitStyles(exitScrollProgress);
        scheduleDraw();
      });
    }

    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: 0.85,
      onToggle(self) {
        canvas.style.visibility = self.isActive ? 'visible' : 'hidden';
        if (self.isActive) {
          scheduleDraw();
        }
      },
      onUpdate(self) {
        scrollProgress = self.progress;
        mainScrollProgress = Math.min(1, scrollProgress / HERO_MAIN_PROGRESS_END);
        exitScrollProgress = Math.max(0, (scrollProgress - HERO_MAIN_PROGRESS_END) / (1 - HERO_MAIN_PROGRESS_END));
        updateNavbarVisibility(mainScrollProgress >= NAVBAR_REVEAL_PROGRESS);
        setSceneStyles(mainScrollProgress, exitScrollProgress);
        setExitStyles(exitScrollProgress);
        scheduleDraw();
      },
    });

    window.addEventListener('resize', onResize);

    return () => {
      updateNavbarVisibility(true);
      updateMobileMenuTheme(false);
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      trigger.kill();
    };
  }, [shouldUseStaticScene]);

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative"
      style={{
        height: shouldUseStaticScene
          ? (isMobileViewport ? HERO_STICKY_HEIGHT_MOBILE : '100vh')
          : (isMobileViewport ? HERO_SCROLL_HEIGHT_MOBILE : HERO_SCROLL_HEIGHT),
        backgroundColor: 'transparent',
        zIndex: 2,
      }}
    >
      <div
        ref={stickyRef}
        className="sticky top-0 overflow-hidden"
        style={{
          height: isMobileViewport ? HERO_STICKY_HEIGHT_MOBILE : '100vh',
          backgroundColor: 'rgb(245, 240, 236)',
          zIndex: 2,
          willChange: shouldUseStaticScene ? undefined : 'clip-path',
        }}
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

        {!shouldUseStaticScene ? (
          <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-10" />
        ) : null}

        <div
          ref={introRef}
          className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center px-6"
          style={shouldUseStaticScene ? { display: 'none' } : { willChange: 'transform, opacity' }}
        >
          {/* Intro phrases (proposta only) — positioned absolute, centered */}
          {introPhrases.length > 0 && introPhrases.map((content, idx) => (
            <div
              key={idx}
              ref={(node) => { introPhraseRefs.current[idx] = node; }}
              className="absolute inset-0 flex items-center justify-center text-center px-6 pointer-events-none"
              style={{ opacity: 0, willChange: 'opacity' }}
            >
              <p
                className="font-sans font-normal text-[#151311]"
                style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.8rem)', letterSpacing: '-0.02em' }}
              >
                {content}
              </p>
            </div>
          ))}

          <div className="flex flex-col items-center">
            <h2
            className="max-w-[900px] text-center font-sans font-normal leading-[1.1] text-[#151311]"
            style={{ fontSize: 'clamp(2.25rem, 4.2vw, 3.8rem)', letterSpacing: '-0.02em' }}
          >
            {INTRO_WORDS.map((word, index) => (
              <span
                key={word}
                ref={(node) => {
                  introWordRefs.current[index] = node;
                }}
                className="inline-block"
                style={{
                  opacity: introPhrases.length > 0 ? 0 : 0.85,
                  filter: 'none',
                  transform: 'translate3d(0, 6px, 0)',
                  willChange: 'transform, opacity',
                  marginRight: index === INTRO_WORDS.length - 1 ? 0 : '0.16em',
                }}
              >
                {word}
              </span>
            ))}
          </h2>
        </div>
      </div>

        <div
          ref={finalWrapRef}
          className="absolute inset-0 z-40 flex items-start justify-center px-6"
          style={{
            pointerEvents: shouldUseStaticScene ? 'auto' : 'none',
            paddingTop: shouldUseStaticScene ? 'clamp(6rem, 18vh, 10rem)' : undefined,
          }}
        >
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
            {showLogo && (
              <img
                ref={logoRef}
                src="/logo-navbar-black.svg"
                alt="The One"
                className="h-16 md:h-20 w-auto mb-[100px]"
                style={{ opacity: 0, willChange: 'transform, opacity, filter' }}
              />
            )}
            <h2
              ref={finalTitleRef}
              style={{
                opacity: shouldUseStaticScene ? 1 : 0,
                filter: shouldUseStaticScene ? 'none' : 'blur(18px)',
                transform: shouldUseStaticScene ? 'none' : 'translate3d(0, 32px, 0)',
                willChange: 'transform, filter, opacity',
              }}
            >
              <span
                className="block font-editorial font-normal leading-[0.92] text-black/70"
                style={{
                  fontSize: 'clamp(4.2rem, 8vw, 7.5rem)',
                  letterSpacing: '-0.03em',
                  paddingBottom: '40px',
                }}
              >
                Seja TheOne
                <span
                  className="inline-block align-top font-halyard text-black/70"
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
                opacity: shouldUseStaticScene ? 1 : 0,
                filter: shouldUseStaticScene ? 'none' : 'blur(14px)',
                transform: shouldUseStaticScene ? 'none' : 'translate3d(0, 24px, 0)',
                willChange: 'transform, filter, opacity',
              }}
            >
              <p className="mx-auto max-w-2xl max-w-full text-[clamp(1.25rem,2.6vw,1.85rem)] font-halyard font-normal leading-[1.5] text-white/80">
                Para negócios visionários que não querem ser só mais uma opção e querem se tornar a marca número um e alternativa inevitável em seu mercado.
              </p>

              <PrimaryCTAButton
                href="https://wa.me/5551997513675?text=Ol%C3%A1%2C%20vim%20pelo%20site%20da%20TheOne%20e%20gostaria%20de%20saber%20mais%20informa%C3%A7%C3%B5es"
                className="mt-12"
                background="rgba(0, 0, 0, 0.7)"
                hoverBackground="rgba(0, 0, 0, 0.78)"
                boxShadow="0 18px 42px rgba(0, 0, 0, 0.18)"
                hoverBoxShadow="0 24px 56px rgba(0, 0, 0, 0.26)"
                textColor="rgba(255, 243, 236, 0.96)"
                border="1px solid rgba(0, 0, 0, 0.08)"
                style={{
                  minWidth: 'min(320px, 90vw)',
                }}
              >
                Agendar Diagnóstico
              </PrimaryCTAButton>
            </div>
          </div>
        </div>
        {!shouldUseStaticScene && (
          <div
            ref={scrollHintRef}
            className="pointer-events-none absolute inset-0 z-50 flex flex-col items-center justify-end gap-2"
            style={{ willChange: 'opacity', paddingBottom: 'clamp(2.5rem, 7vh, 4.5rem)' }}
          >
            <span
              className="font-editorial font-normal text-[#151311]/50"
              style={{ fontSize: '1.325rem', letterSpacing: '0.1em' }}
            >
              Role para ver
            </span>
            <svg
              width="12"
              height="18"
              viewBox="0 0 12 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ animation: 'scrollArrowBounce 1.8s ease-in-out infinite', color: 'rgba(21,19,17,0.4)' }}
            >
              <path d="M6 1L6 17M6 17L1.5 11.5M6 17L10.5 11.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <style>{`
              @keyframes scrollArrowBounce {
                0%, 100% { transform: translateY(0); }
                50% { transform: translateY(5px); }
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}
