var Spotify = require('spotify-web');
const last = require('lodash');
const Discord = require("discord.js");


module.exports = function execute(Discordold, client, message, guildata){
    var username = "";
    var password = "";

    Spotify.login(username, password, function (err, spotify) {
        if (err) throw err;

        // first get a "Track" instance from the track URI
        spotify.get(uri, function (err, track) {
            if (err) throw err;
            console.log('Playing: %s - %s', track.artist[0].name, track.name);

            // play() returns a readable stream of MP3 audio data
            track.play()
                .pipe(new lame.Decoder())
                .pipe(new Speaker())
                .on('finish', function () {
                    spotify.disconnect();
                });

        });
    });
}