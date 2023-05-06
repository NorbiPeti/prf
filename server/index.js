const express = require('express');
const mongoose = require('mongoose');

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const expressSession = require('express-session');

const app = express();

mongoose.connect(`mongodb://${process.env.DBHOST ?? 'localhost'}:27017/cheesecrescent`, {
	useNewUrlParser: true,
	useUnifiedTopology: true, //ezek a paraméterek azért kellenek, hogy kompatibilisek legyünk akár régebbi Mongo verziókkal is
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function () {
	console.log('Connected to MongoDB successfully!');
});

const User = require('./db/userSchema');

require('./db/bootstrapper')();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const {mongo} = require("mongoose");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());


passport.use('local', new LocalStrategy({}, function (username, password, done) {
	User.findOne({ username: username }, function (err, user) {
		if (err) return done('Hiba lekeres soran', null);
		if (!user) return done('Nincs ilyen felhasználónév', null);
		user.comparePasswords(password, function (error, isMatch) {
			if (error) return done(error, false);
			if (!isMatch) return done('Hibas jelszo', false);
			return done(null, user);
		});
	});
}));


passport.serializeUser(function (user, done) {
	if (!user) return done('nincs megadva beléptethető felhasználó', null);
	return done(null, user);
});

passport.deserializeUser(function (user, done) {
	if (!user) return done("nincs user akit kiléptethetnénk", null);
	return done(null, user);
});

app.use(expressSession({ secret: 'prf2021lassananodejsvegereerunk', resave: true, saveUninitialized: false }));
app.use(passport.initialize({}));
app.use(passport.session({}));

app.use((req, res, next) => {
	console.log('A middleware futott!')
	next()
});

app.use('/api/users', require('./usersRouter'))

app.use('', express.static('public'))

app.listen(3000, () => {
	console.log('Server is running on http://localhost:3000')
})
