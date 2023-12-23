import ping from './util/pingCommand.js';
import privatePing from './util/privatePingCommand.js';
import uwuify from './util/uwuifyCommand.js';
import stopMusic from './music/stopMusicCommand.js';
import skipMusic from './music/skipMusicCommand.js';
import playMusic from './music/playMusicCommand.js';
import selectRandomUser from './util/selectRandomUserCommand.js';

export const commandList = [
	ping,
	privatePing,
	uwuify,
	selectRandomUser,
	playMusic,
	stopMusic,
	skipMusic,
];