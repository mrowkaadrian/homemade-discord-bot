import { Events } from 'discord.js';
import logger from '../../logging/logger.js';
import { handleButtonClick } from '../../util/handleButtonClick.js';

export default {
	name: Events.InteractionCreate,
	async execute(interaction) {
		if (interaction.isCommand()) {
			const command = interaction.client.commands.get(interaction.commandName);

			try {
				logger.info(`Registered command: ${interaction.commandName}`);
				await command.execute(interaction);
			}
			catch (error) {
				logger.error(error);
			}
		}
		if (interaction.isButton()) {
			const buttonId = interaction.customId;

			try {
				logger.info(`Registered button click: ${interaction.customId}`);
				await handleButtonClick(buttonId, interaction);
			}
			catch (error) {
				logger.error(error);
			}
		}
	},
};