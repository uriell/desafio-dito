# dito-challenge-server
Este diretório está em cargo de gerenciar o servidor de API para o desafio proposto pela Dito. O servidor tem como suas responsabilidades buscar, organizar e exibir os dados de eventos disponíveis tanto estaticamente como entradas manuais. Neste README você encontrará descrições e instruções sobre o servidor e sua execução.

### Dependências
O servidor utiliza como banco de dados PostgreSQL 9.5 (embora não utilizando de todas suas vantagens, MongoDB também seria apropriado) e suporta Node 8+.

### Estrutura
A estrutura dos arquivos, diretórios e módulos é vital para que novas funcionalidades sejam adicionadas com a maior facilidade possível por qualquer desenvolvedor.
```
  |- config             # toda a configuração manual necessária antes da inicialização do servidor
  |- src                # todo o código fonte do servidor
  |   |- controllers    # controladoras que tomam conta dos requests (diretamente relacionado aos routers)
  |   |- middlewares    # middlewares para o servidor http (express)
  |   |- models         # definições de modelos (tabelas) para o banco de dados
  |   |- routers        # routers que definiram os endpoints/urls do servidor, também como middlewares em alguns casos
  |   |- utils          # funções de utilidade
  |   |- constants.js   # valores constantes (imutáveis) para serem referenciados
  |   '- index.js       # arquivo de entrada para o servidor, o primeiro a ser executado e que inicia outros módulos
  |- test               # testes automatizados para serem executados no servidor
  |- .eslintrc.json     # configuração para a revisão (linting) de escrita do código 
  |- package.json       # informações sobre o package, dependências e scripts de inicialização
  '- README.md          # este arquivo
```

### Execução
Idealmente para execução initerrupta, o servidor deveria ser executado por meio do PM2 `npm i -g pm2`, que não só reiniciaria o processo ao encontrar um erro, mas também proporcionaria clustering (multithreading).

De qualquer modo, para inicializar o servidor, basta criar o arquivo de configuração `development.json` baseado no exemplo e preencher as configurações necessárias. Em seguida, instale as dependências via `npm install` dentro do diretório e verifique que o Postgres 9.5 está acessível e rodando na rede local.

Finalmente, inicie o servidor por meio do comando `npm start`.

### API Docs
Toda API óbviamente precisa de uma boa documentação para que qualquer outro desenvolvedor que venha a utilizá-la não tenha dificuldades.

#### Respostas
A API segue um padrão único para respostas:
* Status 200
* Body com o seguinte formato:

```js
{
  "data": [],       // qualquer dados que o endpoint tenha de retornar estará sempre dentro desta array
  "time": 1234,     // o tempo de processamento em milisegundos que o servidor gastou
  "meta": {         // informações generalizadas (ou em detalhe!) sobre o resultado
    "status": 200,  // http code de 3 dígitos (utilizado globalmente)
    "message": "ok" // definição breve do resultado ("ok" ou "error")
  }
}
```

#### Erros
Você pode esperar erros a seguirem um padrão similar à respostas, cada erro é identificado por um código prefixado do http code do resultado. Adicionalmente, o objeto `meta` deverá conter um objeto adicional pela propriedade `error` com o seguinte formato:

```js
{
  "code": 4001,     // o código http-like que identifica esse erro exclusivamente
  "message": "Existem um ou mais propriedades com valores inválidos."
}
```

A propriedade `message` deverá explicar a razão do erro, preferivelmente em detalhes, mas haverá **sempre** pelo menos alguma explicação :) Em alguns endpoints você pode notar uma mistura no inglês e português, isso é devido à utilização da reposta bruta do package/library [Joi](https://npm.im/joi) que valida todo schema de json que o servidor venha a receber. O package suporta a tradução destas mensagens mas considerei isso irrelevante ao challenge.

##### Endpoints
* GET /events/ (opcional ?search)
Esse endpoint tem como sua responsabilidade retornar os eventos armazenados no banco de dados. Cada objeto presente na array `data` deve seguir o seguinte formato:

```js
{
  "key": "comprou",                                     // a event key referente à este evento, isso identifica o tipo da ação
  "timestamp": "2016-09-22T13:57:31.2311892-03:00",     // a timestamp em que o evento ocorreu (?: necessita clarificação)
  "custom_data": [                                      // informações adicionais sobre o evento
    {
      "key": "store_name",                              // o nome da propriedade adicional
      "value": "Pátio Savassi"                          // o valor da propriedade adicional
    }
  ]
}
```

Adicionalmente, a query `search` poderá ser especificada com um termo de no mínimo 2 caracteres (menos resultará em um erro), resultando num filtro de resultados pela propriedade `key`. Você pode esperar os resultados organizados primeiramente pela similaridade ao termo de busca e em seguida pela propriedade `timestamp`.

* GET /events/keys (opcional ?search)
Nesse endpoint é possível visualizar todas as event keys (sem repetições) ou buscar por um termo como o endpoint `GET /events/`. Os itens presentes na array `data` também serão organizados pela similaridade ao termo.
* GET /events/timeline
Exibe a timeline de eventos de keys `comprou` e `comprou-produto`, organizados pela propriedade `timestamp` e agrupando os produtos no pedido via `transaction_id` no seguinte formato:

```js
{
  "timeline": [
    {
      "timestamp": "2016-10-02T11:37:31.2300892-03:00",   // a timestamp da compra (?: necessita clarificação se é sobre a finalização ou início)
      "revenue": 120,                                     // a receita desta transação
      "transaction_id": "3409340",                        // o id da transação
      "store_name": "BH Shopping",                        // nome da loja
      "products": [                                       // array de produtos adquiridos via esta transação
        {
          "name": "Tenis Preto",                          // nome do produto
          "price": 120                                    // preço total (?: necessita clarificação) do produto
        }
      ]
    }
  ]
}
```

* GET /events/fetch
Por meio deste endpoint, o servidor busca os eventos estáticos disponibilizados para o challenge da Dito. Ele também evita importar eventos com a mesma `timestamp` (já que não há outro método de identificação). A informação é processada e armazenada com poucas diferenças, porém a informação bruta é retornada de acordo com o que foi armazenado.

Nesta demonstração você pode esperar ver apenas uma interação com esse endpoint.

* POST /events/new
Inserção de novos eventos (seja para agir como recebimento de webhooks ou manualmente).

O servidor espera o seguinte formato no body do pedido:
```js
{
  "events": [                                             // mínimo de 1 evento presente
    {
      "key": "test-key",
      "timestamp": "2018-05-05T01:01:24.3142179-03:00",
      "custom_data": [],
    }
  ]
}
```