var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./models');




// db.Game.remove({}, function(err, games) {
//     if(err) {
//         return console.log(err);
//     }
// });

// db.Game.find({}, function(err, games) {
// 	if(err) {
// 		return console.log(err);
// 	}
//     console.log(games);
// });

// db.Game.findOne({title: 'test'}, function(err, game) {
// 	if(err) {
// 		return console.log(err);
// 	}
//     console.log("Game found", game);
// });

// db.Admin.findOne({username: "test"}, function(err, admin) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	console.log("Admin found", admin);
// });

// db.Assassin.findOne({codename: "jj"}, function(err, assassin) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	console.log(assassin);
// });



// db.Assassin.collection.drop();

// db.Assassin.find({}, function(err, assassins) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	console.log(assassins);
// });

db.Admin.find({}, function(err, admins) {
	console.log(admins);
})

// db.Game.collection.drop();

// db.Admin.collection.drop();

// db.Assassin.collection.drop();



