const utils = require('../utils.js');

function checkStreaming(member) {
    let guild = member.guild,
        userActivity = utils.get(member, 'presence.activity');

    if (!guild.streamingRole) {
        guild.streamingRole = guild.roles.find('name', 'pro-streamer');
        if (!guild.streamingRole) {
            return;
        }
    }

    if (userActivity && userActivity.type === 'STREAMING') {
        member.roles.add(guild.streamingRole);
    } else {
        member.roles.remove(guild.streamingRole);
    }

}

module.exports = {
    init: function (client) {
        client.on('presenceUpdate', (oldMember, newMember) => {
            checkStreaming(newMember);
        });
    }
};