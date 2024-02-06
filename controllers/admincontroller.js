const  categorymodel = require ('../models/categorymodel')






module.exports = {




    adminloginGET:(req,res)=>{

    },

    categoryAddGet : (req,res)=>{
        res.render('category')
    },

    categoryAddPost : async (req, res) => {
        console.log(req.body);
    
        try {
           
    
            const path = req.file.filename;
            const { category, subcategory } = req.body;
    
            const categoryData = await categorymodelmodel.findOne({ category: category });
    
            if (!categoryData) {
                const data = await categorymodelmodel.create({
                    category: category,
                    subcategory: [subcategory], // Assuming subcategory is a string, change it if it's an array
                    imagepath: path,
                });
    
                console.log(data);
                res.status(201).json({ success: true, message: 'Category added successfully' });
            } else {
                await categorymodel.findOneAndUpdate(
                    { category: category },
                    { $addToSet: { subcategory: subcategory } },
                    { new: true }
                );
                res.status(200).json({ success: true, message: 'Subcategory added successfully' });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
        }
    },



    productAddGet:(req,res)=>{
        res.render('productadd')
    },

    productAddPost: async (req,res)=>{
        try{
            const  path = req.body.filename

            const {productname,price,offerprice,stock,category,discription}=req.body


            

        }catch(erorr){

        }
    },


    adminHOMEGET:(req,res)=>{
        res.render('users')
    }

    

















}
