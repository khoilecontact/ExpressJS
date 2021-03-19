var express = require('express')
const app = express() // tao 1 express moi
const port = 3000
var bodyParser = require('body-parser')

var usersRouter = require('./routes/users.route')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use(express.static('public')) // it means that we storage files in public

app.set('view engine', 'pug'); //install pug as view
app.set('views', './views'); // view 

app.get('/',(req,res)=> {
  res.render('index.pug', {
    name: "AAA" 
  })
}) // dinh danh thong tin gi se duoc response khi get /
//render khi can template tu 1 file khac, sau do truyen object vao 

app.use('/users', usersRouter)

app.listen(port, () => {
  console.log('Example app listening at' +port)
}) // lang nghe o port va callback 1 function
