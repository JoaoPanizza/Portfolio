# Portfólio

Portfólio de estudante em busca de estágio, feito com React, Vite e Tailwind CSS. As animações usam Motion e Typed.js. O notebook 3D usa Three.js e só é carregado perto da seção Sobre.

## Como rodar

Com Node.js 22.12 ou superior instalado, abra o terminal nesta pasta:

```sh
npm install
npm run dev
```

O terminal vai mostrar o endereço para abrir no navegador.

Outros comandos:

| Comando                | Para que serve                                      |
| ---------------------- | --------------------------------------------------- |
| `npm run build`        | Gera o site pronto para publicação na pasta `dist`. |
| `npm run preview`      | Abre a versão de produção localmente.               |
| `npm run format`       | Formata o código com Prettier.                      |
| `npm run format:check` | Confere a formatação sem alterar arquivos.          |

## Por onde começar

1. Abra `src/data/portfolio.js` e troque nome, contatos, formação e textos de exemplo.
2. Abra `src/App.jsx` para entender a ordem das seções.
3. Escolha um arquivo em `src/sections` para mudar o conteúdo ou a estrutura daquela parte da página.

Em React, um **componente** é uma função que retorna um pedaço da interface. O código parecido com HTML dentro dessas funções se chama **JSX**. Por exemplo, `<HeroSection />` no `App.jsx` mostra o componente da apresentação inicial.

Os componentes recebem informações por **props**. Em `<ProjectCard project={project} />`, a prop `project` contém os dados que o card precisa exibir. O `.map()` percorre a lista de projetos e cria um card para cada item.

## Onde fica cada coisa

```text
src/
  App.jsx                  Ordem das seções da página
  main.jsx                 Inicialização do React e importação do CSS
  data/
    portfolio.js           Textos, contatos, projetos, habilidades e formação
  sections/
    HeroSection.jsx        Banner inicial
    AboutSection.jsx       Apresentação e notebook 3D
    ProjectsSection.jsx    Lista de projetos
    SkillsSection.jsx      Conhecimentos e tecnologias
    EducationSection.jsx   Formação e aprendizado
    ContactSection.jsx     Contatos para oportunidades
  components/
    layout/                Marca, cabeçalho e rodapé
    ProjectCard.jsx        Informações de um projeto
    ProjectPreview.jsx     Ilustrações dos projetos de exemplo
    TypedText.jsx          Integração do Typed.js com React
    TypewriterHeading.jsx  Título animado da apresentação
    AnimatedCounter.jsx    Contagem dos números ao entrar na tela
    PortfolioStats.jsx     Totais calculados pelos dados
    ExperienceTimeline.jsx Linha do tempo sincronizada com as bolinhas
    ScrollReveal.jsx       Movimento dos elementos durante o scroll
    ...                    Outros elementos visuais reutilizáveis
  hooks/                   Comportamentos compartilhados entre componentes
  graphics/                Cena do notebook 3D
  styles/
    index.css              Importa os quatro arquivos abaixo
    base.css               Layout geral e estilos básicos
    theme.css              Paleta e efeitos visuais
    sections.css           Stack, timeline e apresentação do 3D
    typography.css         Fontes, título e detalhes dos projetos
```

Os **hooks** são funções que compartilham comportamentos, como descobrir a seção atual ou verificar a preferência por movimento reduzido. Os efeitos de mouse e 3D ficam isolados: você não precisa entendê-los para atualizar seus textos e projetos.

## Personalizar os dados

Em `src/data/portfolio.js`:

- `profile`: nome, apresentação, objetivo, contatos e título da hero.
- `profile.resumeUrl`: link do seu currículo. Com `null`, o site mostra o botão de formação; com uma URL, mostra o botão de currículo.
- `projects`: lista dos projetos. Adicionar um objeto cria um novo card automaticamente.
- `skills`: categorias e listas de conhecimentos.
- `experiences`: etapas da formação, estudos e objetivo profissional.

Um projeto pode seguir este formato:

```js
{
  id: '05',
  title: 'Nome do projeto',
  category: 'PROJETO DE ESTUDO',
  description: 'Uma descrição curta do que você desenvolveu.',
  tech: ['React', 'JavaScript'],
  theme: 'serra',
  demo: null,
  code: 'https://github.com/seu-usuario/seu-projeto',
}
```

Os temas de ilustração disponíveis são `serra`, `forma`, `orbita` e `raiz`. O campo opcional `study` aceita `challenge`, `practice` e `validation`, usados nos detalhes expansíveis do card. Use `null` em links que ainda não existem.

## Bibliotecas

- **React:** organiza a interface em componentes.
- **Tailwind CSS:** oferece classes de layout e responsividade.
- **Motion:** animações, scroll, contadores e hover.
- **Typed.js:** digitação do título e do terminal.
- **Three.js:** notebook 3D criado no próprio projeto.
- **Lucide e Simple Icons:** ícones.
- **Fontsource:** Inter e JetBrains Mono servidas pelo próprio site.
- **Prettier:** formatação consistente do código.

O menu funciona por teclado, e a preferência por movimento reduzido é respeitada. Se WebGL não estiver disponível, o notebook tem uma alternativa estática.

## Observação sobre este ambiente

Neste computador, há um `package.json` inválido em `C:/Users/joaoh/package.json`, fora da pasta do projeto. Ele impede o esbuild de iniciar o servidor de desenvolvimento. Esse arquivo externo não foi alterado. Enquanto essa configuração não for corrigida, é possível conferir o projeto com `npm run build` e `npm run preview`.
