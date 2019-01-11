const http = require('http')
const app = require ('./app')
const server = http.createServer(app)
const {port} = require ('./config/config')
server.listen(port,() =>{
    console.log('Server Is Up On '+port+' Baby -_^ ')}
)