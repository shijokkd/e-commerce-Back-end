
// const otpmodel = require('../models/otp');
// const otpverifications = require('../helpers/otpvalidate');
// const otpgenerator = require('otp-generator');
// // const twilio = require('twilio');
// const bcrypt = require('bcrypt');
// require('dotenv').config()
// const nodemailer = require('nodemailer');

// const OTPsend = require('../helpers/twilio')

///////////////////////////////////////////////

const bannermodel = require('../models/bannermodel');
const productmodel = require('../models/productmodel');
const profilemodel = require('../models/profilemodel');
const checkoutmodel = require('../models/checkoutmodel')
const couponmodel = require('../models/coupons')
const cartmodel = require('../models/cartmodel')
const ordermodel = require('../models/ordermodel')
const mongoose = require('mongoose');   
const Razorpay = require('razorpay');
const {YOUR_KEY_SECRET,YOUR_KEY_ID}=process.env
var instance = new Razorpay({
  key_id: YOUR_KEY_ID,
  key_secret: YOUR_KEY_SECRET,
});


module.exports={
    userHomeGET:async(req,res)=>{
        
        const banner = await bannermodel.find()
        const latestProducts = await productmodel.find({})
        .sort({ date: -1 }) 
        .limit(10); 
        try{
            res.render('userhomepages/index',{banner,latestProducts})

        }catch{
            res.status(400).json({message:"user homepage  not displaying its my project"})


        }
      
    },
    profileGET: async (req, res) => {
        try {
            const userID = new mongoose.Types.ObjectId(req.session.id1);
            const userData = await profilemodel.findOne({ userSignupDta: userID });
        
    
            console.log(userData);
            console.log(userID);
    
            res.render('profile',{userData});
        } catch (error) {
            console.error(error);
            res.send('Profile GET request failed');
        }
    },
    
    profilPOST: async (req, res) => {
        try {
            const { house_name, place, city, pincode, state } = req.body;
            const userId = new mongoose.Types.ObjectId(req.session.id1)
            
    
            if (userId) {
                await profilemodel.findOneAndUpdate(
                    {userSignupDta: userId },
                    {
                        house_name,
                        place,
                        city,
                        pincode,
                        state,
                    },
                    { upsert: true }
                );
    
                return res.render('profile');
            } else {
                return res.send("Sorry, user not found");
            }   
    
        } catch (error) {
            console.log(error);
            return res.status(500).send('Internal Server Error');
        }
    },
    checkoutGET: async (req, res) => {
        try {
            if (!req.session || !req.session.id1) {
                throw new Error('User session ID not found');
            }
            const userID = new mongoose.Types.ObjectId(req.session.id1);
            const userdata = await profilemodel.findOne({ userSignupDta: userID });
            const udersignupdata = req.session.user
            udersignupdata.password=null
            const totalprice = Math.round(req.session.price)
            
            
            res.render('userhomepages/checkout',{userdata,udersignupdata,totalprice});
        } catch (error) {
            console.error(error);
            res.status(500).send('Internal Server Error');
        } 
    },
    checkoutPost: async (req, res) => {
        
        try {
            const userId = new mongoose.Types.ObjectId(req.session.id1);
            const cart = await cartmodel.findOne({ userID: userId });
    
            // Extracting product details from the cart
            const productDetails = cart.productID.map(item => ({
                productId: item.id,
                quantity: item.quantity
            
            }));
            

            const { firstname, lastname, email, mobile, address, country, city, state, zipcode, coupon, payment } = req.body;
            const amount = req.session.price;
    
          // Updating the checkout model
          await checkoutmodel.findOneAndUpdate(
            { userid: userId },
            {
                // Wrap productDetails in an array to match the schema
                productid: productDetails.map(item => item.productId),
                // Wrap shipping address in an array to match the schema
                shiping_adderss: [{
                    firstname: firstname,
                    lastname: lastname,
                    address: address,
                    email: email,
                    mobile: mobile,
                    country: country,
                    city: city,
                    state: state,
                    zipcode: zipcode
                }],
                totalamount: amount,
                paymentoption: payment,
                cartid: cart._id,
                coupon: coupon
            
            },
            { upsert: true, new: true } // upsert option to create if document doesn't exist
            );
            await Promise.all(cart.productID.map(async item => {
                await productmodel.findByIdAndUpdate(item.id, { $inc: { stock: -item.quantity } });
            }));

            await cartmodel.findOneAndDelete({ userID: userId });
        
        } catch (error) {
            console.error(error);       
            res.status(500).json({message:"some issues  try again"})
        }
    },


    checkoutfinan: async (req, res) => {
        const id = new mongoose.Types.ObjectId(req.session.id1);
       
        try {
            const checkdata = await checkoutmodel.findOne({ userid: id });
            if (!checkdata.paymentoption) {
                return res.status(500).json({ message: "Payment option not selected" });
            }
            console.log(checkdata.paymentoption);
            if (checkdata.paymentoption == 'cash on delivery') {
                const checkoutid = await checkoutmodel.findOne({ userid: id });
                const checkid = new mongoose.Types.ObjectId(checkoutid._id);
                const productid = (checkoutid.productid)
                

                const data = new ordermodel({
                    userid: id ,
                    checkoutid: checkid,
                    productid:productid,
                    active:'active'
                });
               await data.save()
            
               
    
                return res.status(200).json({ message: "You selected cash on delivery" });
            } else if (checkdata.paymentoption == 'online payment') {

                const options = {
                    amount: 1000, // amount in the smallest currency unit
                    currency: "INR",
                    receipt: "order_rcptid_11",
                    payment_capture: 1
                };
            
                console.log('gggggggggggggggggggggg');
                
                const razorpayOrder = await instance.orders.create(options);
                
            

                
                // Return Razorpay order ID to the client
                return res.status(201).json({ orderId: razorpayOrder.id });
            
            } else {
                return res.status(400).json({ message: "Some issues in payment options" });
            }
            // You cannot send another response here after sending JSON responses
            // res.render('userhomepages/index');
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Some issues, please try again" });
        }
    },
    
    
    orderhistoryGET: async (req, res) => {
        try {
            const id = new mongoose.Types.ObjectId(req.session.id1);
            
            const order = await ordermodel.find({ userid: id }).populate('checkoutid').populate('productid');
            console.log(order); // Corrected typo here
            
            res.render('userhomepages/Order_history', { order }); // Assuming you want to pass the order data to the template
    
        } catch (error) {
            console.error(error);
            // Handle error appropriately, send an error response, or render an error page
        }
    },
    ordesummeryGET: async (req,res)=>{
        const orderid = new mongoose.Types.ObjectId(req.query.id)
        console.log(orderid);   
        try{
            const ordersummery = await ordermodel.findOne({_id:orderid}).populate('checkoutid').populate('productid');
            
            res.render('userhomepages/ordersummery',{ordersummery})

        }catch{

        }

    },
    
    

    addcoponPost: async (req,res)=>{
        console.log(req.body);

        try{
            const coupondata = await couponmodel.findOne(req.body)
            const pricedata = req.session.price
            if(coupondata && coupondata.min_rate <= pricedata){
              const disountprice= Math.round((pricedata - ((pricedata*coupondata.discount)/100)));
             
            
              
                res.status(200).json({  
                    disountprice: disountprice,
                    discount:coupondata.discount,
                    totalprice:pricedata
                });
              
            }

        }catch(error){
            console.error(error);
            res.status(500).send("Error occurred");

        }
    },
    canselorderPOST: async (req, res) => {
        try {
            const orderId = new mongoose.Types.ObjectId(req.query.id); // Parse the order ID from the query parameter
    
            // Find the order by ID
            const order = await ordermodel.findOne({ _id: orderId });
    
            // Check if the order status is 'placed' before canceling
            if (order && order.status === 'placed') {
                // Update the order status to 'canceled'
                await ordermodel.findOneAndUpdate(
                    { _id: orderId }, // Find order by its ID
                    { $set: { status: 'canceled' } }, // Update the status field
                    { new: true } // Return the updated document
                );
            } else if (order && order.status === 'delivered') {
                // Update the order status to 'canceled'
                await ordermodel.findOneAndUpdate(
                    { _id: orderId }, // Find order by its ID
                    { $set: { status: 'return' } }, // Update the status field
                    { new: true } // Return the updated document
                );
            } else {
                // Return a message indicating that the order cannot be canceled
                return res.status(400).json({ message: "Order cannot be canceled" });
            }
    
            // Fetch the updated list of orders for the user
            const userId = new mongoose.Types.ObjectId(req.session.id1);
            const orders = await ordermodel.find({ userid: userId }).populate('checkoutid').populate('productid');
            
            // Render the Order History page with the updated list of orders
            res.render('userhomepages/Order_history', { order: orders }); 
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error canceling order" });
        }
    }
    





   
    
    
    
          


}