const { Op } = require('sequelize');
const { promisify } = require('util');
const Joi = require('joi');

const schema = Joi.object().keys({
  'search': Joi.string().min(2),
});

const joiValidate = promisify(Joi.validate);

module.exports = async function Controller(req, res) {
  const { query, app: { locals: { sequelize: { models } } } } = req;

  // validar a query com o schema esperado
  try {
    await joiValidate(query, schema);
  } catch (err) {
    let requestResponse = res.generateErrorResponse(4001);

    if (err.details.length) {
      const [error] = err.details;
      const { message: issue } = error;

      requestResponse = res.generateErrorResponse(4001, `Existem um ou mais propriedades com valores inválidos: ${issue}`);
    }

    return res.status(200).json(requestResponse);
  }

  const where = {};

  if (query.search) {
    where.key = {
      [Op.iLike]: `%${query.search}%`,
    };
  }

  const instances = await models.events.findAll({
    where,
    attributes: { exclude: ['id'] },
  });

  // organizando os eventos pelo que começar com a busca
  // outros resultados que simplesmente "contém" o termo aparecem depois
  const sortedInstances = instances
    .map(instance => instance.toJSON())
    .sort((a, b) => {
      const aKey = a.key.toLowerCase();
      const bKey = b.key.toLowerCase();
      const aTimestamp = new Date(a.timestamp);
      const bTimestamp = new Date(b.timestamp);

      if (query.search) {
        if (aKey.indexOf(query.search) < bKey.indexOf(query.search)) return -1
        if (aKey.indexOf(query.search) > bKey.indexOf(query.search)) return 1;
        if (aTimestamp > bTimestamp) return -1;
        if (aTimestamp < bTimestamp) return 1;
        return 0;
      }

      if (aTimestamp > bTimestamp) return -1;
      if (aTimestamp < bTimestamp) return 1;
      return 0;
    });

  return res.status(200).json(res.generateValidResponse(sortedInstances));
};