import { SlashCommandBuilder } from 'discord.js';
import { useQueue } from 'discord-player';
import logger from '../../logging/logger.js';
import myUwuifier from '../../util/uwuifier.js';

export default {
	data: new SlashCommandBuilder()
		.setName('stop-music')
		.setDescription('Stops the music player.'),
	async execute(interaction) {
		const queue = useQueue(interaction.guildId);

		if (!queue) {
			interaction.reply(myUwuifier.uwuifySentence('There is no music playing.'));
			logger.info('Tried to stop music player, but there was no music playing');
		}
		else {
			queue.delete();
			interaction.reply(myUwuifier.uwuifySentence('Stopped music player.'));
			logger.info('Forced stop of music player');
		}
	},
};