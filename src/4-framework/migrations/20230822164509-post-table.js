'use strict'

const { DataTypes } = require('sequelize')

module.exports = {
  up: async (/** @type {QueryInterface} */ queryInterface, _Sequelize) => {
    await queryInterface.createTable('posts', {
      id: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      uuid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
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
    await queryInterface.dropTable('posts')
  },
}
