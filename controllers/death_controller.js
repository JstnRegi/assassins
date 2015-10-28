var express = require('express'),
    Assassin = require('./../models').Assassin;

module.exports.killed = function (req, res) {
	console.log("")
	req.currentAssassin(function(err, assassin) {
		if(err) {
			return console.log(err);
		}

		console.log(assassin);
	});
};