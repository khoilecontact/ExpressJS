var express = require('express');
var router = express.Router();

var controller = require('../controllers/auth.controller')
var db = require('../db')


module.exports = router; //export route (replace for app in index.js file)


router.get('/login', controller.login) 

router.post('/login', controller.postLogin)