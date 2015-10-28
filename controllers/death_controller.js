var express = require('express'),
	Game = require('./../models').Game;
    Assassin = require('./../models').Assassin;

module.exports.reportKill = function (req, res) {
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

							if(player.deathPoints === 2) {
								player.is_alive = false;
							}

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

module.exports.reportDeath = function(req, res) {
	console.log("REPORT DEATH");

	req.currentAssassin(function(err, currentAssassin) {
		if(err) {
			 console.log(err);
			return res.status(500).json({err: err})
		}

		console.log("FOUND CURRENT ASSASSIN");


		var game = currentAssassin.game;
		
		Game.findOne({_id: game}, function(err, game) {
			if(err) {
				return res.status(500).json({err: "Can't find game",
													cause: "game"});
			}

			console.log("FOUND GAME", game);

			Assassin.find({_id: { $in: game.players}
					}, function(err, players) {
					if (err) {
						return console.log(err);
					}

					console.log("FOUND PLAYERS", players);

					//checks to see if currentAssassins target conflict is resolved
					//before they can report their death
					function canDie() {
						players.forEach(function(player) {
							if(currentAssassin.target === player.codename) {
								//found target
								if(player.deathPoints > 0) {
									console.log("TARGET CONFLICT MUST FIRST BE RESOLVED");
									return res.status(500).json({err: "Conflict with target must first be resolved. They must confirm their death or you revoke your reported kill."})
								}
							}
						})
						//returns true if above conflict doesnt trigger
						return true;
					}
					
					if(canDie()) {
						console.log("player can die");
						players.forEach(function(player) {
							if(currentAssassin.killer === player.codename) {
								//found killer
								currentAssassin.deathPoints += 1;
								if(currentAssassin.deathPoints === 2) {
									currentAssassin.died();
								}
									return res.status(200).json({
													status: "Added Kill",
													data: currentAssassin
												});
								}
							})
					}
			})

		});

	})
}












