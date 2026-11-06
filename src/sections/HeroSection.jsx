import { usePreferences } from '../Preferences';
import { useRef } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Github, Linkedin } from 'lucide-react';
import { profile, projects } from '../data/portfolio';
import Mountains from '../components/Mountains';
import DeveloperTerminal from '../components/DeveloperTerminal';
import TypewriterHeading from '../components/TypewriterHeading';

export default function HeroSection() {
  const { t } = usePreferences();
  const heroRef = useRef(null);
  return (
    <section ref={heroRef} id="inicio" className="hero">
      <Mountains target={heroRef} />
      <div className="hero-shade" />
      <div className="container hero-content">
        <div className="hero-copy">
          <div className="availability">
            <i /> {t(profile.availability)}
          </div>
          <p className="eyebrow hero-label">
            {t(
              'ESTUDOS EM DESENVOLVIMENTO FULL-STACK',
              'STUDYING FULL-STACK DEVELOPMENT',
            )}
          </p>
          <p className="developer-identity">
            <span aria-hidden="true">&lt;/&gt;</span> {profile.name}{' '}
            <span className="identity-divider">/</span> <strong>{t(profile.role)}</strong>
          </p>
          <TypewriterHeading lines={profile.headline.map((line) => t(line))} />
          <p className="hero-description">{t(profile.introduction)}</p>
          <div className="flex flex-wrap gap-4">
            <a
              className="button button-primary"
              href={projects.length ? '#projetos' : '#contato'}
            >
              {projects.length
                ? t('Conheça meus projetos', 'Explore my projects')
                : t('Entre em contato', 'Get in touch')}{' '}
              <ArrowUpRight size={18} />
            </a>
            <a
              className="button button-quiet"
              href={profile.resumeUrl || '#trajetoria'}
              target={profile.resumeUrl ? '_blank' : undefined}
              rel={profile.resumeUrl ? 'noreferrer' : undefined}
            >
              {profile.resumeUrl
                ? t('Ver currículo', 'View résumé')
                : t('Conheça minha trajetória', 'Explore my journey')}{' '}
              <ArrowRight size={17} />
            </a>
          </div>
          <div className="hero-profile-links">
            <a href={profile.github} target="_blank" rel="noreferrer">
              <Github size={14} /> GitHub <ArrowUpRight size={12} />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={14} /> LinkedIn <ArrowUpRight size={12} />
            </a>
          </div>
        </div>
        <div className="terminal-depth" data-pointer-surface>
          <DeveloperTerminal />
        </div>
      </div>
      <div className="container hero-bottom">
        <a href="#sobre">
          <span className="scroll-circle">
            <ArrowDown size={16} />
          </span>{' '}
          {t('O próximo passo é descobrir', 'Scroll to explore')}
        </a>
        <span>
          {t(
            'APRENDER EM EQUIPE. CRESCER EM TECNOLOGIA.',
            'LEARN WITH A TEAM. GROW IN TECH.',
          )}
        </span>
      </div>
    </section>
  );
}
