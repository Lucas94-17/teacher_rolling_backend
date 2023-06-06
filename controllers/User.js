const uuid = require("uuid")
const bcrypt = require("bcrypt")

const UserModel = require("../models/User")

async function getUsers(res) {
	try {
		await UserModel.find().then(response => {
			const excludePassword = response.map(user => {
				const { id, name, lastName, userName, email, role } = user
				return { id, name, lastName, userName, email, role }
			})
			res.status(200).json(excludePassword)
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function getUsersPaginated(req, res) {
	const { size, page } = req.query

	const skip = size * page - size

	try {
		const data = await UserModel.find()
			.limit(size)
			.skip(skip)
			.then(response => {
				const excludePassword = response.map(user => {
					const { id, name, lastName, userName } = user
					return { id, name, lastName, userName }
				})
				return excludePassword
			})

		const count = await UserModel.countDocuments()

		res.status(200).json({
			data,
			total: count,
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

const createUser = async (req, res) => {
	const { name, userName, role, email, lastName, password } =
		req.body

	const salt = bcrypt.genSaltSync(10)
	const hash = await bcrypt.hash(password, salt)

	const data = new UserModel({
		name,
		userName,
		lastName,
		role,
		email,
		password: hash,
		id: uuid.v4(),
	})

	data.save()
	res.status(201).json({ ...req.body, success: true })
}

async function deleteUser(req, res) {
	try {
		const { id } = req.params

		UserModel.deleteOne({ id }).then(response => {
			if (response.deletedCount) {
				res.status(200).json({
					message: `El documento con ${id} fue borrado exitosamente.`,
				})
			} else {
				res.status(200).json({
					message: `No se ha encontrado el documento:  ${id}`,
				})
			}
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function updateUser(req, res) {
	try {
		const { id, name, email } = req.body

		await UserModel.findOneAndUpdate({ id }, { name, email }).then(
			response => {
				if (response) {
					res.status(200).json({
						message: `El documento con id ${response.id} fue editado exitosamente.`,
						data: response,
					})
				} else {
					res.status(200).json({
						message: `No se ha encontrado el documento.`,
					})
				}
			}
		)
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function readUser(req, res) {
	try {
		const { id } = req.params

		UserModel.findOne({ id }).then(response => {
			if (response) {
				res.status(200).json(response)
			} else {
				res.status(400).send("Cualca wey")
			}
		})
	} catch (error) {
		res.status(400).json({ message: error.message })
	}
}

async function readUsers(req, res) {
	if (Object.keys(req.query).length === 0) getUsers(res)
	else getUsersPaginated(req, res)
}

module.exports = {
	createUser,
	deleteUser,
	readUser,
	readUsers,
	updateUser,
}
