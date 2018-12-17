const CONSTANTS = require('../constants');

function generateBaseResponse(req) {
  return {
    data: [],
    time: Date.now() - req.createdAt,
    meta: {
      status: 200,
      message: 'ok',
    },
  };
}

function generateValidResponse(data = []) {
  const response = generateBaseResponse(this);

  response.data = [...data];

  return response;
}

function generateErrorResponse(code, message) {
  const response = generateBaseResponse(this);

  response.meta = {
    // http codes normais disponíveis na resposta
    status: parseInt(`${code}`.substr(0, 3), 10),
    message: 'error',
    error: {
      code,
      message: message || CONSTANTS.ERROR_RESPONSES[code],
    },
  };

  return response;
}

module.exports = { generateBaseResponse, generateValidResponse, generateErrorResponse };