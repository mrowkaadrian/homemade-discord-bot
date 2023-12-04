import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';

export const data = new SlashCommandBuilder()
	.setName('ping')
	.setDescription('Replies with Pong!');

export async function execute(interaction) {
	await interaction.reply('Pong!');
	logger.info('Executed ping command');
}