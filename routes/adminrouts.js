const express =  require('express')
const router =  express.Router()

const upload = require('../middleware/multer')



const {
    adminloginGET,
    productGet,
    // productPost,
    productAddGet,
    productAddPost,
    categoryAddGet,
    categoryAddPost,
    productEditGet,
    productEditPOST,
    productDeletePost



} = require("../controllers/productcontroller")

const {
    adminSideUserListGET,
    adminHOMEGET,
    
    adminCouponGET,
    

} = require('../controllers/adminController')

const {
    adminBannerGet,
    bannerDeletePost,
    bannerAddGet,
    bannerAddPost,

}= require("../controllers/bannerController")




router.get( '/login',adminloginGET)
//     .post('/login',adminloginPOST)
//     .get('/signup',adminSignupGet)
//     .post('/signup',adminSignupPost)
    .get('/home',adminHOMEGET)
    .get ('/products',productGet)
    // .post ('/products',productPost)
    .get('/productsadd',productAddGet)
    .get('/productedit/:productid',productEditGet)
    .post('/productedit/:productid',upload.array('image',6),productEditPOST)
    .delete('/productdelete',productDeletePost)
    .post('/productsadd',upload.array('image',6),productAddPost)
    .get('/categoryadd',categoryAddGet)
    .post('/categoryadd',upload.single('image'),categoryAddPost)
    .get('/userlist',adminSideUserListGET)
    .get('/banner',adminBannerGet)
    .get('/banneradd',bannerAddGet)
    .post('/banneradd',upload.single('image'),bannerAddPost)
    .delete('/banner', bannerDeletePost)
    .get('/coupon',adminCouponGET)

 
         



module.exports = router

