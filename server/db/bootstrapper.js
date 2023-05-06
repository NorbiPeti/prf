const mongoose = require('mongoose');
const User = mongoose.model('user');

async function ensureAdminExists() {
	try {
		const admin = await User.findOne({ accessLevel: 3 });
		if (admin) {
			console.log('Az admin felhasználó már megtalálható az adatbázisban!');
		} else {
			// Ha nincs, akkor létrehozunk egy újat
			const newAdmin = new User({
				username: 'admin',
				password: 'admin123',
				accessLevel: 3,
				birthdate: new Date(),
			});
			await newAdmin.save();
			console.log('Az admin felhasználó sikeresen létrehozva!');
		}
	} catch (error) {
		console.error('Hiba történt az admin ellenőrzése vagy létrehozása során: ', error);
	}
}

module.exports = ensureAdminExists;
