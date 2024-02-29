const bannermodel = require('../models/bannermodel')

module.exports = {
    adminBannerGet: async(req,res)=>{
        const bannerdata = await bannermodel.find()

        try{
            res.render('banner',{bannerdata})

        }catch{
            res.status(400).json({message:"admin side banner list not displaying"})


        }
    },

    bannerAddGet:async (req,res)=>{
         
        try{
            res.render('banneradding')
        }catch{
            res.status(400).json({message:"admin side banner adding not notworking code is my"})

           }
    },

    bannerAddPost: async (req,res)=>{
        const {BannerName,SubNot}=req.body
        const path = req.file.filename
        console.log(path);
        try{
            const data = new bannermodel({
                BannerName,
                SubNot,
                bannerImage:path
            })
            await data.save()
            res.redirect('/admin/banner')
        

            
        }catch{

        }
    },
    bannerDeletePost : async (req,res)=>{
        try{
            
            const id = req.query.id
            const banner = await bannermodel.findByIdAndDelete(id)


            if(banner){
                res.status(200).json({message:"deleted"})
            }
            else{
                res.status(404).json({message:"not found"})
            }

        }catch{
            res.status(400).json({message:"banner delete notworking in project"})


        }
    },
}


