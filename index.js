
var express = require('express')
const app = express() // tao 1 express moi
const port = 3000
var bodyParser = require('body-parser')
const shortid = require('shortid')
const low = require('lowdb') // require lowdb to use 
const FileSync = require('lowdb/adapters/FileSync') // select adapter 
var adpter = new FileSync('db.json')
const db = low(adpter) // create a new object by calling low and input adapter

//set some defaults 
db.defaults({ users: [] })
  .write();

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/* var users = [
  {id: 1, name: "Khoi Le"},
  {id: 2, name: "Khoi Nguyen"},
  {id: 3, name: "Thinh Tran"}


]; // array of objects */

app.set('view engine', 'pug'); //install pug as view
app.set('views', './views'); // view 

app.get('/',(req,res)=> {
  res.render('index.pug', {
    name: "AAA" 
  })
}) // dinh danh thong tin gi se duoc response khi get /
//render khi can template tu 1 file khac, sau do truyen object vao 

app.get('/users',(req,res)=> {
  res.render('users/index.pug', {
    users: db.get('users').value() //truyen vao mang objects tu database
  })
}) 

/* app.get('/users/search', (req,res) => {
  var q=req.query.q;
  var matchedUsers = db.get('users').value().filter(function(user) {
    return (db.get('users').value().toLowerCase().indexOf(q.toLowerCase()) != -1);
  }); //filter cac user co cac chu cai tim kiem trong user.name
  res.render('users/index', {
    users: matchedUsers
  })
} ) //testing not official */ 

app.get('/users/search', (req,res) => {
  var q=req.query.q;
  var arrayUsers = db.get('users').value();
  var matchedUsers = arrayUsers.filter(function(user) {
    return (user.toLowerCase().indexOf(q.toLowerCase()) != -1);
  }); //filter cac user co cac chu cai tim kiem trong user.name
  res.render('users/index', {
    users: matchedUsers
  })
} )


app.get('/users/create', (req, res)=> {
res.render('users/create')
}); //tao site create va tro den template create trong thu muc users 

app.get('/users/:id', (req,res)=>{ //dynamic routing :id
  var id = req.params.id //add contained variable 
  var user = db.get('users').find({id: id}).value()

  res.render('users/view', {
    user: user
  })
})

app.post('/users/create', (req, res)=> {
req.body.id=shortid.generate();
db.get('users').push(req.body).write(); // save information posted by human 
// replace users by db.get('users') cuz we are using database now 
// .write() to save data to file  
res.redirect('/users');
});

app.listen(port, () => {
  console.log('Example app listening at' +port)
}) // lang nghe o port va callback 1 function
