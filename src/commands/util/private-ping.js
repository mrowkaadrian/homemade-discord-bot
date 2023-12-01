const { SlashCommandBuilder } = require('discord.js');
const { logger } = require('../../logging/logger');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('private-ping')
        .setDescription('Replies with Pong! (but secretly)'),
    async execute(interaction) {
        await interaction.reply({content: 'Pong!', ephemeral: true});
        logger.info('Executed private-ping command')
    },
}