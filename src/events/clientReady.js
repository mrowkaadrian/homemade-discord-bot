import { Events } from 'discord.js';
import logger from '../logging/logger.js';

export default {
	name: Events.ClientReady,
	once: true,
	execute(client) {
		console.log(`Ready! Logged in as ${client.user.tag}`);
		logger.info(`Logged in as ${client.user.tag}`);
	},
};