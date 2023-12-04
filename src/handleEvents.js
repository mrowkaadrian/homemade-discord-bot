import { eventList } from './events/eventList.js';
import logger from './logging/logger.js';

export default function handleEvents(client) {
	for (const event of eventList) {
		if (event.once) {
			client.once(event.name, (...args) => event.execute(...args));
			logger.info(`Registered event ${event.name} as once`);
		}
		else {
			client.on(event.name, (...args) => event.execute(...args));
			logger.info(`Registered event ${event.name}`);
		}
	}
}