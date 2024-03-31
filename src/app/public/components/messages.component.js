import { HTML } from '@brtmvdl/frontend'
import * as messages from '../components/messages/index.js'

export class MessagesComponent extends HTML {
  children = {
    messages: new HTML(),
  }

  onCreate() {
    this.setStyle('padding', '1rem')
    this.on('fetch', ({ value: { name, method, url, json } }) => this.onFetch(name, method, url, json))
    this.on('fetch error', ({ value: { name, method, url, error } }) => this.onFetchError(name, method, url, error))
  }

  onFetch(name, method, url, json) {
    this.append(this.getMessageHTML(name, method, url, json))
  }

  getMessageHTML(name, method, url, json) {
    switch (name) {
      case 'newsapi': return new messages.NewsApiMessageHTML(method, url, json)
    }

    return new messages.MessageHTML(method, url, json)
  }

  onFetchError(name, method, url, error) {
    this.children.messages.append(this.getMessageErrorHTML(name, method, url, error))
  }

  getMessageErrorHTML(name, method, url, error) {
    return new messages.MessageHTML(method, url, {}, error)
  }
}
