var express = require('express'),
    Game = require('./../models').Game;

module.exports.create = function(req, res) {
	console.log("games_controller.js", req.body);
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
