import { Client, Collection, GatewayIntentBits } from 'discord.js';
import { Player } from 'discord-player';
import { config } from 'dotenv';
import getCommands from './src/getCommands.js';
import handleEvents from './src/handleEvents.js';
import logger from './src/logging/logger.js';

config();

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildVoiceStates,
	],
});
client.commands = new Collection();

getCommands(client);
handleEvents(client);

prepareMusicPlayer().then(() => logger.info('Music player ready'));

client.login(process.env.TOKEN);

async function prepareMusicPlayer() {
	const player = new Player(client);
	await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

	player.on('trackStart', (queue, track) => {
		queue.metadata.send(`Now playing: ${track.title}`);
	});
}