
// var inquirer = require('inquirer');// generally pulls require to test program
var fs = require('file-system'); //pulls from fs node packet
var Twitter = require('twitter'); //pulls from twitter node packet
var Spotify = require('node-spotify-api');	//pulls from spotify node packet
var Request = require('request');	//used for requesting JSON packet from OMDB
var keys = require("./keys");// used as instructed in the homework

var userInput = process.argv[2]; // my-tweets, spotify-this-song, movie-this
var userInputTwo = process.argv[3];	//a variable to hold the next command line input 

console.log(keys);
var spotify = new Spotify({// a variable that ties in the spotify API keys
  id:  '4582138cb3664a928286ed620f198c18',
  secret: 'e71ee5e3007e46c6b16ab1b584cfc3e5'
});

var client = new Twitter({ //a variable that ties in the Twitter API keys
	consumer_key: 'raNfCTqlRU0nOondQz2GkJIlO',
 	consumer_secret: 'Y9OlPdisn9lLdaQvFa65cbDjXdZezSWV6NS2SR7YW5IEBpvjVF',
 	access_token_key: '884964564642791424-iSgdYDR0fg1EXn44qGdjZaTPGGwPTv2',
 	access_token_secret: 'EbqolyjFETwAR0JULRrNIP6zU6uKmfK5C2JIhsD9wlm3J'
});


var Request = new Request({// a variable that ties in the spotify API keys
  id:  '',
  secret: ''
});
console.log(keys);

function chooseQuery(input) {	//a function that calls a switch case that passses in userInput
	
	switch (input) {	//passes in userInput when called
	  	
	  	case "my-tweets": 	//it the userInput is my-tweets
	    	tweeting();	//then perform the tweet function
	    break;
	  	
	  	case "spotify-this-song":
	   		songs();
	    break;
	  	
	  	case "movie-this":
	    	movies();
	    break;
	    
	    case "do-what-it-says":
	    	anythingElseFor();
	    break;
	}
};
 
chooseQuery(userInput)	//passes the user input in to the switch case
// the user's typed command to fire either get tweets, spotify song or omdb movie information

	//pulls from twitter and parses out the last 20 tweets from a twitter account with dates
	function tweeting() {
	//The next command envokes the twitter api keys, parses out the timeline and passes into a function that pulls 20 tweets
	client.get('statuses/user_timeline', params, function(error, tweets, response) 
	  	for(i = 0; i < tweets.length; i++) { //passes each of the 20 or less tweets into a variable
	  		console.log("------------------------------------------------------------");//displays the tweets in the console
	    	console.log("Today's tweet: " + tweets[i].text);
	    	console.log("-")
	    	console.log("At about: " + tweets[i].created_at);
	    	console.log("------------------------------------------------------------");
	    		
	    	fs.appendFile("log.txt", "\nToday's tweet: " + tweets[i].text + "\n" + "\nat about: " 
	    			+ tweets[i].created_at + "\n--------------------------------------", 
	    			function(err) {	//pushes the tweets to a txt file
	    				if (err) {	//longs an error if there is one
	      					return console.log('Error occured: ' + err);
	    				}
	  				});
	    }
	});

	function songs() {	//pulls from spotify using the api keys to get and object with information about the inputted moivie
	
		spotify.search({ type: 'track', query: "'" + (userInputTwo || "Ace of Base The Sign") + "'" }, function(err, song){
		  	console.log("------------------------------------------------------------");
			console.log("Band/Artist name: " + song.tracks.items[0].artists[0].name); //Band name
			console.log("Album name: " + song.tracks.items[0].album.name);	//Album name
			console.log("Song name: " + song.tracks.items[0].name);	//Song name
			console.log("URL link to this song: " + song.tracks.items[0].external_urls.spotify);  //Song URL
			console.log("------------------------------------------------------------");

			fs.appendFile("log.txt", "\nBand/Artist name: " + song.tracks.items[0].artists[0].name + "\nAlbum name: " 
				+ song.tracks.items[0].album.name + "\nSong name: " + song.tracks.items[0].name + "\nURL link to this song: " 
				+ song.tracks.items[0].external_urls.spotify + "\n--------------------------------------", function(err){
		  			if (err) {return console.log('Error occurred: ' + err);} 
		  		});
		});
	};

	function movies() {	//pulls from the omdb database using an api request and passes in a JSON packet
		request('http://www.omdbapi.com/?apikey= ' + (userInputTwo || "What ya like? ")
			+ `&tomatoes=true`, function (err, response, body) {
  		  		var bodyObj = JSON.parse(body);	//creates a variable from the JSON packet
		  		console.log("------------------------------------------------------------");
		  		console.log("Movie Title: " + bodyObj.Title);
		  		console.log("Release Year: " + bodyObj.Year);
		  		console.log("IMDB Rateing: " + bodyObj.Ratings[0].Value);
		  		console.log("Movie Nationality: " + bodyObj.Country);
		  		console.log("Language: " + bodyObj.Language);
		  		console.log("Plot: " + bodyObj.Plot);
		  		console.log("Actors: " + bodyObj.Actors);
		  		console.log("Link to Rotten Tomatoes: " + bodyObj.tomatoURL);
		  		console.log("------------------------------------------------------------");

		  		fs.appendFile("log.txt", "\nMovie Title: " + bodyObj.Title + "\nRelease Year: " + bodyObj.Year 
		  					+ "\nIMDB Rateing: " + bodyObj.Ratings[0].Value + "\nMovie Nationality: " + bodyObj.Country 
		  					+ "\nLanguage: " + bodyObj.Language + "\nPlot: " + bodyObj.Plot + "\nActors: " + bodyObj.Actors 
		  					+ "\nLink to Rotten Tomatoes: " + bodyObj.tomatoURL 
		  					+ "\n--------------------------------------", function(err){
			  						if (err) {return console.log('Error occurred: ' + err);}
			  	})
		});  		
	};

	function anythingElseFor() {//pulls in user input in the form of a txt file instead of through the command line
	
		fs.readFile("random.txt", "utf8", function (err, data){//using fs to read the txt file and pull data

			var contentArray = [];	//an empty array that can hold the data from the txt file
			contentArray = data.split(",");	//splits the data in the tzt file by comma and passes it into the empty array
			
			userInput = contentArray[0];	//reasigns userInput to the first spot in the array
			userInputTwo = contentArray[1];	//reasigns userInputTwo to the second spot in the array

			chooseQuery(userInput);	//envokes the switch case and passes in the new user input
	        	if (err){return console.log(err);}
	        });
	    };
	};
