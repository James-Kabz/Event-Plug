/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict";

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    // Add the `name` column to the `Users` table
    await queryInterface.addColumn("Users", "name", {
      type: Sequelize.STRING,
      allowNull: true, // Allow null values (optional)
      after: "id", // Position the column after the `id` column
    });
  },

  down: async (queryInterface: any) => {
    // Remove the `name` column from the `Users` table
    await queryInterface.removeColumn("Users", "name");
  },
};
