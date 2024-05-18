const express = require('express')
const { Server } = require('socket.io')
const config = require('./config.js')
const app = express()
const server = require('http').createServer(app)
const io = new Server(server)

app.use(express.static('public'))

const fullurl = (url, query = {}) => `${url}?${(new URLSearchParams(query)).toString()}`

io.on('connection', (socket) => {
  console.log('connected', socket.id)

  const emit = (event, ...args) => socket.emit(event, ...args)

  const request = (name, method, url, { query = {}, headers = {}, body = null } = {}) =>
    fetch(fullurl(url, query), { method, headers, body })
      .then((res) => res.json())
      .then((json) => emit('fetch', { name, method, url, json }))
      .catch((err) => emit('fetch error', { name, method, url, err }))

  const chooseRequest = (name, method, url, { query = {}, headers = {}, body = null } = {}) => {
    switch (name) {
      case 'News API (everything)': return request(name, method, url, { query: { ...query, 'apiKey': config.api_key.news_api }, headers, body })
      case 'News API (top headlines)': return request(name, method, url, { query: { ...query, 'apiKey': config.api_key.news_api }, headers, body })
    }

    return request(name, method, url, { query, headers, body })
  }

  socket.on('message', (data) => Promise.resolve(JSON.parse(data)).then(({ name, input: { method, url, query, headers, body } = {} } = {}) => chooseRequest(name, method, url, { query, headers, body })))

})

server.listen(process.env.PORT, () => console.log('server running'))
