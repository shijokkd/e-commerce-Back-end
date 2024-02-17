const mongoose = require('mongoose');

const otpschema  = new mongoose.Schema({
    mobile_number : {
        type:String,
        require:true
    },
    
    name : {
        type:String,
        require:true
        
    },
    email : {
        type:String,
        require:true
    },
    password : {
        type:String,
        require:true
    },
    otp : {
        type:String,
        require:true
    },
    otpexpiration : {
        type: Date,
        default:Date.now,
        get:(otpexpiration) => otpexpiration.getTime(),
        set:(otpexpiration) => new Date(otpexpiration)
    }
})


module.exports = mongoose.model('sub',otpschema)