import { ButtonBuilder, ButtonStyle } from 'discord.js';
export const stopButton = new ButtonBuilder()
	.setCustomId('stop-music')
	.setEmoji('⏹️')
	.setStyle(ButtonStyle.Danger);