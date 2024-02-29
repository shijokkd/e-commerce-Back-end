
// const otpmodel = require('../models/otp');
// const otpverifications = require('../helpers/otpvalidate');
// const otpgenerator = require('otp-generator');
// // const twilio = require('twilio');
// const bcrypt = require('bcrypt');
// require('dotenv').config()
// const nodemailer = require('nodemailer');

// const OTPsend = require('../helpers/twilio')

///////////////////////////////////////////////

const bannermodel = require('../models/bannermodel')
const productmodel = require('../models/productmodel')



module.exports={
    userHomeGET:async(req,res)=>{
        const banner = await bannermodel.find()
        const latestProducts = await productmodel.find({})
        .sort({ date: -1 }) 
        .limit(8); 
        try{
            res.render('userhomepages/index',{banner,latestProducts})

        }catch{
            res.status(400).json({message:"user homepage  not displaying its my project"})


        }
    }

}