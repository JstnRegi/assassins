var mongoose = require('mongoose');
mongoose.connect( process.env.MONGOLAB_URI ||
                  process.env.MONGOHQ_URL || 
                  "mongodb://localhost/assassins");

module.exports.Admin = require('./admin');
module.exports.Game = require('./game');
module.exports.Assassin = require('./assassin');