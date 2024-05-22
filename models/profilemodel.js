const mongoose = require('mongoose');

const profileschema  = new mongoose.Schema({
    house_name : {
        type:String,
    },
    
    place: {
        type:String,
    },
    city : {
        type:String,
    },
    state : {
        type:String,
    },
    pincode : {
        type:Number,
    },
    userSignupDta : {
        type:mongoose.Schema.Types.ObjectId
    },
    
    
});


module.exports = mongoose.model('profile',profileschema)