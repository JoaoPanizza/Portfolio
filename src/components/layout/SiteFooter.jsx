import { usePreferences } from '../../Preferences';
import { Github, Linkedin, Mail } from 'lucide-react';
import { profile } from '../../data/portfolio';
import Brand from './Brand';

export default function SiteFooter() {
  const { t } = usePreferences();
  return (
    <footer className="container footer">
      <div>
        <Brand />
        <p>
          {t(
            'Estudante de tecnologia · aprendendo e construindo.',
            'Technology student · learning and building.',
          )}
        </p>
      </div>
      <div className="socials">
        <a
          href={profile.github}
          target="_blank"
          rel="noreferrer"
          aria-label={t('GitHub de João Panizza', 'João Panizza on GitHub')}
        >
          <Github size={19} />
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label={t('LinkedIn de João Panizza', 'João Panizza on LinkedIn')}
        >
          <Linkedin size={19} />
        </a>
        <a href={`mailto:${profile.email}`} aria-label={t('Enviar e-mail', 'Send email')}>
          <Mail size={19} />
        </a>
      </div>
      <span>
        © {new Date().getFullYear()} {profile.name}
      </span>
    </footer>
  );
}
