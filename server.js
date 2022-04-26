require('dotenv').config()
const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require("socket.io")
const io = new Server(server)
const fs = require('fs')
const mytools = require('./modules/mytools')

app.set('view engine', 'ejs')
app.use(express.static('public'))

const items = JSON.parse(fs.readFileSync('./data-json/items.json')) // read items.json file
const orders = JSON.parse(fs.readFileSync('./data-json/orders.json')) // read orders.json file
mytools.generatePackage(orders, items).then((packages)=>{ // this method return an array of each palettes containing 15 packages containing all items by order < 30 kg
  console.log(packages)
})

server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})