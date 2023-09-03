require("dotenv/config")

const {
  DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS, DIALECT, TIMEZONE, SSL, LOGGING, DB_URI
} = process.env;

const development = {
  dialect: DIALECT,
  timezone: TIMEZONE,
  username: DB_USER,
  password: DB_PASS,
  database: DB_NAME,
  host: DB_HOST,
  port: Number(DB_PORT),
  ssl: SSL,
  // logging: LOGGING,
  db_uri: DB_URI
};

module.exports = {development}