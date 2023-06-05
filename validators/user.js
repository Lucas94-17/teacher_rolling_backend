const { check, validationResult } = require("express-validator")

const validateCreate = [
	check("name")
		.exists()
		.notEmpty()
		.withMessage("Escribí algo otario"),
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

module.exports = { validateCreate }
