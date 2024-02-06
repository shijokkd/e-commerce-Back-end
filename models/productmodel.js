const mongoose = require ("mongoose");


const productschema = new mongoose.Schema({
    name : {
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
    imagepath:{
        type:String,
        require:true
    }

})

module.exports = mongoose.model('product',productschema)