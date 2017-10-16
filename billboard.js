const config = require('./config');
const songData = require('./genius_req');
const Client = require('node-rest-client').Client;
const client = new Client();

var args = {
    headers: {"Authorization": "Bearer "+ config.access_token }
}

//Generate a list of top billboard songs
var billboard = require("billboard-top-100").getChart;

billboard('hot-100', function(songs, err){
    if (err) console.log(err);
    // Searches through all 100 available songs in billboard chart
    for (var i = 0; i < songs.length; i++ ) {
    
    //Query each song title in Genius
    queryGenius(songs[i].title);
    
    }
});

//GET song data from Genius API
function queryGenius(songTitle) {
  var queryURI = encodeURIComponent(songTitle);
  client.get(`https://api.genius.com/search?q=${queryURI}`, args, function (data, response) {
    if (data) {
        //console.log("Data received!")
        //Get songId for each song
        var obj = {
          full_title: data.response.hits[0].result.full_title,
          id: data.response.hits[0].result.id,
          url: data.response.hits[0].result.url
        };
        //GET Song Data Function
        songData.grab(obj.id, args);
    } else {
        console.log("No data");
    }
  });
}


