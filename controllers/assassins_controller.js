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
				Assassin.createSecure(assassin.codename, assassin.password, assassin.avatar, assassin.real_photo, assassin.tagline, game, function(err, assassin) {
					if(err) {
						console.log(err);
						res.status(500).json({err: "Another assassin has already taken that codename.",
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
			} else {
				console.log("NO GAME FOUND WITH THAT COMBO");
				res.status(500).json({err: "You have entered the wrong key",
										cause: "key"});
			}
		}
		
		
	})
	
};

module.exports.login = function(req, res) {
	
	var assassin = req.body;

	Assassin.authenticate(assassin.codename, assassin.password, function(err, assassin) {
		
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
			console.log("ASSASSIN FOUND", assassin);
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




