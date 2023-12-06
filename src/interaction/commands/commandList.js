import ping from './util/pingCommand.js';
import privatePing from './util/privatePingCommand.js';
import uwuify from './util/uwuifyCommand.js';
import stopMusic from './music/stopMusicCommand.js';
import skipMusic from './music/skipMusicCommand.js';
import playMusic from './music/playMusicCommand.js';

export const commandList = [
	ping,
	privatePing,
	uwuify,
	playMusic,
	stopMusic,
	skipMusic,
];