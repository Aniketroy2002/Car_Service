const express=require('express')
const path=require('path')
const bodyParser=require('body-parser')
const mongoose = require('mongoose');
const multer = require('multer');

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
const port=process.env.PORT || 9000;
app.set('views', path.join(__dirname, 'public', 'partial'));
app.set('view engine','ejs')

// index page
app.use(express.static(path.join(__dirname,'/public')));
app.get("/",(req,res)=>{
    // res.render("C:\\Users\\HP\\Desktop\\Backend\\car_service\\public\\partial\\index.ejs")
    res.render("index")
})
// about us page 
app.get("/about",(req,res)=>{
    // res.render("C:\\Users\\HP\\Desktop\\Backend\\car_service\\public\\partial\\about.ejs")
    res.render("about")
})
// contact us
app.get("/contact",(req,res)=>{
    // res.render("C:\\Users\\HP\\Desktop\\Backend\\car_service\\public\\partial\\contact.ejs")
    res.render("contact")
})
app.get("/uploads",(req,res)=>{
    // res.render("C:\\Users\\HP\\Desktop\\Backend\\car_service\\public\\partial\\admin.ejs")
    res.render("admin")
})
app.get("/product",(req,res)=>{
  // res.render("C:\\Users\\HP\\Desktop\\Backend\\car_service\\public\\partial\\product.ejs")
  res.render("product")
})

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/admin-panel', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

  // MongoDB Model for Image
const ImageSchema = new mongoose.Schema({
    filename: String,
    path: String,
    contentType: String,
    createdAt: {
      type: Date,
      default: Date.now,
    },
  });
  
  const Image = mongoose.model('Image', ImageSchema);

  // Set up Multer for File Uploads
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'), // Absolute path to the uploads folder
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: (req, file, cb) => {
      checkFileType(file, cb);
    },
  }).single('image');
  
  // Check File Type
  function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
  
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images Only!');
    }
  }

  // Route for Image Upload
app.post('/admin/upload', (req, res) => {
    upload(req, res, async (err) => {
      if (err) {
        res.status(400).json({ message: err });
      } else {
        if (req.file === undefined) {
          res.status(400).json({ message: 'No file selected!' });
        } else {
          try {
            const newImage = new Image({
              filename: req.file.filename,
              path: req.file.path,
              contentType: req.file.mimetype,
            });
  
            await newImage.save();
  
            res.status(201).json({
              message: 'Image uploaded successfully!',
              file: `uploads/${req.file.filename}`,
            });
          } catch (error) {
            res.status(500).json({ message: 'Server error, please try again later.' });
          }
        }
      }
    });
  });

  // API Route to Get All Images
app.get('/api/images', async (req, res) => {
    try {
      const images = await Image.find();
      res.json(images);
    } catch (err) {
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  });

app.listen(port,()=>{
    console.log(`Server running at port no. http://localhost:${port}`)
})