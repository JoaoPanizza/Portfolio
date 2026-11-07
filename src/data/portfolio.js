// Seus dados e conteúdos ficam neste arquivo.
export const profile = {
  name: 'João Panizza',
  initials: 'JP',
  role: 'Estudante de tecnologia',
  location: 'Presidente Prudente · São Paulo',
  availability: 'Aberto a conexões e colaboração',
  focus: 'Estudos em desenvolvimento full-stack',
  goal: 'Aprendizado e colaboração',
  resumeUrl: null,
  headline: ['Aprender, construir.', 'Evoluir em equipe.'],
  introduction:
    'Sou João Panizza, estudante de tecnologia. Estou estudando para me tornar um desenvolvedor full-stack e comecei meu aprendizado pelo desenvolvimento web.',
  bio: 'Moro em Presidente Prudente (SP) e comecei meus estudos por HTML, CSS, JavaScript e PHP. Uso WordPress e Bootstrap no desenvolvimento web e estou aprendendo React e Tailwind CSS enquanto construo minha base para atuar como desenvolvedor full-stack.',
  approach:
    'Quero conhecer pessoas, trocar experiências e participar de iniciativas em que possa aprender e contribuir. Tenho interesse em diferentes áreas da tecnologia e estou aberto a novas possibilidades.',
  email: 'joaohenrique.panizzasilva07@gmail.com',
  github: 'https://github.com/JoaoPanizza',
  linkedin: 'https://br.linkedin.com/in/joaopanizza',
};

// Adicione seus projetos quando estiverem prontos para apresentar.
export const projects = [];

export const navigation = [
  { id: 'inicio', label: 'Início' },
  { id: 'sobre', label: 'Sobre' },
  ...(projects.length ? [{ id: 'projetos', label: 'Projetos' }] : []),
  { id: 'habilidades', label: 'Conhecimentos' },
  { id: 'trajetoria', label: 'Trajetória' },
];

export const skills = [
  {
    id: 'fundamentos',
    title: 'Fundamentos',
    items: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    id: 'web',
    title: 'Desenvolvimento web',
    items: ['PHP', 'WordPress', 'Bootstrap'],
  },
  {
    id: 'aprendizado',
    title: 'Tecnologias em aprendizado',
    items: ['React', 'Tailwind CSS'],
  },
  {
    id: 'gerais',
    title: 'Tecnologias essenciais',
    items: ['SQL', 'Git'],
  },
];

export const experiences = [
  {
    period: '2025 — atual',
    title: 'Sistemas de Informação',
    place: 'Unoeste · Presidente Prudente (SP)',
    description:
      'Após concluir a escola, iniciei meus estudos em tecnologia no curso de Sistemas de Informação da Unoeste, universidade de Presidente Prudente. Foi o começo da minha formação na área.',
  },
  {
    period: '2026 — atual',
    title: 'Estágio na OxigenWeb',
    place: 'OxigenWeb · Tecnologia e marketing digital',
    url: 'https://www.oxigenweb.com.br/',
    description:
      'A OxigenWeb é uma agência de tecnologia e marketing digital que atua com criação de sites, sistemas web e SEO. Foi onde recebi minha primeira oportunidade no mercado de trabalho e aprendi desenvolvimento web com PHP, WordPress e Bootstrap.',
  },
  {
    period: 'Em evolução',
    title: 'Novos aprendizados',
    place: 'Estudos em desenvolvimento full-stack',
    description:
      'Busco me aperfeiçoar em novas tecnologias e ampliar minha base em programação full-stack. Quero entender como as ferramentas se conectam e conhecer melhor as tecnologias usadas no mercado de trabalho.',
  },
];
