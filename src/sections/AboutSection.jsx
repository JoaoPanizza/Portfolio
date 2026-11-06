import { usePreferences } from '../Preferences';
import { ArrowUpRight, CodeXml } from 'lucide-react';
import { profile } from '../data/portfolio';
import Section from '../components/Section';
import ScrollReveal from '../components/ScrollReveal';
import DeveloperModel from '../components/DeveloperModel';
import PortfolioStats from '../components/PortfolioStats';

export default function AboutSection() {
  const { t } = usePreferences();
  return (
    <Section
      id="sobre"
      number="01"
      eyebrow={t('SOBRE MIM', 'ABOUT ME')}
      title={
        <>
          {t('Uma base em construção.', 'Building a foundation.')}
          <br />
          <span>{t('Vontade de ir além.', 'Ready to go further.')}</span>
        </>
      }
      className="about-section"
    >
      <div className="about-grid about-grid-with-model">
        <div className="about-text">
          <ScrollReveal className="about-copy">
            <p>{t(profile.bio)}</p>
            <p>{t(profile.approach)}</p>
            <a className="text-link" href={`mailto:${profile.email}`}>
              {t('Vamos trocar ideias', 'Let’s exchange ideas')}{' '}
              <ArrowUpRight size={17} />
            </a>
          </ScrollReveal>
          <ScrollReveal className="about-note">
            <span className="eyebrow">
              {t('COMO QUERO EVOLUIR', 'HOW I WANT TO GROW')}
            </span>
            <p>
              {t('Aprender com a equipe.', 'Learn from the team.')}
              <br />
              {t('Aplicar o que estudo.', 'Put what I study into practice.')}
              <br />
              <em>{t('Crescer com cada desafio.', 'Grow with each challenge.')}</em>
            </p>
            <div>
              <CodeXml size={21} />
              <span>{profile.location}</span>
            </div>
          </ScrollReveal>
        </div>
        <ScrollReveal distance={24}>
          <DeveloperModel />
        </ScrollReveal>
      </div>
      <PortfolioStats />
    </Section>
  );
}
