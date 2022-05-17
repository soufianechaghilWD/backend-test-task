const catalogSchema = require('./index')



const SellerHasCatalogs = async (seller) => {
    try{
        const hasCatalog = await catalogSchema.findOne({seller})
        if(!hasCatalog) return {done: true, has: false}
        
        return {done: true, has: true}
    }
    catch(e){
        return {done: false, message: e.message}
    }
}

module.exports = SellerHasCatalogs