import winston, { format, transports } from 'winston';
import { join } from 'path';

// Define log levels
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

// Create logger instance
const logger = winston.createLogger({
  levels: logLevels,
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.errors({ stack: true }), // Include stack traces for errors
    format.json() // Output logs in JSON format
  ),
  transports: [
    // Console transport for development
    new transports.Console({
      format: format.combine(
        format.colorize(), // Colorize output for readability
        format.printf(({ timestamp, level, message, ...meta }) => {
          const metaString = Object.keys(meta).length ? ` ${JSON.stringify(meta)}` : '';
          return `[${timestamp}] ${level}: ${message}${metaString}`;
        })
      ),
      level: process.env.NODE_ENV === 'production' ? 'info' : 'debug', // Debug in dev, info in prod
    }),
    // File transport for persistent logs
    new transports.File({
      filename: join(__dirname, '../../logs/app.log'), // Store logs in logs/app.log
      level: 'error', // Log errors and above to file
      maxsize: 5242880, // 5MB max file size
      maxFiles: 5, // Keep up to 5 rotated files
    }),
    new transports.File({
      filename: join(__dirname, '../../logs/all.log'), // Store all logs
      level: 'debug', // Log everything
      maxsize: 5242880,
      maxFiles: 5,
    }),
  ],
});

// Export logger
export { logger };