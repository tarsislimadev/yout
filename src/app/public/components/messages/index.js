import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { KeyValueHTML } from '../key-value.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { TextHTML } from '../text.html.js'
import { CardHTML } from '../card.html.js'
import { AudioHTML } from '../audio.html.js'
import * as str from '../../utils/str.js'

export class MessageCardHTML extends CardHTML {
  data = null

  constructor(data) {
    super()
    this.data = data
  }

  onCreate() {
    super.onCreate()
    this.setAttr('id', this.data.id)
    this.append(this.getHeaderHTML())
    this.append(this.getBodyHTML())
    this.append(this.getFooterHTML())
  }

  getHeaderHTML() {
    const header = new CardHeaderHTML()
    header.append(new TextHTML(this.data.input.name))
    return header
  }

  getBodyHTML() {
    switch (this.data.side) {
      case 'input': return this.getInputHTML()
      case 'output': return this.getOutputHTML()
      case 'error': return this.getErrorHTML()
    }

    return new HTML()
  }

  getInputHTML() {
    return new HTML()
  }

  getOutputHTML() {
    return new HTML()
  }

  getErrorHTML() {
    const body = new CardBodyHTML()
    body.setText(this.data.error.message)
    return body
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    const flex = new nFlex()
    flex.append(new TextHTML(this.data.side))
    flex.append(new TextHTML(this.data.id, str.timestamp2str(this.data.id)))
    footer.append(flex)
    return footer
  }
}

export class TableMessageCardHTML extends MessageCardHTML {
  createData(text) {
    const td = new nTd()
    td.setStyle('border', '1px solid #000000')
    td.setStyle('padding', 'calc(1rem / 4)')
    td.setText(text)
    return td
  }

  createRow(arr) {
    const tr = new nTr()
    Array.from(arr).map((text) => tr.append(this.createData(text)))
    return tr
  }

  getTableHTML(rows = [], ths = null) {
    if (rows.length === 0) return new HTML()
    const table = new nTable()
    table.setStyle('border', '1px solid #000000')
    table.setStyle('border-collapse', 'collapse')
    table.append(this.createRow(Array.from(ths === null ? Object.keys(rows[0]) : ths)))
    Array.from(rows).map((row) => table.append(this.createRow(Object.keys(row).map((col) => row[col]))))
    return table
  }
}

export class NewsApiEverythingMessageCardHTML extends TableMessageCardHTML {
  getInputHTML() {
    const { from, q, sortBy, to } = this.data.input.query
    const input = new CardBodyHTML()
    input.append(new KeyValueHTML('q', q))
    input.append(new KeyValueHTML('from', from))
    input.append(new KeyValueHTML('to', to))
    input.append(new KeyValueHTML('sortBy', sortBy))
    return input
  }

  getOutputHTML() {
    const articles = Array.from(this.data.output.articles).map(({ author, title, description, url, urlToImage, publishedAt, content }) => ({ title, url, description, content, urlToImage, author, publishedAt }))
    const output = new CardBodyHTML()
    output.append(new KeyValueHTML('Total of results', this.data.output.totalResults))
    output.append(this.getTableHTML(articles))
    return output
  }
}

export class NewsApiTopHeadlinesMessageCardHTML extends NewsApiEverythingMessageCardHTML {
  getInputHTML() {
    const { country, category } = this.data.input.query
    const input = new CardBodyHTML()
    input.append(new KeyValueHTML('country', country))
    input.append(new KeyValueHTML('category', category))
    return input
  }
}

export class VoiceRssApiMessageCardHTML extends MessageCardHTML {
  getInputHTML() {
    const input = new CardBodyHTML()
    input.append(new KeyValueHTML('src', this.data.input.query.src))
    input.append(new KeyValueHTML('hl', this.data.input.query.hl))
    return input
  }

  getOutputHTML() {
    const output = new CardBodyHTML()
    output.setText('Audio:')
    output.append(new AudioHTML('url'))
    return output
  }
}
