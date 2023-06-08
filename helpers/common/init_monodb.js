const mongoose = require("mongoose");
const { mongoConfig } = require("./environment");
const { logBackendError } = require("./backend.functions");

let mongodbURI =
  `mongodb${process.env.NODE_ENV === "production" ? "+srv://" : "://"}` +
  process.env.MONGODB_DB_HOST;

if (process.env.NODE_ENV === "development") {
  mongodbURI = `${mongodbURI}:${process.env.MONGODB_DB_PORT}`;
}

const connectToMongoDB = () => {
  // Establish Connection to MongoDB Server
  mongoose.set("strictQuery", false);
  mongoose
    .connect(mongodbURI, {
      dbName: process.env.MONGODB_DB_NAME,
      user: process.env.MONGODB_USER,
      pass: process.env.MONGODB_PASS,
      useNewUrlParser: true,
      useUnifiedtopology: true,
    })
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((error) => {
      logBackendError(__filename, error?.message, null, null, error?.stack);
      console.error("Application could not connect to MongoDB Server");
      process.exit(0);
    });
};

module.exports = connectToMongoDB;
