import { HTML } from '@brtmvdl/frontend'

import { InputTextGroupComponent } from './input-text-group.component.js'

export class InputsComponent extends HTML {
  children = {
    apiKey: new InputTextGroupComponent('apiKey'),
    q: new InputTextGroupComponent('q'),
    from: new InputTextGroupComponent('from'),
    to: new InputTextGroupComponent('to'),
    sortBy: new InputTextGroupComponent('sortBy'),
    apiKey: new InputTextGroupComponent('apiKey'),
    country: new InputTextGroupComponent('country'),
    category: new InputTextGroupComponent('category'),
    apiKey: new InputTextGroupComponent('apiKey', '', 'password'),
  }

  getComponent(component = '') {
    return this.children[component]
  }

  getValue(component) {
    return this.children[component].getValue()
  }
}
