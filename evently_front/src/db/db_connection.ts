import { Sequelize } from "sequelize";
import { SequelizeOptions } from "sequelize-typescript";
import { options } from "../../database/config/config.mjs";
import mysql2 from "mysql2";
// import { setupAssociations } from "./models/associations";

const dbOptions = <SequelizeOptions>options;
dbOptions.dialectModule = mysql2;

const sequelize = new Sequelize(dbOptions);

// setupAssociations();
export default sequelize;
