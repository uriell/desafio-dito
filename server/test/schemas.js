const Joi = require('joi');

const validServerResponse = (data) => Joi.object().keys({
  data,
  time: Joi.number().required(),
  meta: Joi.object().required().keys({
    status: Joi.number().required().equal(200),
    message: Joi.string().required().equal('ok'),
  }),
});

const customDataItem = Joi.object().keys({
  key: Joi.string().required(),
  value: Joi.any().required(),
});

const eventWithID = Joi.object().keys({
  id: Joi.number().required(),
  key: Joi.string().required(),
  timestamp: Joi.string().required(),
  custom_data: Joi.array().required().items(customDataItem),
});

const eventWithoutID = Joi.object().keys({
  key: Joi.string().required(),
  timestamp: Joi.string().required(),
  custom_data: Joi.array().required().items(customDataItem),
});

const timeline = Joi.object().keys({
  timeline: Joi.array().required().length(2).items(Joi.object().keys({
    timestamp: Joi.string().required(),
    revenue: Joi.number().required(),
    transaction_id: Joi.string().required(),
    store_name: Joi.string().required(),
    products: Joi.array().required().items(Joi.object().keys({
      name: Joi.string().required(),
      price: Joi.number().required(),
    })),
  })),
});

const errorServerResponse4001 = Joi.object().keys({
  data: Joi.array().required().length(0),
  time: Joi.number().required(),
  meta: Joi.object().required().keys({
    status: Joi.number().required().equal(400),
    message: Joi.string().required().equal('error'),
    error: Joi.object().required().keys({
      code: Joi.number().required().equal(4001),
      // a mensagem não precisa ser validada 1:1 se sabemos o código de erro.
      message: Joi.string().required(),
    }),
  }),
});

const errorServerResponse4040 = Joi.object().keys({
  data: Joi.array().required().length(0),
  time: Joi.number().required(),
  meta: Joi.object().required().keys({
    status: Joi.number().required().equal(404),
    message: Joi.string().required().equal('error'),
    error: Joi.object().required().keys({
      code: Joi.number().required().equal(4040),
      // a mensagem não precisa ser validada 1:1 se sabemos o código de erro.
      message: Joi.string().required(),
    }),
  }),
});

module.exports = {
  validServerResponse,
  errorServerResponse4001,
  errorServerResponse4040,
  eventWithoutID,
  eventWithID,
  timeline,
  customDataItem,
};