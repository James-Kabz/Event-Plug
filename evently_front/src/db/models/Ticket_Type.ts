import { DataTypes, Model } from "sequelize";
import { User } from "./User";
import sequelize from "../db_connection";
import { Event } from "./Event";

export class TicketType extends Model {
  id!: number;
  name!: string;
  price!: number;
  complimentary!: boolean;
  active!: boolean;
  user_id!: number;
  event_id!: number;

  user?: User;
  event?:Event;
}

TicketType.init(
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
    price: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    complimentary: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    event_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Event",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
  },
  {
    sequelize,
    modelName: "TicketType",
    tableName: "Ticket_Types",
    timestamps: true,
  }
);

export default TicketType;
// TicketType.belongsTo(User, {
//   foreignKey: "user_id",
//   as: "user",
// });
// TicketType.belongsTo(Event, {
//   foreignKey: "event_id",
//   as: "event",
// });