module.exports = {
  development: {
    username: "root",
    password: null,
    database: "clone_trello",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "yycrmvpuuxepjr",
    password:
      "7ec4aa0914405dec37977b07cd50ecc0fe1c32be4a6aa0a9fa2910705918cf02",
    database: "d96ua4mqh2nlf5",
    host: "ec2-3-225-79-57.compute-1.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  },
};
