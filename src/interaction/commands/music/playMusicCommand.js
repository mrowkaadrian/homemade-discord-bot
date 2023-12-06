import { SlashCommandBuilder } from 'discord.js';
import { playMusic } from '../../../events/musicPlayer/playMusic.js';

export default {
	data: new SlashCommandBuilder()
		.setName('play-music')
		.setDescription('Joins the channel and plays some music.')
		.addStringOption(option =>
			option.setName('query').setDescription('The music you want to play.').setRequired(true)),
	async execute(interaction) {
		await playMusic(interaction);
	},
};