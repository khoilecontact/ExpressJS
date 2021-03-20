var express = require('express');
var router = express.Router();
const shortid = require('shortid')

var controller = require('../controllers/user.controller')
var db = require('../db')


module.exports = router;

var validate = require('../validate/users.validate') //call the vailidate file 


router.get('/', controller.index) 

router.get('/search', controller.search) 
  
  
router.get('/create', controller.create); //tao site create va tro den template create trong thu muc users 
  
router.get('/:id', controller.get)
  
router.post('/create',validate.postCreate ,controller.postCreate); // checking before posting 