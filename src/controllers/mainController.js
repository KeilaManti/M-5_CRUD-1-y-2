const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let productosOfertas = products.filter((product) => {
			return product.discount > 0;
		});
		let ultimaVisita = products.filter((producto) => {
			return producto.discount == 0;
		});

		res.render('index',{ productos: productosOfertas, visita: ultimaVisita });
	},
	search: (req, res) => {
		// Do the magic
	},
};

module.exports = controller;
