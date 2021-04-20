var express = require('express')
const app = express() // tao 1 express moi
const port = 3000
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')
var csurf = require('csurf');

//middleware
var authMiddleware = require('./middleware/auth.middleware')
const sessionMiddleware = require('./middleware/session.middleware')

var usersRouter = require('./routes/users.route'); // rquire route from the users.route file 
var authRoute = require('./routes/auth.route'); //require the route from route folder
var productRoute = require('./routes/product.route');
var cartRoute = require('./routes/cart.route');
var transferRoute = require('./routes/transfer.route');



app.use(express.static('public'));

app.use(express.json()); // for parsing application/json
app.use(express.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(cookieParser('asdaiafafkahf'));
app.use(sessionMiddleware); //effect all of the website
// app.use(csurf({cookie: true}));
app.use(express.static('public')); // it means that we storage files in public

app.set('view engine', 'pug'); //install pug as view
app.set('views', './views'); // view 

app.get('/',(req,res)=> {
  res.render('index.pug', {
    name: "Khoi Le testing" 
  });
}); // dinh danh thong tin gi se duoc response khi get /
//render khi can template tu 1 file khac, sau do truyen object vao 


app.use('/users',authMiddleware.requireAuth , usersRouter);
app.use('/auth', authRoute); //auth login
app.use('/products', productRoute);
app.use('/cart', cartRoute);
app.use('/transfer', transferRoute);


app.listen(port, () => {
  console.log('Example app listening at ' + port)
}) // lang nghe o port va callback 1 function
