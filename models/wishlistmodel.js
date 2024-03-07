const mongoose = require('mongoose')

const wishlistschema  = new mongoose.Schema({
    userID: {
        type :String
        
    },
    productID :{
        type:String
    }
   
})
    module.exports = mongoose.model('wishlists',wishlistschema)
