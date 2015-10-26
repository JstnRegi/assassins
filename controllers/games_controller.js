var express = require('express'),
    Game = require('./../models').Game;

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
	console.log("exports.find", req.body);
	var game = req.body;
	console.log("req.body", game);
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
	Game.find(admin, function(err, games) {
		if (err) {
			console.log(err);
			res.status(500).json({
				status: "Trouble finding games",
				data: "Please retry"
			})
		} else {
			console.log(games);
			res.status(200).json({
				status: "Found admin games",
				data: games
			})
		}
	})
	
}





