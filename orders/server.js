const http =require('http')
const app= require("./app")
const {port} = require('./config/config')
const server =http.createServer(app)
server.listen(port,() =>{
    console.log('Server Is Up On '+ port +' Baby -_^ ')
})