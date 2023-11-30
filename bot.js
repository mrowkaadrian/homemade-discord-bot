const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { Player } = require('discord-player');
const { config } = require('dotenv');
const { getCommands } = require('./src/getCommands');
const { handleEvents} = require("./src/handleEvents");

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildVoiceStates,
    ]
});
client.commands = new Collection();

getCommands(client);
handleEvents(client);

const musicPlayer = new Player(client);

client.login(process.env.TOKEN);

