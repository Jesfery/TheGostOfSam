const utils = require('../utils.js');

function onGuildMemberAdd(member) {
    let guild = member.guild,
        djRole = guild.roles.find('name', 'DJ'),
        iglRole = guild.roles.find('name', 'igl');

    if (djRole) {
        member.roles.add(djRole);    
    }
    if (iglRole) {
        member.roles.add(iglRole);
    }
}

module.exports = {
    init: function (client) {
        client.on('guildMemberAdd', onGuildMemberAdd);
    }
};