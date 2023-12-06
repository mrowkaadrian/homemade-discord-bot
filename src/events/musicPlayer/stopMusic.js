import { useQueue } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import logger from '../../logging/logger.js';

export function stopMusic(interaction) {
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
}