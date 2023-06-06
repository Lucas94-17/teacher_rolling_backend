const mongoose = require("mongoose")

const { model, Schema } = mongoose

//! Creamos la estructura de un tipo de documento (users)
const userSchema = new Schema({
	id: String,
	name: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "guest"],
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	userName: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		// probar
		/* match: [
			/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
			"Please fill a valid email address",
		], */
	},
})

//! Como primer parametro, va el nombre de la coleccion
module.exports = model("Users", userSchema)
