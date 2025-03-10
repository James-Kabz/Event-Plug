/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict";

module.exports = {
  up: async (queryInterface :any, Sequelize :any) => {
    await queryInterface.changeColumn("Events", "description", {
      type: Sequelize.TEXT, // Change to TEXT for unlimited length
      allowNull: false, // Adjust based on your requirements
    });
  },

  down: async (queryInterface :any, Sequelize :any) => {
    await queryInterface.changeColumn("Events", "description", {
      type: Sequelize.STRING(255), // Revert to VARCHAR(255)
      allowNull: false, // Adjust based on your requirements
    });
  },
};
