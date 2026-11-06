function TravelPreview() {
  return (
    <>
      <div className="mini-nav">
        SERRA<span>Explore o extraordinário ↗</span>
      </div>
      <div className="mini-mountain" />
      <div className="mini-hero">
        O próximo destino.
        <br />
        <em>Uma nova perspectiva.</em>
      </div>
      <div className="mini-pill">Encontre seu caminho ↗</div>
    </>
  );
}

function TasksPreview() {
  return (
    <div className="task-window">
      <div className="task-sidebar">
        f.
        <small>
          Visão geral
          <br />
          Meus projetos
          <br />
          Calendário
        </small>
      </div>
      <div className="task-content">
        <small>SEU ESPAÇO, SEU RITMO</small>
        <h4>Bom dia, Julia.</h4>
        <div className="task-columns">
          {['A fazer', 'Em andamento', 'Concluído'].map((x, i) => (
            <div key={x}>
              <small>{x}</small>
              <div className="task-note">
                {
                  [
                    'Redesenhar o essencial',
                    'Um passo de cada vez',
                    'Ideias em movimento',
                  ][i]
                }
                <i />
                <i />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function DashboardPreview() {
  return (
    <div className="dashboard">
      <div className="mini-nav">
        ○ órbita<span>Visão geral · 2026</span>
      </div>
      <small>Um novo olhar sobre seus números.</small>
      <div className="metrics">
        <div>
          Receita total<strong>R$ 48.520</strong>
        </div>
        <div>
          Crescimento<strong>+24,8%</strong>
        </div>
        <div>
          Clientes<strong>1.284</strong>
        </div>
      </div>
      <div className="bars">
        {[32, 48, 39, 62, 53, 75, 65, 86, 72, 94, 83, 100].map((n, i) => (
          <i key={i} style={{ height: `${n}%` }} />
        ))}
      </div>
    </div>
  );
}

function ShopPreview() {
  return (
    <>
      <div className="mini-nav">
        raiz<span>Essenciais para o seu dia.</span>
      </div>
      <div className="shop-copy">
        O simples
        <br />
        permanece.<small>Objetos com intenção.</small>
      </div>
      <div className="vase" />
      <div className="vase second" />
    </>
  );
}
const previews = {
  serra: TravelPreview,
  forma: TasksPreview,
  orbita: DashboardPreview,
  raiz: ShopPreview,
};
export default function ProjectPreview({ theme }) {
  const Preview = previews[theme] || ShopPreview;
  return (
    <div data-pointer-surface className={'project-preview ' + theme} aria-hidden="true">
      <Preview />
    </div>
  );
}
