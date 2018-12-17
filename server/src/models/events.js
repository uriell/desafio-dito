const Sequelize = require('sequelize');

module.exports = function (sequelize) {
  const Model = sequelize.define('events', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    key: {
      type: Sequelize.STRING, // possivelmente STRING(128)?
      defaultValue: 'unknown-event',
      allowNull: false,
      primaryKey: true,
    },
    timestamp: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    custom_data: {
      type: Sequelize.JSONB,
      defaultValue: {},
      allowNull: false,
    },
  });

  return Model;
}