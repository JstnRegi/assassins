// require modules
var express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoose = require('mongoose'),
    db = require('./models');
    path = require('path');

// create instance of express
var app = express();


// set templating engine
app.set('view engine', 'ejs');


// ServerPort
var port = (process.env.PORT || 3000);

// Paths
var views = path.join(process.cwd(), 'views/');

// Serve JS & CSS files
app.use("/static", express.static("public"));
app.use("/vendor", express.static("bower_components"));

// require routes
var api = require('./api');

// MiddleWare
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// session id with secret key
app.use(session({ 
		secret: 'super-secret-assassin',
		resave: false,
		cookie: {httpOnly: false},
		saveUninitialized: true
	})
);

//session helpers
app.use(function( req, res, next) {
	req.adminLogin = function(admin) {
        req.session.adminId = admin._id;
    };

    req.assassinLogin = function(assassin) {
        req.session.assassinId = assassin._id;
    };

    req.currentAdmin = function (cb) {
        db.Admin.findOne({_id: req.session.adminId},
            function (err, admin) {
                req.admin = admin;
                cb(null, admin);
            });
    };

    req.currentAssassin = function (cb) {
        db.Assassin.findOne({_id: req.session.assassinId},
            function (err, assassin) {
                req.assassin = assassin;
                cb(null, assassin);
            });
        // 
    };

    req.logout = function() {
        if(!!req.session.adminId) {
            req.session.adminId = null;
            req.admin = null;
        }
        if(!!req.session.assassinId) {
            req.session.assassinId = null;
            req.assassin = null;
        }
        
    };

    next();
});


// Routes
app.use(api);

app.get(["/", "*"], function(req, res) {
	res.render(path.join(views, 'application.html.ejs'));
});


//listening to port
app.listen(port, function() {
	console.log('There"s free food at port ' + port);
})