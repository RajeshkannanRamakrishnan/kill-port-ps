const killPortPS = require('./')
const http = require('http')

const port = 8000

const server = http.createServer((req, res) => {
  res.write('A simple node module to kill the running port process')
  res.end()
}).listen(port,() => {
  console.log(`Server listening on port ${port}`)
})

setTimeout(() =>{
  killPortPS(port)
    .then(console.log)
    .catch(console.log)
}, 5000)
