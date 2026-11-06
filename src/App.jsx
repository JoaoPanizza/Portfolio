import { usePreferences } from './Preferences';
import SiteHeader from './components/layout/SiteHeader';
import SiteFooter from './components/layout/SiteFooter';
import InteractiveAtmosphere from './components/InteractiveAtmosphere';
import HeroSection from './sections/HeroSection';
import AboutSection from './sections/AboutSection';
import ProjectsSection from './sections/ProjectsSection';
import SkillsSection from './sections/SkillsSection';
import EducationSection from './sections/EducationSection';
import ContactSection from './sections/ContactSection';

export default function App() {
  const { t } = usePreferences();
  return (
    <>
      <InteractiveAtmosphere />
      <a className="skip-link" href="#conteudo">
        {t('Pular para o conteúdo', 'Skip to content')}
      </a>
      <SiteHeader />
      <main id="conteudo">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
