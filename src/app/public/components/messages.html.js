import { HTML } from '@brtmvdl/frontend'
import * as messages from './messages/index.js'

export class MessagesHTML extends HTML {
  onCreate() {
    super.onCreate()
    this.setEvents()
    this.setStyle('padding', '1rem')
  }

  setEvents() {
    this.on('message', (data) => this.onMessage(data))
  }

  onMessage({ value } = {}) {
    this.prepend(this.getMessageHTML(value))
  }

  getMessageHTML(message) {
    switch (message.input.name) {
      case 'News API (everything)': return new messages.NewsApiEverythingMessageCardHTML(message)
      case 'News API (top headlines)': return new messages.NewsApiTopHeadlinesMessageCardHTML(message)
      case 'Voice RSS API (text to speech)': return new messages.VoiceRssApiMessageCardHTML(message)
    }
    return new HTML()
  }
}
