import { HTML, nFlex, nTable, nTr, nTd } from '@brtmvdl/frontend'
import { CardHeaderHTML } from '../card-header.html.js'
import { CardFooterHTML } from '../card-footer.html.js'
import { CardBodyHTML } from '../card-body.html.js'
import { TextHTML } from '../text.html.js'
import { CardHTML } from '../card.html.js'

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
    header.append(new TextHTML('header'))
    return header
  }

  getBodyHTML() {
    const body = new CardBodyHTML()
    this.append(this.getDataHTML(this.data))
    return body
  }

  getDataHTML(message = new Messagemodel()) {
    switch(message.side) {
      case 'input': return this.getInputHTML()
      case 'output': return this.getOutputHTML()
      case 'error': return this.getErrorHTML()
    }
  }

  getInputHTML() {
    return new HTML()
  }

  getOutputHTML() {
    return new HTML()
  }

  getErrorHTML() {
    return new HTML()
  }

  getFooterHTML() {
    const footer = new CardFooterHTML()
    footer.append(new TextHTML('footer'))
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

export class NewsApiEverythingMessageCardHTML extends MessageCardHTML {
  getInputHTML() {
    const input = new CardBodyHTML()
    input.setText('input')
    return input
  }

  getOutputHTML() {
    const output = new CardBodyHTML()
    output.setText('output')
    return output
  }
}
