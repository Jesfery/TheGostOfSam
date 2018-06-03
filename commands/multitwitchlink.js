const utils = require('../utils.js');

module.exports = {
    name: 'multitwitchlink',
    description: 'Get a multitwitch link for all currently streaming members',
    aliases: ['mtl'],
    cooldown: 1,
    guildOnly: true,

    execute(message, args) {
        return new Promise((resolve, reject) => {
            let guild = message.member.guild;

            let streamingRole = guild.roles.find('name', 'pro-streamer');
            if (!streamingRole) {
                resolve('Streaming role does not exist');
                return;
            }

            let streamingMembersUrl = [];
            streamingRole.members.forEach(member => {
                let activityUrl = utils.get(member, 'presence.activity.url');
        
                if (activityUrl && activityUrl.length > 0) {
                    activityUrl = activityUrl.split('/');
                    activityUrl = activityUrl[activityUrl.length -1];
                    streamingMembersUrl.push(activityUrl);
                } 
            });
        
            if (streamingMembersUrl.length > 0) {
                streamingMembersUrl = 'http://multitwitch.tv/' + streamingMembersUrl.join('/');
                resolve(streamingMembersUrl);
                return;
            }

            resolve('Theres nobody streaming... I\'ll just be over here if Anthony calls');
        });
    }
};