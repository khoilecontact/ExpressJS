const db = require('../db');

module.exports.addToCart = (req, res, next) => {
    var productId = req.params.productId;
    var sessionId = req.signedCookies.sessionId;

    if (!sessionId) {
        res.redirect('/products');
        return;
    } //avoid sessionId is undefined 

    var count = db.get('session')
    .find({id: sessionId})
    .get('cart.' + productId, 0)
    .value() //how many product of this type is in the cart

    db.get('session')
    .find({id: sessionId})
    .set('cart.' + productId, count+1)
    .write() //add one more product 

    res.redirect('/products') //return to products

}