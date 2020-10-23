module.exports = function execute(Discord, client, message, guilddata) {
    if(message.channel.permissionsFor(message.author).has(10240)){
        if(!(message.channel.permissionsFor(client.user).has(10240))){return false;}
        if (message.channel.type == 'text') {
            message.channel.fetchMessages()
                .then(function(messages) {
                message.channel.bulkDelete(messages);
            message.channel.send(message.author.tag+" has cleared all messages in this channel.");
            console.log("["+message.author.tag+"] Has cleared all messages in "+message.channel.name);
        }).catch(function() {
            console.log('Error while doing Bulk Delete');
        });
        }
    }else{message.channel.send(new Discord.RichEmbed().addField("Permissions","You do not have access to that command."));return false;}
}