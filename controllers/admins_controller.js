var express = require('express'),
    Admin = require('./../models').Admin;

// signup, admins#create
module.exports.register = function (req, res) {
	console.log(req.body);
	var admin = req.body;
	Admin.createSecure(admin.username, admin.password, admin.avatar, admin.email, function(err, admin) {
		if(err) {
			console.log(err);
			res.status(500).json({err: err});
		}
		else {
			res.status(200).json({
				status: "Registration successful",
				data: admin
			});
		}
	});
};