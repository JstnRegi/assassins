var express = require('express');	
var	api = express.Router();
var adminsCtrl = require('./controllers/admins_controller.js');
var gamesCtrl = require('./controllers/games_controller.js');

// API ROUTES

//admins
api.post('/api/admin/register', adminsCtrl.register);
api.post('/api/admin/login', adminsCtrl.login);
api.get('/api/admin/logout', adminsCtrl.logout);
api.get('/api/admin', adminsCtrl.currentAdmin);

//games
api.post('/api/games', gamesCtrl.create);

module.exports = api;