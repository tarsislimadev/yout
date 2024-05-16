import { JSONableModel } from './jsonable.model.js'

export class RequestModel extends JSONableModel {
  name = ''
  method = ''
  url = ''
  query = ''
  headers = ''
  body = ''
  content_type = ''

  constructor(name, method, url, { query = [], headers = [], body = null } = {}, { content_type = 'application/json' } = {}) {
    super()
    this.name = name
    this.method = method
    this.url = url
    this.query = query
    this.headers = headers
    this.body = body
    this.content_type = content_type
  }

}
