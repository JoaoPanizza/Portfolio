import { LazyMotion, MotionConfig, domAnimation } from 'motion/react';
import useReducedMotionPreference from '../hooks/useReducedMotionPreference';

export default function MotionProvider({ children }) {
  const reduced = useReducedMotionPreference();
  return (
    <LazyMotion features={domAnimation} strict>
      <MotionConfig
        reducedMotion={reduced ? 'always' : 'never'}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </MotionConfig>
    </LazyMotion>
  );
}
