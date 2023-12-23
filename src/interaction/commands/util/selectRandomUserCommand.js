import { SlashCommandBuilder } from 'discord.js';
import logger from '../../../logging/logger.js';

export default {
	data: new SlashCommandBuilder()
		.setName('select-random-user')
		.setDescription('Replies with an username of a random user on the voice channel'),
	async execute(interaction) {
		// TODO: It doesn't ignore the bot, if it's connected to the voice channel, so
		// it is possible to select it.

		const channel = interaction.member.voice.channel;
		const usersOnChannel = [];

		channel.members.forEach(member => {
			usersOnChannel.push(member.user.username);
		});
		const randomUser = usersOnChannel[Math.floor(Math.random() * usersOnChannel.length)];

		await interaction.reply('Selected user: ' + randomUser);

		logger.info('Executed select-random-user command');
	},
};