const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/adminpage').then(()=> {console.log('connected   html');}).catch(()=> console.log('error'))

const categorymodel = require('.../')
   function  categorySelection(){
       const categoryinput = document.getElementById('category')
       const categoryvalue = category.value;

       .find({ category: categoryToFind }, (err, products) => {
        if (err) {
            console.error(err);
        } else {
            products.forEach(product => {
                console.log(`Category: ${product.category}`);
                console.log(`Subcategories: ${product.subcategory.join(', ')}`);
                console.log('-----------------------');
            });
        }
    });
   
   
   
    }