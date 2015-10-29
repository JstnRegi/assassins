var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');

var AssassinSchema = new Schema ({
	codename: {
		type: String,
		required: true
	},
	tagline: {
		type: String,
		required: true
	}, 
	passwordDigest: {
		type: String,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	},
	avatar: {
		type: String,
		default: "http://intranet.atomos.com/Marketing/Image%20Library/atomos-manga-characters/ninja/ninja-shadow.png"
	},
	real_photo: {
		type: String,
		required: true
	},
	killer: {
		type: String
	},
	game: {
		type: String
	},
	kill_reports: {
		type: Number,
		default: 0
	},
	deathPoints: {
		type: Number,
		default: 0
	},
	is_alive: {
		type: Boolean,
		default: true
	},
	died_on: {
		type: Date
	},
	kills: [],
	target: {
		type: String
	},
	kill_submissions: [], //stretch
	posts: []
});

AssassinSchema.statics.createSecure = function(codename, password, avatar, real_photo, tagline, game,  cb) {
	// _this references our schema. Not to be confused with the primitive value 'this' later on during the function
	var _this = this;
	bcrypt.genSalt(function (err, salt) {
		//hash the password with salt
		bcrypt.hash(password, salt, function(err, hash) {
			var assassin = {
				codename: codename,
				passwordDigest: hash,
				avatar: avatar,
				real_photo: real_photo,
				tagline: tagline,
				game: game,
				createdAt: Date.now() 
			};
			_this.create(assassin, cb);
		});
	});
};

AssassinSchema.statics.authenticate = function(codename, password, game, cb) {
    this.findOne({codename: codename, game: game._id}, function(err, assassin) {
    	if(err) {
    		return console.log(err);
    	}
        if(assassin === null) {
            cb('Can\'t find assassin with that codename in game: ' + game.title, null);
        } else if(assassin.checkPassword(password)) {
            cb(null, assassin);
        } else {
            cb('Password incorrect', assassin)
        }
    });
};

AssassinSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordDigest);
};

AssassinSchema.methods.died = function(killer) {

	var currentAssassin = this;
	var targetPassing = currentAssassin.target;
	var theKiller = killer;
	
	//set the assassin that died to dead
	currentAssassin.is_alive = false;
	currentAssassin.target = null;


	currentAssassin.save(function(err, assassin) {
		if(err) {
			return console.log(err);
		}

	currentAssassin = assassin;

	// 	console.log("SAVED DEAD ASSASSIN", assassin);

		Assassin.findOne(theKiller, function(err, killerAssassin) {
	    	if(err) {
	    		return console.log(err);
	    	}

	    	console.log(killerAssassin);
	    	killerAssassin.target = targetPassing;
	    	killerAssassin.kills.push(currentAssassin);
	    	killerAssassin.save(function(err, savedKiller) {
	    		if(err) {
	    			return console.log(err);
	    		}
	    		console.log("SAVED KILLER", savedKiller);
	    	});
	    });
	});  
};

AssassinSchema.methods.revokeKill = function(assassinTarget, cb) {

	var currentAssassin = this;
	var targetPassing = currentAssassin.target;
	var target = assassinTarget;

	target.deathPoints -= 1;
	currentAssassin.kill_reports -= 1;

	target.save(function(err, savedTarget) {
		if(err) {
			return console.log(err);
		}
		currentAssassin.save(function(err, savedCurrAssassin) {
			if(err) {
				return console.log(err);
			}
			console.log("SAVED CURRENT ASSASSIN", savedCurrAssassin);
			
			cb(savedCurrAssassin);

		})

	});
};



var Assassin = mongoose.model('Assassin', AssassinSchema);

module.exports = Assassin;




