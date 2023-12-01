const { SlashCommandBuilder } = require('discord.js');
const { logger } = require('../../logging/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Replies with Pong!'),
    async execute(interaction) {
        await interaction.reply('Pong!');
        logger.info('Executed ping command');
    },
}