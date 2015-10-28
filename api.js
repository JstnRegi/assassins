var express = require('express');	
var	api = express.Router();
var adminsCtrl = require('./controllers/admins_controller.js');
var gamesCtrl = require('./controllers/games_controller.js');
var assassinsCtrl = require('./controllers/assassins_controller.js');
var deathCtrl = require('./controllers/death_controller.js');

// API ROUTES

//admins
api.post('/api/admin/register', adminsCtrl.register);
api.post('/api/admin/login', adminsCtrl.login);
api.get('/api/admin/logout', adminsCtrl.logout);
api.get('/api/admin', adminsCtrl.currentAdmin);

//games
api.post('/api/game-search', gamesCtrl.find);
api.get('/api/games/:title', gamesCtrl.find);
api.post('/api/games', gamesCtrl.create);
api.get('/api/admin/:admin/games', gamesCtrl.findAdminGames);
api.get('/api/:title/assignTargets', gamesCtrl.assignTargets);
api.post('/api/:title/start', gamesCtrl.gameStart);

//assassins
api.post('/api/assassins/:gameTitle/register', assassinsCtrl.register);
api.post('/api/assassins/register', assassinsCtrl.register);
api.post('/api/assassin/login', assassinsCtrl.login);
api.get('/api/assassin', assassinsCtrl.currentAssassin);
api.get('/api/:game/assassins', assassinsCtrl.gameAssassins);
api.get('/api/assassin/logout', assassinsCtrl.logout);
api.get('/api/:game/:target/target', assassinsCtrl.target);

//death
api.post('/api/death/killed', deathCtrl.killed);

module.exports = api;