import dotenv from "dotenv";

dotenv.config();

const config = {
  env: process.env.ENV || "development",

  db: {
    dev: {
      sqlitePath: process.env.SQLITE_DB_PATH || "database.sqlite",
    },
  },

  http: {
    port: process.env.HTTP_PORT || 3000,
  },
};

export default config;
