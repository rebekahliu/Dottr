var express = require('express');
// var path = require('path');
var app = express();

var router = express.Router();

// app.use(express.static(path.join(__dirname + 'public')))
app.use(express.static('public'));

var game = function(req, res) {
  res.render('public/index.html');
};

router.route('/').get(game);

app.listen(3000, '127.0.0.1', function(){
	console.log('App listening on port 3000!');
});

// module.exports = app;
