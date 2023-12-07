import { ActionRowBuilder } from 'discord.js';
import { stopButton } from '../buttons/musicPlayer/stopButton.js';
import { pauseButton } from '../buttons/musicPlayer/pauseButton.js';

export const playerMenu = new ActionRowBuilder()
	.addComponents(pauseButton, stopButton);