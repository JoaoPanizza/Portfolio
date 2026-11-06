import { usePreferences } from '../../Preferences';
import SettingsMenu from './SettingsMenu';
import { useEffect, useState } from 'react';
import { m } from 'motion/react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { navigation } from '../../data/portfolio';
import useReducedMotion from '../../hooks/useReducedMotionPreference';
import useActiveSection from '../../hooks/useActiveSection';
import Brand from './Brand';

export default function SiteHeader() {
  const { t } = usePreferences();
  const reduced = useReducedMotion();
  const active = useActiveSection();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    function closeOnEscape(event) {
      if (event.key === 'Escape') setOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, []);
  return (
    <header className="site-header">
      <div className="container flex items-center justify-between">
        <Brand />
        <nav
          aria-label={t('Navegação principal', 'Main navigation')}
          className="hidden md:flex items-center gap-5 lg:gap-8"
        >
          {navigation.map((item) => (
            <a
              key={item.id}
              className={active === item.id ? 'active' : ''}
              href={`#${item.id}`}
              aria-current={active === item.id ? 'location' : undefined}
            >
              {t(item.label)}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <a href="#contato" className="header-contact hidden md:flex">
            {t('Entre em contato', 'Get in touch')} <ArrowUpRight size={15} />
          </a>
          <SettingsMenu />
          <button
            className="menu-toggle md:hidden"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={
              open ? t('Fechar menu', 'Close menu') : t('Abrir menu', 'Open menu')
            }
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>
      <m.nav
        animate={{ height: open ? 'auto' : 0, opacity: open ? 1 : 0 }}
        initial={false}
        transition={{ duration: reduced ? 0 : 0.32, ease: [0.22, 1, 0.36, 1] }}
        id="mobile-menu"
        aria-label={t('Navegação móvel', 'Mobile navigation')}
        inert={!open}
        className={`mobile-menu md:hidden ${open ? 'is-open' : ''}`}
      >
        {[
          ...navigation,
          { id: 'contato', label: t('Entre em contato', 'Get in touch') },
        ].map((item) => (
          <a href={`#${item.id}`} key={item.id} onClick={() => setOpen(false)}>
            {t(item.label)}
            <ArrowUpRight size={18} />
          </a>
        ))}
      </m.nav>
    </header>
  );
}
