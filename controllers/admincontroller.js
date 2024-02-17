const data = require("../models/otp")



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
        try{
            res.render('coupons')

        }catch{
            res.status(400).json({message:"admin side coupons list not displaying"})


        }
    }

}
