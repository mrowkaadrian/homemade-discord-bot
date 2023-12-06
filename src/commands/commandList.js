import ping from './util/ping.js';
import privatePing from './util/privatePing.js';
import playTestSound from './music/playTestSound.js';
import uwuify from './util/uwuify.js';
import stopMusic from './music/stopMusic.js';
import skipMusic from './music/skipMusic.js';
import playMusic from './music/playMusic.js';

export const commandList = [
	ping,
	privatePing,
	uwuify,
	playTestSound,
	playMusic,
	stopMusic,
	skipMusic,
];