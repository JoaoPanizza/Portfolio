# Organização do código

A aparência, o foco em estágio e a revelação das experiências nas bolinhas foram preservados.

- `App.jsx` passou a mostrar somente a composição da página.
- As seis seções ficam em `src/sections`.
- Cabeçalho, rodapé e marca ficam em `src/components/layout`.
- `ProjectPreview.jsx` separa as quatro ilustrações em componentes nomeados.
- `PortfolioStats.jsx` separa os números da apresentação do terminal.
- `TypedText.jsx` usa Typed.js no lugar dos dois efeitos de digitação com temporizadores manuais.
- O parallax das montanhas usa `useScroll` e `useTransform` do Motion. O antigo `usePortfolioMotion.js` foi removido.
- A navegação ativa usa `inView` do Motion em `useActiveSection.js`.
- `useMediaQuery.js` centraliza as consultas de tela e preferência de movimento.
- Os estilos foram organizados em `src/styles`, com remoção de regras sem uso e declarações sobrescritas.
- Prettier e EditorConfig padronizam a formatação. Use `npm run format` e `npm run format:check`.

Os dados continuam em `src/data/portfolio.js`. O README explica a estrutura para quem está começando em React.

Verificação: formatação e build aprovados; testes no Chrome para digitação, contadores, teclado, telas de 320 e 390 px, movimento reduzido, navegação ativa nos dois sentidos, efeitos de mouse, parallax, modelo 3D e revelação nas bolinhas. Sem erros JavaScript nos testes de produção. A inicialização de `npm run dev` continua impedida por um JSON inválido em `C:/Users/joaoh/package.json`, fora do projeto; a limitação está registrada no README.

## Dados reais de João Panizza

Identificação, contatos, formação e conhecimentos personalizados. A apresentação considera estágios em diferentes áreas de tecnologia e preferência por trabalho remoto, sem excluir presencial e híbrido. Projetos foram retirados da lista e a seção deixa de renderizar quando a lista está vazia; menu, banner e contadores acompanham essa condição. Os componentes de projeto permanecem disponíveis para uso futuro.

A timeline apresenta a graduação na Unoeste (4º semestre, conclusão em 2029), os conhecimentos atuais e o objetivo de estágio. Os contadores mostram semestre e número de tecnologias. O arquivo `CONTEUDO.md` foi atualizado com os dados informados.
