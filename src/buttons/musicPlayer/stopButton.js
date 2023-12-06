import { ButtonBuilder, ButtonStyle } from 'discord.js';
export const stopButton = new ButtonBuilder()
	.setCustomId('stop-music')
	.setLabel('Stop')
	.setStyle(ButtonStyle.Danger);