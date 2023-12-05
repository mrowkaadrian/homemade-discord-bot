import clientReady from './discord/clientReady.js';
import interactionCreate from './discord/interactionCreate.js';

export const eventList = [
	clientReady,
	interactionCreate,
];