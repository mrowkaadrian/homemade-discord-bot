import { SlashCommandBuilder } from 'discord.js';
import logger from '../../logging/logger.js';
import { useMainPlayer, QueryType } from 'discord-player';
import path from 'node:path';

export const data = new SlashCommandBuilder()
	.setName('play-test-sound')
	.setDescription('Joins the channel and plays a test sound');

export async function execute(interaction) {
	const musicPlayer = useMainPlayer();
	const channel = interaction.member.voice.channel;
	if (!channel) return interaction.reply('You must be in a voice channel to use this command');
	const soundPath = path.join(__dirname, '../../../sounds/test-sound.mp3');

	await interaction.deferReply();

	try {
		await musicPlayer.play(channel, soundPath, {
			searchEngine: QueryType.FILE,
			nodeOptions: {
				metadata: interaction,
			},
		});

		await interaction.followUp('Playing test sound');
		logger.info('Executed play-test-sound command');
	}
	catch (error) {
		logger.error('Error playing test sound: ' + error);
	}
}