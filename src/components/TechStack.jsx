import { usePreferences } from '../Preferences';
import useReducedMotion from '../hooks/useReducedMotionPreference';
import { m } from 'motion/react';
import {
  siWordpress,
  siBootstrap,
  siGit,
  siHtml5,
  siCss,
  siJavascript,
  siReact,
  siPhp,
  siTailwindcss,
} from 'simple-icons';
import { Braces, Database } from 'lucide-react';
import { skills } from '../data/portfolio';
import ScrollReveal from './ScrollReveal';

const icons = {
  WordPress: siWordpress,
  Bootstrap: siBootstrap,
  Git: siGit,
  HTML: siHtml5,
  CSS: siCss,
  JavaScript: siJavascript,
  React: siReact,
  PHP: siPhp,
  'Tailwind CSS': siTailwindcss,
};

function TechBadge({ label, index }) {
  const reduced = useReducedMotion();
  const icon = icons[label];
  return (
    <m.li
      className="tech-badge"
      initial={reduced ? false : { opacity: 0.4, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ amount: 0.25, once: false }}
      whileHover={
        reduced
          ? undefined
          : { y: -4, borderColor: '#a8b88b80', transition: { delay: 0 } }
      }
      transition={{
        type: 'spring',
        stiffness: 260,
        damping: 23,
        delay: reduced ? 0 : index * 0.09,
      }}
    >
      <span className="tech-icon" aria-hidden="true">
        {icon ? (
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d={icon.path} />
          </svg>
        ) : label === 'SQL' ? (
          <Database strokeWidth={1.5} />
        ) : (
          <Braces strokeWidth={1.5} />
        )}
      </span>
      <span>{label}</span>
      <span className="tech-order" aria-hidden="true">
        {String(index + 1).padStart(2, '0')}
      </span>
    </m.li>
  );
}

export default function TechStack() {
  const { t } = usePreferences();
  return (
    <div className="tech-stack">
      {skills.map((group, index) => (
        <ScrollReveal className="tech-row" key={group.id}>
          <div className="tech-category">
            <span className="eyebrow">0{index + 1} /</span>
            <h3>{t(group.title)}</h3>
            <span className="tech-file" aria-hidden="true">
              stack.{group.id || 'tools'}
            </span>
          </div>
          <ul className="tech-grid">
            {group.items.map((label, i) => (
              <TechBadge key={label} label={label} index={i} />
            ))}
          </ul>
        </ScrollReveal>
      ))}
    </div>
  );
}
