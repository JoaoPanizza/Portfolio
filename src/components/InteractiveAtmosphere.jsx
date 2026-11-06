import useReducedMotion from '../hooks/useReducedMotionPreference';
import { useEffect } from 'react';
import useMediaQuery from '../hooks/useMediaQuery';
import { m, useMotionValue, useScroll, useSpring } from 'motion/react';

function PointerLight() {
  const x = useMotionValue(-600);
  const y = useMotionValue(-600);
  const opacity = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 110, damping: 28 });
  const smoothY = useSpring(y, { stiffness: 110, damping: 28 });
  useEffect(() => {
    let frame = 0;
    let surface;
    const reset = () => {
      surface?.style.removeProperty('--pointer-x');
      surface?.style.removeProperty('--pointer-y');
      surface?.style.removeProperty('--tilt-x');
      surface?.style.removeProperty('--tilt-y');
      surface?.classList.remove('pointer-active');
      surface = undefined;
    };
    const move = (event) => {
      x.set(event.clientX - 220);
      y.set(event.clientY - 220);
      opacity.set(1);
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const next =
          event.target instanceof Element
            ? event.target.closest('[data-pointer-surface]')
            : null;
        if (surface !== next) {
          reset();
          surface = next;
        }
        if (!surface) return;
        const rect = surface.getBoundingClientRect();
        const px = event.clientX - rect.left,
          py = event.clientY - rect.top;
        surface.style.setProperty('--pointer-x', `${px}px`);
        surface.style.setProperty('--pointer-y', `${py}px`);
        surface.style.setProperty('--tilt-x', `${(0.5 - py / rect.height) * 4}deg`);
        surface.style.setProperty('--tilt-y', `${(px / rect.width - 0.5) * 4}deg`);
        surface.classList.add('pointer-active');
      });
    };
    const leave = () => {
      opacity.set(0);
      cancelAnimationFrame(frame);
      reset();
    };
    window.addEventListener('pointermove', move, { passive: true });
    document.documentElement.addEventListener('pointerleave', leave);
    window.addEventListener('blur', leave);
    window.addEventListener('scroll', leave, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      reset();
      window.removeEventListener('pointermove', move);
      document.documentElement.removeEventListener('pointerleave', leave);
      window.removeEventListener('blur', leave);
      window.removeEventListener('scroll', leave);
    };
  }, [x, y, opacity]);
  return (
    <m.div
      className="pointer-light"
      aria-hidden="true"
      style={{ x: smoothX, y: smoothY, opacity }}
    />
  );
}

export default function InteractiveAtmosphere() {
  const reduced = useReducedMotion();
  const finePointer = useMediaQuery(
    '(hover: hover) and (pointer: fine) and (min-width: 1024px)',
  );
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30 });
  return (
    <>
      {!reduced && finePointer && <PointerLight />}
      <m.div
        className="scroll-progress"
        aria-hidden="true"
        style={{ scaleX: reduced ? scrollYProgress : progress }}
      />
    </>
  );
}
