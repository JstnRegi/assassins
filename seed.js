var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var db = require('./models');
var Faker = require('Faker');
// var randomName = Faker.Name.findName();

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

// db.Game.findOne({ $or: [ { title: 'testDeathGame' }, { _id: "qwe"} ] }, function(err, game) {
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

// console.log(Faker.Name.findName());
// console.log(Faker.Image.animals());
// console.log(Faker.Lorem.sentence());

var testAdmin = {
	username: "jjj",
	email: "test@test",
	password: "qwe",
	avatar: "http://ecx.images-amazon.com/images/I/61z%2BL3ZyXQL._SY355_.jpg"
}

var testDeathGame = {
	title: "Wdi 21 Cog of Death",
	picture: "https://d1qb2nb5cznatu.cloudfront.net/startups/i/52465-5a0924aaaf6af2265c6bb823b7613658-medium_jpg.jpg?buster=1343285695",
	additional_rules: "No winners. No deaths. Only dreams. Developer dreams.",
	key: "qwe"
}

var hardcoreGame = {
	title: "Pro League: Assassins hardcore",
	picture: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTJ0FkQ8Bii06tvyaC4PG-I53aOPJ3VVzVwRgHvgL6DIVbeXvfHs-BaNg",
	additional_rules: "No guns. No poison. Plastic spoons only.",
	key: "qwe"
}

var francis = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAS7AAAAJGUzZWIyNjNkLTlkYWMtNGM3Mi1hZWEzLTBhYjE5MzNhNDgzYQ.jpg",
	real_name: "francis"
}

var bradley = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://avatars1.githubusercontent.com/u/3679765?v=3&s=460",
	real_name: "bradley"
}

var peter = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/2/000/223/097/39e2b5e.jpg",
	real_name: "peter"
}

var heather = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAASWAAAAJGFjZGQ4NDZkLTI1YzItNDMxNS1hYzM4LTEyODY4MmE3NGExOQ.jpg",
	real_name: "heather"
}

var lisa = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAVyAAAAJGI2MmY2OWQ0LTM0YTEtNGI4NC1hMDEyLWQwYjIzNTNkM2M1OA.jpg",
	real_name: "lisa"
}

var marcel = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAARQAAAAJGU0NzU2MTMzLTEwZGYtNGU5YS1iMWJiLTliY2JkZWE1NmEzNA.jpg",
	real_name: "marcel"
}

var olivia = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/000/1ac/1cc/39e4aaa.jpg",
	real_name: "olivia"
}

var nathan = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAcZAAAAJGFhNmZjMjVhLTllNmMtNDg2YS1iNWM3LTlmYmM4MzJjNTNjNQ.jpg",
	real_name: "nathan"
}

var ilias = {
	codename: Faker.Name.findName(),
	avatar: Faker.Image.animals(),
	tagline: Faker.Lorem.sentence(),
	password: "qwe",
	real_photo: "https://media.licdn.com/mpr/mpr/shrinknp_400_400/AAEAAQAAAAAAAAI8AAAAJDdlOGY0NTYwLTM5YmYtNGJmNC05NWY1LWEzNTEyN2Q1OTU4Yg.jpg",
	real_name: "ilias"
}

var players = [ilias, nathan, olivia, marcel, lisa, heather, peter, bradley, francis];
var fakerImages = [Faker.Image.animals(), Faker.Image.abstractImage(), Faker.Image.cats(), Faker.Image.avatar(),
 					Faker.Image.imageUrl(), Faker.Image.city(), Faker.Image.people(), Faker.Image.transport(), Faker.Image.technics()];

players.forEach(function(player, i) {
	player.codename = Faker.Name.firstName();

	player.avatar = fakerImages[i];
	player.tagline = Faker.Lorem.sentence();
})
var playerIds = [];


function seed(cb) {
	db.Admin.createSecure(testAdmin.username, testAdmin.password, testAdmin.avatar, testAdmin.email, function(err, admin) {
		if(err) {
			return console.log(err);
		}

		testDeathGame.admin = admin._id;
		hardcoreGame.admin = admin._id;
		db.Game.create(hardcoreGame, function(err, game) {
			if(err) {
				return console.log(err);
			}
			console.log("hardcoreGame CREATED");
		});

		db.Game.create(testDeathGame, function(err, game) {
			if(err) {
				return console.log(err);
			}

			players.forEach(function(player) {
				db.Assassin.createSecure(player.codename, player.password, player.avatar, player.real_photo, player.tagline, game._id, player.real_name, function(err, assassin) {
					if(err) {
						return console.log(err);
					}
					playerIds.push(assassin._id);

					if(playerIds.length === players.length) {
						game.players = playerIds;
						game.save(function(err, savedGame) {
							if(err) {
								return console.log(err);	
							}
							console.log("SAVED GAME", savedGame);
							cb();
						});
					}	
				});

			})
			
		});
	})

}

function findAssassins() {
	db.Assassin.find({}, function(err, assassins) {
		if(err) {
			return console.log(err);
		}
		console.log(assassins);
	});
}

seed(findAssassins);





















