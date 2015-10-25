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
						console.log(assassin);
						// req.login(assassin);
						res.status(200).json({
							status: "Registration successful",
							data: assassin
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




