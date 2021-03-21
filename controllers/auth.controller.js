var db = require('../db');


module.exports.login = (req, res)=> { // point to file login
    res.render('auth/login.pug', {
        users: db.get('users').value() 
      })
   };

module.exports.postLogin = (req,res) => { //check if there is a true account
    var username = req.body.username
    var password = req.body.password

    var user = db.get('users').find({username: username}).value() //find username in database


    if (!user) {
        res.render('auth/login', {
            errors: [ 
                "User does not exist" ],
            values: req.body
        })
        return 
    }

    if(user.password != password) {
        res.render('auth/login', {
            errors: [ 'Wrong password' ]
        })
        return 
    }

    res.cookie('userId', user.id)
    res.redirect('/users')

}