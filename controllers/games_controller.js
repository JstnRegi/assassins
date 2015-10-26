var express = require('express'),
    Game = require('./../models').Game,
    Assassin = require('./../models').Assassin;

module.exports.create = function(req, res) {
	console.log("exports.create", req.body);
	var game = req.body;
	req.currentAdmin(function(err, admin) {
		if(err) {
			return console.log(err);
		}

		//set game admin to a reference id of currentAdmin
		//that created the game
		game.admin = admin._id;

		Game.create(game, function(err, game) {
			if (err) {
				console.log(err);
				res.status(500).json({err: err});
			} else {
				//push newly created game._id into the admins games
				admin.games.push(game._id);
				admin.save(function(err, admin) {
					if(err) {
						return console.log(err);
					} else {
						res.status(200).json({
							status: "Game creation successful",
							data: game
						});
					}
				});	
			}
		});
	});
}

module.exports.find = function(req, res) {
	
	if(!!req.body.title) {
		var game = req.body;
		console.log("game is req.body", req.body);
	} 

	if(!!req.params.title) {
		var game = req.params;
		console.log("game is req.params", req.params);
	}

	Game.findOne(game, function(err, game) {
		if (err) {
			console.log(err);
			res.status(500).json({err: err});
		} else {
			if (game !== null) {
				console.log('Game found!', game);
				res.status(200).json({
					status: "Game found!",
					data: game
				});
			} else {
				console.log("else debug", game);
				console.log("Game not found!");
				res.status(500).json({
					status: "Game not found",
					data: game
				});
			}
		}
	})
}

module.exports.findAdminGames = function(req, res) {
	console.log("exports.findAdminGames", req.params);
	var admin = req.params;
	Game.find(admin, function(err, game) {
		if (err) {
			console.log(err);
			res.status(500).json({
				status: "Trouble finding game",
				data: "Please retry"
			})
		} else {
			console.log(game);
			res.status(200).json({
				status: "Found admin game",
				data: game
			})
		}
	});
	
}

module.exports.assignTargets = function(req, res) {
	console.log("exports.assignTargets");
	console.log("req.params",req.params);

	var game = req.params;

	Game.findOne(game, function(err, game) {
		if(err) {
			console.log(err);
			// res.status(500).json({
			// 	status: "Trouble finding game",
			// 	data: "Please retry"
			// })
		} else {
			console.log("assignTargets game", game);
			var playerIds = game.players;

			Assassin.find({ _id: { $in: playerIds}
					}, function(err, assassins) {
					if (err) {
						// res.status(500).json({err: err});
						console.log(err);
					} else {
						// res.status(200).json({
						// 	status: "Retrieved players",
						// 	data: assassins
						// })
						var assassinIds = [];

						assassins.forEach(function(assassin) {
							assassinIds.push(assassin._id);
						})

						function shuffle(assassinIds){
						    for(var j, x, i = assassinIds.length; i; j = Math.floor(Math.random() * i), x = assassinIds[--i], assassinIds[i] = assassinIds[j], assassinIds[j] = x);
						    return assassinIds;
						}

						console.log("assignTargets assassin find", shuffle(assassinIds));

						var shuffledAssassins = shuffle(assassinIds);

						res.status(200).json({
							status: "Shuffled players players",
							data: shuffledAssassins
						})
					}
				}
			)

			// res.status(200).json({
			// 	status: "Found game",
			// 	data: game
			// })
		}
	})
}











