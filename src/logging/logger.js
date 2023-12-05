import { createLogger, format, transports } from 'winston';
import rootPath from 'app-root-path';

const { combine, timestamp, printf } = format;

// eslint-disable-next-line no-shadow
const logFormat = printf(({ level, message, timestamp }) => {
	return `${timestamp} [${level.toUpperCase()}] - ${message}`;
});

const logger = createLogger({
	format: combine(
		timestamp(),
		logFormat,
	),
	transports: [
		new transports.Console(),
		new transports.File({ filename: `${rootPath}/logs/combined.log` }),
		new transports.File({ filename: `${rootPath}logs/error.log`, level: 'error' }),
	],
});

export default logger;