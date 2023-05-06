const mongoose = require('mongoose');
const User = mongoose.model('user');
const Product = require('./productSchema')

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

async function boot() {
	await ensureAdminExists();
	if (await Product.exists({})) {
		console.log("A termékek már léteznek");
		return;
	}
	for (let i = 0; i < 20; i++) {
		const product = new Product({
			name: `Teszt termék${i}`,
			price: Math.floor(500+Math.random()*500),
			description: `Teszt leirás${i}`
		});
		await product.save();
	}
	console.log("Termékek sikeresen létrehozva!");
}

module.exports = boot;
