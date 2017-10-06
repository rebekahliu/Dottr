var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
// var path = require('path');

var app = express();
var router = require('./services/router.js');

mongoose.connect('mongodb://localhost:dottr/dottr');

// app.use(express.static(path.join(__dirname + 'public')))
app.use(express.static('public'));
app.use(morgan('combined'));
app.use(bodyParser.json());
app.use('/v1', router);

var PORT = process.env.PORT || 3000;
var HOST = process.env.HOST || '127.0.0.1';

app.listen(3000, '127.0.0.1', function(){
	console.log('App listening on port 3000!');
});
