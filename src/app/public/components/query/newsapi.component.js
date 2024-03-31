import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from '../input.text.group.js'
import { DatetimeGroupComponent } from '../datetime.group.js'
import { Component } from './component.js'

export class NewsAPIComponent extends Component {
  children = {
    q: new InputTextGroupComponent('q'),
    from: new DatetimeGroupComponent('from'),
    to: new DatetimeGroupComponent('to'),
    apiKey: new InputTextGroupComponent('apiKey'),
    sortBy: new InputTextGroupComponent('sortBy', 'publishedAt'),
  }

  getComponent(name) {
    if (this.children[name]) {
      return this.children[name]
    }

    return new HTML()
  }

  getValue(name) {
    if (this.children[name]) {
      return this.children[name].getValue()
    }

    return null
  }

}
