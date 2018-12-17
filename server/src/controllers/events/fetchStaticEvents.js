const Joi = require('joi');
const fetch = require('node-fetch');
const { promisify } = require('util');
const { Op } = require('sequelize');
const { has } = require('lodash');

const config = require('../../../config');

const schema = Joi.object().keys({
  events: Joi.array().required().items(Joi.object().keys({
    event: Joi.string().required(),
    timestamp: Joi.string().required(),
    revenue: Joi.number(),
    custom_data: Joi.array().required().items(Joi.object().keys({
      key: Joi.string().required(),
      value: Joi.any().required(),
    })),
  })),
});

const joiValidate = promisify(Joi.validate);

module.exports = async function Controller(req, res) {
  const { app: { locals: { sequelize: { models } } } } = req;
  let response;

  try {
    response = await fetch(config.static.ditoEventsURL)
      .then(response => response.json());
  } catch (err) {
    return res.status(200).json(res.generateErrorResponse(5020));
  }

  // validar a resposta com o schema esperado
  try {
    await joiValidate(response, schema);
  } catch (err) {
    return res.status(200).json(res.generateErrorResponse(5001));
  }

  const events = response.events.map((event) => {
    const { event: key, custom_data, timestamp } = event;

    if (has(event, 'revenue')) {
      custom_data.push({ key: 'revenue', value: event.revenue });
    }

    return { key, timestamp, custom_data };
  });

  const existingEventEntries = await models.events.findAll({
    where: {
      timestamp: {
        [Op.in]: events.map(event => event.timestamp),
      },
    },
  });

  const newEventEntries = events.filter(event => !existingEventEntries.find(instance => instance.get('timestamp') === event.timestamp));
  const newEventsStored = [];

  if (newEventEntries.length) {
    await models.events.bulkCreate(newEventEntries, { returning: true });

    newEventsStored.push(...newEventEntries);
  }

  return res.status(200).json(res.generateValidResponse(newEventsStored));
};