var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/assassins");

module.exports.Admin = require('./admin');
module.exports.Game = require('./game');