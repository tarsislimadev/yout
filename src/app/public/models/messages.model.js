import { JSONableModel } from './jsonable.model.js'

export class MessageModel extends JSONableModel {
  id = Date.now()
  method = ''
  side = null
  input = null
  output = null
  error = null

  constructor(method, { side = 'none', input = {}, output = {}, error = true } = {}) {
    super()

    this.method = method
    this.input = input
    this.side = side
    this.output = output
    this.error = error
  }

  toJSON() {
    const { id, method, input } = this
    return { id, method, params: input }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  asJSON() {
    const { id, method, side, input, output } = this
    return { id, method, side, input, output }
  }

}
