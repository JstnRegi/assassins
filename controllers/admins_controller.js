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
			req.adminLogin(admin);
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
			req.adminLogin(admin);
			res.status(200).json({
				status: "Login successful",
				data: admin
			});
		}
	});
};

module.exports.currentAdmin = function(req, res) {
	
	req.currentAdmin(function(err, admin) {
		if(err) {
			console.log(err);
			res.status(500).json({err: err});
		}
		else {
			if(admin && admin.username) {
				console.log(admin.username + " is logged in");
				res.status(200).json({
					status: "Admin logged in",
					data: admin
				});
			} else {
				res.status(200).json({
					status: "No admin is logged in",
					data: null
				});
			}
		}
	});
};

// signout, sessions#destroy
module.exports.logout = function (req, res) {
  req.logout();
  res.status(200).json({status: 'Bye!'});
};




