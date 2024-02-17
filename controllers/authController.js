
const otpmodel = require('../models/otp');
const otpverifications = require('../helpers/otpvalidate');
const otpgenerator = require('otp-generator');
// const twilio = require('twilio');
const bcrypt = require('bcrypt');
require('dotenv').config()
const nodemailer = require('nodemailer');

const OTPsend = require('../helpers/twilio')


const twilio = require('twilio');
// require('dotenv').config()
// const otpgenerator = require('otp-generator');


const accountsid = process.env.ACCOUNT_SID;
const authtoken = process.env.AUTH_TOKEN;
console.log(accountsid)
console.log(authtoken)

const twilioclient = new twilio(accountsid, authtoken);

var forOTP = otpgenerator.generate(4, {
    upperCaseAlphabets: false,
    lowerCaseAlphabets: false,
    specialChars: false,
});





module.exports = {


    loginGet: (req, res) => {
        res.render('login');
    },

    signupGet: (req, res) => {
        res.render('signup');
    },


    signuppost: async (req, res) => {
        const { mobile_number,lastname, name, password, email,confirm_password,} = req.body;

        if(!name || !mobile_number || !password || !email || !confirm_password || !lastname){

            res.render('signup', {erorr:`fill all the details`});

        }else{
        try {
            console.log(req.body);
                const otp = otpgenerator.generate(4, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            console.log(`otp is the 1  ${otp}`);
            const curruntdate = new Date();
            const data = await otpmodel.create({
            mobile_number,
            name,
            lastname,
            email,
            password,
            otp:otp,
            otpexpiration:new Date(curruntdate.getTime()),
            upsert:true, new:true, setDefaultsOnInsert:true
            
        });
        console.log(data);
        // console.log(forOTP);
            console.log( );    
            await twilioclient.messages.create({
                body: `this is the testing  otp  ${otp}`,
                to: mobile_number,
                from: process.env.MOBILE_NUMBER,
            });
            
            res.render('otpVerification');
        
        } catch (error) {
            console.log(error);
            return res.status(400).json({
                success: false,
                msg: error.message,
            });
        }
    }
    },


    
    verifyOtpGet: (req, res) => {
        res.render('otpverification');
    },

    // verifyOtpPost : async(req,res)=>{
        
    //     try{
    //         const { otp } = req.body
    //         console.log(otp);
    //         console.log(forOTP);
    //         const otpdata = await otpmodel.findOne({ otp:otp });/////otp
    //         console.log(otpdata);
    //         if (!otpdata){
    //             res.send ('you have enterderd wrong otp')
                
    //             return res.status(400).json({
    //                 success:false,
    //                 msg:`you enterd wrong otp! `
    //             })
    //         }

    //         const isOtpExpired = await otpverifications(otp.otpexpiration);

    //         if (isOtpExpired){
    //             res.send ('otp is expired')

    //             return res.status(400).json({
    //                 success:false,
    //                 msg:('your otp has expired!')
    //             });
    
    //         }
    //             await otpmodel.updateOne({ otp }, { $unset: { otp:1, otpexpiration: 1 } });
    //             res.redirect('/')
    //     }
    //     catch(erorr){
    //         return res.status(400).json({
    //             success:false,
    //             msg:erorr.message
    //         });
    
    //     }
    // },


    // forgotpasswordGET: (req, res) => {
    //     res.render('forgotpassword');
    // },


    // forgotpasswordPOST: async (req,res) => {

    //     const {email} = req.body;

        

    //     try{

    //         const signupEmail = await otpmodel.findOne({ email });

    //         if(!signupEmail){
    //             res.send ('you have enterderd wrong EMAIL')
                
    //             return res.status(400).json({
    //                 success:false,
    //                 msg:`you enterd wrong EMAIL! `

                     
    //             })
    //         }
    //         // else{
    //         //     var forOTP = otpgenerator.generate(4, {
    //         //         upperCaseAlphabets: false,
    //         //         lowerCaseAlphabets: false,
    //         //         specialChars: false,
    //         //     });

    //         // }



            
    //         const userEmail = process.env.USER_EMAIL
    //         const userPassword = process.env.USER_PASSWORD



    //         var transporter = nodemailer.createTransport({
    //             service: 'gmail',
    //             auth: {
    //               user:  userEmail ,
    //               pass: userPassword
    //             }
    //           });
              
    //           var mailOptions = {
    //             from: userEmail,
                
    //             to: email, 
    //             subject: 'Sending Email using Node.js',
    //             text: `This is your OTP for setup your new PASSWORD :  ${forOTP}`
    //           };
              
    //           transporter.sendMail(mailOptions, function(error, info){
    //             if (error) {
    //               console.log(error+`12312456765432`);
    //             } else {
    //               console.log('Email sent: ' + info.response);
    //               res.redirect('/enterotp')
    //             }
    //           });
    //     }catch(erorr){
    //         return res.status(400).json({
    //             success:false,
    //             msg:erorr.message
    //         });

    //     }
    // },


    // enterotpGET: (req,res)=>{
    //     res.render('forgotOTP')
    // },

    // enterotpPOST: (req,res)=> {

    //     const {otp}=req.body
    //     console.log(otp)
    //     console.log(forOTP)
        

        
    //         if(otp==forOTP){
    //             res.redirect('/enterpassword')
    //         }
    //         else{
    //             res.render('forgotOTP')
    //         }

       

    // },


    // enterpasswordGET: (req,res)=>{
    //     res.render('chaingepassword')

    // },

    // enterpasswordPOST: async(req,res)=>{
    //     try{
    //         const{password}=req.body
            

            

    //     }
    //     catch{

    //     }
    // }

        

    




 
    


}