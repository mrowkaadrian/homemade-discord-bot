import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';
import myUwuifier from '../../util/uwuifier.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply(myUwuifier.uwuifySentence('Pong!'));
		logger.info('Executed ping command');
	},
};