require('dotenv').config()

const mongoConfig = {
    MONGO_USER_NAME:process.env.MONGO_USER_NAME,
    MONGO_PASSWORD:process.env.MONGO_PASSWORD
}

const SECRET_KEY = process.env.SECRET_KEY


module.exports = {
    mongoConfig,
    SECRET_KEY
}