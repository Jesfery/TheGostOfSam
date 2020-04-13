function checkStreaming(oldPresence, newPresence) {
    let newMember = newPresence.member;

    if (!newMember) {
        console.log(newPresence);
        return;
    }

    let guild = newMember.guild,
        promise;

    if (!guild.streamingRole) {
        guild.streamingRole = guild.roles.cache.find(role => role.name === 'medier-team');
        if (!guild.streamingRole) {
            return;
        }
    }

    let activity = getStreamingActivity(newPresence);

    if (activity != null) {
        promise = newMember.roles.add(guild.streamingRole);
    } else {
        promise = newMember.roles.remove(guild.streamingRole);
    }

    promise.then(() => {    
        let streamingMembersUrl = [];
        guild.streamingRole.members.forEach(member => {
            let a = getStreamingActivity(member.presence),
                activityUrl = a && a.url;

            if (activityUrl && activityUrl.indexOf('https://www.twitch.tv/') === 0) {
                activityUrl = activityUrl.split('/');
                activityUrl = activityUrl[activityUrl.length -1];
                streamingMembersUrl.push(activityUrl);
            } 
        });

        let proStreamersChannel = guild.channels.resolve('438241001921052673');
        if (proStreamersChannel) {
            if (streamingMembersUrl.length > 0) {
                proStreamersChannel.setTopic('MultiTwitch link: http://multitwitch.tv/' + streamingMembersUrl.join('/'));
            } else {
                proStreamersChannel.setTopic('Theres nobody streaming...');
            }
        }
    });

}

function getStreamingActivity(presence) {
    let activity = null;

    presence && presence.activities.every(a => {
        if (a.type === 'STREAMING') {
            activity = a;
            return false;
        }
    });

    return activity;
}


module.exports = {
    init: function (client) {
        client.on('presenceUpdate', checkStreaming);
    }
};