const mongoose = require('mongoose');
const { mongoConfig } = require('./environment');
const {
    logBackendError,
} = require("./backend.functions");

const mongoURI = `mongodb+srv://${mongoConfig.MONGO_USER_NAME}:${mongoConfig.MONGO_PASSWORD}@gads-revenue.fbtqrak.mongodb.net/dev`;

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
                error?.message,
                null,
                null,
                "Unable to start MongoDB."
            );
        });
};

module.exports = connectToMongoDB;
