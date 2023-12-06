import { useQueue } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import logger from '../../logging/logger.js';

export function skipMusic(interaction) {
	const queue = useQueue(interaction.guildId);

	if (!queue) {
		interaction.reply(myUwuifier.uwuifySentence('There is no music playing.'));
		logger.info('Tried to stop music player, but there was no music playing');
	}
	else if (queue.node.skip()) {
		interaction.reply(myUwuifier.uwuifySentence('Skipped song.'));
		logger.info('Skipped song');
	}
	else {
		interaction.reply(myUwuifier.uwuifySentence('Could not skip song.'));
		logger.error('There was an error while skipping song');
	}
}