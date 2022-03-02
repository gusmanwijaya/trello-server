require("dotenv").config();

const { DB_USERNAME, DB_DATABASE, DB_HOST, DB_DIALECT } = process.env;

module.exports = {
  development: {
    username: DB_USERNAME,
    password: null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USERNAME,
    password: null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    username: DB_USERNAME,
    password: null,
    database: DB_DATABASE,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
};
