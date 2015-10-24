var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var GameSchema = new Schema ({
	title: {
		type: String,
		required: true,
		unique: true
	},
	picture: {
		type: String,
		default: "http://www.wall321.com/thumbnails/detail/20120228/assassin%20assassins%20creed%20futuristic%20grim%20artwork%201280x1024%20wallpaper_www.wall321.com_59.jpg",
		unique: true
	},
	end_date: {
		type: Date,
		required: true,
	},
	additional_rules: {
		type: String
	},
	key: {
		type: String,
		required: true,
		unique: true
	},
	game_is_over: {
		type: Boolean
	},
	posts: [],
	players: []

});

var Game = mongoose.model('Game', GameSchema);

module.exports = Game;