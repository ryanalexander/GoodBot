module.exports = function execute(Discord, client, message, guildata){
  let reason = message.content.trim().split(' ').slice(1).join(' ');
  if (!reason) {
    message.channel.send("Nope. What volume do ya want (from 0.0-1 as of now)?");
  } else {
    if(guildata.voiceConnection!=null){
        if(message.member.voiceChannel==guildata.voiceConnection.channel) {
            const vc = guildata.voiceConnection;
            if(vc)
            vc.dispatcher.setVolume(reason);
            message.channel.send("The volume was set to " + "``" + reason + "``" + "!");
        } else {
            message.channel.send("You must be in the same voice channel as the BOT");
        }
    }else {
        message.channel.send("The bot is not playing a song.");
    }
}
}
