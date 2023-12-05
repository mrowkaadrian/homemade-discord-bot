import { Client, Collection, IntentsBitField } from 'discord.js';
import { prepareMusicPlayer } from './src/util/prepareMusicPlayer.js';
import { config } from 'dotenv';
import getCommands from './src/getCommands.js';
import handleEvents from './src/handleEvents.js';
import logger from './src/logging/logger.js';

config();

const client = new Client({
	intents: [
		IntentsBitField.Flags.Guilds,
		IntentsBitField.Flags.GuildVoiceStates,
	],
});
client.commands = new Collection();

getCommands(client);
handleEvents(client);

prepareMusicPlayer(client).then(() => logger.info('Music player ready'));

client.login(process.env.TOKEN);

