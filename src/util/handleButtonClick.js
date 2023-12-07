import { stopMusic } from '../events/musicPlayer/stopMusic.js';
import { pauseMusic } from '../events/musicPlayer/pauseMusic.js';

export function handleButtonClick(buttonId, interaction) {
	if (buttonId === 'stop-music') {
		stopMusic(interaction);
	}
	else if (buttonId === 'pause-music') {
		pauseMusic(interaction);
	}
}