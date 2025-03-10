import { DataTypes, Model } from "sequelize";
import { Event } from "./Event";
import { TicketType } from "./Ticket_Type";
import sequelize from "../db_connection";

export class Ticket extends Model {
  id!: number;
  name!: string;
  phone_number!: string;
  email!: string;
  price!: number;
  quantity!: number;
  scanned!: boolean;
  transaction_id!: string;
  ticket_type_id!: number;
  event_id!: number;

  ticketType?: TicketType;
  event?: Event;
}

Ticket.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    scanned: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    transaction_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticket_type_id: {
      type: DataTypes.INTEGER,
      references: {
        model: TicketType,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    event_id: {
      type: DataTypes.STRING,
      references: {
        model: Event,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },

  {
    sequelize,
    modelName: "Ticket",
    tableName: "Tickets",
    timestamps: true,
  }
);

// Ticket.belongsTo(TicketType, {
//   foreignKey: "ticket_type_id",
//   as: "ticket_type",
// });

// Ticket.belongsTo(Event, {
//   foreignKey: "event_id",
//   as: "event",
// });
