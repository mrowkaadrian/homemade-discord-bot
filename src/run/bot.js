import { Client, Collection, IntentsBitField } from 'discord.js';
import { prepareMusicPlayer } from '../util/prepareMusicPlayer.js';
import { config } from 'dotenv';
import getCommands from '../util/getCommands.js';
import handleEvents from '../util/handleEvents.js';
import logger from '../logging/logger.js';

config();

// Additional logging in case unexpected errors.
process.on('unhandledRejection', error => {
	logger.error('Unhandled promise rejection:', error);
});

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

