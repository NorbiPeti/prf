const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		/* támogatott típusok: String, Number, Date, Buffer, Boolean, Mixed, ObjectId,
			Array, Decimal128, Map, Schema - az utolsóval valósítható meg az egymásba ágyazás, tehát hogy az egyik dokumentum
			egy másikat tartalmazzon */
		required: true,
		unique : true
	},
	password: {
		type: String,
		required: true,
	},
	accessLevel: {
		type: Number,
		required: true,
		default: 1,
	},
	birthdate: {
		type: Date,
		required: true,
	},
});

userSchema.pre('save', function(next) {
	const user = this;
	if(user.isModified('password')) {
		bcrypt.genSalt(10, function(err, salt) {
			if(err) {
				console.log('hiba a salt generalasa soran');
				return next(err);
			}
			bcrypt.hash(user.password, salt, function(error, hash) {
				if(error) {
					console.log('hiba a hasheles soran');
					return next(error);
				}
				user.password = hash;
				return next();
			})
		})
	} else {
		return next();
	}
});

userSchema.methods.comparePasswords = function(password, nx) {
	bcrypt.compare(password, this.password, function(err, isMatch) {
		nx(err, isMatch);
	});
};

const User = mongoose.model('user', userSchema);

module.exports = User;
