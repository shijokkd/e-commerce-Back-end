const { text } = require('body-parser');
const mongoose = require('mongoose')

const orderschema = new mongoose.Schema({
    userid: {
        type :mongoose.Schema.Types.ObjectId
    },
    status:{
        type:String,
        default:"placed"

    },
    checkoutid:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'checkouts'
    },
    productid:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'products'
    }],
    returndate:{
        type:Date   

    },
    currentdate:{
        type:Date,
        default:Date.now
    },
    active:{
        type:String,
        default:"active"

    }
   
   

})
module.exports = mongoose.model('orders',orderschema);
