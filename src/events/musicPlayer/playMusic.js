import { useMainPlayer } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import { playerMenu } from '../../interaction/menus/musicPlayerMenu.js';
import logger from '../../logging/logger.js';
import { ActionRowBuilder, EmbedBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';

export async function playMusic(interaction) {
	const selection = await showTracksAndExpectSelection(interaction);

	if (!selection) {
		return interaction.editReply('You did not select a track in time.');
	}

	const player = useMainPlayer();
	const channel = interaction.member.voice.channel;
	const audioResource = await player.search(selection, {
		requestedBy: interaction.user,
	});

	if (!channel) {
		return interaction.editReply(myUwuifier.uwuifySentence('You must be in a voice channel to use this command.'));
	}

	if (!audioResource.hasTracks()) {
		return interaction.editReply('Something went wrong while searching for the track. Check logs for more details.');
	}

	try {
		await player.play(channel, audioResource);

		const resourceJSON = audioResource.toJSON();
		const trackInfo = resourceJSON.tracks[0];

		const nowPlayingEmbed = new EmbedBuilder()
			.setTitle(myUwuifier.uwuifySentence('Now playing:'))
			.setThumbnail(trackInfo.thumbnail)
			.addFields(
				{ name: 'Author', value: trackInfo.author, inline: true },
				{ name: 'Title', value: trackInfo.title, inline: true },
				{ name: 'Duration', value: trackInfo.duration, inline: true },
			);

		await interaction.editReply({
			embeds: [ nowPlayingEmbed ],
			components: [ playerMenu ],
		});
		logger.info(`Executed play-music command using resource: ${trackInfo.url}`);
	}
	catch (error) {
		await interaction.editReply('Something went wrong while playing the music. Check logs for more details.');
		logger.error(`Error executing play-music command using resource: ${audioResource.toJSON().tracks[0].url}` + error);
	}
}

async function showTracksAndExpectSelection(interaction) {
	const player = useMainPlayer();
	const query = interaction.options.getString('query');
	const resource = await player.search(query, {
		requestedBy: interaction.user,
	});

	const resourceJSON = resource.toJSON();
	const tracks = resourceJSON.tracks;

	if (tracks.length === 1) {
		await interaction.deferReply();
		return tracks[0].url;
	}

	const select = new StringSelectMenuBuilder()
		.setCustomId('track-selection')
		.setPlaceholder('Select a track to play')
		.addOptions(
			tracks.map(track => new StringSelectMenuOptionBuilder()
				.setLabel(track.description).setValue(track.url)),
		);

	const row = new ActionRowBuilder().addComponents(select);

	await interaction.reply({
		components: [ row ],
	});

	let response;

	try {
		response = await interaction.channel.awaitMessageComponent({
			filter: i => i.customId === 'track-selection',
			time: 60000,
		});
	}
	catch (e) {
		logger.warn('User did not select a track in time.');
		return null;
	}

	// Returns the URL of the selected track
	return response.values[0];
}