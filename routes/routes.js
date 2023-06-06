const express = require("express")
const router = express.Router()

const {
	createUser,
	updateUser,
	deleteUser,
	readUser,
	readUsers,
} = require("../controllers/User")

const {
	validateCreate,
	validateDelete,
	validateGetWithQueryStrings,
} = require("../validators/user")

router.get("/", (req, res) => {
	res.status(200).send("It works NOW!")
})

router.post("/createUser", validateCreate, createUser)
router.put("/updateuser", updateUser)

router.delete("/deleteuser/:id", validateDelete, deleteUser)

router.get(
	"/read-users-paginated",
	validateGetWithQueryStrings,
	readUsers
)
router.get("/read-users", readUsers)
router.get("/read-user/:id", readUser)

module.exports = router
