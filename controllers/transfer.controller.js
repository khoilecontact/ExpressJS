var db = require('../db')
var shortid = require('shortid')

module.exports.create = (req, res, next) => {
    res.render('transfer/create.pug', {
    csurfToken: req.csurfToken}
    )
}

module.exports.postCreate = (req, res, next) => {
    var data = {
        id: shortid.generate(),
        amount: parseInt(req.body.amount),
        accountId: req.body.accountId,
        userId: req.signedCookies.userId
    }
    db.get('transfers').push(data).write();
    res.redirect('/transfer/create');
}