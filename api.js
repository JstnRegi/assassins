var express = require('express');	
var	api = express.Router();
var adminsCtrl = require('./controllers/admins_controller.js');

// API ROUTES

//admins
api.post('/api/admin/register', adminsCtrl.register);

module.exports = api;