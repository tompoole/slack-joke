var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _port = process.env.PORT || 1337;
var jokes = require('./jokes.js');
var slackToken = '';

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.post('/command/joke', function(req, res) {
	var body = req.body;
	
	if (body.token !== slackToken) {
		res.status(403).end();
		return;
	}
    
    var randomIndex = getRandomInt(0, jokes.length);
    
    var joke = jokes[randomIndex];
	
	res.json({
		"response_type": "in_channel",
		"text": joke.setup,
		"attachments": [
			{
				"text": joke.punchline
			}
		]
	});
});

var server = app.listen(_port);

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}