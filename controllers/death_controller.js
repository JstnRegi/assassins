var express = require('express'),
	Game = require('./../models').Game;
    Assassin = require('./../models').Assassin;

module.exports.killed = function (req, res) {
	
	req.currentAssassin(function(err, assassin) {
		if(err) {
			return console.log(err);
		}

		var game = assassin.game;
		
		Game.findOne({_id: game}, function(err, game) {
			if(err) {
				return res.status(500).json({err: "Can't find game",
													cause: "game"});
			}

			Assassin.find({_id: { $in: game.players}
					}, function(err, players) {
					if (err) {
						return console.log(err);
					}

					players.forEach(function(player) {
						if(player.codename === assassin.target) {
							player.deathPoints += 1;
							player.save(function(err, assassin) {
								if(err) {
									return console.log(err);
								}
								console.log(assassin);

								res.status(200).json({
												status: "Added Kill",
												data: assassin
											});
							});
						}
					})
			})
		});
	});
};