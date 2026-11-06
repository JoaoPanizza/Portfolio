import ProjectPreview from './ProjectPreview';
import useReducedMotion from '../hooks/useReducedMotionPreference';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, Github, Plus } from 'lucide-react';
import { m } from 'motion/react';

export default function ProjectCard({ project }) {
  const reduced = useReducedMotion();
  return (
    <ScrollReveal as="article" className="project-card">
      <m.div
        whileHover={reduced ? undefined : { y: -4 }}
        transition={{ type: 'spring', stiffness: 220, damping: 25 }}
      >
        <ProjectPreview theme={project.theme} />
        <div className="project-info">
          <p className="eyebrow">
            {project.category}
            <span>{project.id}</span>
          </p>
          <h3>{project.title}</h3>
          <p>{project.description}</p>
          <ul className="tags">
            {project.tech.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
          {project.study && (
            <details className="project-study">
              <summary>
                Objetivo e conceitos do estudo <Plus size={15} aria-hidden="true" />
              </summary>
              <dl>
                <div>
                  <dt>Desafio proposto</dt>
                  <dd>{project.study.challenge}</dd>
                </div>
                <div>
                  <dt>Conceitos em prática</dt>
                  <dd>{project.study.practice}</dd>
                </div>
                <div>
                  <dt>Como avaliar</dt>
                  <dd>{project.study.validation}</dd>
                </div>
              </dl>
            </details>
          )}
          <div className="project-links">
            {project.demo ? (
              <a href={project.demo} target="_blank" rel="noreferrer">
                Ver projeto <ArrowUpRight size={15} />
              </a>
            ) : (
              <span>
                Demo em breve <ArrowUpRight size={15} />
              </span>
            )}
            {project.code ? (
              <a href={project.code} target="_blank" rel="noreferrer">
                <Github size={15} /> Código
              </a>
            ) : (
              <span>
                <Github size={15} /> Projeto ilustrativo
              </span>
            )}
          </div>
        </div>
      </m.div>
    </ScrollReveal>
  );
}
