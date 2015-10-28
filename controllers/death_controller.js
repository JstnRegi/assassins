var express = require('express'),
	Game = require('./../models').Game;
    Assassin = require('./../models').Assassin;

module.exports.killed = function (req, res) {
	console.log("KILLED METHOD");
	
	req.currentAssassin(function(err, assassin) {
		if(err) {
			return console.log(err);
		}

		console.log("FOUND CURRENT ASSASSIN");

		var game = assassin.game;
		
		Game.findOne({_id: game}, function(err, game) {
			if(err) {
				return res.status(500).json({err: "Can't find game",
													cause: "game"});
			}

			console.log("FOUND GAME");

			Assassin.find({_id: { $in: game.players}
					}, function(err, players) {
					if (err) {
						return console.log(err);
					}

					console.log("FOUND PLAYERS IN GAME");

					players.forEach(function(player) {
						if(player.codename === assassin.target) {
							console.log("FOUND TARGET");
							if(assassin.kill_reports > assassin.kills.length) {
								console.log("ALREADY SUBMITTED KILL");
								return res.status(500).json({err: "You have already reported the kill."})
							}
							assassin.kill_reports += 1;
							assassin.save(function(err, savedAssassin) {
								if(err) {
									return console.log(err);
								}
								console.log("SAVED ASSASSIN", savedAssassin);
							});
							player.deathPoints += 1;
							player.save(function(err, player) {
								if(err) {
									return console.log(err);
								}
								console.log(player);

								return res.status(200).json({
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