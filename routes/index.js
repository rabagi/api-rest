'use strict'

const express = require('express')
const productoCtrl = require('../controllers/producto')
const api = express.Router()


api.get('/producto', productoCtrl.getProducts)
api.get('/producto/:id', productoCtrl.getProduct)
api.post('/producto', productoCtrl.saveProduct)
api.put('/producto/:id', productoCtrl.updateProduct)
api.delete('/producto/:id', productoCtrl.deleteProduct)

module.exports = api