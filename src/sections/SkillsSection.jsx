import { usePreferences } from '../Preferences';
import Section from '../components/Section';
import TechStack from '../components/TechStack';
import { projects } from '../data/portfolio';

export default function SkillsSection() {
  const { t } = usePreferences();
  return (
    <Section
      id="habilidades"
      number={projects.length ? '03' : '02'}
      eyebrow={t('CONHECIMENTOS EM DESENVOLVIMENTO', 'SKILLS I’M BUILDING')}
      title={
        <>
          {t('Uma boa base.', 'A solid foundation.')}
          <br />
          <span>{t('Novos horizontes.', 'New horizons.')}</span>
        </>
      }
      description={t(
        'Comecei pelo desenvolvimento web e sigo estudando para me tornar um desenvolvedor full-stack. Aqui estão minha base atual, as tecnologias que estou aprendendo e as ferramentas gerais que conheço.',
        'I started with web development and am studying to become a full-stack developer. Here are my current foundations, the technologies I’m learning, and the general tools I know.',
      )}
    >
      <TechStack />
    </Section>
  );
}
