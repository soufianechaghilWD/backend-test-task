const userSchema = require('./index')

const retrieveSellers = async () => {
    try{
        const sellers = await userSchema.find({userType: "seller"})
        return {done: true, sellers}
    }
    catch(e){
        console.log('eher')
        return {done: false, message: e.message}
    }
}

module.exports = retrieveSellers