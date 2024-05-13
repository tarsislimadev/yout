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
    this.children.form.on('submit', (data) => this.onFormHtmlSubmit(data))
    this.children.form.on('save', (data) => this.children.form.dispatchEvent('messages', this.state.messages))
    return this.children.form
  }

  onFormHtmlSubmit({ value: { method, input } } = {}) {
    const message = new MessageModel(method, { input, side: 'input' })
    this.sendMessage(message)
  }

  sendMessage(message = new MessageModel()) {
    this.addMessage(message)
    // send message
  }

  getMessagesHTML() {
    return this.children.messages
  }

  addMessage(message = new MessageModel()) {
    this.state.messages.push(message)
    this.children.messages.dispatchEvent('message', message)
  }
}
