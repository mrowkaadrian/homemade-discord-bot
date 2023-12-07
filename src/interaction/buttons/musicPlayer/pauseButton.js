import { ButtonBuilder, ButtonStyle } from 'discord.js';
export const pauseButton = new ButtonBuilder()
	.setCustomId('pause-music')
	.setEmoji('⏸️/▶️')
	.setStyle(ButtonStyle.Secondary);