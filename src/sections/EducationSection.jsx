import { usePreferences } from '../Preferences';
import Section from '../components/Section';
import ExperienceTimeline from '../components/ExperienceTimeline';
import { projects } from '../data/portfolio';

export default function EducationSection() {
  const { t } = usePreferences();
  return (
    <Section
      id="trajetoria"
      number={projects.length ? '04' : '03'}
      eyebrow={t('TRAJETÓRIA E APRENDIZADO', 'JOURNEY AND LEARNING')}
      title={
        <>
          {t('Cada etapa, ', 'Every step, ')}
          <span>{t('uma evolução.', 'a chance to grow.')}</span>
        </>
      }
      description={t(
        'Entre estudos e prática, sigo descobrindo caminhos na tecnologia. Cada etapa amplia minha base e abre espaço para novas conexões.',
        'Through study and practice, I’m discovering paths in technology. Each step builds my foundation and creates room for new connections.',
      )}
    >
      <ExperienceTimeline />
    </Section>
  );
}
