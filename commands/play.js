var YouTube = require('youtube-node');
var YouTube = new YouTube();
YouTube.setKey("");
const ytdl = require("ytdl-core");
const last = require('lodash');
const queue = require('../util/queue.js');
const config = require("../util/config.js");
const Discord = require("discord.js");
module.exports = function execute(Discordold, client, message, guildata){
    var args = message.content.split(" ");
    if(args.length>=2){
        var query = null;
        var urlR = "/[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)/";
        if(args[1].match(urlR)){
            if(
                args[1].startsWith("https://www.youtube.com/watch?v=")||
                args[1].startsWith("https://youtube.com/watch?v=")||
                args[1].startsWith("http://www.youtube.com/watch?v=")||
                args[1].startsWith("http://youtube.com/watch?v=")||
                args[1].startsWith("www.youtube.com/watch?v=")||
                args[1].startsWith("youtube.com/watch?v=")||
                args[1].startsWith("https://youtu.be/")||
                args[1].startsWith("http://youtu.be/")||
                args[1].startsWith("youtu.be/")
            ){
                query=args[1];
            }
        }else {
            query = "";
            for (i = 1; i < args.length; i++) { query=query+" "+args[i];}
        }
        const embed = new Discord.RichEmbed()
            .setColor(config.bot_colour)
            .addField("Searching for", "``"+query.replace("ytsearch1:","")+"``");
        var q1 = "";
        message.channel.send(embed).then(function(res){
            YouTube.search(query, 2, function(error, result) {
                res.delete();
                if(error){console.log(error);return;}
                music__playsong(message,result);
            });


        });
    }else {
        const missing_args = new Discord.RichEmbed()
            .setColor(config.bot_colour)
            .addField("USAGE","g.play [``VIDEO TITLE`` OR ``VIDEO URL``]",false)
            .setFooter("Command by "+message.author.tag);
        message.channel.send(missing_args);
    }
}

function music__playsong(message, result) {
    var url = "https://www.youtube.com/watch?v="+result['items'][0]['id']['videoId'] || "https://www.youtube.com/watch?v="+nextsong['items'][0]['id']['videoId'];
    var guild = [];
    if(message.member.voiceChannel==null){message.channel.send("You must be in a voice channel for that!");return false;}
    if(queue.has_queue(message.guild.id)&&queue.isplaying(message.guild.id)){
        reply = new Discord.RichEmbed()
            .setColor(config.bot_colour)
            .addField("Now Queued","``"+result['items'][0]['snippet']['title']+"``");
        message.channel.send(reply);
        queue.addsong(message.guild.id, result);
        return false;
    }
    reply = new Discord.RichEmbed()
        .setColor(config.bot_colour)
        .addField("Now Playing","``"+result['items'][0]['snippet']['title']+"``");
    message.channel.send({embed: reply});
    guild.song_playing=true;
    message.member.voiceChannel.join().then(function(connection) {
      queue.start_queue(message.guild.id);
      message.channel.send(url);
        const stream = ytdl("" + url + "");
        skipReq = 0;
        skippers = [];
        queue.setplaying(message.guild.id,true);
        guild.dispatcher = connection.playStream(stream, {bitrate: 20000, volume: 0.5});
        guild.dispatcher.on('end', function() {
            queue.setplaying(message.guild.id,false);
            const nextsong = queue.nextsong(message.guild.id);
            if(nextsong!=undefined){
                music__playsong(message, nextsong);
            }else {
                const embed = new Discord.RichEmbed()
                    .setColor(0x207cc2)
                    .addField("Music Player","End of songs.");
                guild.dispatcher=null;
                message.channel.send(embed);
                guild.dispatcher = null;
                guild.song_paused=false;
                guild.song_playing=false;
            }
        });
        });
}
