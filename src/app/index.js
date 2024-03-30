const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = require('http').createServer(app)
const io = new Server(server)

app.use(express.static('public'))

io.on('connection', (socket) => {
  console.log('connected', socket.id)
  io.emit('datetime', Date.now())
  socket.on('message', (message) => console.log('message', message))
  socket.on('disconnect', () => console.log('disconnected', socket.id))
})

server.listen(process.env.PORT, () => console.log('server running'))
