const express = require('express');
const Sequelize = require('sequelize');
const bodyParser = require('body-parser');
const compression = require('compression');
const { each, mergeWith } = require('lodash');

const middlewares = require('./middlewares');
const routers = require('./routers');
const models = require('./models');
const config = require('../config');

const app = express();

const env = process.env.NODE_ENV || 'development';

app.set('x-powered-by', false);
app.set('json escape', true);
app.set('trust proxy', 1);
app.set('env', env);

if (env === 'development') {
  app.set('json spaces', 4);
}

// ORM (banco de dados)
app.locals.sequelize = new Sequelize(
  mergeWith(config.db.sequelize, {
    logging: false,
    operatorsAliases: false,
    define: {
      timestamps: false,
    },
  })
);

// middlewares
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.header('Access-Control-Allow-Methods', 'GET,POST');
  res.header('Access-Control-Allow-Headers', 'Content-Type');

  return next();
});
app.use(compression());
app.use(bodyParser.json());
app.use(middlewares.registerRequestStart);
app.use(middlewares.bindResponseUtil);

// habilitar routers
each(routers, ({ path, router }) => app.use(path, router));

app.use(middlewares.notFound);

(async function StartAPIServer() {
  try {
    // inicializar modelos (tabelas)
    await models(app.locals.sequelize);

    app.listen(config.express.port, () => {
      if (env !== 'test') {
        console.info('[!] dito challenge api server started!');
      }
    });
  } catch (err) {
    console.error(err);
  }
})();

module.exports = app;
