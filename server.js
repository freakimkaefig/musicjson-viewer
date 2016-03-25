var express = require('express');
var bodyParser = require('body-parser');
var converter = require('musicjson2abc');

var app = express();

app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Cache-Control');
	next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', function(req, res, next) {
	res.send('Hello World!');
});

app.post('/musicjson2abc', function(req, res, next) {
	var data = req.body;
	var abc = converter.convert2Abc(JSON.stringify(data));

	console.log("===== CONVERTED =====");
    console.log("ID: " + data.id);
    console.log("===== OUTPUT =====");
	console.log(abc);
    console.log("");

	return res.status(200).send(JSON.stringify({ abc: abc }));
});

app.listen(61000, function() {
	console.log("Started on PORT 61000");
});
