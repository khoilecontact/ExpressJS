var db = require('../db')

module.exports.requireAuth = (req, res, next) => {
    if (!req.signedCookies.userId) {
        res.redirect('/auth/login');
        return; // should return
    }

    var user = db.get('users').find({id: req.signedCookies.userId}).value();

    if (!user) {
        res.redirect('/auth/login');
        return;
    }

    res.locals.user = user // put it here so we dont have to transfer the user into common.pug file

    next()
}