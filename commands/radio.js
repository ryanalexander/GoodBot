const Discord = require("discord.js");
var fs = require('fs');
const { last } = require('lodash');
var stations = {
    nova100:"https://18803.live.streamtheworld.com/NOVA_100_AAC48.aac?src=neweb",
    nova969:"https://18103.live.streamtheworld.com/NOVA_969_AAC48.aac?src=neweb",
    foxfm:"http://wzvic.scahw.com.au/live/3fox_128.stream/playlist.m3u8",
    triplem:"http://wznsw.scahw.com.au/live/2classicrock_32.stream/playlist.m3u8",
    EDM:"http://stream.radio.co/s4c5b7947b/listen",
    test1:""
};
module.exports = function execute(discordarg, client, message, guildata){
    args = message.content.split(" ");
    if(args.length>1){
        switch(args[1]){
            case "stop":
                message.channel.send(new Discord.RichEmbed().setColor(0x207cc2)
                    .addField("Radio","has now been stopped.")
                    .setFooter(message.author.tag));
                guildata.dispatcher.end();
                guilddata.voice_channel.leave();
                break;
            case "novafm":
                playstation(message,"nova100",guildata);
                break;
            case "foxfm":
                playstation(message,"foxfm",guildata);
                break;
            case "test1":
                playstation(message,"test1",guildata);
            default:
                message.channel.send("Unknown Extension");
                break;
        }
    }else {
        message.channel.send(new Discord.RichEmbed().setColor(0x207cc2).setTitle("Radio")
            .addField("Nova FM","g.radio novafm")
            .addField("Fox FM","g.radio foxfm")
            .addBlankField(true)
            .addField("Commands","\u200B")
            .addField("Stop The Radio","g.radio stop")
            .addField("Leave the Channel","g.leave")
            .setFooter(message.author.tag));
    }
}

function playstation(message,station, guilddata) {
    if (message.member.voiceChannel) {
        message.member.voiceChannel.join()
            .then(function(connection) { // Connection is an instance of VoiceConnection
                guilddata.voice_channel=connection;
                guilddata.dispatcher = connection.playStream(stations[station], {passes: 4});
                guilddata.song_playing=true;
                const embed = new Discord.RichEmbed()
                    .setColor(0x207cc2)
                    .addField("Now Playing","RADIO : ``"+station+"``",true);
                message.channel.send(embed);
            }).catch(console.log);
    } else {
        const embed = new Discord.RichEmbed()
            .setColor(0x207cc2)
            .addField("Warning","You must be in a voice channel for that.");
        message.channel.send(embed);
    }
}