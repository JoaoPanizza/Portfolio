import { usePreferences } from '../Preferences';
import useReducedMotion from '../hooks/useReducedMotionPreference';
import { useEffect, useRef, useState } from 'react';
import { m, useMotionValueEvent, useScroll, useTransform } from 'motion/react';
import { ArrowDown, ArrowUpRight, GitCommitHorizontal } from 'lucide-react';
import { experiences } from '../data/portfolio';

function TimelineEntry({ experience, index, reached }) {
  const reduced = useReducedMotion();
  const visible = reached || reduced;
  const { t } = usePreferences();
  return (
    <article className={`journey-entry ${visible ? 'is-reached' : ''}`}>
      <span className="journey-dot" aria-hidden="true" />
      <m.div
        className="journey-entry-content"
        initial={false}
        animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : 16, y: visible ? 0 : 24 }}
        transition={{
          duration: reduced ? 0 : visible ? 0.5 : 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
      >
        <span className="journey-period">{experience.period}</span>
        <h3>{experience.title}</h3>
        {experience.url ? (
          <a
            className="journey-place text-link"
            href={experience.url}
            target="_blank"
            rel="noreferrer"
            tabIndex={visible ? undefined : -1}
            aria-label={t('Visitar o site da OxigenWeb', 'Visit the OxigenWeb website')}
          >
            {experience.place} <ArrowUpRight size={14} aria-hidden="true" />
          </a>
        ) : (
          <span className="journey-place">{experience.place}</span>
        )}
        <p>{experience.description}</p>
        <span className="journey-commit" aria-hidden="true">
          {String(index + 1).padStart(2, '0')} — {index === 0 ? 'HEAD' : 'commit'}
        </span>
      </m.div>
    </article>
  );
}

export default function ExperienceTimeline() {
  const { t } = usePreferences();
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const [active, setActive] = useState(-1);
  const milestones = useRef([]);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 65%', 'end 65%'],
  });
  const cursorPosition = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);
  const updateActive = (progress) => {
    let current = -1;
    milestones.current.forEach((threshold, index) => {
      if (progress >= threshold) current = index;
    });
    setActive(current);
  };
  useMotionValueEvent(scrollYProgress, 'change', updateActive);
  useEffect(() => {
    const measure = () => {
      const height = ref.current.offsetHeight;
      milestones.current = [...ref.current.querySelectorAll('.journey-dot')].map(
        (dot) => {
          const entry = dot.parentElement;
          return (entry.offsetTop + dot.offsetTop + dot.offsetHeight / 2) / height;
        },
      );
      updateActive(scrollYProgress.get());
    };
    const observer = new ResizeObserver(measure);
    observer.observe(ref.current);
    measure();
    return () => observer.disconnect();
  }, [scrollYProgress]);
  return (
    <div className="journey-layout">
      <aside className="journey-summary">
        <GitCommitHorizontal size={28} strokeWidth={1.2} aria-hidden="true" />
        <span className="journey-command" aria-hidden="true">
          $ git log --oneline
        </span>
        <p>
          {t('Aprender.', 'Learn.')}
          <br />
          {t('Construir.', 'Build.')}
          <br />
          <span>{t('Continuar evoluindo.', 'Keep growing.')}</span>
        </p>
        <div className="journey-counter" aria-hidden="true">
          <span>{String(active + 1).padStart(2, '0')}</span> /{' '}
          {String(experiences.length).padStart(2, '0')} <ArrowDown size={14} />
        </div>
      </aside>
      <div ref={ref} className="journey-track">
        <div className="journey-rail" aria-hidden="true">
          <m.div style={{ scaleY: reduced ? 1 : scrollYProgress }} />
          {!reduced && (
            <m.span className="journey-cursor" style={{ top: cursorPosition }} />
          )}
        </div>
        {experiences.map((experience, index) => (
          <TimelineEntry
            key={experience.title}
            experience={Object.fromEntries(
              Object.entries(experience).map(([key, value]) => [key, t(value)]),
            )}
            index={index}
            reached={index <= active}
          />
        ))}
      </div>
    </div>
  );
}
