const fs = require('node:fs');
const path = require('node:path');
const logger = require('./logging/logger');

function getCommands(client = undefined) {
    const commands = [];

    // Grab all the command folders
    const foldersPath = path.join(__dirname, 'commands');
    const commandFolders = fs.readdirSync(foldersPath);

    for (const folder of commandFolders) {
        // Grab all the command files
        const commandsPath = path.join(foldersPath, folder);
        const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

        for (const file of commandFiles) {
            const filePath = path.join(commandsPath, file);
            const command = require(filePath);
            // Set a new item in the Collection with the key as the command name and the value as the exported module
            if ('data' in command && 'execute' in command) {
                if (client) {
                    client.commands.set(command.data.name, command);
                }
                else {
                    commands.push(command.data.toJSON());
                }
            } else {
                console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
                logger.warn(`The command at ${filePath} is missing a required "data" or "execute" property.`);
            }
        }
    }
    return commands;
}

module.exports = { getCommands };