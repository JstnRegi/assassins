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
						res.status(500).json({err: err});
						console.log(err);
					} else {

						var assassinTargets = [];

						assassins.forEach(function(assassin) {
							assassinTargets.push(assassin);
						})

						var shuffledCalled = 0;
						function shuffle(assassinTargets){
						    for(var j, x, i = assassinTargets.length; i; j = Math.floor(Math.random() * i), x = assassinTargets[--i], assassinTargets[i] = assassinTargets[j], assassinTargets[j] = x);
				
						    return assassinTargets;
						}

						var shuffledAssassins = shuffle(assassinTargets);

						console.log(shuffledAssassins);
						shuffledAssassins.forEach(function(assassin, i) {
							if((i < shuffledAssassins.length - 1) && (i !== 0)) {
								assassin.target = shuffledAssassins[i + 1].codename;
								assassin.killer = shuffledAssassins[i - 1].codename;
								console.log("ASSASSIN IF", assassin);	
							} 
							else if((i < shuffledAssassins.length - 1) && (i === 0)) {
								assassin.target = shuffledAssassins[i + 1].codename;
								// console.log("else if", shuffledAssassins[i + 1].codename); 
								assassin.killer = shuffledAssassins[shuffledAssassins.length - 1].codename;
							} else {
								assassin.killer = shuffledAssassins[i - 1].codename;
								assassin.target = shuffledAssassins[0].codename;
							}

							assassin.save(function(err, assassin) {
								if(err) {
									console.log(err);
									return res.status(500).json({err: err});
								}
							})
						});

						res.status(200).json({
							status: "Shuffled players players",
							data: shuffledAssassins
						})
					}
				}
			)
		}
	})
}

module.exports.gameStart = function(req, res) {
	var game = req.params;

	var gameUpdates = req.body;
	console.log(gameUpdates);
	gameUpdates.game_started = true;
	Game.findOneAndUpdate(game, gameUpdates, function(err, game) {
		if(err) {
			return constole.log(err);
		}

		console.log("game found!!", game);

	});
}











