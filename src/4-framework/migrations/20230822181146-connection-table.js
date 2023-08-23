'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  up: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    await queryInterface.createTable('connections', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      connection_id: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    })
  },

  down: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    await queryInterface.dropTable('connections')
  },
}
