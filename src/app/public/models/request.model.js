import { JSONableModel } from './jsonable.model.js'

export class RequestModel extends JSONableModel {
  name = ''
  method = ''
  url = ''
  query = ''
  headers = ''
  body = ''

  constructor(name, method, url, { query = [], headers = [], body = null } = {}) {
    super()
    this.name = name
    this.method = method
    this.url = url
    this.query = query
    this.headers = headers
    this.body = body
  }

}
