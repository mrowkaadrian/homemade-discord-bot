const { Events } = require('discord.js');
const { logger } = require('../logging/logger');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        const command = interaction.client.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            logger.error(error);
        }
    },
}