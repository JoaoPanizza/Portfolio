import { useState } from 'react';
import useReducedMotion from '../hooks/useReducedMotionPreference';
import TypedText from './TypedText';

function escapeHtml(text) {
  const entities = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (character) => entities[character]);
}

export default function TypewriterHeading({ lines }) {
  const reduced = useReducedMotion();
  const [finished, setFinished] = useState(false);
  const html = lines
    .map((line, index) => {
      const color = index === 0 ? 'typing-primary' : 'typing-accent';
      return `<span class="typing-line typing-text ${color}">${escapeHtml(line)}</span>`;
    })
    .join('');

  return (
    <h1 className="typing-heading">
      <span className="sr-only">{lines.join(' ')}</span>
      <span className="heading-reserve" aria-hidden="true">
        {lines.map((line, index) => (
          <span className="typing-line" key={index}>
            {line}
          </span>
        ))}
      </span>
      <span
        className={`heading-output ${!finished && !reduced ? 'is-typing' : ''}`}
        aria-hidden="true"
      >
        <TypedText
          text={html}
          html
          onStart={() => setFinished(false)}
          onComplete={() => setFinished(true)}
        />
      </span>
    </h1>
  );
}
