import { useMainPlayer } from 'discord-player';
import myUwuifier from '../../util/uwuifier.js';
import { playerMenu } from '../../menus/musicPlayerMenu.js';
import logger from '../../logging/logger.js';

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

		await interaction.followUp({
			content: myUwuifier.uwuifySentence('Now playing: something, I don\'t know ://'),
			components: [ playerMenu ],
		});
		logger.info(`Executed play-music command with query: ${query}`);
	}
	catch (error) {
		await interaction.followUp('Something went wrong while playing the music. Check logs for more details.');
		logger.error(`Error executing play-music command with query: ${query}` + error);
	}
}