const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
	name: {
		type: String,
		/* támogatott típusok: String, Number, Date, Buffer, Boolean, Mixed, ObjectId,
			Array, Decimal128, Map, Schema - az utolsóval valósítható meg az egymásba ágyazás, tehát hogy az egyik dokumentum
			egy másikat tartalmazzon */
		required: true,
		unique : true
	},
	price: {
		type: Number,
		required: true,
		default: 1000,
	},
	description: {
		type: String,
		required: true,
	},
	id: {
		type: String,
	}
});

productSchema.pre('save', function(next) {
	const product = this;
	if(product.isModified('name')) {
		product.id = product.name.replaceAll(/[ !?$.,-]/g, '').toLowerCase();
	}
	return next();
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;
