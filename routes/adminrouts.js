const express =  require('express')
const router =  express.Router()

const upload = require('../middleware/multer')



const {
    adminloginGET,
    adminHOMEGET,
    productGet,
    // productPost,
    productAddGet,
    productAddPost,
    categoryAddGet,
    categoryAddPost,
    productEditGet,
    
    productDeletePost



} = require('../controllers/productcontroller')

const {
    adminSideUserListGET,

} = require('../controllers/adminController')





router.get( '/login',adminloginGET)
//     .post('/login',adminloginPOST)
//     .get('/signup',adminSignupGet)
//     .post('/signup',adminSignupPost)
    .get('/home',adminHOMEGET)
    .get ('/products',productGet)
    // .post ('/products',productPost)
    .get('/productsadd',productAddGet)
    .get('/productedit/:productid',productEditGet)
    .delete('/productdelete',productDeletePost)
    .post('/productsadd',upload.array('image',6),productAddPost)
    .get('/categoryadd',categoryAddGet)
    .post('/categoryadd',upload.single('image'),categoryAddPost)
    .get('/userlist',adminSideUserListGET)
 
         



module.exports = router

