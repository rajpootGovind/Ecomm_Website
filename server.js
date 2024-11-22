const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

const port = process.env.PORT
const url = process.env.DB_URL

// middleware for understand json format data
app.use(express.json())

// Connection with database

mongoose.connect(url)
const db = mongoose.connection

db.on("error", () => {
    console.log(`error during connection with DB ${error}`)
})

db.once("open", () => {
    console.log("DB connected successfully")

    // init()
})

// const init = () => {
//     app.get("/print", (req, res) => {
//         res.send("initially connected")
//     })
// }

//Add Routes to the server

require("./Routes/category.route")(app)   // ->calling routes and passing app object

require("./Routes/product.route")(app)


// start the server

app.listen(port, () => {
    console.log(`server is running on port no. : ${port}`)
})