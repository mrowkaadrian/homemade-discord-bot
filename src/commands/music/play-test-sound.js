const { SlashCommandBuilder } = require('discord.js');
const { logger } = require('../../logging/logger');
const { useMainPlayer, QueryType } = require('discord-player');
const path = require('node:path');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('play-test-sound')
        .setDescription('Joins the channel and plays a test sound'),
    async execute(interaction) {

        const musicPlayer = useMainPlayer();
        const channel = interaction.member.voice.channel;
        if (!channel) return interaction.reply('You must be in a voice channel to use this command');
        const soundPath = path.join(__dirname, '../../../sounds/test-sound.mp3');

        await interaction.deferReply();

        try {
            const { track } = await musicPlayer.play(channel, soundPath, {
                searchEngine: QueryType.FILE,
                nodeOptions: {
                    metadata: interaction
                }
            });

            interaction.followUp(`Playing test sound`);
            logger.info('Executed play-test-sound command')
        }
        catch (error) {
            logger.error("Error playing test sound: " + error);
        }
    },
}