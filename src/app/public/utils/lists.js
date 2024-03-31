// 

class API {
  name = null
  method = 'GET'
  url = 'https://'
  query = null
  headers = []
  body = {}

  constructor(name, method, url, query = [], headers = [], body = {}) {
    this.name = name
    this.method = method
    this.url = url
    this.query = query
    this.headers = headers
    this.body = body
  }
}

export const getApisList = () => ([
  new API('Yout',),
  new API('newsapi', 'GET', 'https://newsapi.org/v2/everything', ['q', 'from', 'to', 'apiKey', 'sortBy']),
])
