# dito-challenge-client
Este diretório foi feito para o acesso e gerenciamento da API via um cliente de navegador. A aplicação foi feita em React e é renderizada préviamente num servidor (SSR com ajuda do next.js). Este também foi meu primeiro projeto em React já que aprendi recentemente (mês passado, 04/2018) e precisava colocar em prática.

### Estrutura
```
  |- pages              # configuração de páginas para o next.js
  |- src                # todo o código fonte da aplicação
  |   |- actions        # Ações e dispatchers da aplicação
  |   |- containers     # composições de ações, propriedades, estado e componentes
  |   |- components     # componentes da aplicação (elementos, nodes)
  |   |- reducers       # funções que gerenciam e alteram o state de modo "imutável"
  |   |- selectors      # seletores de dados direto do state
  |   |- store          # scripts relacionados à store de state (estado) da aplicação
  |   |- constants.js   # valores constantes (imutáveis) para serem referenciados
  |   '- utils.js       # funções de utilidade
  |- static             # arquivos estáticos que o next.js irá carregar
  |- .babelrc           # especificação para a configuração do babel
  |- .eslintignore      # caminhos a serem ignorados pela revisão (linting)
  |- .eslintrc.json     # configuração para a revisão (linting) de escrita do código 
  |- next.config.js     # configuração do next.js
  |- package.json       # informações sobre o package, dependências e scripts de inicialização
  '- README.md          # este arquivo
```

### Execução
A execução pode ser feita via `npm run dev` ou `npm start`, que iniciará o servidor e o bundling da aplicação, disponíveis em http://localhost:3000