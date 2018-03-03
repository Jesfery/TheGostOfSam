const utils = require('../utils.js');
let votePending = {};

module.exports = {
    name: 'igl',
    description: 'Select an I.G.L from members in the voice channel',
    aliases: ['oghayghoogle'],
    cooldown: 120,
    guildOnly: true,

    execute(message, args) {
        return new Promise((resolve, reject) => {
            let subject = '',
                voiceChannel = message.member.voiceChannel,
                potentialIGLs = [],
                userCount,
                user;

            if (voiceChannel === undefined) {
                resolve('User not connected to a voice channel');
                return;
            }

            userCount = voiceChannel.members.size;

            if (userCount === 1) {
                resolve('You\'re da IGL now!');
                return;
            }

            voiceChannel.members.forEach(member => {
                if (member.id !== message.member.id) {
                    potentialIGLs.push(member);
                }
            });

            resolve('TODO');

        });
    }
};