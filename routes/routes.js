const express = require("express")
const router = express.Router()

const { createUser } = require("../controllers/User")
const { validateCreate } = require("../validators/user")

router.get("/", (req, res) => {
	res.status(200).send("It works NOW!")
})

router.post("/createUser", validateCreate, createUser)

module.exports = router
