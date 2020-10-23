const Discord = require('discord.js');
const client = new Discord.Client();
const colorcodes = require('./util/colorcodes.js');
const config = require("./util/config.js");
const events = require("./util/events.js");
var app_id = config.bot_id;
var bot_name = config.bot_name;
var bot_game = config.bot_game;
var bot_colour = config.bot_colour;
var bot_colour_error = config.bot_colour_error;
var excuse = require('excuse');
var guilds = [];
var cmd_disabled = [];
var logs_channel = null;


client.on('ready', function() {
    var logs_channel = client.channels.get("650202502788153398");
    client.user.setPresence({ status: 'online', game: { name: bot_game, type: 'STREAMING' } });
    client.user.setUsername(bot_name);
    client.guilds.array().forEach(function(guild, snowflake){
        guilds.push(guild);
    });
    events(client,Discord);
    const embed = new Discord.RichEmbed()
        .setColor(bot_colour)
        .setAuthor(bot_name+" Started", "https://cdn.discordapp.com/attachments/389647599688482839/390427238870417411/Green-Tick-Transparent-Background.png")
        .addField("Status","`Online`",false)
        .addField("Servers","`"+guilds.length+"`",false)
        .addField("Channels","`"+0+"`",false)
        .setTimestamp();
    //logs_channel.send({embed});
    console.log(colorcodes.yellow+"---| "+colorcodes.cyan+bot_name+" STARTED"+colorcodes.yellow+" |---"+colorcodes.reset);
    console.log("SERVERS: "+guilds.length);
});
client.on("guildcreate",function(guild){
    guilds.push(guild);
});
client.on("guilddelete",function(guild){
    console.log("Left a guild.");
});
client.on("message",function (message){
    if(message.content.toLowerCase().startsWith("g.")){
        var cmd = message.content.split(" ")[0].replace("g.","");
        if(cmd_disabled.indexOf(cmd) > -1){message.channel.send("That command is having some trouble right now.");return false;}
        try {
            var guilddata = null;
            if(message.guild!=null){
                guilds.forEach(function(guild){if(guild.id==message.guild.id){guilddata=guild;}});
            }else{guilddata=null;}
            require("./commands/"+cmd+".js")(Discord, client,message,guilddata,logs_channel);
        }catch (e){
            console.log(e);
            // COMMAND NOT FOUND
            if (e.code == 'MODULE_NOT_FOUND') {
                console.log(colorcodes.red + message.author.tag + colorcodes.reset + " | Attempted to execute an invalid command '"+colorcodes.green+cmd+colorcodes.reset+"'");
                return false;
            }
            const reply = new Discord.RichEmbed()
                .setColor(bot_colour_error)
                .addField("Oh no!", excuse.one());
            message.channel.send(reply);
            cmd_disabled[cmd_disabled.size+1]=cmd;
            console.log(e);
            console.log(colorcodes.red + message.author.tag + colorcodes.reset + " | Attempted to execute '"+colorcodes.green+cmd+colorcodes.reset+"'");
        }
    }
});


client.login(app_id);