import { SlashCommandBuilder } from 'discord.js';
import logger from '../../../logging/logger.js';
import myUwuifier from '../../../util/uwuifier.js';

export default {
	data: new SlashCommandBuilder()
		.setName('private-ping')
		.setDescription('Replies with Pong! (but secretly)'),
	async execute(interaction) {
		await interaction.reply({ content: myUwuifier.uwuifySentence('Pong!'), ephemeral: true });
		logger.info('Executed private-ping command');
	},
};