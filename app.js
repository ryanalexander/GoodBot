/*
const { ShardingManager } = require('discord.js');
const manager = new ShardingManager(__dirname+"/bot.js", { totalShards: 2 });

manager.spawn();
manager.on('launch', function(shard){ console.log('Successfully launched shard '+shard.id);});
*/
require(__dirname+"/bot.js");