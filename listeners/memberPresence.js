const utils = require('../utils.js');

function checkStreaming(oldMember, newMember) {
    let guild = newMember.guild,
        newActivityType = utils.get(newMember, 'presence.activity.type'),
        oldActivityType = utils.get(oldMember, 'presence.activity.type');

    if (!guild.streamingRole) {
        guild.streamingRole = guild.roles.find('name', 'pro-streamer');
        if (!guild.streamingRole) {
            return;
        }
    }

    if (newActivityType === 'STREAMING') {
        newMember.roles.add(guild.streamingRole);
    } else {
        newMember.roles.remove(guild.streamingRole);
    }

    let streamingMembersUrl = [];
    guild.streamingRole.members.forEach(member => {
        let activityUrl = utils.get(member, 'presence.activity.url');

        if (activityUrl && activityUrl.length > 0) {
            activityUrl = activityUrl.split('/');
            activityUrl = activityUrl[activityUrl.length -1];
            streamingMembersUrl.push(activityUrl);
        } 
    });

    let proStreamersChannel = guild.channels.get('438241001921052673');
    if (streamingMembersUrl.length > 0) {
        proStreamersChannel.setTopic('MultiTwitch link: http://multitwitch.tv/' + streamingMembersUrl.join('/'));

        //streamingMembersUrl.sort()
        //streamingMembersUrl = streamingMembersUrl.join('/');
        //if (streamingMembersUrl !== guild.streamingMembersUrl) {
        //    let proStreamersChannel = guild.channels.get('438241001921052673');
        //    guild.streamingMembersUrl = streamingMembersUrl;
        //    proStreamersChannel.send('http://multitwitch.tv/' + streamingMembersUrl);
        //}
    } else {
        proStreamersChannel.setTopic('Theres nobody streaming...');
    }

}

module.exports = {
    init: function (client) {
        client.on('presenceUpdate', checkStreaming);
    }
};