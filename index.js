const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

app.use(cors())
app.use(express.json())

app.get("/", (req, res) => {
	res.status(200).send("It works!")
})

app.post("/users", (req, res) => {
	res.status(201).send({ ...req.body, dami: "no cortes a luz" })
})

app.listen(process.env.PORT, () => {
	console.log(
		"Nuestro servidor está escuchando en el PORT: " +
			process.env.PORT
	)
})
