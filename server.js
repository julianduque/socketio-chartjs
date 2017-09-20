'use strict'

const http = require('http')
const path = require('path')
const EventEmitter = require('events')
const express = require('express')
const socketio = require('socket.io')
const port = process.env.PORT || 8888

const app = express()
const server = http.createServer(app)
const io = socketio(server)
const events = new EventEmitter()

app.use(express.static(path.join(__dirname, 'public')))

io.on('connect', socket => {
  events.on('temperature', value => {
    socket.emit('temperature', value)
  })
})

// This function will be changed for the J5 sensor event
// sensor.on('change', function () {
//   events.emit('temperature', this.celsius)
// })
//
setInterval(() => {
  const temperature = Math.round(Math.random() * 10)
  events.emit('temperature', temperature)
}, 1000)


server.listen(port, () => console.log(`Listening on port ${port}`))
