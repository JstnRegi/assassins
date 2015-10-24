// require modules
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    expressSession = require('express-session'),
    mongoose = require('mongoose'),
    path = require('path');

// create instance of express
var app = express();


// ServerPort
var port = 3000;

// Paths
var views = path.join(process.cwd(), 'views/');

// Serve JS & CSS files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// require routes
var api = require('./api');

// MiddleWare
app.use(logger('dev'));



// Routes

app.get(["/", "*"], function(req, res) {
	res.render(path.join(views, 'application.html.ejs'));
});


//listening to port
app.listen(port, function() {
	console.log('There"s free food at port ' + port);
})