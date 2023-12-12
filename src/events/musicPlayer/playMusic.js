import { useMainPlayer } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import { playerMenu } from '../../interaction/menus/musicPlayerMenu.js';
import logger from '../../logging/logger.js';
import { ActionRowBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder } from 'discord.js';
import { nowPlayingEmbed } from '../../interaction/embeds/nowPlayingEmbed.js';

export async function playMusic(interaction) {
	const player = useMainPlayer();
	const selection = await showTracksAndExpectSelection(player, interaction);

	if (!selection) {
		return interaction.editReply('You did not select a track in time.');
	}

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
		await playSelectedTrack(player, channel, audioResource, interaction);
	}
	catch (error) {
		await interaction.editReply('Something went wrong while playing the music. Check logs for more details.');
		logger.error(`Error executing play-music command using resource: ${audioResource.toJSON().tracks[0].url}` + error);
	}
}

async function showTracksAndExpectSelection(player, interaction) {
	const query = interaction.options.getString('query');
	const resource = await player.search(query, { requestedBy: interaction.user });
	const tracks = resource.toJSON().tracks;

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

	await interaction.channel.awaitMessageComponent({
		filter: i => i.customId === 'track-selection',
		time: 30_000,
	}).then(response => {
		// Returns the URL of the selected track
		return response.values[0];
	}).catch(() => {
		interaction.editReply({
			content: 'You did not select a track in time.',
			components: [],
		});
		logger.warn('User did not select a track in time.');
		return null;
	});
}

async function playSelectedTrack(player, channel, audioResource, interaction) {
	await player.play(channel, audioResource);
	const trackInfo = audioResource.toJSON().tracks[0];

	await interaction.editReply({
		embeds: [ nowPlayingEmbed(trackInfo) ],
		components: [ playerMenu ],
	});

	logger.info(`Executed play-music command using resource: ${trackInfo.url}`);
}