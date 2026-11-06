import { usePreferences } from '../Preferences';
import useReducedMotion from '../hooks/useReducedMotionPreference';
import { useEffect, useRef, useState } from 'react';
import { useInView } from 'motion/react';
import { Box } from 'lucide-react';

export default function DeveloperModel() {
  const { t, theme } = usePreferences();
  const ref = useRef(null);
  const canvasHost = useRef(null);
  const reduced = useReducedMotion();
  const nearby = useInView(ref, { margin: '150px', once: true });
  const [status, setStatus] = useState('loading');
  useEffect(() => {
    if (!nearby) return;
    let stopped = false;
    let dispose;
    import('../graphics/developerScene')
      .then(({ createDeveloperScene }) => {
        if (stopped) return;
        try {
          dispose = createDeveloperScene(canvasHost.current, reduced, theme, () =>
            setStatus('fallback'),
          );
          setStatus('ready');
        } catch {
          setStatus('fallback');
        }
      })
      .catch(() => {
        if (!stopped) setStatus('fallback');
      });
    return () => {
      stopped = true;
      dispose?.();
    };
  }, [nearby, reduced, theme]);

  return (
    <figure className="developer-model" ref={ref}>
      <div
        ref={canvasHost}
        className="model-canvas"
        role="img"
        aria-label={t(
          'Notebook 3D com editor de código. A perspectiva acompanha o mouse.',
          '3D laptop with a code editor. Its perspective follows pointer movement.',
        )}
      />
      {status !== 'ready' && (
        <div className="model-fallback" aria-hidden="true">
          <div className="fallback-screen">
            <span>developer.js</span>
            <code>
              <b>const</b> developer = {'{'}
              <br />
              &nbsp; curiosity: true,
              <br />
              &nbsp; building: 'next step'
              <br />
              {'};'}
            </code>
          </div>
          <div className="fallback-base" />
        </div>
      )}
      <figcaption>
        <span>
          <Box size={12} /> workspace / 3D
        </span>
        <span>{t('Bancada de desenvolvimento', 'Developer workspace')}</span>
      </figcaption>
    </figure>
  );
}
