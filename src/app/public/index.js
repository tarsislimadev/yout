import { HTML, nButton } from '@brtmvdl/frontend'

export class Page extends HTML {
  state = {
    socket: io('http://localhost:8080/'),
  }

  children = {
    buttons: new HTML(),
  }

  onCreate() {
    this.state.socket.on('connection', (socket) => console.log('connection'))
    this.setText('page')
    this.append(this.getButtons())
  }

  getButtons() {
    const html = new HTML()
    html.append(this.createMessageButton('hello', () => 'world'))
    html.append(this.createMessageButton('datetime', () => Date.now()))
    return html
  }

  createMessageButton(text, message = (() => '')) {
    const button = new nButton()
    button.setText(text)
    button.on('click', () => this.state.socket.emit('message', message()))
    return button
  }
}
