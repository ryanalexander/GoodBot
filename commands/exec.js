module.exports = function execute(Discord, client, message, guilddata) {
    if(message.author.id=="317236321099710467"){
        var args = message.content.split(" ");
        var query = null;
        for (i = 1; i < args.length; i++) { query=query+" "+args[i];}
        try {
            var evaled = eval(query);
            message.channel.send(new Discord.RichEmbed().setColor(0x207cc2)
                .addField("Output", clean(evaled))
                .setFooter(message.author.tag));
        }catch (e){
            console.log(e);
            message.channel.send(new Discord.RichEmbed().setColor(0x207cc2)
                .addField("ERROR", "An error occurred while executing that function")
                .setFooter(message.author.tag));
            return false;
        }
    }else {
        message.channel.send(new Discord.RichEmbed().setColor(0x207cc2)
            .addField("Access Denied","That command can only be run by the ``Developer``")
            .setFooter(message.author.tag));
    }
}

function clean(text) {
    if (typeof(text) === "string") {
        return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    }
    else {
        return text;
    }
}