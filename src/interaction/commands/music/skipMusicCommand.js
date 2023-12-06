import { SlashCommandBuilder } from 'discord.js';
import { skipMusic } from '../../../events/musicPlayer/skipMusic.js';

export default {
	data: new SlashCommandBuilder()
		.setName('skip-music')
		.setDescription('Skips currently played song.'),
	async execute(interaction) {
		skipMusic(interaction);
	},
};