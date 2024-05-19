const { Database } = require('@brtmvdl/database')
const express = require('express')
const { Server } = require('socket.io')
const app = express()
const server = require('http').createServer(app)
const io = new Server(server)
const db = new Database({ type: 'fs', config: '/data' })

app.use(express.static('public'))
app.use(express.json())

const fullurl = (url, query = {}) => `${url}?${(new URLSearchParams(query)).toString()}`

const savefile = (name, file = 'file') => db.in('files').new().write('name', name).write('file', file)

app.get('/wav/:id', ({ params: { id } }, res) => res.set('Content-Type', 'audio/wav').send(db.in('files').findById(id).read('file')))

app.get('/wavs', (_, res) => res.json({ list: db.in('files').list().map(({ id }) => ({ id })) }))

io.on('connection', (socket) => {
  console.log('connected', socket.id)

  const emit = (event, ...args) => socket.emit(event, ...args)

  const voicerss_request = (name, method, url, { query = {}, headers = {}, body = null } = {}) =>
    fetch(fullurl(url, query), { method, headers, body })
      .then((res) => res.blob().then((b) => b.stream()))
      .then((stream) => stream.getReader().read())
      .then((file) => savefile(`${Date.now()}`, Buffer.from([...file.value]).toString()))
      .then((json) => emit('fetch', { name, method, url, json }))
      .catch((err) => [emit('fetch error', { name, method, url, err: { message: err.message } }), console.error(err)])

  const request = (name, method, url, { query = {}, headers = {}, body = null } = {}) =>
    fetch(fullurl(url, query), { method, headers, body })
      .then((res) => res.json())
      .then((json) => emit('fetch', { name, method, url, json }))
      .catch((err) => emit('fetch error', { name, method, url, err: { message: err.message } }))

  const chooseRequest = (name, method, url, { query = {}, headers = {}, body = null } = {}) => {
    switch (name) {
      case 'News API (everything)': return request(name, method, url, { query: { ...query, 'apiKey': process.env.NEWSAPI_APIKEY }, headers, body })
      case 'News API (top headlines)': return request(name, method, url, { query: { ...query, 'apiKey': process.env.NEWSAPI_APIKEY }, headers, body })
      case 'Voice RSS API (text to speech)': return voicerss_request(name, method, url, { query: { ...query, 'key': process.env.VOICERSS_APIKEY }, headers, body })
    }

    return request(name, method, url, { query, headers, body })
  }

  socket.on('message', (data) => Promise.resolve(JSON.parse(data)).then(({ name, input: { method, url, query, headers, body } = {} } = {}) => chooseRequest(name, method, url, { query, headers, body })))

})

server.listen(process.env.PORT, () => console.log('server running'))
