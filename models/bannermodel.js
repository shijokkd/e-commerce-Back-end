const mongoose = require('mongoose')

const bannerschema  = new mongoose.Schema({
    BannerName: {
        type :String
        
    },
    SubNot :{
        type:String
    },
    bannerImage : {
        type:String
    }
})
    module.exports = mongoose.model('banner',bannerschema)

