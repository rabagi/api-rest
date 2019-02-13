'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

const Producto = require('./modelos/producto')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/producto', (req, res) => {
	//deprecated
	//res.send(200, {productos: []})

	Producto.find({}, (err, prod) => {
		if(err) return res.status(500).send({ message: `Error al realizar peticion ${err}`})
		if(!prod) return res.status(404).send({ message: `No existen productos`})

		///good
		res.status(200).send({prod})
	})
	
})

app.get('/api/producto/:id', (req, res) => {
	let id = req.params.id

	Producto.findById(id, (err, prod) => {
		if(err) return res.status(500).send({ message: `Error al realizar peticion ${err}`})
		if(!prod) return res.status(404).send({ message: `El producto no existe`})

		res.status(200).send({ producto: prod})
	})
})

app.post('/api/producto', (req, res) => {
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
})

app.put('/api/producto/:id', (req, res) => {

})

app.delete('/api/producto/:id', (req, res) => {

})

mongoose.connect('mongodb://localhost:27017/shop', { useNewUrlParser: true }, (err, res) => {
	if(err) {
		return console.log(`Error al conectar la bd: ${err}`)
	}

		
	console.log('conexion establecida...')
	
	app.listen(port, ()=> {
		console.log(`Api-Res en http://localhost:${port}`)
	})   
})