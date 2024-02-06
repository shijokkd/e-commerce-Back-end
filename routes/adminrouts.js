const express =  require('express')
const router =  express.Router()

const upload = require('../middleware/multer')



const {
    adminloginGET,
    // adminloginPOST,
    // adminSignupGet,
    // adminSignupPost,
    adminHOMEGET,
    productAddGet,
    productAddPost,
    categoryAddGet,
    categoryAddPost,



} = require('../controllers/admincontroller')





router.get( '/login',adminloginGET)
//     .post('/login',adminloginPOST)
//     .get('/signup',adminSignupGet)
//     .post('/signup',adminSignupPost)
    .get('/home',adminHOMEGET)
    .get('/productadd',productAddGet)
    .post('/productadd',productAddPost)
    .get('/categoryadd',categoryAddGet)
    .post('/categoryadd',upload.single('image'),categoryAddPost)
 
         



module.exports = router

