const {Client, GatewayIntentBits} = require('discord.js');
const ytdl = require('ytdl-core');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.MessageContent
    ],
    disableMentions: 'everyone',
});

client.config = require('./config');

client.once('ready', () => {
    console.log('Bot is ready!');
});

client.on('message', async (message) => {
    if (message.content === 'ping')
        message.reply('pong');

    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if the message starts with the command
    if (message.content.startsWith('!play')) {
        // Get the voice channel of the user who sent the message
        const voiceChannel = message.member.voice.channel;

        // Check if the user is in a voice channel
        if (!voiceChannel) {
            return message.channel.send('You need to be in a voice channel to use this command!');
        }

        // Get the YouTube link from the message content
        const link = message.content.slice('!play'.length).trim();

        // Validate the YouTube link
        if (!ytdl.validateURL(link)) {
            return message.channel.send('Invalid YouTube link!');
        }

        // Join the user's voice channel
        const connection = await voiceChannel.join();

        // Play the YouTube video
        const stream = ytdl(link, { filter: 'audioonly' });
        const dispatcher = connection.play(stream);

        dispatcher.on('start', () => {
            message.channel.send(`Now playing: ${link}`);
        });

        dispatcher.on('finish', () => {
            voiceChannel.leave();
        });

        dispatcher.on('error', (err) => {
            console.error(err);
            message.channel.send('An error occurred while playing the song.');
            voiceChannel.leave();
        });
    }
});

// Replace 'YOUR_BOT_TOKEN' with your actual bot token
client.login(client.config.app.token);