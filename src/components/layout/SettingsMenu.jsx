import { useEffect, useRef, useState } from 'react';
import { Languages, Moon, Settings2, Sun } from 'lucide-react';
import { usePreferences } from '../../Preferences';

export default function SettingsMenu() {
  const { t, language, setLanguage, theme, setTheme } = usePreferences();
  const [open, setOpen] = useState(false);
  const menu = useRef(null);
  const button = useRef(null);

  useEffect(() => {
    if (!open) return;
    function dismiss(event) {
      if (event.key === 'Escape') {
        setOpen(false);
        button.current.focus();
      } else if (event.type === 'pointerdown' && !menu.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('keydown', dismiss);
    document.addEventListener('pointerdown', dismiss);
    return () => {
      document.removeEventListener('keydown', dismiss);
      document.removeEventListener('pointerdown', dismiss);
    };
  }, [open]);

  return (
    <div className="settings" ref={menu}>
      <button
        ref={button}
        type="button"
        className="settings-toggle"
        aria-label={t('Configurações', 'Settings')}
        aria-expanded={open}
        aria-controls="site-settings"
        onClick={() => setOpen(!open)}
      >
        <Settings2 size={19} aria-hidden="true" />
      </button>
      <div className="settings-panel" id="site-settings" hidden={!open}>
        <fieldset>
          <legend>
            <Languages size={14} aria-hidden="true" /> {t('Idioma', 'Language')}
          </legend>
          <div className="settings-options">
            <button
              type="button"
              aria-pressed={language === 'pt-BR'}
              onClick={() => setLanguage('pt-BR')}
              lang="pt-BR"
              aria-label="Português"
            >
              PT
            </button>
            <button
              type="button"
              aria-pressed={language === 'en'}
              onClick={() => setLanguage('en')}
              lang="en"
              aria-label="English"
            >
              EN
            </button>
          </div>
        </fieldset>
        <fieldset>
          <legend>{t('Aparência', 'Appearance')}</legend>
          <div className="settings-options">
            <button
              type="button"
              aria-pressed={theme === 'dark'}
              onClick={(event) => setTheme('dark', event)}
            >
              <Moon size={15} aria-hidden="true" /> {t('Escuro', 'Dark')}
            </button>
            <button
              type="button"
              aria-pressed={theme === 'light'}
              onClick={(event) => setTheme('light', event)}
            >
              <Sun size={15} aria-hidden="true" /> {t('Claro', 'Light')}
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
