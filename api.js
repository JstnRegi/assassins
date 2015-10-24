var express = require('express');	
var	api = express.Router();
var adminsCtrl = require('./controllers/admins_controller.js');

// API ROUTES

//admins
api.post('/api/admin/register', adminsCtrl.register);
api.post('/api/admin/login', adminsCtrl.login);
api.get('/api/admin/logout', adminsCtrl.logout);

module.exports = api;