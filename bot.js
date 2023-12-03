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

const musicPlayer = prepareMusicPlayer();

client.login(process.env.TOKEN);

async function prepareMusicPlayer() {
    const player = new Player(client);
    await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

    player.on('trackStart', (queue, track) => {
        queue.metadata.send(`Now playing: ${track.title}`);
    });

    return player;
}