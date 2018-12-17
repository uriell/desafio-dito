const { has } = require('lodash');

const {
  generateValidResponse,
  generateErrorResponse,
} = require('../utils/response');

module.exports = function Middleware(req, res, next) {
  if (!has(res, 'generateValidResponse')) {
    res.generateValidResponse = generateValidResponse.bind(req);
  }

  if (!has(res, 'generateErrorResponse')) {
    res.generateErrorResponse = generateErrorResponse.bind(req);
  }

  return next();
};