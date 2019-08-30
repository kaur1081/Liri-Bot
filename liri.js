require("dotenv").config();
//  code to read and set any environment variables with the dotenv package
// code required to import the keys.js file and store it in a variable.
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
// var spotify = new Spotify(keys.spotify);
var moment =require('moment');
//  to access your keys information 
// Import the request npm package.
var axios = require('axios');
var request = require("request");
var fs =require('fs');
// Make it so liri.js can take in one of the following commands:
// concert-this

function concertThis(band) {
   axios.get("https://rest.bandsintown.com/artists/" + band + "/events?app_id=codingbootcamp").then(
           function (res) {
            //  console.log(res.data);
               if (band === undefined) {
                   console.log("oops!  forgot to put in a band!")
               } else {
                   console.log("--------------------------");
                   console.log("Next Show For " + band);
                   console.log("venue: " + res.data[0].venue.name);
                   console.log("City: " + res.data[0].venue.city);
                   var date = res.data[0].datetime;
                   console.log("Date: " + moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a"));
               }
           })
       .catch(function (err) {
           if (err.res) {
               console.log("Error", error.message);
           }
           console.log(err.config);
       });
}


// spotify-this-song






function spotify(songs){
  // spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
  //   if (err) {
  //     return console.log('Error occurred: ' + err);
  //   }
  //  console.log(data); 
  // });
  

// ----------------------------------------

var jsonData = data.tracks.items[0];

var songData = [
    "-----------------------------------",
    "ARTIST: " + jsonData.artists[0].name,
    "SONG NAME: " + jsonData.name,
    "ALBUM " + jsonData.album.name,
    "PREVIEW LINK: " + jsonData.external_urls.spotify,
    "------------------------------------",
].join("\n\n");
console.log(songData);
}

// --------------------------------------------------
// for(var i=0; i<songs.length; i++){
//     console.log(i);
//     console.log('artist(s):' + songs[i].artists.map(getArtistsName));
//     console.log('song name:' + songs[i].name);
//     console.log('preview songs: ' + songs[i].preview_url);
//     console.timeLog('album: ' + songs[i].album.name);
//     console.log('----------------------------------------');
// }

  // area for movie
  function movieThis(){

  }

  // create do-what-it-says
function whatItSays(ask, display){
  switch(ask){
    case "concert-this":
      console.log("band search")
      concertThis(display)
      break;
      case "spotify":
      console.log("")
     spotify(display)
      break;
    case "movie-this":
      console.log("movie search")
      //movie search function
      break;
  }

}

function runThis(argOne, argTwo){
    whatItSays(argOne, argTwo)
}

runThis(process.argv[2],process.argv[3])
