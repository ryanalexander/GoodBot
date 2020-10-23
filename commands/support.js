module.exports = function execute(Discord, client, message, guilddata) {
    const embed = new Discord.RichEmbed()
        .setColor(0x207cc2)
        .link
        .addField("GoodBOT | Support MENU","\u200B",false)
        .addField("Support Discord","https://discord.gg/gs5KeXC",true)
        .addField("Guild Size",guilddata.memberCount,true)
        .addField("Guild Name",guilddata.name,true)

        .addField("\u200B","**General Commands**",false)
        .addField("g.help","Display the help menu",true)

        .addField("\u200B","**Music Commands**",false)
        .addField("g.play","Play any song by passing the ``URL`` or ``TITLE``.",true)
        .addField("g.pause","Pause any playing song.",true)
        .addField("g.stop","Used to skip the playing song",true)
        .addField("g.skip","Starts playing the next song in the queue.",true);
    message.channel.send(embed);
};