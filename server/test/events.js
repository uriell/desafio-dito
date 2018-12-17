process.env.NODE_ENV = 'test';

const { promisify } = require('util');
const Sequelize = require('sequelize');
const chaiHttp = require('chai-http');
const { mergeWith } = require('lodash');
const chai = require('chai');
const Joi = require('joi');

const joiValidate = promisify(Joi.validate);
const { expect } = chai;

const server = require('../src');
const config = require('../config');
const EventsModel = require('../src/models/events');
const schemas = require('./schemas');

const sequelize = new Sequelize(mergeWith(config.db.sequelize, {
  logging: false,
  operatorsAliases: false,
  define: {
    timestamps: false,
  },
}));

chai.use(chaiHttp);

describe('Events', () => {
  // antes de iniciar os testes
  // forçar a tabela a ser recriada a cada teste
  before((done) => {
    EventsModel(sequelize);

    sequelize.sync({ force: true })
      .then(() => done())
      .catch(() => done());
  });

  async function GetRequestValidator(path, schema, done) {
    requester
      .get(path)
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(200);
        expect(res).to.have.property('body').that.satisfies(async (body) => {
          try {
            await joiValidate(body, schema);
            return true;
          } catch (err) {
            return false;
          }
        });
        done();
      });
  }

  const requester = chai.request(server).keepOpen();

  describe('unknown endpoint', () => {
    it('should access a non-existant endpoint and get a 404 error', (done) => {
      const schema = schemas.errorServerResponse4040;
      GetRequestValidator('/events/doesNotExist', schema, done);
    });
  });

  describe('empty database', () => {
    it('should return no events', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(0));
      GetRequestValidator('/events', schema, done);
    });
  });

  describe('static events', () => {
    it('should fetch, process and store static events in the first run', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(5).items(schemas.eventWithID));
      GetRequestValidator('/events/fetch', schema, done);
    });

    it('should fetch and ignore existing static events in the second run', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(0));
      GetRequestValidator('/events/fetch', schema, done);
    });
  });

  describe('manual event input', () => {
    it('should process and store a manual event input', (done) => {
      const payload = {
        events: [{
          key: 'test-key',
          timestamp: '2018-05-05T01:01:24.3142179-03:00',
          custom_data: [],
        }],
      };

      const schema = schemas.validServerResponse(Joi.array().required().items(Joi.object().keys({
        id: Joi.number().required().equal(6),
        key: Joi.string().required().equal('test-key'),
        timestamp: Joi.string().required().equal('2018-05-05T01:01:24.3142179-03:00'),
        custom_data: Joi.array().required().length(0),
      })));

      requester
        .post('/events/new')
        .send(payload)
        .end((err, res) => {
          expect(err).to.be.null;
          expect(res).to.have.status(200);
          expect(res).to.have.property('body').that.satisfies(async (body) => {
            try {
              await joiValidate(body, schema);
              return true;
            } catch (err) {
              return false;
            }
          });
          done();
        });
    });
  });

  describe('retrieving and searching stored unique event keys', () => {
    it('should return 3 unique event keys', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(3).items(Joi.string()));
      GetRequestValidator('/events/keys', schema, done);
    });

    it('should search for "c" and return an error', (done) => {
      const schema = schemas.errorServerResponse4001;
      GetRequestValidator('/events/keys?search=c', schema, done);
    });

    it('should search for "co" and return 2 stored unique event keys', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(2).items(Joi.string().regex(/co/i)));
      GetRequestValidator('/events/keys?search=co', schema, done);
    });
  });

  describe('retrieving and searching stored events', () => {
    it('should return 6 stored events', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(6).items(schemas.eventWithoutID));
      GetRequestValidator('/events', schema, done);
    });

    it('should search for "c" and return an error', (done) => {
      const schema = schemas.errorServerResponse4001;
      GetRequestValidator('/events?search=c', schema, done);
    });

    it('should search for "co" and return 5 stored events', (done) => {
      const searchSchema = Joi.object().keys({
        key: Joi.string().required().regex(/co/i),
        timestamp: Joi.string().required(),
        custom_data: Joi.array().required().items(schemas.customDataItem),
      });

      const schema = schemas.validServerResponse(Joi.array().required().length(5).items(searchSchema));
      GetRequestValidator('/events?search=co', schema, done);
    });
  });

  describe('events timeline', () => {
    it('should display the events timeline in the expected format', (done) => {
      const schema = schemas.validServerResponse(Joi.array().required().length(1).items(schemas.timeline));
      GetRequestValidator('/events/timeline', schema, done);
    });
  });

  after(() => requester.close());
  after(() => sequelize.close());
});