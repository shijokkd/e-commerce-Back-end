const mongoose = require('mongoose');



const otpschema  = new mongoose.Schema({
    category : {
        type:String
    
    },
    subcategory : {
        type:[String]
        
    },
  
})


module.exports = mongoose.model('category',otpschema)