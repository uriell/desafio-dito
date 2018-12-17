# dito-challenge
Olá! Esta é a minha submissão para o challenge proposto pela Dito de processamento, busca e disponibilização de dados e eventos. Venho trabalhando nessa tarefa por quase 4 (quatro) dias e devo dizer que também me serviu de aprendizado em tecnologias que eu não tive experiência direta (como next.js) mas que provaram ser ideais para demonstrar o sistema proposto.

Primeiramente, instale as dependências de cada diretório:
```bash
docker-compose -f server/docker-compose.yml up -d postgres
cd server && npm install && cd ..
cd client && npm install && cd ..
npm install
```

E já pode iniciar os dois serviços com `npm start` e acessar via http://localhost:3000

Deixei descrições um pouco mais detalhadas sobre as estruturas no README de cada diretório. Peço que ressaltem quaisquer críticas e agradeço desde já pela oportunidade!
