import { HTML, nFlex } from '@brtmvdl/frontend'
import { TopBarComponent, FormHTML, MessagesHTML } from './components/index.js'
import { MessageModel } from './models/messages.model.js'

export class Page extends HTML {
  state = {
    messages: [],
  }

  children = {
    top_bar: new TopBarComponent(),
    form: new FormHTML(),
    messages: new MessagesHTML(),
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
    const message = new MessageModel(method, { input: { name, method, url, query, headers, body }, side: 'input' })
    this.sendMessage(message)
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    this.fetch(message.input.method, message.input.url, { query: message.input.query, headers: message.input.headers, body: message.input.body })
      .then((json) => this.addMessage(new MessageModel(message.method, { side: 'output', input: message.input, output: json })))
  }

  fetch(method, url, { query, headers, body } = {}) {
    return fetch(`${url}?${(new URLSearchParams(query)).toString()}`, { method, headers, body })
      .then((res) => res.json())
      .catch((err) => console.error(err))
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
