import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';
import myUwuifier from '../../util/uwuifier.js';
import { useMainPlayer } from 'discord-player';

export default {
	data: new SlashCommandBuilder()
		.setName('play-music')
		.setDescription('Joins the channel and plays some music.')
		.addStringOption(option =>
			option.setName('query').setDescription('The music you want to play.').setRequired(true)),
	async execute(interaction) {
		const player = useMainPlayer();
		const channel = interaction.member.voice.channel;
		const query = interaction.options.getString('query');
		const resource = await player.search(query, {
			requestedBy: interaction.user,
		});

		if (!channel) {
			return interaction.reply(myUwuifier.uwuifySentence('You must be in a voice channel to use this command'));
		}

		if (!resource.hasTracks()) {
			return interaction.reply(`No results found for \`${query}\``);
		}

		await interaction.deferReply();

		try {
			await player.play(channel, resource);

			await interaction.followUp(myUwuifier.uwuifySentence('Now playing: something, I don\'t know ://'));
			logger.info(`Executed play-music command with query: ${query}`);
		}
		catch (error) {
			logger.error(`Error executing play-music command with query: ${query}` + error);
		}
	},
};