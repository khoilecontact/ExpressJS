var express = require('express');
var router = express.Router();
const shortid = require('shortid')


var controller = require('../controllers/product.controller')
var db = require('../db')


module.exports = router;

router.get('/', controller.index);