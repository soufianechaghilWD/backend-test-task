const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')


const app = express()


// connect to database
mongoose.connect("mongodb://localhost:27017/ecommerce");


// middlewares
app.use(cors())

const port = process.env.PORT ||  4000 

app.listen(port, () => console.log("App running on http://localhost:", port))