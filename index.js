'use strict'

const mongoose = require('mongoose')
const app = require('./app')
const config = require('./config')

mongoose.connect(config.db, { useNewUrlParser: true }, (err, res) => {
	if(err) {
		return console.log(`Error al conectar la bd: ${err}`)
	}
	console.log('conexion establecida...')
	
	app.listen(config.port, ()=> {
		console.log(`Api-Res en http://localhost:${config.port}`)
	})   
})