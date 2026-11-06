import { usePreferences } from '../Preferences';
import { projects, skills } from '../data/portfolio';
import AnimatedCounter from './AnimatedCounter';
import ScrollReveal from './ScrollReveal';

export default function PortfolioStats() {
  const { t } = usePreferences();
  const stats = [
    {
      value: skills.reduce((total, group) => total + group.items.length, 0),
      label: t('tecnologias em estudo', 'technologies I’m learning'),
    },
    ...(projects.length
      ? [{ value: projects.length, label: t('projetos', 'projects') }]
      : []),
  ];
  return (
    <ScrollReveal className="portfolio-stats">
      {stats.map((stat) => (
        <div key={stat.label} aria-label={`${stat.value} ${stat.label}`}>
          <AnimatedCounter value={stat.value} />
          <span aria-hidden="true">{stat.label}</span>
        </div>
      ))}
    </ScrollReveal>
  );
}
