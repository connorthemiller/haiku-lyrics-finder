const config = require('./config');
const findHaiku = require('./haiku_find.js');

const Client = require('node-rest-client').Client;
const client = new Client();

const request = require('request');
const cheerio = require('cheerio')

const syllable = require('syllable');

var args = {
    headers: {"Authorization": "Bearer "+ config.access_token }
}

//Search lyrics for haikus
var songId = 378195;

//GET song data from Genius API
function grab(songId, args) {client.get(`https://api.genius.com/songs/${songId}`, args, function (data, response) {
    if (data) {
        //console.log("Data received!")
    } else {
        console.log("No data");
    }
    var song = data.response.song;
    //console.log(song.full_title);
    //console.log(song.url);
    //GET song lyrics from HTML
    request(song.url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var lyrics = $('.lyrics').text().trim();
            findHaiku.search(lyrics, song.full_title);
        }
    });
});
};

module.exports.grab = grab;
