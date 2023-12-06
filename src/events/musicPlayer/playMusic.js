import { useMainPlayer, useQueue } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import { playerMenu } from '../../interaction/menus/musicPlayerMenu.js';
import logger from '../../logging/logger.js';
import { EmbedBuilder } from 'discord.js';

export async function playMusic(interaction) {
	const player = useMainPlayer();
	const channel = interaction.member.voice.channel;
	const query = interaction.options.getString('query');
	const resource = await player.search(query, {
		requestedBy: interaction.user,
	});

	if (!channel) {
		return interaction.reply(myUwuifier.uwuifySentence('You must be in a voice channel to use this command'));
	}

	if (!resource.hasTracks()) {
		return interaction.reply(`No results found for \`${query}\``);
	}

	await interaction.deferReply();

	try {
		await player.play(channel, resource);

		const resourceJSON = resource.toJSON();
		const trackInfo = resourceJSON.tracks[0];

		const nowPlayingEmbed = new EmbedBuilder()
			.setTitle(myUwuifier.uwuifySentence('Now playing:'))
			.setThumbnail(trackInfo.thumbnail)
			.addFields(
				{ name: 'Author', value: trackInfo.author, inline: true },
				{ name: 'Title', value: trackInfo.title, inline: true },
				{ name: 'Duration', value: trackInfo.duration, inline: true },
			);

		await interaction.followUp({
			embeds: [ nowPlayingEmbed ],
			components: [ playerMenu ],
		});
		logger.info(`Executed play-music command with query: ${query}`);
	}
	catch (error) {
		await interaction.followUp('Something went wrong while playing the music. Check logs for more details.');
		logger.error(`Error executing play-music command with query: ${query}` + error);
	}
}