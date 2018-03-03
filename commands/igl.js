let votePending = {};

module.exports = {
    name: 'igl',
    description: 'Select an I.G.L from members in the voice channel',
    aliases: ['oghayghoogle'],
    cooldown: 30,
    guildOnly: true,

    execute(message, args) {
        return new Promise((resolve, reject) => {
            let subject = '',
                voiceChannel = message.member.voiceChannel,
                potentialIGLs = [],
                userCount,
                user,
                index,
                igl;

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
                if (!member.bot) {
                    potentialIGLs.push(member);
                }
            });

            index = Math.floor(Math.random() * Math.floor(potentialIGLs.length));
            igl = potentialIGLs[index];

            resolve(igl.toString() + ' is da IGL now!');
        });
    }
};