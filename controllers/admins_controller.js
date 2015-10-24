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
			req.login(admin);
			res.status(200).json({
				status: "Registration successful",
				data: admin
			});
		}
	});
};

module.exports.login = function(req, res) {
	var adminInfo = req.body;
	Admin.authenticate(adminInfo.username, adminInfo.password, function(err, admin) {
		if(err) {
			console.log(err);
			res.status(500).json({err: err});
		}
		else {
			req.login(admin);
			req.currentAdmin(function(err, admin) {
				if (err) {
					return console.log(err);
				}
				console.log(admin);
			});
			res.status(200).json({
				status: "Login successful",
				data: admin
			});
		}
	});
};

// signout, sessions#destroy
module.exports.logout = function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
};




