import { HTML, nFlex, nImage, nLink } from '@brtmvdl/frontend'
import { FormComponent } from './components/form.component.js'
import { MessagesComponent } from './components/messages.component.js'

export class Page extends HTML {
  state = {
    socket: io('http://localhost:8080/'),
  }

  children = {
    buttons: new HTML(),
    logo: new HTML(),
    form: new FormComponent(),
    messages: new MessagesComponent(),
  }

  onCreate() {
    this.append(this.getHeader())
    this.append(this.getBody())
    this.socketEvents()
  }

  getHeader() {
    return this.getLogoLink()
  }

  getLogoLink() {
    const logo = new HTML()
    logo.setText('Yout')
    logo.setStyle('padding', '1rem')
    const link = new nLink()
    link.href('?' + Date.now())
    link.append(logo)
    return this.children.logo.append(link)
  }

  getBody() {
    const html = new nFlex()
    html.append(this.getForm())
    html.append(this.getMessages())
    return html
  }

  getForm() {
    this.children.form.on('submit', (data) => this.onFormSubmit(data))
    return this.children.form
  }

  onFormSubmit({ value: { name, url, method } } = {}) {
    this.state.socket.emit('fetch', { name, url, method })
  }

  getMessages() {
    return this.children.messages
  }

  socketEvents() {
    this.state.socket.on('fetch', ({ name, method, url, json }) => this.children.messages.dispatchEvent('fetch', { name, method, url, json }))
    this.state.socket.on('fetch error', ({ name, method, url, error }) => this.children.messages.dispatchEvent('fetch error', { name, method, url, error }))
  }
}
