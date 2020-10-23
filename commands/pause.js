module.exports = function execute(Discord, client, message, guildata){
    if(guildata.voiceConnection!=null){
        if(message.member.voiceChannel==guildata.voiceConnection.channel) {
            const vc = guildata.voiceConnection;
            if(vc)
            vc.dispatcher.pause();
          message.channel.send("Song has been paused!");
        } else {
            message.channel.send("You must be in the same voice channel as the BOT");
        }
    }else {
        message.channel.send("The bot is not playing a song.");
    }
}
