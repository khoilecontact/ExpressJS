var express = require('express');
var router = express.Router();
const shortid = require('shortid')

var db = require('../db')


module.exports = router;


router.get('/',(req,res)=> {
    res.render('users/index.pug', {
      users: db.get('users').value() //truyen vao mang objects tu database
    })
  }) 

router.get('/search', (req,res) => {
    var q=req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
      return (db.get('users').value().toLowerCase().indexOf(q.toLowerCase()) != -1);
    }); //filter cac user co cac chu cai tim kiem trong user.name
    res.render('users/index', {
      users: matchedUsers
    })
  } ) //testing not official  
  
  
  router.get('/create', (req, res)=> {
  res.render('users/create')
  }); //tao site create va tro den template create trong thu muc users 
  
  router.get('/:id', (req,res)=>{ //dynamic routing :id
    var id = req.params.id //add contained variable 
    var user = db.get('users').find({id: id}).value()
  
    res.render('users/view', {
      user: user
    })
  })
  
  router.post('/create', (req, res)=> {
   req.body.id=shortid.generate();
   db.get('users').push(req.body).write(); // save information posted by human 
  // replace users by db.get('users') cuz we are using database now 
  // .write() to save data to file  
   res.redirect('/users');
  });