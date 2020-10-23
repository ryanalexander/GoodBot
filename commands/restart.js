module.exports = function execute(Discord, client, message, guilddata, logs_channel) {
    if(!(message.author.id=="317236321099710467")){
        const embed = new Discord.RichEmbed()
            .setColor(0x207cc2)
            .setAuthor("The following user attempted to restart the bot", "https://cdn.discordapp.com/attachments/389652079058092033/390107750627278848/error-flat.png")
            .addField("TAG", message.author.tag, true)
            .addField("ID", message.author.id, true)
            .addField("USERNAME", message.author.username, true)
            .addField("GUILD", (message.guild.name), true)
            .addField("MEMBERS", message.guild.memberCount, true)
            .addField("G_ID", message.guild.id, true);
        //client.users.get("317236321099710467").send({embed});
        logs_channel.send(embed);
        return false;
    }else {
        const embed = new Discord.RichEmbed()
            .setColor(0x207cc2)
            .setAuthor("BOT Restarting", "https://cdn.discordapp.com/attachments/389652079058092033/390107750627278848/error-flat.png")
            .addField("The bot will update you when it's restart is done.","Please wait.");
        //client.users.get("317236321099710467").send({embed});
        logs_channel.send(embed);
        client.user.setPresence({ status: 'idle', game: { name: 'restarting' } });
        client.user.setStatus('idle');
        console.log("Now stopping. Issued by "+message.author.id);
        console.log(" ");
        process.exit(1);
    }
}