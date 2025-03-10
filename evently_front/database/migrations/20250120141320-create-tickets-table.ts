/* eslint-disable @typescript-eslint/no-explicit-any */
"use strict";

module.exports = {
  up: async (queryInterface: any, Sequelize: any) => {
    await queryInterface.createTable("Tickets", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      scanned: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      transaction_id: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      event_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      ticket_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Ticket_Types",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },
  down: async (queryInterface: any) => {
    await queryInterface.dropTable("Tickets");
  },
};
