'use strict'

const mongoose = require('mongoose')
const Usuario = require('../modelos/usuario')
const service = require('../services')

function singUp (req, res){
	const usuario = new Usuario({
		email: req.body.email,
		displayName: req.body.displayName,
	})

	usuario.save((err) => {
		if (err) res.status(500).send({ message: `Error al crear usuario ${err}`})

		return res.status(200).send({ token: service.createToken(user)})
	})
}

function signIn (req, res){

}

module.exports = {
	singUp,
	signIn
}