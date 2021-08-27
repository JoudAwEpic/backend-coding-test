const winston = require("winston");

const logConfiguration = {
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({
      filename: "logs/info.log",
      level: "info",
    }),
    new winston.transports.File({
      level: "error",
      filename: "logs/error.log",
    }),
  ],
  format: winston.format.combine(
    winston.format.label({
      label: `Label🏷️`,
    }),
    winston.format.timestamp({
      format: "MMM-DD-YYYY HH:mm:ss",
    }),
    winston.format.printf(
      (info) =>
        `${info.level}: ${info.label}: ${[info.timestamp]}: ${info.message}`
    )
  ),
};

const logger = winston.createLogger(logConfiguration);

module.exports = logger;
