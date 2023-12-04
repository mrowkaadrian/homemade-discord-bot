import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';

export const data = new SlashCommandBuilder()
	.setName('private-ping')
	.setDescription('Replies with Pong! (but secretly)');

export async function execute(interaction) {
	await interaction.reply({ content: 'Pong!', ephemeral: true });
	logger.info('Executed private-ping command');
}