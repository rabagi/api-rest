'use strict'

const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const UsuarioSchema = new Schema({
	email: { type: String, unique: true, lowercase: true},
	displayName: String,
	avatar: String,
	password: { type: String, select: false},
	signupDate: { type: Date, default: Date.now()},
	lastLogin: Date
})

usuarioSchema.pre('save', (next) => {
	let user = this
	if (!user.isModified('password')) return next()

	bcrypt.genSalt(10, (err, salt) => {
		if (err) return next()

		bcrypt.hash(user.password, salt, null, (err, hash) => {
			if (err) return next(err)

			user.password = hash
			next()
		})
	})
})

usuarioSchema.methods.gravatar = function () {
	if(!this.email) return `https://gravatar.com/avatar/?s=200ed=retro`

	const md5 = crypto.createHash('md5').update(this.email).digest('hex')
	return `https://gravatar.com/avatar/${md5}?s=200ed=retro`
}

module.exports = mongoose.model('Usuario', UsuarioSchema)