import { EmbedBuilder } from 'discord.js';
import myUwuifier from '../../util/uwuifier.js';

export function nowPlayingEmbed(trackInfo) {
	return new EmbedBuilder()
		.setTitle(myUwuifier.uwuifySentence('Now playing:'))
		.setThumbnail(trackInfo.thumbnail)
		.addFields(
			{ name: 'Author', value: trackInfo.author, inline: true },
			{ name: 'Title', value: trackInfo.title, inline: true },
			{ name: 'Duration', value: trackInfo.duration, inline: true },
		);
}