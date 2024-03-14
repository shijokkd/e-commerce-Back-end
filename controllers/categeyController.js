const  categorymodel = require ('../models/categorymodel')



module.exports = {

categoryAddGet : async(req,res)=>{
    
    try{

        res.render('category')
    }catch{

    }
},

categoryAddPost: async (req, res) => {
    try {
        console.log(req.body);

        const { category, subcategory } = req.body;

        const categoryData = await categorymodel.findOne({ category: category });

        if (!categoryData) {
            await categorymodel.create({
                category: category,
                subcategory: [subcategory], // Assuming subcategory is a string, change it if it's an array
            });
            res.redirect('/admin/categoryadd');
        } else {
            await categorymodel.findOneAndUpdate(
                { category: category },
                { $addToSet: { subcategory: subcategory } },
                { new: true }
            );
             res.redirect('/admin/categoryadd')
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
},










}
