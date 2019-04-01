'use strict'

const mongoose = require('mongoose')
const Usuario = require('../modelos/usuario')
const service = require('../services')

function signUp (req, res){
	const usuario = new Usuario({
		email: req.body.email,
		displayName: req.body.displayName,
		password: req.body.password
	})

	usuario.save((err) => {
		if (err) return res.status(500).send({ message: `Error al crear usuario ${err}`})

		return res.status(200).send({ token: service.createToken(usuario)})
	})
}

function signIn (req, res){
	Usuario.find({ email: req.body.email }, (err, user) => {
		if(err) return res.status(500).send({ message: err})
		if(!user) return res.status(404).send({ message: 'No existe usuario'})

		req.user = Usuario
		res.status(200).send({
			message: 'Te has logueado correctamente',
			token: service.createToken(user),
		})

	})
} 

module.exports = {
	signUp,
	signIn
}