const mongoose = require('mongoose');



const otpschema  = new mongoose.Schema({
    category : {
        type:String,
        require:true
    },
    subcategory : {
        type:[String],
        require:true
    },
    imagepath : {
        type:String,
        require:true
    },
})


module.exports = mongoose.model('category',otpschema)