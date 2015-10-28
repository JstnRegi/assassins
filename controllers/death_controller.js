var express = require('express'),
	Game = require('./../models').Game;
    Assassin = require('./../models').Assassin;

module.exports.reportKill = function (req, res) {
	
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

			console.log("FOUND GAME");

			Assassin.find({_id: { $in: game.players}
					}, function(err, players) {
					if (err) {
						return console.log(err);
					}

					players.forEach(function(player) {
						if(player.codename === assassin.target) {
							console.log("FOUND TARGET");
							if(assassin.kill_reports > assassin.kills.length) {
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
	console.log("TRIED TO REPORT DEATH");

	req.currentAssassin(function(err, currentAssassin) {
		if(err) {
			 console.log(err);
			return res.status(500).json({err: err})
		}

		var game = currentAssassin.game;
		
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

					//checks to see if currentAssassins target conflict is resolved
					//before they can report their death
					function canDie() {
						console.log("function can die ran");
						var canTheyDie;
						players.forEach(function(player) {
							console.log(currentAssassin.target, player.codename);
							if(currentAssassin.target === player.codename) {
								console.log("TARGET ACQUIRED");
								//found target
								if(player.deathPoints > 0) {
									console.log("TARGET CONFLICT MUST FIRST BE RESOLVED");
									res.status(500).json({err: "Conflict with target must first be resolved. They must confirm their death or you revoke your reported kill."});
									canTheyDie = false;
								} else {
									//returns true if above conflict doesnt trigger
									console.log("function says can die!");
									canTheyDie = true;
								}
							}
						})

						return canTheyDie;
					}

					if(canDie()) {
						players.forEach(function(player) {
							if(currentAssassin.killer === player.codename) {
								//found killer
								currentAssassin.deathPoints += 1;
								if(currentAssassin.deathPoints === 2) {
									console.log("tried to kill player");
									currentAssassin.died(player);
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

module.exports.revokeKill = function(req, res){

	req.currentAssassin(function(err, currentAssassin) {
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
						if(player.codename === currentAssassin.target) {
							
							player.deathPoints -= 1;
							currentAssassin.kill_reports -= 1;
							player.save(function(err, player) {
								if(err) {
									return console.log(err);
								}
								console.log(player);

								currentAssassin.save(function(err, savedCurrentAssassin) {
									if(err) {
										return console.log(err);
									}
									console.log(savedCurrentAssassin);
								})

								return res.status(200).json({
												status: "Added Kill",
												data: savedCurrentAssassin;
											});
							});
						}
					})
			})
		});
	});
}












