module.exports = function execute(Discord, client, message, guilddata) {
    if(message.member.voiceChannel==guilddata.voice_channel){
        message.channel.send(new Discord.RichEmbed().setColor(0x207cc2).setTitle("Radio")
            .addField("Voice Channel","GoodBOT is no longer in ``"+message.member.voiceChannel.name+"``")
            .setFooter(message.author.tag));
        message.member.voiceChannel.leave();
    }
}