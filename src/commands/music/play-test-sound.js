const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-test-sound')
        .setDescription('Joins the channel and plays a test sound'),
    async execute(interaction) {
        await interaction.reply('Not implemented yet!');
    },
}