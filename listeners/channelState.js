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

    console.debug('here 1');
    if (userActivity && userActivity.type === 'STREAMING' && !member.roles.has(guild.streamingRole.id)) {
        console.debug('here 2');
        member.roles.add(guild.streamingRole);
    } else if (member.roles.has(guild.streamingRole.id)) {
        console.debug('here 3');
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