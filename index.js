var Spotify = require('node-spotify-api');


var spotify = new Spotify({
  id:4582138cb3664a928286ed620f198c18,
  secret: e71ee5e3007e46c6b16ab1b584cfc3e5
});
 

// the user's typed command to fire either get tweets, spotify song or omdb movie information
var command = process.argv[2]; // my-tweets, spotify-this-song, movie-this

if ( command == 'my-tweets' ) {
	console.log('get user\'s tweets');
}

if ( command == 'spotify-this-song' ) {
	var song = process.argv[3];

	if ( song && typeof song == 'string' ) {
		spotify.search({ type: 'track', query: song }, function(err, data) {
		  if (err) {
		    return console.log('Error occurred: ' + err);
		  }
		 
			console.log(data); 
		});
	}	
}


// var inquirer = require('inquirer');

// var inquirer = {
// 	prompt: function(arr) {
// 		return new Promise(function(resolve, reject) {
// 			if ( !arr.length ) reject('Please pass some objects to the prompt method');

// 			arr.forEach(function(obj) {
// 				console.log(obj.message);
// 			});
// 		});
// 	}
// }

// inquirer.prompt([
// 	{
// 		name: 'num', 
// 		message: 'What is your number?'
// 	},
// 	{
// 		name: 'amount',
// 		message: 'How many do you want?'
// 	}
// ]).then(function(answers) {
// 	console.log(answers);
// });

// var obj = require('./another.js');

// console.log(obj.test);

// obj.doSomething();
