const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Product = mongoose.model('product');

const passport = require('passport');

function getProductData(product) {
	return {name: product.name, price: product.price, description: product.description, id: product.id};
}

async function getProduct(req, res, next) {
	try {
		const product = await Product.findById(req.params.id);
		if (product == null) {
			return res.status(404).json({ message: 'A termék nem található' });
		}
		res.product = product;
		next();
	} catch (error) {
		return res.status(500).json({ message: error.message });
	}
}

// GET /products - összes termék lekérdezése
router.get('/', async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	try {
		const products = await Product.find();
		res.status(200).json(products);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

// GET /products/:id - egy termék lekérdezése az id alapján
router.get('/:id', getProduct, (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	res.json(res.product);
});

// POST /products - új termék létrehozása
router.post('/', async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	const product = new Product({
		name: req.body.name,
		price: req.body.price,
		description: req.body.description,
		id: req.body.id,
	});

	try {
		const newProduct = await product.save();
		res.status(201).json(newProduct);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// PATCH /products/:id - egy termék frissítése az id alapján
router.patch('/:id', getProduct, async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	if (req.body.name != null) {
		res.product.name = req.body.name;
	}
	if (req.body.price != null) {
		res.product.price = req.body.price;
	}
	if (req.body.description != null) {
		res.product.description = req.body.description;
	}
	if (req.body.id != null) {
		res.product.id = req.body.id;
	}

	try {
		const updatedProduct = await res.product.save();
		res.json(updatedProduct);
	} catch (error) {
		res.status(400).json({ message: error.message });
	}
});

// DELETE /products/:id - egy termék törlése az id alapján
router.delete('/:id', getProduct, async (req, res) => {
	if (!req.isAuthenticated()) {
		return res.status(403).json({ message: "Unauthenticated" });
	}
	try {
		await res.product.remove();
		res.json({ message: 'A termék sikeresen törölve!' });
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

module.exports = router
