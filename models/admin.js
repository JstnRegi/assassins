var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var AdminSchema = new Schema ({
	username: {
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
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
		type: String
		required: true
	},
	games: [],
	kill_submissions: [], //stretch
	kill_posts: [] //stretch
});

AdminSchema.statics.createSecure = function(username, password, cb) {
	// _this references our schema. Not to be confused with the primitive value 'this' later on during the function
	var _this = this;
	bcrypt.genSalt(function (err, salt) {
		//hash the password with salt
		bcrypt.hash(password, salt, function(err, hash) {
			var user = {
				'username': username,
				'passwordDigest': hash,
				 createdAt: Date.now() 
			};
			_this.create(user, cb);
		});
	});
};

AdminSchema.statics.authenticate = function(username, password, cb) {
    this.findOne({username: username}, function(err, user) {
        if(user === null) {
            cb('Can\'t find user with that username', null);
        } else if(user.checkPassword(password)) {
            cb(null, user);
        } else {
            cb('password incorrect', user)
        }
    });
};

AdminSchema.methods.checkPassword = function(password) {
    return bcrypt.compareSync(password, this.passwordDigest);
};

var Admin = mongoose.model('User', UserSchema);

module.exports = User;