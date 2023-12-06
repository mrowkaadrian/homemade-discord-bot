import { SlashCommandBuilder } from 'discord.js';
import { stopMusic } from '../../events/musicPlayer/stopMusic.js';

export default {
	data: new SlashCommandBuilder()
		.setName('stop-music')
		.setDescription('Stops the music player.'),
	async execute(interaction) {
		stopMusic(interaction);
	},
};