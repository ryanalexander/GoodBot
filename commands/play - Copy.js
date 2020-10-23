var YouTube = require('youtube-node');
var YouTube = new YouTube();
YouTube.setKey("AIzaSyCj238fsv6a7qlgsna6RNGLv4EBVJE-36w");
const ytdl = require("ytdl-core");
const last = require('lodash');
const queue = require('../util/queue.js');
module.exports = function execute(Discord, client, message, guildata){
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
            .setColor(0x207cc2)
            .addField("Searching for", "``"+query.replace("ytsearch1:","")+"``");
        var q1 = "";
        message.channel.send(embed).then(function(res){
            YouTube.search(query, 2, function(error, result) {
                reply = new Discord.RichEmbed()
                    .setColor(0x207cc2)
                    .addField("Now Playing","``"+result['items'][0]['snippet']['title']+"``");
                res.edit(reply);
                music__playsong(message,"https://www.youtube.com/watch?v="+result['items'][1]['id']['videoId']);
            });


        });
    }else {
        const missing_args = new Discord.RichEmbed()
            .setColor(0xD60900)
            .addField("USAGE","g.play [``VIDEO TITLE`` OR ``VIDEO URL``]",false)
            .setFooter("Command by "+message.author.tag);
        message.channel.send(missing_args);
    }
}

function music__playsong(message, url) {
    var guild = [];
    if(message.member.voiceChannel==null){message.channel.send("You must be in a voice channel for that!");return false;}
    if(true==false){
        message.channel.send("Added to queue");
        queue.addsong(message.guild.id, url);
        return false;
    }
    message.member.voiceChannel.join().then(function(connection) {
        guild.song_playing=true;
        const stream = ytdl(url, {
            filter: 'audioonly'
        });
        skipReq = 0;
        skippers = [];
        guild.dispatcher = connection.playStream(stream);
        guild.song_data=data;
        guild.dispatcher.on('end', function() {
            const nextsong = false;
            if(nextsong!=false){
                message.channel.send(nextsong);
            }else {
                const embed = new Discord.RichEmbed()
                    .setColor(0x207cc2)
                    .addField("Music Player","End of songs.");
                message.channel.send(embed);
                guild.dispatcher = null;
                guild.song_paused=false;
                guild.song_playing=false;
            }
        });
    });
}