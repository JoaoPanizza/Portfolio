import { useEffect, useRef } from 'react';
import Typed from 'typed.js';
import useReducedMotion from '../hooks/useReducedMotionPreference';

export default function TypedText({
  text,
  html = false,
  speed = 32,
  delay = 300,
  onStart,
  onComplete,
}) {
  const element = useRef(null);
  const callbacks = useRef({ onStart, onComplete });
  const reduced = useReducedMotion();

  useEffect(() => {
    callbacks.current = { onStart, onComplete };
  }, [onStart, onComplete]);

  useEffect(() => {
    if (reduced) {
      if (html) element.current.innerHTML = text;
      else element.current.textContent = text;
      callbacks.current.onComplete?.();
      return;
    }

    callbacks.current.onStart?.();
    const typed = new Typed(element.current, {
      strings: [text],
      typeSpeed: speed,
      startDelay: delay,
      contentType: html ? 'html' : null,
      showCursor: false,
      autoInsertCss: false,
      onComplete: () => callbacks.current.onComplete?.(),
    });

    return () => typed.destroy();
  }, [text, html, speed, delay, reduced]);

  return <span className="typed-copy" ref={element} />;
}
