import { ActionRowBuilder } from 'discord.js';
import { stopButton } from '../buttons/musicPlayer/stopButton.js';

export const playerMenu = new ActionRowBuilder()
	.addComponents(stopButton);