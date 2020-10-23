exports.guildqueues = {};
exports.guildpositions = {};
exports.songstate = {};

exports.setplaying = function(guildid,state){
    this.songstate[guildid]=state;
}
exports.isplaying = function(guildid){
    return this.songstate[guildid];
}
exports.has_queue = function(guildid){
    if(this.guildqueues[guildid]!=undefined){
        return true;
    }else {
        return false;
    }
}
exports.start_queue = function(guildid){
    if(this.has_queue(guildid)){
        return false;
    }else {
        this.guildqueues[guildid] = [];
        this.songstate[guildid] = [];
        this.guildpositions[guildid] = -1;
        return true;
    }
}
exports.addsong = function(guildid, url){
    this.guildqueues[guildid].push(url);
}
exports.nextsong = function(guildid){
    this.guildpositions[guildid]=this.guildpositions[guildid]+1;
    console.log(guildid+" || Queue Position: "+this.guildpositions[guildid]);
    console.log(guildid+" || Queue Length: "+this.guildqueues[guildid].length);
    return this.guildqueues[guildid][this.guildpositions[guildid]];
}