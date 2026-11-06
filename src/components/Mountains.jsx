import { m, useScroll, useTransform } from 'motion/react';
import useReducedMotion from '../hooks/useReducedMotionPreference';

export default function Mountains({ target, className = '' }) {
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target, offset: ['start start', 'end start'] });
  const far = useTransform(scrollYProgress, [0, 0.65], [0, 330]);
  const middle = useTransform(scrollYProgress, [0, 0.75], [0, 210]);
  const near = useTransform(scrollYProgress, [0, 0.85], [0, -42]);
  const parallax = !reduced;
  return (
    <svg
      className={`mountains ${className}`}
      viewBox="0 0 1600 850"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="sky" x2="0" y2="1">
          <stop stopColor={'var(--sky-top, #222325)'} />
          <stop offset=".57" stopColor={'var(--sky-mid, #6c7071)'} />
          <stop offset="1" stopColor={'var(--sky-bottom, #a7aba7)'} />
        </linearGradient>
        <radialGradient id="light">
          <stop stopColor="#c3c9be" stopOpacity=".4" />
          <stop offset="1" stopColor="#c3c9be" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="front" x2=".3" y2="1">
          <stop stopColor={'var(--ridge-top, #303335)'} />
          <stop offset="1" stopColor={'var(--ridge-bottom, #111214)'} />
        </linearGradient>
        <filter id="blur">
          <feGaussianBlur stdDeviation="23" />
        </filter>
      </defs>
      <g>
        <path fill="url(#sky)" d="M0 0h1600v850H0z" />
        <ellipse fill="url(#light)" cx="1120" cy="360" rx="600" ry="420" />
        <m.path
          style={{ y: parallax ? far : 0 }}
          className="mountain-far"
          fill={'var(--far-color, #5b6265)'}
          d="m0 480 120-60 90 25 180-178 100 65 100-100 155 170 95-55 120 60 150-185 60 80 65-50 140 170 125-60v488H0z"
        />
        <m.path
          style={{ y: parallax ? middle : 0 }}
          className="mountain-mid"
          fill={'var(--mid-color, #414a50)'}
          d="m0 567 160-126 115 40 172-150 75 81 65-18 155 155 120-127 80 50 125-153 50 75 70-30 143 120 135-55 135 85v326H0z"
        />
        <m.path
          style={{ y: parallax ? middle : 0 }}
          className="mountain-mid"
          fill="#9fada5"
          opacity=".15"
          d="m447 331 75 81 65-18 155 155-190-102-34-60-43 18zM1067 319l50 75 70-30 143 120-156-65-51 12z"
        />
        <m.path
          style={{ y: parallax ? near : 0 }}
          className="mountain-near"
          fill={'var(--near-color, #2a3338)'}
          d="m0 524 145 55 160-45 155 77 130-72 160 70 200-89 180 40 140-100 175 85 155-70v375H0z"
        />
        <g filter="url(#blur)" opacity=".18" fill="#c5d0c4">
          <ellipse cx="930" cy="582" rx="710" ry="27" />
          <ellipse cx="450" cy="652" rx="700" ry="33" />
        </g>
        <path
          fill="url(#front)"
          d="m0 551 115 67 92-18 180 100 135-23 160 95 197-30 155 54 270-158 110 25 186-104v291H0z"
        />
        <path
          fill={'var(--foreground-color, #101214)'}
          d="m0 650 170 52 80 100 210-12 170 60H0zM1600 636l-195 67-175 147h370z"
        />
      </g>
    </svg>
  );
}
