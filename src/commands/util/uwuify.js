import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';
import myUwuifier from '../../util/uwuifier.js';

export default {
	data: new SlashCommandBuilder()
		.setName('uwuifier')
		.setDescription('Replies with UwUified text')
		.addStringOption(option =>
			option.setName('text').setDescription('The text to UwUify').setRequired(true)),
	async execute(interaction) {
		const userInput = interaction.options.getString('text');

		await interaction.reply({ content: myUwuifier.uwuifySentence(userInput) });
		logger.info('Executed private-ping command');
	},
};