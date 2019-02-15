'use strict'

const Producto = require('../modelos/producto')

function getProduct (req, res){
	let id = req.params.id
	Producto.findById(id, (err, prod) => {
		if(err) return res.status(500).send({ message: `Error al realizar peticion ${err}`})
		if(!prod) return res.status(404).send({ message: `El producto no existe`})

		res.status(200).send({ producto: prod})
	})
}

function getProducts (req, res){
	//deprecated
	//res.send(200, {productos: []})
	Producto.find({}, (err, prod) => {
		if(err) return res.status(500).send({ message: `Error al realizar peticion ${err}`})
		if(!prod) return res.status(404).send({ message: `No existen productos`})

		///good
		res.status(200).send({prod})
	})
}

function saveProduct (req, res){
	console.log('Post /api/producto')
	console.log(req.body)

	let producto = new Producto()
	producto.name = req.body.name
	producto.picture = req.body.picture
	producto.price = req.body.price
	producto.category = req.body.category
	producto.description = req.body.description

	producto.save((err, productoStored) => {
		if (err) res.status(500).send({ message: `Error al guardar en bd: ${err}`})

		res.status(200).send({ producto: productoStored})
	})
}

function updateProduct (req, res){
	let id = req.params.id
	let update = req.body 
	Producto.findByIdAndUpdate(id, update, (err, productoUpdated) => {
		if (err) return res.status(500).send({ message: `Error al realizar peticion ${err}`})

		res.status(200).send({ producto: productoUpdated})		
	})
}

function deleteProduct (req, res){
	let id = req.params.id
	Producto.findById(id, (err, prod) => {
		if (err) return res.status(500).send({ message: `Error al borrar producto ${err}`})

		prod.remove(err => {
			if (err) return res.status(500).send({ message: `Error al borrar producto ${err}`})

			res.status(200).send({ message: `El producto ha sido eliminado`})
		})
	})
}

module.exports = {
	getProduct,
	getProducts,
	saveProduct,
	updateProduct,
	deleteProduct,
} 