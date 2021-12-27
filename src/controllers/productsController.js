const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
const writeJSON = (dataBase) => {
	fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), JSON.stringify(dataBase), "utf-8")
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	index: (req, res) => {
		res.render('products',{ products });	
	},

	// Detail - Detail from one product
	detail: (req, res) => { 
		for(let i = 0; i < products.length; i++) {
			if (i+1 == req.params.id) {
				res.render("detail", {
					id: products[i].id,
					nombre: products[i].name,
					precio: products[i].price,
					descuento: products[i].discount,
					categoria: products[i].category,
					descripcion: products[i].description,
					imagen: products[i].image,
				});
			}
        }
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form');
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let ultimoId = 0;

		products.forEach(producto =>{
			if(producto.id > ultimoId){
				ultimoId = producto.id
			}
		})

		let nuevo_producto = {
			id: ultimoId + 1 ,
			name: req.body.name.trim(),
			price: req.body.price.trim(),
			discount: req.body.discount.trim(),
			category: req.body.category,
			description: req.body.description.trim(),
			image: "default-image.png"
		}

		products.push(nuevo_producto);
		writeJSON(products);

		res.redirect('/products');
	},

	// Update - Form to edit
	edit: (req, res) => {
		for(let i = 0; i < products.length; i++) {
			if (i+1 == req.params.id) {
				res.render("product-edit-form", {
					id: products[i].id,
					nombre: products[i].name,
					precio: products[i].price,
					descuento: products[i].discount,
					categoria: products[i].category,
					descripcion: products[i].description,
					imagen: products[i].image,
				});
			}
        }
	},
	// Update - Method to update
	update: (req, res) => {
		let {
			name ,
			price ,
			discount ,
			category ,
			description,
		} = req.body
		
		products.forEach(product => {
			if(product.id === +req.params.id) {
				product.name = name,
				product.price = price,
				product.discount = discount,
				product.category = category,
				product.description = description 
			}
		})
		
		writeJSON(products)
		res.redirect('/products')
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productoEliminar = products.filter((producto) => {
			return producto.id == req.params.id
		});

		products.pop(productoEliminar);
		writeJSON(products);

		res.redirect('/products');
	}
};

module.exports = controller;