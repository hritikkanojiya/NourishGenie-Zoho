const mongoose = require('mongoose');
const { mongoConfig } = require('./environment');
const {
    logBackendError,
} = require("./backend.functions");

const mongoURI = `mongodb://${mongoConfig.MONGO_USER_NAME}:${mongoConfig.MONGO_PASSWORD}@${mongoConfig.MONGO_HOST}:${mongoConfig.MONGO_PORT}/${mongoConfig.MONGO_DB_NAME}`;

const connectToMongoDB = () => {
    mongoose
        .connect(mongoURI, {})
        .then(() => {
            console.log('Connected to MongoDB');
        })
        .catch((err) => {
            console.error('Error connecting to MongoDB', err);
            logBackendError(
                __filename,
                err?.message,
                null,
                null,
                "Unable to start MongoDB."
            );
        });
};

module.exports = connectToMongoDB;
