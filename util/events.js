module.exports = function(client, discord){
    client.on("voiceStateUpdate",function(oldMember,newMember){
        if(oldMember.voiceChannel==null){console.log("User was not in a Voice Channel previously");return false;}
        //if(client.voiceChannel==null){console.log("BOT is not in a Voice Channel previously");return false;}
        if(newMember.voiceChannel==null){
            console.log("Setting timeout");
            if(oldMember.voiceChannel.members.array().length<2){
                setTimeout(function(){
                    console.log("Called Timeout");
                },200);
            }
        }
    });
}