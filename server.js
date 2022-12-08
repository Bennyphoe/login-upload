require("dotenv").config()
const express = require("express")
const cors = require("cors")

const app = express()

const corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.listen(process.env.PORT, () => {
    console.log(`app is listening at port ${process.env.PORT}`)
})