#! /usr/bin/env node

const killPortPS = require('./')
const argv = process.argv.slice(2)

killPortPS(argv[0]).then((result) => {
  console.log(`Process on port ${argv[0]} killed`)
}).catch((e) => {
  console.log(e.message)
})
