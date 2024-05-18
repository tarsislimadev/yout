import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  id = Date.now()
  name = ''
  side = null
  input = null
  output = null
  error = null

  constructor(name, { side = 'none', input = {}, output = {}, error = null } = {}) {
    super()

    this.name = name
    this.input = input
    this.side = side
    this.output = output
    this.error = error
  }

  toJSON() {
    const { id, name, side, input, output } = this
    return { id, name, side, input, output }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }
}
