var db = require('../db');
var shortid = require('shortid')

module.exports.index = (req, res)=> {
    res.render('users/index.pug', {
        users: db.get('users').value() //truyen vao mang objects tu database
      })
   };

module.exports.search = (req,res) => {
    var q=req.query.q;
    var matchedUsers = db.get('users').value().filter(function(user) {
      return (user.name.toLowerCase().indexOf(q.toLowerCase()) != -1);
    }); //filter cac user co cac chu cai tim kiem trong user.name
    res.render('users/index', {
      users: matchedUsers
    })
  } 

module.exports.create = (req, res)=> {
    res.render('users/create')
    }

module.exports.get = (req,res)=>{ //dynamic routing :id
    var id = req.params.id //point to contained variable 
    var user = db.get('users').find({id: id}).value()
  
    res.render('users/view', {
      user: user
    })
  }

module.exports.postCreate =  (req, res)=> {
    req.body.id=shortid.generate();
    db.get('users').push(req.body).write(); // save information posted by human 
   // replace users by db.get('users') cuz we are using database now 
   // .write() to save data to file  
    res.redirect('/users');
   }