import { Player } from 'discord-player';

export async function prepareMusicPlayer(client) {
	const player = new Player(client);
	await player.extractors.loadDefault();

	player.on('trackStart', (queue, track) => {
		queue.metadata.send(`Now playing: ${track.title}`);
	});
}