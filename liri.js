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
        console.log("Artist: " + JSON.stringify(body.tracks.items[0].artists[0].name));
        console.log("Your Song: " + JSON.stringify(body.tracks.items[0].name));
        console.log("Preview: " + JSON.stringify(body.tracks.items[0].preview_url));
        console.log("Album: " + JSON.stringify(body.tracks.items[0].album.name));

        
    }

    });
}

function movieFunction() {
	var movieNameIn = userInput;
	var request = require("request");
	console.log("Hello there")
	var queryUrl = "http://www.omdbapi.com/?t=" + movieNameIn + "&y=&plot=short&r=json";

	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  		if (!error && response.statusCode === 200) {

    		console.log("Your Movie: " + JSON.stringify(body));
  		}

			fs.appendFile(logFile, body, function(err) {

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
		console.log(data);
		spotifyIt(data);
	});
}

function twitterCall(){
    var client = new Twitter({
        consumer_key: 'ogDfFvT4Wjw2IR4GicUGBNeqj',
        consumer_secret: '9FhVPTVg96HyEVZIY5UmHCZpx0nmW4KSy4AWcHxltTLRX5qUug',
        access_token_key: '785246915478695936-5m1oykjqsGpiOtGSyl9QB2wFC3JVZk5',
        access_token_secret: '8hGKuwIghWmnUzxeEqErFfy8xG5EfD5S3SASoM0dwqytz'
    });

    var screenName = userInput;
    var params = {screen_name: screenName};
        console.log(screenName);
        client.get('statuses/user_timeline', params, function(error, tweets, response) 
            
        {
            if (!error) {
                console.log(tweets.text);
             }
        });
	
}





