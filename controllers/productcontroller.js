const  categorymodel = require ('../models/categorymodel')
const productmodel = require ("../models/productmodel")






module.exports = {




    adminloginGET:(req,res)=>{

    },

    categoryAddGet : async(req,res)=>{
    
        try{

            res.render('category')
        }catch{

        }
    },

    categoryAddPost : async (req, res) => {
        // console.log(req.body);
    
        try {
           console.log(req.body)
    
           const { category, subcategory } = req.body;
           
           
           const categoryData = await categorymodel.findOne({ category: category });
           
           
           if (!categoryData) {
                const path = req.file.filename ??undefined
                await categorymodel.create({
                    category: category,
                    subcategory: [subcategory], // Assuming subcategory is a string, change it if it's an array
                    imagepath: path 
                });


    
                // console.log(data);
                       

            }
             else {
                await categorymodel.findOneAndUpdate(
                    { category: category },
                    { $addToSet: { subcategory: subcategory } },
                    { new: true }
                );
                res.status(200).json({ success: true, message: 'Subcategory added successfully' });
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },



    productAddGet:async(req,res)=>{
        const category = await categorymodel.find()
        try{

            res.render('productadd',{category})
        }catch{
            console.log(error);
            res.status(500).json({ error: 'Internal Server Error for the category model' });

        }

    },

  
 productAddPost :    async (req, res) => {
    console.log(req.body);
    const { productname, price, offerprice, stock, category, discription } = req.body;

    try {
        
        const imagepath = req.files ? req.files.map(file => file.filename) : [];

        console.log(req.file);

        if (!productname || !price || !stock || !category || !discription) {
            res.render("productadd");
        } else {
            console.log(req.body);

            const data  = new productmodel({
                productname: productname,
                price: price,
                offerprice: offerprice,
                discription: discription,
                stock: stock,
                category: category,
                imagepath: imagepath
            })

        await data.save() 

            res.status(200).json({ success: true, message: 'Product added successfully' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},





    adminHOMEGET:(req,res)=>{
        res.render('users')
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
            const id = req.params.productid
            const idproduct = await productmodel.findById(id)

            res.render('productedit',{idproduct})


        }catch{

        }
    },
    productDeletePost : async (req,res)=>{
        try{
            
            const id = req.query.id
            const product = await productmodel.findByIdAndDelete(id)


            if(product){
                res.status(200).json({message:"deleted"})
            }
            else{
                res.status(404).json({message:"not found"})
            }

        }catch{
            res.status(400).json({message:"product delete notworking in project"})

        }
    },
    productEditGet:async (req,res)=>{
         try{
            res.render("productedit")

         }catch{

         }
    }






    

















}
