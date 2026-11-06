import { projects } from '../data/portfolio';
import Section from '../components/Section';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsSection() {
  if (projects.length === 0) return null;

  return (
    <Section
      id="projetos"
      number="02"
      eyebrow="PROJETOS DE ESTUDO"
      title={
        <>
          Do estudo à <span>prática.</span>
        </>
      }
      description="Projetos ilustrativos para apresentar a forma como estudo e organizo interfaces. Substitua os exemplos por trabalhos acadêmicos ou pessoais e seus repositórios."
    >
      <div className="grid md:grid-cols-2 gap-x-8 gap-y-12">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
      <p className="project-footnote">
        Exemplos de portfólio · personalize com seus projetos reais e o que aprendeu em
        cada um
      </p>
    </Section>
  );
}
