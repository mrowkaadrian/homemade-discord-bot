import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';

export default {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		await interaction.reply('Pong!');
		logger.info('Executed ping command');
	},
};