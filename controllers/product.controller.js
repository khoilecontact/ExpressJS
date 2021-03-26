var db = require('../db')

module.exports.index= (req, res) => {
    var page = parseInt(req.query.page) || 1;
    var perpage = 8; 

    var start = (page -1)*perpage;
    var end = start + perpage;

  res.render('product.pug', {
    products: db.get('products').value().slice(start, end)
  })
}