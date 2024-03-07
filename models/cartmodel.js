const mongoose = require('mongoose')

const cartschema  = new mongoose.Schema({
    userID: {
        type :String
        
    },
    productID :{
        type:String
    }

   
})
    module.exports = mongoose.model('carts',cartschema)
