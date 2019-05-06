const utils = require('../utils.js');

function onGuildMemberAdd(member) {
    let guild = member.guild,
        djRole = guild.roles.find(role =>  role.name === 'DJ'),
        iglRole = guild.roles.find(role => role.name === 'MEDIER-TEAM'),
        craigRole = guild.roles.find(role => role.name === 'Craig');

    if (djRole) {
        member.roles.add(djRole);    
    }
    if (iglRole) {
        member.roles.add(iglRole);
    }
    if (craigRole) {
        member.roles.add(craigRole);
    }    
}

module.exports = {
    init: function (client) {
        client.on('guildMemberAdd', onGuildMemberAdd);
    }
};