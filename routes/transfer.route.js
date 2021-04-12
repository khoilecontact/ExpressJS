var express = require('express');
var router = express.Router();

var controller = require('../controllers/transfer.controller')
var db = require('../db')


module.exports = router; //export route (replace for app in index.js file)

router.get('/create', controller.create);
router.post('/create', controller.postCreate);