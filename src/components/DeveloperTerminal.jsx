import { usePreferences } from '../Preferences';
import { useState } from 'react';
import { Code2, Terminal } from 'lucide-react';
import { profile } from '../data/portfolio';
import TypedText from './TypedText';

export default function DeveloperTerminal() {
  const { t } = usePreferences();
  const command = 'npm run build';
  const [ready, setReady] = useState(false);
  const fields = [
    { name: 'nome', value: JSON.stringify(profile.name) },
    { name: 'perfil', value: JSON.stringify(t(profile.role)) },
    { name: 'objetivo', value: JSON.stringify(t(profile.goal)) },
    { name: 'foco', value: JSON.stringify(t(profile.focus)) },
    { name: 'local', value: JSON.stringify(profile.location) },
  ];
  return (
    <aside
      className="developer-terminal"
      aria-label={t(
        'Apresentação em formato de editor de código',
        'Introduction in a code editor',
      )}
    >
      <div className="editor-tab">
        <span>
          <Code2 size={14} /> developer.js
        </span>
        <span className="editor-status">UTF-8</span>
      </div>
      <pre className="editor-code">
        <code>
          <span className="code-comment">// {profile.name} · portfolio</span>
          {'\n'}
          <span className="code-keyword">const</span>
          {' developer = {\n'}
          {fields.map((field, index) => (
            <span key={field.name}>
              {`  ${field.name}: `}
              <span className="code-string">{field.value}</span>
              {index < fields.length - 1 ? ',\n' : '\n'}
            </span>
          ))}
          {'};'}
        </code>
      </pre>
      <div className="terminal-output" aria-hidden="true">
        <span className="terminal-caption">
          <Terminal size={12} /> TERMINAL
        </span>
        <div className="terminal-command">
          <span>~$</span>{' '}
          <TypedText
            text={command}
            speed={65}
            delay={650}
            onStart={() => setReady(false)}
            onComplete={() => setReady(true)}
          />
          <i className={!ready ? 'typing-caret' : ''} />
        </div>
        <div className={`build-result ${ready ? 'is-ready' : ''}`}>
          {t(
            '✓ aprendendo e construindo, um passo por vez.',
            '✓ learning and building, one step at a time.',
          )}
        </div>
      </div>
      <span className="sr-only">
        {t(
          'João Panizza, estudante de tecnologia, aberto a conexões e colaboração.',
          'João Panizza, technology student, open to connections and collaboration.',
        )}
      </span>
      <div className="editor-footer">
        <span>
          <i /> main
        </span>
        <span>JavaScript · PHP · WordPress</span>
      </div>
    </aside>
  );
}
