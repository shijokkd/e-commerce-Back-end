
const data = require("../models/otp")
const couponmodel = require('../models/coupons')
const ordermodel = require ('../models/ordermodel')
const { default: mongoose } = require("mongoose")
  




module.exports = {

    
    adminHOMEGET:async(req,res)=>{
        try {
            res.render('dashboard')
        }catch{
            res.status(400).json({message:"admin admin home  not displaying"})
            
        }
    },
    adminSideUserListGET: async (req,res)=>{
        const userlist = await data.find()
        console.log(userlist)

        try{
            res.render('userslist',{userlist})
        }catch{
            res.status(400).json({message:"admin side user list not displaying"})

        }
    },
    adminBannerGet: async(req,res)=>{
        try{
            res.render('banner')

        }catch{
            res.status(400).json({message:"admin side banner list not displaying"})


        }
    },
    adminCouponGET: async(req,res)=>{
        const data = await couponmodel.find()
        try{
            res.render('coupons',{data})

        }catch{
            res.status(400).json({message:"admin side coupons list not displaying"})


        }
    },
    admincouponADDget: async(req,res)=>{

        try{
             res.render('couponadd')
        }catch{

        }
    },
    admincouponADDpost: async (req,res)=>{
        const {coupon,max_rate,min_rate,discount}= req.body
        try{
            const data = new couponmodel ({
                coupon:coupon,
                max_rate:max_rate,
                min_rate:min_rate,
                discount:discount
            });
            await data.save()
            res.render('coupons')

        }catch{

        }
    },
       
    adminOrderhistoryGET: async (req, res) => {
        try {
        
            
            const order = await ordermodel.find().populate('checkoutid').populate('productid');
            console.log(order); // Corrected typo here
            
            res.render('order', { order }); // Assuming you want to pass the order data to the template
    
        } catch (error) {
            console.error(error);
            // Handle error appropriately, send an error response, or render an error page
        }
    },
    productstatusPOST:async (req,res)=>{
        try{
            console.log(req.body);
            const  status1 = req.body.status
            const data  = new mongoose.Types.ObjectId(req.body.id)
            console.log(data)
            await ordermodel.findOneAndUpdate(
                { _id: data }, // Find order by its ID
                { $set: { status: status1 } }, // Update the status field
                { new: true });


              return res.status(200).json({ message: "updated the status" });


            
            

        }catch{

        }
    }



}