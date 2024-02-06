const multer = require('multer')

// app.use(express.static('public'));
// app.use(express.static('/img'));

const storage = multer.diskStorage({
    destination: (req,file,callback)=>{
        callback(null,'./public/img');

    },
    filename :(req,file,callback)=>{
        const uniqueSuffix = Date.now() + '-' + file.originalname
        callback(null, uniqueSuffix)
    }
})


const upload = multer({ storage: storage })


module.exports = upload