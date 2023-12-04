import { Events } from 'discord.js';
import logger from '../logging/logger.js';

export const event = {
	name: Events.InteractionCreate,
	async execute(interaction) {
		const command = interaction.client.commands.get(interaction.commandName);

		try {
			await command.execute(interaction);
		}
		catch (error) {
			console.error(error);
			logger.error(error);
		}
	},
};