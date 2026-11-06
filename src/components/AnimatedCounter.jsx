import { useEffect, useRef } from 'react';
import { animate } from 'motion';
import { useInView } from 'motion/react';
import useReducedMotion from '../hooks/useReducedMotionPreference';

export default function AnimatedCounter({ value }) {
  const ref = useRef(null);
  const visible = useInView(ref, { once: true, amount: 0.6 });
  const reduced = useReducedMotion();
  useEffect(() => {
    const write = (current) => {
      const text = String(Math.round(current)).padStart(2, '0');
      if (ref.current && ref.current.textContent !== text) ref.current.textContent = text;
    };
    if (reduced) {
      write(value);
      return;
    }
    if (!visible) {
      write(0);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: 'easeOut',
      onUpdate: write,
    });
    return () => controls.stop();
  }, [visible, reduced, value]);
  return (
    <strong ref={ref} className="animated-count" aria-hidden="true">
      {reduced ? String(value).padStart(2, '0') : '00'}
    </strong>
  );
}
