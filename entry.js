var express = require('express');
// var path = require('path');

var app = express();
var router = require('./services/router');

// app.use(express.static(path.join(__dirname + 'public')))
app.use(express.static('public'));
app.use('/v1', router);

app.listen(3000, '127.0.0.1', function(){
	console.log('App listening on port 3000!');
});
