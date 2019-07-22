require('dotenv').config();

const Discord = require('discord.js');

const commandListener = require('./listeners/command.js');
const memberPresenceListener = require('./listeners/memberPresence.js');
const memberAddListener = require('./listeners/memberAdd.js');

const client = new Discord.Client();

client.once('ready', () => {
    commandListener.init(client);
    memberPresenceListener.init(client);
    memberAddListener.init(client);
    console.log('Ready!');
});

client.login(process.env.DISCORD_TOKEN);