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
    return this.children.form
  }

  getMessages() {
    return this.children.messages
  }
}
