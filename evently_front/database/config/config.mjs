/* eslint-disable import/no-anonymous-default-export */
import "ts-node/register";
import dotenv from "dotenv";
dotenv.config();

export const options = {
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  dialect: "mysql",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  migrationStorageTableName: "migrations",
};

export default {
  development: options,
  test: options,
  production: options,
};
