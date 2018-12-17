const { Op } = require('sequelize');

const mapTimeline = require('../../utils/mapTimeline');

module.exports = async function Controller(req, res) {
  const { app: { locals: { sequelize: { models } } } } = req;

  const receiptInstances = await models.events.findAll({
    attributes: { exclude: ['id'] },
    where: { key: { [Op.in]: ['comprou', 'comprou-produto'] } },
    order: [['timestamp', 'DESC']],
  });

  const timeline = mapTimeline(receiptInstances.map(instance => instance.toJSON()));

  return res.status(200).json(res.generateValidResponse([timeline]));
};