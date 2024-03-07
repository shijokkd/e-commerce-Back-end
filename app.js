const express = require('express')
const app = express();
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/adminpage').then(()=> {console.log('connected');}).catch(()=> console.log('error'))

require('dotenv').config()
const  session=require('express-session')  
const noCache=require('nocache')

app.use(session({
    secret:'dcart',
    resave:true,
    saveUninitialized:false
  }));                            ///////   session setings
  
  app.use(noCache());      //////using nocache
  
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json()) 
app.use(express.urlencoded({extended:true})) 


const userRoutes = require('./routes/userRoutes')
const adminRouter = require('./routes/adminrouts')

app.use(express.static('public'));



const port = process.env.PORT || 3000;







app.set("view engine","ejs")
app.set("views","views")       //// display  ejs files 





app.use('/',userRoutes)
app.use('/admin',adminRouter)




app.listen(port ,()=>{
    console.log(`port is running in ${port}`);
});