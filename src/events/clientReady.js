const { Events } = require('discord.js');
const { logger } = require('../logging/logger');

module.exports = {
    name: Events.ClientReady,
    once: true,
    execute(client) {
        console.log(`Ready! Logged in as ${client.user.tag}`);
        logger.info(`Logged in as ${client.user.tag}`)
    },
};