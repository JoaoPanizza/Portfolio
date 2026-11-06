import { usePreferences } from '../Preferences';
import { ArrowUpRight, Linkedin } from 'lucide-react';
import { profile } from '../data/portfolio';
import ScrollReveal from '../components/ScrollReveal';

export default function ContactSection() {
  const { t } = usePreferences();
  return (
    <section id="contato" className="contact-section">
      <div className="contact-contour" aria-hidden="true" />
      <ScrollReveal className="container relative">
        <p className="eyebrow">{t('VAMOS CONVERSAR', 'LET’S TALK')}</p>
        <div className="contact-grid">
          <div>
            <h2>
              {t('Uma conversa pode ser', 'A conversation could be')}
              <br />
              <span>{t('o começo de algo.', 'the start of something.')}</span>
            </h2>
            <p>
              {t(
                'Tem uma ideia, uma oportunidade ou algo para compartilhar?',
                'Have an idea, an opportunity, or something to share?',
              )}
              <br className="hidden md:block" />{' '}
              {t(
                'Entre em contato. Vamos trocar experiências e explorar como podemos colaborar.',
                'Get in touch. Let’s exchange experiences and explore how we can collaborate.',
              )}
            </p>
          </div>
          <a
            className="contact-arrow"
            href={`mailto:${profile.email}`}
            aria-label={`${t('Enviar e-mail para', 'Send email to')} ${profile.email}`}
          >
            <ArrowUpRight size={42} strokeWidth={1.25} />
          </a>
        </div>
        <a className="email-link" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight size={20} />
        </a>
        <ScrollReveal className="career-contact-actions" distance={24}>
          <a
            className="button button-quiet"
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin size={16} /> {t('Perfil no LinkedIn', 'LinkedIn profile')}
          </a>
          {profile.resumeUrl && (
            <a
              className="button button-quiet"
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
            >
              {t('Ver currículo', 'View résumé')} <ArrowUpRight size={16} />
            </a>
          )}
        </ScrollReveal>
      </ScrollReveal>
    </section>
  );
}
