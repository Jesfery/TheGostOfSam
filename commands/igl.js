let votePending = {};

module.exports = {
    name: 'igl',
    description: 'Select an I.G.L from members in the voice channel',
    aliases: ['oghayghoogle'],
    cooldown: 1,
    guildOnly: true,

    execute(message, args) {
        return new Promise((resolve, reject) => {
            let subject = '',
                voiceChannel = message.member.voice.channel,
                potentialIGLs = [],
                userCount,
                user,
                index,
                igl;

            if (!voiceChannel) {
                resolve('User not connected to a voice channel');
                return;
            }

            userCount = voiceChannel.members.size;

            if (userCount === 1) {
                resolve('You\'re da IGL now!');
                return;
            }

            voiceChannel.members.forEach(member => {
                if (!member.user.bot) {
                    potentialIGLs.push(member);
                }
            });

            index = Math.floor(Math.random() * Math.floor(potentialIGLs.length));
            igl = potentialIGLs[index];

            resolve('Look at me! ' + igl.toString() + ' is da IGL now!');
        });
    }
};