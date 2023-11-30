const { Client, Collection, Events, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');
const { getCommands } = require('./src/getCommands');

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ],
    disableMentions: 'everyone',
});

client.commands = new Collection();
getCommands(client);

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on(Events.InteractionCreate, async interaction => {
    const command = interaction.client.commands.get(interaction.commandName);

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
    }
});

client.login(process.env.TOKEN);

