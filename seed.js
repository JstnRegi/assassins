var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./models');




db.Game.remove({}, function(err, games) {
    if(err) {
        return console.log(err);
    }
});

db.Game.find({}, function(err, games) {
    console.log(games.length);
});






