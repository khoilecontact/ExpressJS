var express = require('express');
var router = express.Router();
const shortid = require('shortid')
const multer = require('multer')

var controller = require('../controllers/user.controller')
var db = require('../db')

const upload = multer({dest: './public/uploads/'}) // where to upload the image(form)

module.exports = router;

var validate = require('../validate/users.validate') //call the vailidate file 


router.get('/', controller.index) 

router.get('/search', controller.search) 
  
  
router.get('/create', controller.create); //tao site create va tro den template create trong thu muc users 
  
router.get('/:id', controller.get)

router.get('/cookie', controller.cookie)
  
router.post('/create', upload.single('avatar'), // check upload 1 avatar save to req.file 
validate.postCreate ,controller.postCreate); // checking before posting 