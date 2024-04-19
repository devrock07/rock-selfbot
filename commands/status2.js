const Discord = require('discord.js-selfbot-v13');

module.exports = {
    name: 'status2',
    description: 'Set a custom status with Rich Presence.',
    execute(channel, message, client, args) {
        console.clear();
        console.log(`${client.user.tag} - rich presence started!`);

        const r = new Discord.RichPresence()
            .setType('PLAYING')
            .setURL('https://www.twitch.tv/zenithsenpai07')
            .setState('bye afk <3')
            .setName('<3')
            .setDetails('Details')
            .setAssetsLargeImage('https://cdn.discordapp.com/attachments/1224303568794812501/1224602723496890419/a_5bc2ea8afd50a19ab18380ccd1d54a12.gif?ex=661e1729&is=660ba229&hm=0eb9d88ffac0a2fbda6ed7ea46d630e14ac87a0b4cd65c73b554218a24296d3c&')
            .setAssetsLargeText('Cncs')
            .setAssetsSmallImage('https://cdn.discordapp.com/attachments/1224303568794812501/1224602723496890419/a_5bc2ea8afd50a19ab18380ccd1d54a12.gif?ex=661e1729&is=660ba229&hm=0eb9d88ffac0a2fbda6ed7ea46d630e14ac87a0b4cd65c73b554218a24296d3c&')
            .setAssetsSmallText('Arozex')
            //.addButton('Cncs', 'https://discord.gg/cncs')
            //.addButton('Join Arozex Development', 'https://discord.gg/hrWB2MaEu8');

        client.user.setActivity(r);
        client.user.setPresence({ status: "dnd" });
    }
};
