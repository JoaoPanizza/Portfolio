import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';
import useReducedMotion from '../hooks/useReducedMotionPreference';

export default function SectionFile({ id }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 95%', 'start 45%'],
  });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div ref={ref} className="section-file" aria-hidden="true">
      <span>~/portfolio/{id}</span>
      <span>index.jsx</span>
      <m.div className="section-file-progress" style={{ scaleX: reduced ? 1 : scaleX }} />
    </div>
  );
}
