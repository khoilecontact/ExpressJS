
var express = require('express')
const app = express() // tao 1 express moi
const port = 3000
var bodyParser = require('body-parser')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


var users = [
  {id: 1, name: "Khoi Le"},
  {id: 2, name: "Khoi Nguyen"}

]; // array of objects

app.set('view engine', 'pug'); //install pug as view
app.set('views', './views'); // view 

app.get('/',(req,res)=> {
  res.render('index.pug', {
    name: "AAA" 
  })
}) // dinh danh thong tin gi se duoc response khi get /
//render khi can template tu 1 file khac, sau do truyen object vao 

app.get('/users',(req,res)=> {
  res.render('users/index', {
    users: users //truyen vao mang objects
  })
}) 

app.get('/users/search', (req,res) => {
  var q=req.query.q;
  var matchedUsers = users.filter(function(user) {
    return (user.name.toLowerCase().indexOf(q.toLowerCase()) != -1);
  }); //filter cac user co cac chu cai tim kiem trong user.name
  res.render('users/index', {
    users: matchedUsers
  })
} )

app.get('/users/create', (req, res)=> {
res.render('users/create')
}); //tao site create va tro den template create trong thu muc users 

app.post('/users/create', (req, res)=> {
users.push(req.body); // save information posted by human
res.redirect('/users');
});

app.listen(port, () => {
  console.log('Example app listening at' +port)
}) // lang nghe o port va callback 1 function
