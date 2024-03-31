const express = require('express')
const { Server } = require('socket.io')

const app = express()
const server = require('http').createServer(app)
const io = new Server(server)

app.use(express.static('public'))

const request = (method, url) => fetch(url, { method, }).then(res => res.json())

io.on('connection', (socket) => {
  console.log('connected', socket.id)

  const emit = (event, ...args) => socket.emit(event, ...args)

  const fetch = (name, method, url) => request(method, url).then(json => emit('fetch', { name, method, url, json })).catch(err => emit('fetch error', { name, method, url, err }))

  socket.on('fetch', ({ name, method, url }) => fetch(name, method, url))

})

server.listen(process.env.PORT, () => console.log('server running'))
