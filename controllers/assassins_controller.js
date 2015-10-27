var express = require('express'),
	Game = require('./../models').Game;
    Assassin = require('./../models').Assassin;


// signup, assassins#create
module.exports.register = function (req, res) {
	console.log(req.body);
	console.log("params", req.params);
	var gameTitle = req.params.gameTitle;
	var assassin = req.body;
	Game.findOne({title: gameTitle, key: assassin.key},function(err, game) {
		if(err) {
			return console.log(err);
		} else {
			if(game !== null) {
				
				var players = game.players;
				var gameCodenames = [];

				Assassin.find({_id: { $in: players}
					}, function(err, assassins) {
					if (err) {
						return console.log(err);
					}
					
					//loop through assassins pushing in their codenames to
					//the game codenames
					assassins.forEach(function(assassin) {
						gameCodenames.push(assassin.codename.toLowerCase());
					});

					//declare a boolean if the codename is already or not
					var codenameTaken = false;

					console.log("Codenames taken for game " + game.title + ":",
										gameCodenames);

					//change codenameTaken to true if any element matches the codename registering
					gameCodenames.forEach(function(codename) {
						if(codename === assassin.codename) {
							codenameTaken = true;
						}
					});

					if(codenameTaken) {
						res.status(500).json({err: "Another assassin has already taken that codename.",
													cause: "codename"});
					} else {
						Assassin.createSecure(assassin.codename, assassin.password, assassin.avatar, assassin.real_photo, assassin.tagline, game._id, function(err, assassin) {
							if(err) {
								console.log(err);
								res.status(500).json({err: "Internal server error.",
														cause: "codename"});
							} else {
								game.players.push(assassin._id);
								game.save(function(err, game) {
									if(err) {
										return console.log(err);
									} else {
										console.log(game.players);
										req.assassinLogin(assassin);
										res.status(200).json({
											status: "Registration successful",
											data: assassin
										});
									}
								})
								
							}
						});		
					}	

				});

			} else {
				console.log("NO GAME FOUND WITH THAT COMBO");
				res.status(500).json({err: "You have entered the wrong key",
										cause: "key"});
			}
		}
		
		
	})
	
};

module.exports.login = function(req, res) {

	console.log("login hit");
	
	var assassin = req.body;

	
		Game.findOne({title: assassin.title}, function(err, game) {
			if(err) {
				res.status(500).json({err: "Can't find game.", cause: "game"});
			} else {
				
				if(game === null) {
					return res.status(500).json({err: "Can't find game.", cause: "game"});
				}

				var playerNames = [];

				Assassin.find({ _id: { $in: game.players}
						}, function(err, assassins) {
						if (err) {
							res.status(500).json({err: err});
							console.log(err);
						} else {
							assassins.forEach(function(currentAssassin) {
								playerNames.push(currentAssassin.codename);
							});

							var playerInGame = false;

							playerNames.forEach(function(playerName) {
								if(playerName === assassin.codename) {
									playerInGame = true;
								}
							});

							if(playerInGame) {
								Assassin.authenticate(assassin.codename, assassin.password, game, function(err, assassin) {
									if(err) {
										console.log(err);
										if (err === "Can't find assassin with that codename.") {
											res.status(500).json({err: err, cause: "codename"});
										} else {
											res.status(500).json({err: err, cause: "password"});
										}
									} else {
										req.assassinLogin(assassin);
										res.status(200).json({
											status: "Login successful",
											data: assassin
										});
									};
								})

							} else {
								res.status(500).json({
											err: "Codename not found in game.",
											cause: "no match"
										});
							}
						}
					}
				)
			}
		})
	
};

module.exports.currentAssassin = function(req, res) {
	console.log("module exports", req.body);
	var assassin = req.body;

	req.currentAssassin(function(err, assassin) {
		if(err) {
			console.log(err);
			res.status(500).json({err: err});
		}
		else {
			if(assassin && assassin.codename) {
				res.status(200).json({
					status: "Assassin logged in",
					data: assassin
				});
			} else {
				res.status(200).json({
					status: "No assassin is logged in",
					data: null
				});
			}
		}
	})
};

module.exports.gameAssassins = function(req, res) {

	console.log("module export gameAssassins body",req.body);
	console.log("module export gameAssassins params",req.params);

	var game = req.params;

	Game.findOne(game, function(err, game) {
		if(err) {
			console.log(err);
			res.status(500).json({err: err});
		} else {
			var playerIds = game.players;
			
			Assassin.find({ _id: { $in: playerIds}
					}, function(err, assassins) {
					if (err) {
						res.status(500).json({err: err});
						console.log(err);
					} else {
						res.status(200).json({
							status: "Retrieved players",
							data: assassins
						})
					}
				}
			)
		}
	})
};









