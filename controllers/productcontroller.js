
const productmodel = require ("../models/productmodel")
const bannermodel = require('../models/bannermodel')
const  categorymodel = require ('../models/categorymodel')

const mongoose = require('mongoose');


const fs = require = require('fs')






module.exports = {




    adminloginGET:(req,res)=>{

    },

  

    productAddGet:async(req,res)=>{
        try{
            const category = await categorymodel.find()

            res.render('productadd',{category})
        }catch{
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error for the category model' });

        }

    },

  
    productAddPost :    async (req, res) => {
    console.log(req.body);
    const { productname, price, offerprice, stock, category, discription,subcategory } = req.body;

    try {
        
        const imagepath = req.files ? req.files.map(file => file.filename) : [];

        console.log(req.file);

        if (!productname || !price || !stock || !category || !discription) {
            res.redirect("/admin/productsadd");

        } else {
            console.log(req.body);

            const data  = new productmodel({
                productname: productname,
                price: price,
                offerprice: offerprice,
                discription: discription,
                stock: stock,
                category: category,
                imagepath: imagepath,
                subcategory:subcategory
            
                
            })

        await data.save() 
        res.redirect('/admin/products')
        

        
    }
 } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal Server Error' });
 }
 },






    productGet : async (req,res)=>{
        const products = await productmodel.find()
        try{

            res.render('product',{products}) 
        }catch (erorr){
            console.log(erorr)

        }
    },
    productEditGet : async (req,res)=>{
        
        try{ 
            const id = await req.params.productid
            const idproduct = await productmodel.findById(id)
            res.render('productedit',{idproduct,category})



        }catch{
        res.status(500).json({ error: 'product edit notworking' });


        }
    },
    productDeletePost : async (req,res)=>{
        const id = req.query.id
        // const imgData = await productmodel.findById(id)
        // const imgPath = `./public/img/${imgData.imagepath}`
    
        try{
            
            
            const product = await productmodel.findByIdAndDelete(id)
            const image = product.imagepath
            image.forEach(data =>{

            
            
            if(fs.existsSync(`./public/img/${data}`)){
                fs.unlinkSync(`./public/img/${data}`)
            }
        });

            if(product){
                // if(fs.existsSync(imgPath))
                res.status(200).json({message:"deleted"})


            }
            else{
                res.status(404).json({message:"not found"})
            }

        }catch{
            res.status(400).json({message:"product delete notworking in project"})

        }
    },
    productEditPOST:async(req,res)=>{
        const { productname, price, offerprice, stock, category, discription } = req.body;
        const id =req.params.productid
        console.log(req.body);
        console.log(id);


        try{
            await productmodel.updateOne({_id: id }, {$set: {productname, category,discription,offerprice,stock, price, } })
            res.render("product")



        }catch{
            res.status(400).json({message:"product edit notworking in project"})

        }
    },

    userSIdeProduct: async (req,res)=>{
        const banner = await bannermodel.find() ?? null
        const product = await productmodel.find() ?? null


        try{
            res.render('userhomepages/product',{banner,product})

        }catch{

        }
        
    },


    // ...
    
    singleProductGET: async (req, res) => {
        try {
            const id = req.params.productid;
    
            // Validate if the id is a valid ObjectId
            if (!mongoose.Types.ObjectId.isValid(id)) {
                return res.status(400).send('Invalid product ID');
            }
    
            const idproduct = await productmodel.findById(id);
            console.log(idproduct);
    
            if (!idproduct) {
                return res.status(404).send('Product not found');
            }
    
            res.render('userhomepages/productdetails',{idproduct});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        }
    },
    categorybaseGET:async (req,res)=>{
        const data = req.query.category
        const banner = await bannermodel.find()
        
        console.log('lolipop');
        console.log(req.body);
      
        try{
            const product = await productmodel.find({category:data});
            res.render('userhomepages/filterpage',{product,banner})
           
        }catch{

        }
    },

    pricebaseGET:async (req,res)=>{
        console.log('hhfffhfhfhfhfhfh');
        try{
            const banner = await bannermodel.find()
            const price = req.query.price
            if (price == 1){
            var product = await productmodel.find().sort({offerprice:1})
            }else{
                var product = await productmodel.find().sort({offerprice:-1})
            }

          
            res.render('userhomepages/filterpage',{product,banner})


        }catch{

        }
    },
    serchbaseGET: async (req,res)=>{
        const data = req.body.search            
        const banner = await bannermodel.find()

        try{
            console.log('hai');
            console.log(data);
            
            const product = await productmodel.find({
                $or: [
                  { category: { $regex: data, $options: "i" } },
                  { subcategory: { $regex: data, $options: "i" } },
                  { productname:{ $regex: data, $options: "i"}}
                ]
              });

              res.render('userhomepages/filterpage',{product,banner})

        

        }catch{

        }
    }

    
       

  

     






    

















}
