const Sequelize = require('sequelize');
const { promisify } = require('util');
const Joi = require('joi');

const { Op } = Sequelize;

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
    attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('key')), 'key']],
  });

  const sortedInstances = instances
    .map(instance => instance.get('key'))
    .sort((a, b) => {
      const aKey = a.toLowerCase();
      const bKey = b.toLowerCase();

      if (aKey.indexOf(query.search) < bKey.indexOf(query.search)) return -1;
      if (aKey.indexOf(query.search) > bKey.indexOf(query.search)) return 1;
      if (aKey.length < bKey.length) return -1;
      if (aKey.length > bKey.length) return 1;
      return 0;
    });

  return res.status(200).json(res.generateValidResponse(sortedInstances));
};