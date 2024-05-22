const mongoose = require('mongoose');

const couponschema  = new mongoose.Schema({
    coupon : {
        type:String,
        require:true
    },
    
    max_rate: {
        type:Number
        
    },
    min_rate: {
        type:Number
    },
    discount : {
        type:Number
    }
});
module.exports = mongoose.model('coupons',couponschema)
    