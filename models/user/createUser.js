const userSchema = require('./index')
const bcrypt = require('bcrypt')

const createUser = async (username, password, userType) => {
    try{
        // check if the username already exist
        const userAlreadyExist = await userSchema.find({username})
        if(userAlreadyExist.length > 0) return {done: false, message: 'User already exist'}

        // hash the password
        const hashed_Pass = await bcrypt.hash(password, 10)

        // create the user
        const user = new userSchema({username, password: hashed_Pass, userType})
        await user.save()

        // return the userId
        return {done: true, userId: user._id}
    }
    catch(e){
        return {done: false, message: e.message}
    }
}

module.exports = createUser