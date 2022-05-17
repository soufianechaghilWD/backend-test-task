const express = require('express')
const createUser = require('../../models/user/createUser')
const jwt = require('jsonwebtoken')

const userController = express.Router()

userController.post('/api/auth/register', async (req, res) => {
    
    const {username, password, userType} = req.body

    try{
        const user = await createUser(username, password, userType)

        if(!user.done) throw({status: 401, message: user.message})

        // creating a token
        const token = jwt.sign({username}, "JwtSecret", {expiresIn: "7d"})

        res.status(200).json({token})    
    }
    catch(e){
        res.status(e.status || 400).json({message: e.message || "Something went wrong"})
    }

})

module.exports = userController