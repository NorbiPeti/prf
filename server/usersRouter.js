const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const User = mongoose.model('user');

const passport = require('passport');

function getUserData(user) {
	return {username: user.username, accessLevel: user.accessLevel, birthdate: user.birthdate};
}

router.route('/login').post((req, res) => {
	console.log("Req body:", req.body);
	if (req.body.username && req.body.password) {
		passport.authenticate('local', {}, function (error, user) {
			if (error) return res.status(500).send({error: error});
			req.login(user, function (error) {
				if (error) return res.status(500).send(error);
				return res.status(200).send(getUserData(user));
			})
		})(req, res);
	} else {
		return res.status(400).send('Hibas keres, username es password kell');
	}
});

router.route('/logout').post((req, res) => {
	if (req.isAuthenticated()) {
		req.logout((err) => {
			if(err) {
				console.log('Hiba a kijelentkezés során');
				return res.status(500).send(err)
			}
			return res.status(200).json({status: 'OK'});
		});
	} else {
		return res.status(403).json({status: 'NOTOK'});
	}
});

router.route('/register').post(async (req, res) => {
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		accessLevel: 1,
		birthdate: req.body.birthdate,
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

router.route('/status').get((req, res) => {
	if (req.isAuthenticated()) {
		return res.status(200).send(getUserData(req.user));
	} else {
		return res.status(403).send({status: "NOTOK"});
	}
})

async function getUser(req, res, next) {
	try {
		const user = await User.findById(req.params.id);
		if (user == null) {
			return res.status(404).json({ message: 'A felhasználó nem található' });
		}
		res.user = user;
		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

// GET /users - összes felhasználó lekérdezése
router.get('/', async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	try {
		const users = await User.find();
		res.status(200).json(users);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET /users/:id - egy felhasználó lekérdezése az id alapján
router.get('/:id', getUser, (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	res.json(res.user);
});

// POST /users - új felhasználó létrehozása
router.post('/', async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	const user = new User({
		username: req.body.username,
		password: req.body.password,
		accessLevel: req.body.accessLevel,
		birthdate: req.body.birthdate,
	});

	try {
		const newUser = await user.save();
		res.status(201).json(newUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// PATCH /users/:id - egy felhasználó frissítése az id alapján
router.patch('/:id', getUser, async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	if (req.body.username != null) {
		res.user.username = req.body.username;
	}
	if (req.body.password != null) {
		res.user.password = req.body.password;
	}
	if (req.body.accessLevel != null) {
		res.user.accessLevel = req.body.accessLevel;
	}
	if (req.body.birthdate != null) {
		res.user.birthdate = req.body.birthdate;
	}

	try {
		const updatedUser = await res.user.save();
		res.json(updatedUser);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// DELETE /users/:id - egy felhasználó törlése az id alapján
router.delete('/:id', getUser, async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	try {
		await res.user.remove();
		res.json({ message: 'A felhasználó sikeresen törölve!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router
