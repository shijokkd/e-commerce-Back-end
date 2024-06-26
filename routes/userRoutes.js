const express = require('express');
const router = express.Router();


const {

    loginGet,
    loginPost,
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


} = require('../controllers/authController.js');


const {
    userHomeGET,
    profileGET,
    profilPOST,
    checkoutGET,
    checkoutPost,
    orderhistoryGET,
    addcoponPost,
    checkoutfinan,
    ordesummeryGET,
    canselorderPOST
    
   

}=require('../controllers/userController.js')

const {
    userSIdeProduct,
    singleProductGET,
    categorybaseGET,
    pricebaseGET,
    serchbaseGET,
}=require("../controllers/productcontroller.js")

const {
    wishlistGET,
    wishlistAddpost,
    cartGET,
    cartPOST,
    wishlistproductdelete,
    cartproductdelete,
    cartProductIncrement,
} = require("../controllers/CartWIshlist.js")





router .get('/',loginGet)
      .post('/',loginPost)
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
      .get('/home',userHomeGET)
      .get('/product',userSIdeProduct)
      .get('/profile',profileGET)
      .post('/profile',profilPOST)  
      .get('/wishlist',wishlistGET)
      .post('/wishlist',wishlistAddpost)
      .get('/products/:productid',singleProductGET)
      .get('/cart',cartGET)
      .post('/cart',cartPOST)
      .get('/checkout',checkoutGET)
      .delete('/wishlistdelete',wishlistproductdelete)
      .delete('/cartproductdelete',cartproductdelete)
      .post('/quantityUpdate',cartProductIncrement)
      .post('/checkout',checkoutPost)
      .get('/order',orderhistoryGET)
      .post('/addcoupon',addcoponPost)
      .post('/checkoutpost',checkoutfinan)
      .get('/filterproduct',categorybaseGET)
      .get('/filterproducts',pricebaseGET)
      .post('/filterproductserch',serchbaseGET)
      .get('/ordersummery',ordesummeryGET)
      .get('/canselorder',canselorderPOST)

      





module.exports = router
