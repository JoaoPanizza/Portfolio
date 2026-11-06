import useMediaQuery from './useMediaQuery';

export default function useReducedMotionPreference() {
  return useMediaQuery('(prefers-reduced-motion: reduce)', true);
}
