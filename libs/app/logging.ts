import { exceptions, createLogger, format, transports } from "winston";
const { combine, prettyPrint, colorize, printf, label, timestamp } = format;

const loggingFileURL = "./log";

const formatLogger = printf((log) => {
  return `${log.label}:${log.timestamp} ${log.level} ${log.message}`;
});

export const logger = createLogger({
  transports: [
    new transports.File({
      filename: `${loggingFileURL}/error.log`,
      level: "error",
      format: combine(timestamp(), prettyPrint()),
    }),

    new transports.File({
      filename: `${loggingFileURL}/information.log`,
      level: "info",
      format: combine(timestamp(), prettyPrint()),
    }),

    new transports.Console({
      format: combine(
        timestamp(),
        colorize(),
        label({ label: "[SERVER-Log]" }),
        formatLogger
      ),
    }),
  ],
});

export const exceptionsLogger = (): void => {
  // process.on("unhandledRejection", (ex) => {
  //   throw ex;
  // });

  exceptions.handle(
    new transports.Console({
      format: combine(combine(timestamp(), prettyPrint())),
    }),

    new transports.File({
      filename: `${loggingFileURL}/exception.log`,
      format: combine(timestamp(), prettyPrint()),
    })
  );
};
