const mongoose = require ("mongoose");


const productschema = new mongoose.Schema({
    productname : {
        type :String,
        require:true
    },
    price:{
        type:Number,
        require:true,
    },
    offerprice:{
        type:Number
    },
    stock:{
        type:Number,
        require
    },
    discription:{
        type:String,
        require:true

    },
    category:{
        type:String,
        require:true
    },
    subcategory:{
        type :String
    
    },
    imagepath:{
        type:Array,
        
    }

})

module.exports = mongoose.model('products',productschema)