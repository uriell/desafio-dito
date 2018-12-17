const development = require('./development.json');

const config = { development };

const environment = `${process.env.NODE_ENV || 'development'}`.toLowerCase();

module.exports = config[environment] || config.development;
