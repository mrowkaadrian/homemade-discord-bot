import { useTimeline } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import logger from '../../logging/logger.js';

export function pauseMusic(interaction) {
	const timeline = useTimeline(interaction.guildId);

	if (!timeline?.track) {
		interaction.reply(myUwuifier.uwuifySentence('There is no music playing.'));
		logger.info('Tried to pause music player, but there was no music playing');
	}
	else if (timeline?.pause()) {
		interaction.reply(myUwuifier.uwuifySentence('Paused song.'));
		logger.info('Paused song');
	}
	else if (timeline?.resume()) {
		interaction.reply(myUwuifier.uwuifySentence('Resumed song.'));
		logger.info('Resumed song');
	}
	else {
		interaction.reply(myUwuifier.uwuifySentence('Could not do that :(((((.'));
		logger.error('There was an error while pausing/unpausing song');
	}
}