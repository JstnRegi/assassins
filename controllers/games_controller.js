var express = require('express'),
    Game = require('./../models').Game;

module.exports.create = function(req, res) {
	console.log("exports.create", req.body);
	var game = req.body;
	Game.create(game, function(err, game) {
		if (err) {
			console.log(err);
			res.status(500).json({err: err})
		} else {
			res.status(200).json({
				status: "Game creation successful",
				data: game
			});
		}
	})
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