'use strict'

const express = require('express')
const productoCtrl = require('../controllers/producto')
const userCtrl = require('../controllers/user')
const auth = require('../middlewares/auth')
const api = express.Router()


api.get('/producto', productoCtrl.getProducts)
api.get('/producto/:id', productoCtrl.getProduct)
api.post('/producto', productoCtrl.saveProduct)
api.put('/producto/:id', productoCtrl.updateProduct)
api.delete('/producto/:id', productoCtrl.deleteProduct)
api.post('/signup', userCtrl.signUp)
api.post('/signin', userCtrl.signIn)
api.get('/private', auth, function(req, res) {
	res.status(200).send({ message: 'Tienes acceso'})
})

module.exports = api