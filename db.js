const low = require('lowdb') // require lowdb to use 

const FileSync = require('lowdb/adapters/FileSync') // select adapter 
var adpter = new FileSync('db.json')
const db = low(adpter) // create a new object by calling low and input adapter

//set some defaults 
db.defaults({ users: [] })
  .write();

module.exports = db;