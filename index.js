const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

const router = require("./routes/routes")

require("./database/database")

const app = express()

app.use(cors())
app.use(express.json())
app.use("/api", router)

app.listen(process.env.PORT, () => {
	console.log(
		"Nuestro servidor está escuchando en el PORT: " +
			process.env.PORT
	)
})
