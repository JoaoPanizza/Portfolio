import { flushSync } from 'react-dom';
import { english } from './data/english';
import { createContext, useContext, useLayoutEffect, useRef, useState } from 'react';

const Preferences = createContext(null);

export function PreferencesProvider({ children }) {
  const [language, setLanguage] = useState(() =>
    localStorage.getItem('portfolio-language') === 'en' ? 'en' : 'pt-BR',
  );
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('portfolio-theme') === 'light' ? 'light' : 'dark',
  );
  const switching = useRef(false);

  async function changeTheme(nextTheme, event) {
    if (nextTheme === theme || switching.current) return;
    if (
      !document.startViewTransition ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      setTheme(nextTheme);
      return;
    }
    const rect =
      event.currentTarget.querySelector('svg')?.getBoundingClientRect() ??
      event.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    switching.current = true;
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(nextTheme));
    });
    try {
      await transition.ready;
      const origin = ' at ' + x + 'px ' + y + 'px)';
      await document.documentElement.animate(
        { clipPath: ['circle(0px' + origin, 'circle(' + radius + 'px' + origin] },
        {
          duration: 650,
          easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          pseudoElement: '::view-transition-new(root)',
        },
      ).finished;
    } catch {
      transition.skipTransition();
    } finally {
      await transition.finished.catch(() => {});
      switching.current = false;
    }
  }

  useLayoutEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('portfolio-language', language);
    localStorage.setItem('portfolio-theme', theme);
  }, [language, theme]);

  return (
    <Preferences.Provider
      value={{
        language,
        theme,
        setLanguage,
        setTheme: changeTheme,
        t: (pt, en) => (language === 'en' ? (en ?? english[pt] ?? pt) : pt),
      }}
    >
      {children}
    </Preferences.Provider>
  );
}

export function usePreferences() {
  return useContext(Preferences);
}
