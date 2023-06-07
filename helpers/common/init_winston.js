// // Import Packages
const winston = require("winston");
const moment = require("moment");
require("winston-daily-rotate-file");

// Define File Rotator & Logger
const fileRotator = new winston.transports.DailyRotateFile({
  filename: `service-log-%DATE%.log`,
  dirname: `${process.env.APP_BASE_PATH}/logs/`, // Passing APP_BASE_PATH to avoid multi-directory logging issue
  datePattern: "YYYY-MM-DD",
  zippedArchive: true,
  maxSize: `${process.env.WINSTON_MAX_LOG_FILE_SIZE_IN_MB}m`,
  maxFiles: `${process.env.WINSTON_MAX_LOG_FILE_IN_DAYS}d`,
});

const winstonLogger = winston.createLogger({
  format: winston.format.json(),
  defaultMeta: {
    timestamp: (() => moment().format("DD/MM/YYYY, hh:mm:ss A"))(),
  },
  transports: [fileRotator],
});

// Export Modules
module.exports = winstonLogger;
