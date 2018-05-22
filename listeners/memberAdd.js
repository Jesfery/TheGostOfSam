const utils = require('../utils.js');

function onGuildMemberAdd(member) {
    let guild = member.guild;

    //Give the new member the DJ role.
    if (!guild.djRole) {
        guild.djRole = guild.roles.find('name', 'DJ');
        if (!guild.djRole) {
            return;
        }
    }

    member.roles.add(guild.djRole);
}

module.exports = {
    init: function (client) {
        client.on('guildMemberAdd', onGuildMemberAdd);
    }
};