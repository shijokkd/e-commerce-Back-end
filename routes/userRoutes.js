const express = require('express');
const router = express.Router();


const {

    loginGet,
    // loginPost,
    signupGet,
    signuppost,
    verifyOtpGet,
    verifyOtpPost,
    forgotpasswordGET,
    forgotpasswordPOST,
    enterotpGET, 
    enterotpPOST,
    enterpasswordGET, 
    enterpasswordPOST, 


} = require('../controllers/authController');






router .get('/',loginGet)
    //   .post('/',loginPost)
      .get('/signup',signupGet)
      .post('/signup',signuppost)
      .get('/otpverify',verifyOtpGet)
      .post('/otpverify',verifyOtpPost)
      .get('/forgotpassword',forgotpasswordGET)
      .post('/forgotpassword',forgotpasswordPOST)
      .get('/enterotp',enterotpGET)
      .post('/enterotp',enterotpPOST)
      .get('/enterpassword',enterpasswordGET)
      .get('/enterpassword',enterpasswordPOST)

      





module.exports = router
