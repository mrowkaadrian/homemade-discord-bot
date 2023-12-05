import { Player } from 'discord-player';

export async function prepareMusicPlayer(client) {
	const player = new Player(client);
	await player.extractors.loadDefault((ext) => ext !== 'YouTubeExtractor');

	player.on('trackStart', (queue, track) => {
		queue.metadata.send(`Now playing: ${track.title}`);
	});
}