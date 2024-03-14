const mongoose = require('mongoose')

const wishlistschema  = new mongoose.Schema({
    userID: {
        type :mongoose.Schema.Types.ObjectId
        
    },
    productID :[{
        type:mongoose.Schema.Types.ObjectId,ref:'products'
    }]
    
   
})
    module.exports = mongoose.model('wishlists',wishlistschema)
