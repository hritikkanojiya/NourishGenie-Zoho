require("dotenv").config();

const mongoConfig = {
  MONGO_USER_NAME: process.env.MONGODB_USER,
  MONGO_PASSWORD: process.env.MONGODB_PASS,
  MONGO_HOST: process.env.MONGODB_DB_HOST,
  MONGO_PORT: process.env.MONGODB_DB_PORT,
  MONGO_DB_NAME: process.env.MONGODB_DB_NAME,
};

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
  mongoConfig,
  SECRET_KEY,
};
