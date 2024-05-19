import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent, FormHTML, MessagesHTML } from './components/index.js'
import { MessageModel } from './models/messages.model.js'

export class Page extends HTML {
  state = {
    messages: [],
    socket: this.getSocketConnection(),
  }

  children = {
    top_bar: new TopBarComponent(),
    form: new FormHTML(),
    messages: new MessagesHTML(),
  }

  getSocketConnection() {
    const socket = io('/')
    socket.on('connect', (data) => this.onSocketConnect(data, socket))
    socket.on('disconnect', () => this.onSocketDisconnect(null, socket))
    return socket
  }

  onSocketConnect(data, socket) {
    this.addMessage(new MessageModel('connect', { side: 'input', input: { id: socket.id } }))
    this.state.socket.on('fetch', (data) => this.onSocketFetch(data))
    this.state.socket.on('fetch error', (data) => this.onSocketFetchError(data))
  }

  onSocketFetch(data) {
    this.addMessage(new MessageModel(data.name, { side: 'output', output: data.json }))
  }

  onSocketFetchError(data) {
    this.addMessage(new MessageModel(data.name, { side: 'error', error: data.json }))
  }

  onSocketDisconnect(_, socket) {
    this.addMessage(new MessageModel('disconnect', { side: 'input', input: { id: socket.id } }))
  }

  onCreate() {
    super.onCreate()
    this.append(this.getTopBar())
    this.append(this.getFlex())
  }

  getTopBar() {
    return this.children.top_bar
  }

  getFlex() {
    const flex = (window.innerWidth > window.innerHeight) ? new nFlex() : new HTML()
    flex.append(this.getFormHTML())
    flex.append(this.getMessagesHTML())
    return flex
  }

  getFormHTML() {
    this.children.form.on('submit', (ev) => this.onFormHtmlSubmit(ev))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { name, method, url, query, headers, body } } = {}) {
    this.sendMessage(new MessageModel(name, { side: 'input', input: { method, url, query, headers, body } }))
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    this.state.socket.send(message.toString())
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
