'use strict'

const netstat = require('node-netstat')
const sh = require('shell-exec')
module.exports = function (port, protocol = 'tcp') {
  port = Number.parseInt(port)

  return new Promise((resolve, reject) => {
    if (!port) {
      reject(new Error('Invalid port number.'))
    }
    if (process.platform === 'win32') {
      let found = false
      netstat({
        filter: { protocol: protocol,
          local: {
            port: port
          }
        },
        limit: 1,
        done: (err) => {
          if (!found) {
            reject(new Error('Process not exist.'))
          }
        }
      }, (data) => {
        found = true
        if (data && data.pid) { return sh(`taskkill /PID ${data.pid} /F`) } else { reject(new Error('Something went wrong.')) }
      })
    } else {
      return sh(
        `lsof -i ${protocol === 'udp' ? 'udp' : 'tcp'}:${port} | grep ${protocol === 'udp' ? 'UDP' : 'LISTEN'} | awk '{print $2}' | xargs kill -9`
      )
    }
  })
}
