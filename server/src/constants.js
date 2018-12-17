module.exports = {
  ERROR_RESPONSES: {
    // 400 - Bad Request
    4000: 'Existem um ou mais propriedades obrigatórias faltando.',
    4001: 'Existem um ou mais propriedades com valores inválidos.',
    // 404 - Not Found
    4040: 'O caminho especificado não foi encontrado ou não aceita este método.',
    // 500 - Internal Server Error
    5000: 'Um erro interno ocorreu.',
    5001: 'Uma resposta inesperada foi recebida ao conectar com uma fonte externa.',
    // 502 - Bad Gateway
    5020: 'Um erro ocorreu durante a tentativa de conexão com uma fonte externa.',
  },
};