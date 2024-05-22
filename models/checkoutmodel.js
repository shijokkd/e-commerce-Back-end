const mongoose = require('mongoose')
const { Number } = require('twilio/lib/twiml/VoiceResponse')

const checkoutschema = new mongoose.Schema({
    userid: {
        type :mongoose.Schema.Types.ObjectId
    },
    productid :[{
        type:mongoose.Schema.Types.ObjectId,ref:'products'
    }],

    shiping_adderss: [{
        firstname:String,
        lastname:String,
        place:String,
        address:String,
        email:String,
        mobile:Number,
        city:String,
        country:String,
        zipcode:Number,
        

        
    }],
    totalamount:{
        type:Number
    },
    paymentoption:{
        type:String
    },
    cartid:{
        type:mongoose.Schema.Types.ObjectId,ref:'carts'
    },
    quantity:{
        type:Number
    },
    currentdate:{
        type:Date,
        default:Date.now
    }
   
   

})
module.exports = mongoose.model('checkouts',checkoutschema);
