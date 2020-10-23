const config = require("../util/config.js");
module.exports = function execute(Discord, client, message, guilddata) {
    const embed = new Discord.RichEmbed()
        .setColor(config.bot_colour)
        .addField("GoodBOT | Help Menu","\u200B",false)
        .addField("Guild Owner",guilddata.owner,true)
        .addField("Guild Size",guilddata.memberCount,true)
        .addField("Guild Name",guilddata.name,true)

        .addField("\u200B","**General Commands**",false)
        .addField("g.help","Display the help menu",true)

        .addField("\u200B","**Music Commands**",false)
        .addField("g.play","Play any song by passing the ``URL`` or ``TITLE``.",true)
        .addField("g.pause","Pause any playing song.",true)
        .addField("g.stop","Used to skip the playing song",true)
        .addField("g.skip","Starts playing the next song in the queue.",true);

    if(message.member.hasPermission("MANAGE_MESSAGES")){
        embed.addField("\u200B","**Moderation Commands**",false)
            .addField("g.mute","Mute a specific member.",true)
            .addField("g.unmute","Unmute a specific member.",true);
    }
    message.channel.send(embed);
};