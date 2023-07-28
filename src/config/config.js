require("dotenv").config()
// config/config.js
module.exports = {
        // Other configurations...
    PORT: process.env.PORT,
    COOKIE_SECRET: process.env.COOKIE_SECRET,
    DB_NAME: process.env.DB_NAME,
    DB_PASSWORD: process.env.PASSWORD,
    DB_NAME: process.env.DB_NAME,
    DB_PORT:process.env.DB_PORT,
    DB_HOST: process.env.DB_HOST,
    ALLOWED_ORIGINS: process.env.ALLOWED_ORIGINS,
    LOG_DIR: process.env.LOG_DIR
}