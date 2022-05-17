const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose');
const userController = require('./controllers/user');


const app = express()


// connect to database
mongoose.connect("mongodb://localhost:27017/ecommerce");


// middlewares
app.use(express.json())
app.use(cors())
app.use(userController)

const port = process.env.PORT ||  4000 

app.listen(port, () => console.log("App running on http://localhost:", port))