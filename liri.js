require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var moment = require('moment');
var axios = require('axios');
var request = require("request");
var fs = require('fs');
var spotify = new Spotify(keys.spotify);
// --------------------------------------------------------
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
// -----------------------------------------------------
var getArtistsName = function (artist) {
  return artist.name;
}

var getMeSpotify = function (songName) {
  // console.log(songName);

  spotify.search({
      type: 'track',
      query: songName
    },
    function (err, data) {
      //  console.log(data);
      if (err) {
        console.log('Error occurred: ' + err);
        return;
      }
      var songs = data.tracks.items;
      // console.log(songs)
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log('artist(s):' + songs[i].artists.map(getArtistsName));
        console.log('song name:' + songs[i].name);
        console.log('preview songs: ' + songs[i].preview_url);
        console.timeLog('album: ' + songs[i].album.name);
        console.log('----------------------------------------');
      }
    })
}


// area for movie-----------------------------------------------------
var getTheMovie = function (movieThis) {
  var URL = "http://www.omdbapi.com/?t=" + movieThis + "&y=&plot=short&apikey=trilogy";

  axios.get(URL).then(function (response) {
      var movieData = response.data
      console.log("-------------------------------\n");
      console.log("MOVIE TITLE: " + movieData.Title + '\n');
      console.log("RELEASE: " + movieData.Year + '\n');
      console.log("IMDB RATING: " + movieData.Ratings[0].Value + '\n');
      console.log("ROTTEN TOMATOES RATING: " + movieData.Ratings[1].Value + '\n');
      console.log("COUNTRY: " + movieData.Country + '\n');
      console.log("LANGUAGE: " + movieData.Language + '\n');
      console.log("PLOT: " + movieData.Plot + '\n');
      console.log("ACTORS: " + movieData.Actors + '\n');
      console.log("-------------------------------");
    })
    .catch(function (error) {
      if (error.response) {
        console.log(error);
      };
    });
};

function random() {

  fs.readFile("random.txt", "utf8", function (error, data) {
    if (error) {
      console.log(err);
    }
    data = data.split(",");
    songInfo(data[1]);

  });

};

// create do-what-it-says
function whatItSays(ask, display) {
  switch (ask) {

    case "concert-this":
      console.log("band search")
      concertThis(display)
      break;

    case "spotify":
      console.log("song search")
      getMeSpotify(display);
      break;

    case "movie-this":
      console.log("movie search")
      getTheMovie(display);
      break;

    case "random":
      console.log("song-search")
        (functionData);
      break;
  }
}

// function to run this
function runThis(argOne, argTwo) {
  whatItSays(argOne, argTwo);
}


runThis(process.argv[2], process.argv[3]);