const {
	param,
	check,
	query,
	validationResult,
} = require("express-validator")

const validateCreate = [
	check("name")
		.exists()
		.notEmpty()
		.withMessage("Escribí algo otario"),
	check("email")
		.exists()
		.notEmpty()
		.isEmail()
		.withMessage("Debe ser un email"),
	check("role")
		.exists()
		.notEmpty()
		// falta funcion q solo permita 2 opciones
		.withMessage("Es necesario que sea guest o admin"),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403).send(
				err.errors.map(e => {
					return {
						field: e.path,
						msg: e.msg,
					}
				})
			)
		}
	},
]

const validateDelete = [
	param("id").exists().isString(),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403)
			res.send({ errors: err.array() })
		}
	},
]

const validateGetWithQueryStrings = [
	query("size").exists().isString(),
	query("page").exists().isString(),
	(req, res, next) => {
		try {
			validationResult(req).throw()
			return next()
		} catch (err) {
			res.status(403)
			res.send({ errors: err.array() })
		}
	},
]

module.exports = {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
}
