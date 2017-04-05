var fs = require("fs");
var theKeys = require("./keys.js");
var Twitter = require('twitter');
var spotify = require('spotify');
var nodeArgs = process.argv;
var operator = process.argv[2];
var userInput = process.argv[3];
var logFile = ("log.txt");
var randomText = ("random.txt")

switch(operator){
	case "movie-this": 
	movieFunction();
    break;

    case "do-what-it-says":
    whatItSays();
    break;

    case "my-tweets":
    twitterCall();
    break;

    case "spotify-this-song":
    spotifyIt();
    break;

    default:
    console.log("I don't understand your command");
}

function spotifyIt(){

    
    var songTitle = userInput;

    spotify.search({ type: 'track', query: songTitle }, function(err, body) {
	    if (err) {
	        console.log('Error occurred: ' + err);
	        return;
	    }
	    else{
	        console.log("Artist: " + JSON.stringify(body.tracks.items[0].artists[0].name) + " Your Song: " + JSON.stringify(body.tracks.items[0].name) + 
	        	" Preview: " + JSON.stringify(body.tracks.items[0].preview_url) + " Album: " + JSON.stringify(body.tracks.items[0].album.name));

	        var saveThis = "Artist: " + JSON.stringify(body.tracks.items[0].artists[0].name) + " Your Song: " + JSON.stringify(body.tracks.items[0].name) + 
	        	" Preview: " + JSON.stringify(body.tracks.items[0].preview_url) + " Album: " + JSON.stringify(body.tracks.items[0].album.name);
	    }

	    fs.appendFile(logFile, saveThis, function(err) {
	  			if (err) {
	    			console.log(err);
	  			}
		    	else {
			    	console.log("Content Added!");
	  			}
		});
    });
}

function movieFunction() {
    if (userInput) {
       var movieNameIn = userInput.split(' ').join('+');
    }else{
       var movieNameIn = "Mr. Nobody";
    }
	
	var request = require("request");
	console.log("Hello there")
	var queryUrl = "http://www.omdbapi.com/?t=" + movieNameIn + "&y=&plot=short&r=json";

	var movieBreak = movieNameIn.split;
	if (movieBreak.length > 1) {
		var movieNameUnderscored = movieNameIn.split('+').join('_');
		var rtUrl = "https://www.rottentomatoes.com/m/" + movieNameUnderscored;
	}

	
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  		if (!error && response.statusCode === 200) {

    		console.log("Your Movie: " + JSON.parse(body).Title + ";" + " Year: " + JSON.parse(body).Year + ";" + " Country: " + JSON.parse(body).Country + 
    			 ";" + " Language: " + JSON.parse(body).Language + ";" + " Cast: " + JSON.parse(body).Actors + ";" + " Plot: " + JSON.parse(body).Plot +  ";" + " ImdbRating: " + 
    			JSON.parse(body).imdbRating +  ";" + " Source: " + JSON.parse(body).Ratings[1].Source + ";" + " Rating: " +  JSON.parse(body).Ratings[1].Value);

    		var writeToLog = "Your Movie: " + JSON.parse(body).Title + ";" + " Year: " + JSON.parse(body).Year + ";" + " Country: " + JSON.parse(body).Country + 
    			 ";" + " Language: " + JSON.parse(body).Language + ";" + " Cast: " + JSON.parse(body).Actors + ";" + " Plot: " + JSON.parse(body).Plot +  ";" + " ImdbRating: " + 
    			JSON.parse(body).imdbRating +  ";" + " Source: " + JSON.parse(body).Ratings[1].Source + ";" + " Rating: " +  JSON.parse(body).Ratings[1].Value;

  		}
  		console.log("Rotten Tomatoes URL: " + rtUrl);
  		var writeToLogAdded = writeToLog + " " + rtUrl;
  		// console.log("Test: " + writeToLogAdded);

		fs.appendFile(logFile, writeToLogAdded, function(err) {

  			if (err) {
    			console.log(err);
  			}

	    	else {
		    	console.log("Content Added!");
  			}

		});
	});

}

function whatItSays(){
	fs.readFile(randomText, "utf8", function(error, data){
		var newData = data.split(",");
		var command = newData[0];
		var userInputThing = newData[1];
		operator = command;
		userInput = userInputThing;

		switch(operator){
		case "movie-this": 
		movieFunction();
	    break;

	    case "do-what-it-says":
	    whatItSays();
	    break;

	    case "my-tweets":
	    twitterCall();
	    break;

	    case "spotify-this-song":
	    spotifyIt();
	    break;

	    default:
	    console.log("I don't understand your command");
		}
	});
}

function twitterCall(){
    var client = new Twitter({
        consumer_key: theKeys.twitterKeys.consumer_key,
        consumer_secret: theKeys.twitterKeys.consumer_secret,
        access_token_key: theKeys.twitterKeys.access_token_key,
        access_token_secret: theKeys.twitterKeys.access_token_secret,
    });

    var screenName = userInput;
    var params = {screen_name: screenName};
        client.get('statuses/user_timeline', params, function(error, tweets, response){
            if (!error && response.statusCode === 200) {
                // console.log("HERE DA RESPONSE: " + JSON.stringify(tweets[0].created_at));
                // console.log("HERE DA RESPONSE: " + JSON.stringify(tweets[0].text));
                for (var i = 0; i < 20; i++) {
                  console.log("Tweet " + (i + 1) + ":" + JSON.stringify(tweets[i].text));
                  console.log("--------------------------------------------------");
                  var savingToFile = JSON.stringify(tweets[i].text);
                }
             }
             else{
                console.log("You did not make it.")
             }
           

             fs.appendFile(logFile, savingToFile, function(err) {
	  			if (err) {
	    			console.log(err);
	  			}
		    	else {
			    	console.log("Content Added!");
	  			}
			});
        });
	
}





