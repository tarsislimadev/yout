import { HTML } from '@brtmvdl/frontend'
import { InputTextGroupComponent } from './input-text-group.component.js'
import { padLeft } from '../utils/str.js'

export class InputsComponent extends HTML {
  children = {
    q: new InputTextGroupComponent('q'),
    from: new InputTextGroupComponent('from', this.getFromInputDate()),
    to: new InputTextGroupComponent('to'),
    sortBy: new InputTextGroupComponent('sortBy', 'popularity'),
    country: new InputTextGroupComponent('country'),
    category: new InputTextGroupComponent('category'),
    apiKey: new InputTextGroupComponent('apiKey', '', 'password'),
  }

  getFromInputDate() {
    const date = new Date()
    const day = +date.getDate()
    const month = +date.getMonth() + 1
    const year = +date.getFullYear()
    return [year, month, day].map((d) => padLeft(d, 2, '0')).join('-')
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}
