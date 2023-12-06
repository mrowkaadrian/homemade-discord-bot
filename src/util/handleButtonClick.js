import { stopMusic } from '../events/musicPlayer/stopMusic.js';

export function handleButtonClick(buttonId, interaction) {
	if (buttonId === 'stop-music') {
		stopMusic(interaction);
	}
}