const { promisify } = require('util');
const Joi = require('joi');

const schema = Joi.object().keys({
  events: Joi.array().required().min(1).items(Joi.object().keys({
    key: Joi.string().required(),
    timestamp: Joi.string().required(),
    custom_data: Joi.array().required().items(Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.any().required(),
    })),
  })),
});

const joiValidate = promisify(Joi.validate);

module.exports = async function Controller(req, res) {
  const { body, app: { locals: { sequelize: { models } } } } = req;

  // validar a resposta com o schema esperado
  try {
    await joiValidate(body, schema);
  } catch (err) {
    let requestResponse = res.generateErrorResponse(4001);

    if (err.details.length) {
      const [error] = err.details;
      const { message: issue } = error;

      requestResponse = res.generateErrorResponse(4001, `Existem um ou mais propriedades com valores inválidos: ${issue}`);
    }

    return res.status(200).json(requestResponse);
  }

  const { events } = body;

  const instances = await models.events.bulkCreate(events, { returning: true });

  const newEventsStored = instances.map(instance => instance.toJSON())

  return res.status(200).json(res.generateValidResponse(newEventsStored));
};