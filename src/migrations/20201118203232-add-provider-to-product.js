'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn(
      'products', // name of table name
      'providerId', // name of the key we're adding 
      {
        type: Sequelize.INTEGER,
        references: {
          model: 'providers', // name of Target model
          key: 'id', // key in Target model that we're referencing
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      }
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn(
      'products', // name of Source model
      'providerId' // key we want to remove
    );
  }
};
