var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/assassins");

module.exports.Admin = require('./admin');