const express = require("express")

const mongoose = require("mongoose")

require("dotenv").config()

const cors = require('cors');

const bodyParser = require('body-parser');



const app = express()

const port = process.env.PORT
const url = process.env.DB_URL

// middleware for understand json format data
app.use(express.json())


// Middleware
app.use(cors());
app.use(bodyParser.json());


// Connection with database

mongoose.connect(url)
const db = mongoose.connection

db.on("error", () => 
{
    console.log(`error during connection with DB ${error}`)
})

db.once("open", () => 
{
    console.log("DB connected successfully")

})


//Add Routes to the server

require("../api/Routes/category.route")(app)   // ->calling routes and passing app object

require("../api/Routes/product.route")(app)

// Health Check Route
app.get('/', (req, res) => {
    res.send('Backend is created By Govind Rajpoot!');
  });


// 01method- start the server

// app.listen(port, () => 
// {
//     console.log(`server is running on port no. : ${port}`)
// })


//02vercel method- Export app as a vercel serverless function
   
   module.exports = app