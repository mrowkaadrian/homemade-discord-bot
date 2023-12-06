import { Events } from 'discord.js';
import logger from '../../logging/logger.js';
import { handleButtonClick } from '../../handleButtonClick.js';

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			try {
				await command.execute(interaction);
				logger.info(`Registered command ${interaction.commandName}`);
			}
			catch (error) {
				console.error(error);
				logger.error(error);
			}
		}
		if (interaction.isButton()) {
			const buttonId = interaction.customId;

			try {
				await handleButtonClick(buttonId, interaction);
				logger.info(`Registered button ${interaction.customId}`);
			}
			catch (error) {
				console.error(error);
				logger.error(error);
			}
		}
	},
};