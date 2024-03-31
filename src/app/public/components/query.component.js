import { HTML } from '@brtmvdl/frontend'
import { NewsAPIComponent } from './query/newsapi.component.js'

export class QueryComponent extends HTML {
  children = {
    newsapi: new NewsAPIComponent(),
  }
}
