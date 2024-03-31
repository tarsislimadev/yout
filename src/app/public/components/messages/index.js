import { HTML } from '@brtmvdl/frontend'

export class MessageHTML extends HTML {
  onCreate() {
    this.setText('message html')
  }
}

export class NewsApiMessageHTML extends MessageHTML {
  onCreate() {
    this.setText('news api message html')
  }
}
