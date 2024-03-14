
// const otpmodel = require('../models/otp');
// const otpverifications = require('../helpers/otpvalidate');
// const otpgenerator = require('otp-generator');
// // const twilio = require('twilio');
// const bcrypt = require('bcrypt');
// require('dotenv').config()
// const nodemailer = require('nodemailer');

// const OTPsend = require('../helpers/twilio')

///////////////////////////////////////////////

const bannermodel = require('../models/bannermodel');
const productmodel = require('../models/productmodel');
const profilemodel = require('../models/profilemodel');
const usermodel = require('../models/profilemodel');




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
      
    },
    profileGET:async(req,res)=>{
        try{
            const userID =req.session.email._id
            const userData = await profilemodel.find(userID) 
            console.log(userData);
            
            

           
                res.render('profile',{userData});    ///////////email ._id finting  and add the id in the data

        }catch{
              res.send ('hai not workng')
        }
    },
    profilPOST: async (req, res) => {
        try {
            const { house_name, place, city, pincode, state } = req.body;
            const userId = req.session.email._id;
            
    
            if (userId) {
                await usermodel.updateOne(
                    {userSignupDta: userId },
                    {
                        house_name,
                        place,
                        city,
                        pincode,
                        state,
                    },
                    { upsert: true }
                );
    
                return res.render('profile')
            } else {
                return res.send("Sorry, user not found");
            }
    
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    },
    checkoutGET: async(rreq,res)=>{
        try{
              res.render('userhomepages/checkout')
        }catch{

        }
    }

   
    
    
    
          


}