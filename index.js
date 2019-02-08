'use strict'

const express = require('express')
const bodyParser = require('body-parser')

const app = express()
const port = process.env.PORT || 3000

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


app.get('/api/producto', (req, res) => {
	//deprecated
	//res.send(200, {productos: []})

	///good
	res.status(200).send({productos: []})
})

app.get('/api/producto/:id', (req, res) => {

})

app.post('/api/producto', (req, res) => {
	console.log(req.body)
	res.status(200).send({message: 'El producto se ha recibido'})
})

app.put('/api/producto/:id', (req, res) => {

})

app.delete('/api/producto/:id', (req, res) => {

})

app.listen(port, ()=> {
	console.log(`Api-Res en http://localhost:${port}`)
})   