const utils = require('../utils.js');

function checkStreaming(oldPresence, newPresence) {
    let newMember = newPresence.member,
        oldMember = oldPresence.member,
        guild = newMember.guild,        
        newActivityType = utils.get(newMember, 'presence.activity.type'),
        oldActivityType = utils.get(oldMember, 'presence.activity.type'),
        promise;

    if (!guild.streamingRole) {
        guild.streamingRole = guild.roles.find(role => role.name === 'pro-streamer');
        if (!guild.streamingRole) {
            return;
        }
    }

    if (newActivityType === 'STREAMING') {
        promise = newMember.roles.add(guild.streamingRole);
    } else {
        promise = newMember.roles.remove(guild.streamingRole);
    }

    promise.then(() => {    
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
        } else {
            proStreamersChannel.setTopic('Theres nobody streaming...');
        }
    });

}

module.exports = {
    init: function (client) {
        client.on('presenceUpdate', checkStreaming);
    }
};