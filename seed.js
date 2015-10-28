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

// db.Assassin.findOne({}, function(err, assassin) {
// 	if(err) {
// 		return console.log(err);
// 	}
// 	assassin.died();
// });



// db.Game.collection.drop();

// db.Admin.collection.drop();

// db.Assassin.collection.drop();

db.Admin.remove({}, function(err, admins) {
	
});

db.Game.remove({}, function(err, games) {
	
});

db.Assassin.remove({}, function(err, assassins) {
});

var testAdmin = {
	username: "test",
	email: "test@test",
	password: "qwe",
	avatar: "http://ecx.images-amazon.com/images/I/61z%2BL3ZyXQL._SY355_.jpg"
}

var testDeathGame = {
	title: "testDeathGame",
	picture: "https://d1qb2nb5cznatu.cloudfront.net/startups/i/52465-5a0924aaaf6af2265c6bb823b7613658-medium_jpg.jpg?buster=1343285695",
	additional_rules: "DIE",
	key: "qwe"
}

var test1 = {
	codename: "test1",
	tagline: "qwe",
	password: "qwe",
	real_photo: "http://images.clipartpanda.com/sandwich-clipart-sandwich-half-3-md.png"
}

var test2 = {
	codename: "test2",
	tagline: "qwe",
	password: "qwe",
	real_photo: "http://images.clipartpanda.com/sandwich-clipart-sandwich-half-3-md.png"
}

var test3 = {
	codename: "test3",
	tagline: "qwe",
	password: "qwe",
	real_photo: "http://images.clipartpanda.com/sandwich-clipart-sandwich-half-3-md.png"
}

var test4 = {
	codename: "test4",
	tagline: "qwe",
	password: "qwe",
	real_photo: "http://images.clipartpanda.com/sandwich-clipart-sandwich-half-3-md.png"
}

var test5 = {
	codename: "test5",
	tagline: "qwe",
	password: "qwe",
	real_photo: "http://images.clipartpanda.com/sandwich-clipart-sandwich-half-3-md.png"
}

var players = [];




db.Admin.createSecure(testAdmin.username, testAdmin.password, testAdmin.avatar, testAdmin.email, function(err, admin) {
	if(err) {
		return console.log(err);
	}
	testDeathGame.admin = admin._id;


	db.Game.create(testDeathGame, function(err, game) {
	if(err) {
		return console.log(err);
	}

		db.Assassin.createSecure(test1.codename, test1.password, test1.avatar, test1.real_photo, test1.tagline, game._id, function(err, assassin1) {
			if(err) {
				return console.log(err);
			}
			console.log("assassin: " + assassin1.codename + " created");

			players.push(assassin1._id);

			db.Assassin.createSecure(test2.codename, test2.password, test2.avatar, test2.real_photo, test2.tagline, game._id, function(err, assassin2) {
				if(err) {
					return console.log(err);
				}
				console.log("assassin: " + assassin2.codename + " created");

				players.push(assassin2._id);

				db.Assassin.createSecure(test3.codename, test3.password, test3.avatar, test3.real_photo, test3.tagline, game._id, function(err, assassin3) {
					if(err) {
						return console.log(err);
					}
					console.log("assassin: " + assassin3.codename + " created");

					players.push(assassin3._id);

					db.Assassin.createSecure(test4.codename, test4.password, test4.avatar, test4.real_photo, test4.tagline, game._id, function(err, assassin4) {
					
						if(err) {
							return console.log(err);
						}
						console.log("assassin: " + assassin4.codename + " created");

						players.push(assassin4._id);

						db.Assassin.createSecure(test5.codename, test5.password, test5.avatar, test5.real_photo, test5.tagline, game._id, function(err, assassin5) {
					
							if(err) {
								return console.log(err);
							}
							console.log("assassin: " + assassin4.codename + " created");

							players.push(assassin5._id);

							game.players = players;

							game.save(function(err, gameSaved) {
								if(err) {
									return console.log(err);
								}
							});


							db.Assassin.find({}, function(err, assassin) {
								if(err) {
									return console.log(assassin);
								}
								console.log(assassin);
							});

							db.Admin.find({}, function(err, admin) {
								if(err) {
									return console.log(admin);
								}
								console.log(admin);
							})

							db.Game.find(testDeathGame, function(err, game) {
								if(err) {
									return console.log(err);
								}
								console.log(game)
							})



						})
					})

				});	

			});	
		});
	});

});

















