const mongoose = require('mongoose')

const cartschema  = new mongoose.Schema({
    userID: {
        type :mongoose.Schema.Types.ObjectId
        
    },
    productID :[{
        id:{type:mongoose.Schema.Types.ObjectId,ref:'products'},
        quantity:Number,
    }]

   
})
    module.exports = mongoose.model('carts',cartschema)
