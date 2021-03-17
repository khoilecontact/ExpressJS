
var express = require('express')
const app = express() // tao 1 express moi
const port = 3000

var users = [
  {id: 1, name: "Khoi Le"},
  {id: 2, name: "Khoi Nguyen"}

];

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',(req,res)=> {
  res.render('index.pug', {
    name: "AAA"
  })
}) // dinh danh thong tin gi se duoc response khi get /

app.get('/users',(req,res)=> {
  res.render('users/index', {
    users: users
  })
})

app.get('/users/search', (req,res) => {
  var q=req.query.q;
  var matchedUsers = users.filter(function(user) {
    return (user.name.toLowerCase().indexOf(q.toLowerCase()) != -1);
  });
  res.render('users/index', {
    users: matchedUsers
  })
} )

app.listen(port, () => {
  console.log('Example app listening at' +port)
}) // lang nghe o port va callback 1 function
