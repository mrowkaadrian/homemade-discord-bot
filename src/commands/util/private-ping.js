const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('private-ping')
        .setDescription('Replies with Pong! (but secretly)'),
    async execute(interaction) {
        await interaction.reply({content: 'Pong!', ephemeral: true});
    },
}