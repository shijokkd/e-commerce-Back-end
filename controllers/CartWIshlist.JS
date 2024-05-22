const wishlistmodel = require('../models/wishlistmodel')
const cartmodel = require('../models/cartmodel')
const signupmodel = require('../models/otp')
const { default: mongoose } = require('mongoose')
const { validateRequestWithBody } = require('twilio')


module.exports = {

    wishlistGET:async (req,res)=>{
        try{
        const emailll= req.session.email
        const datapass = await signupmodel.find({email:emailll});
        console.log(datapass)
        const data = datapass[0]._id
        console.log(data)
        const wishlistdata = await wishlistmodel.find({userID:data}).populate('productID');

        console.log(wishlistdata);

            res.render('userhomepages/wishlist',{wishlistdata})
        }catch{
            res.send('sorry your wishlist not working')
        }
    },
    

    wishlistAddpost:async(req,res)=>{
        try{
            
            const productId = req.query.id;
            
            const email = req.session.email
            const userdata = await signupmodel.find({email:email});
            const data = userdata[0]._id
            const checklist = await wishlistmodel.find({userID:data})


            if (checklist.length == 0){
                res.status(200).json({message:"productadded"})
                const savedata = new wishlistmodel({
                    userID: data,
                    productID: productId
                })
                await savedata.save()
            }else{
                await wishlistmodel.updateOne(
                    { userID: data },
                    { $addToSet: { productID: productId } }
                );
                res.status(202).json({message:"productadded"})
            }
        }catch{
            console.error(error);
            res.status(500).json({ message: "Error occurred" });
        }

    },
    wishlistproductdelete:async(req,res)=>{
        try{
        const productid = req.query.id
        const id = new mongoose.Types.ObjectId(productid)
        const email = req.session.email
        const userdata = await signupmodel.find({email:email});
        const data = userdata[0]._id
        console.log(id);
        await wishlistmodel.updateOne(
    { userID: data }, 
    { $pull: { productID:id} });
        res.status(200).json({message:"deleted"})

      }catch{
        res.status(400).json({message:"product delete notworking in project"})

      }
    },
    cartGET: async(req,res)=>{
        try{

            const emailll= req.session.email
            const datapass = await signupmodel.find({email:emailll});
            const data = datapass[0]._id
            const cartdata = await cartmodel.findOne({userID:data}).populate('productID.id');
            console.log(cartdata);
            
          
            let totalPrice = 0;
            if (cartdata && cartdata.productID) {
                cartdata.productID.forEach(item => {
                    totalPrice += item.id.offerprice * item.quantity;
                });
            }
            const total= (((totalPrice*5)/100)+50)
                req.session.price = totalPrice +total 
                console.log(req.session.price );
    
            res.render('userhomepages/cart',{cartdata,totalPrice}) 
        }catch{
            res.send('sorry your cart not working')
            
        }
    },
    cartPOST: async (req, res) => {
        try { 
            const productId = req.query.id;
            const email = req.session.email;
            console.log(email);
            console.log(productId);
            const userdata = await signupmodel.find({ email: email });
            const data = userdata[0]._id;
            console.log(data);
            const checklist = await cartmodel.find({ userID: data });
    
            if (checklist.length == 0) {
                res.status(200).json({ message: "productadded" });
                const savedata = new cartmodel({
                    userID: data,
                    productID: [{ id: productId, quantity: 1 }]
                });
                await savedata.save();
            } else {
                await cartmodel.updateOne(
                    { userID: data },
                    { $addToSet: { productID: { id: productId, quantity: 1 } } } // <-- Updated line
                );
                res.status(202).json({ message: "productadded" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal Server Error" });
        }
    },
    cartproductdelete:async(req,res)=>{
        try{
        const productid = req.query.id
        const id = new mongoose.Types.ObjectId(productid)
        const email = req.session.email
        const userdata = await signupmodel.find({email:email});
        const data = userdata[0]._id
        console.log(id);
        await cartmodel.updateOne(
    { userID: data }, 
    { $pull: { productID: { id: id } }});
        res.status(200).json({message:"deleted"})

      }catch{
        res.status(400).json({message:"product delete notworking in project"})

      }
    },
    cartProductIncrement: async (req, res) => {
        
        const value = parseInt(req.body.quantity); // Convert string to number
        const productid = new mongoose.Types.ObjectId(req.body.id);
        email = req.session.email;
        const userdata = await signupmodel.find({ email: email });
        const data = new mongoose.Types.ObjectId(userdata[0]._id);

    
        try {
            const updatedCart =  await cartmodel.findOneAndUpdate(
                { userID: data, 'productID.id': productid }, // Query condition
                { $set: { 'productID.$.quantity': value } }, // Update operation
                { new: true } // Options: Return the updated document
            );
            
    
            if (updatedCart) {
                res.status(200).json({ success: true, message: 'Quantity updated successfully', wishlist: updatedCart });
            } else {
                res.status(404).json({ success: false, message: 'Product not found in the wishlist' });
            }
        } catch (error) {
            console.error('Error updating quantity:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    },
    
    
}
