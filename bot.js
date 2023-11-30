const { Client, Collection, GatewayIntentBits } = require('discord.js');
const { config } = require('dotenv');
const { getCommands } = require('./src/getCommands');
const { handleEvents} = require("./src/handleEvents");

config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
    ]
});
client.commands = new Collection();

getCommands(client);
handleEvents(client);

client.login(process.env.TOKEN);

