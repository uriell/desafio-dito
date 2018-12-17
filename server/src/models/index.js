global.Promise = require('bluebird');

const Events = require('./events');

module.exports = function ModelInitializer(sequelize, options = {}) {
  [Events].map(model => model(sequelize));

  return sequelize.sync(options);
}