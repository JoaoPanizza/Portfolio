import useReducedMotion from '../hooks/useReducedMotionPreference';
import { useRef } from 'react';
import { m, useScroll, useTransform } from 'motion/react';

export default function ScrollReveal({
  as = 'div',
  children,
  distance = 36,
  direction = 'up',
  className = '',
  ...props
}) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const y = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [distance, 0, 0, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.84, 1], [0.5, 1, 1, 1]);
  const Component = m[as];
  return (
    <Component
      ref={ref}
      className={className}
      style={reduced ? undefined : { [direction === 'up' ? 'y' : 'x']: y, opacity }}
      {...props}
    >
      {children}
    </Component>
  );
}
