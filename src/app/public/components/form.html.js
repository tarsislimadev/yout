import { HTML } from '@brtmvdl/frontend'
import { getEndpointsList, getEndpointFromList } from '../utils/lists.js'
import { SelectComponent } from './select.component.js'
import { ButtonComponent } from './button.component.js'
import { InputsComponent } from './inputs.component.js'

export class FormHTML extends HTML {
  children = {
    endpoint: new SelectComponent(),
    params: new HTML(),
    inputs: new InputsComponent(),
  }

  onCreate() {
    super.onCreate()
    this.setStyles()
    this.append(this.getEndpointSelect())
    this.append(this.getParamsHTML())
    this.append(this.getSendButton())
    this.append(this.children.inputs.children.apiKey)
  }

  setStyles() {
    this.setStyle('padding', '1rem')
    this.setStyle('min-width', '6rem')
  }

  getEndpointSelect() {
    getEndpointsList().map(({ name: endpoint }) => this.children.endpoint.addOption(endpoint, endpoint))
    this.children.endpoint.on('change', () => this.onEndpointSelectChange())
    return this.children.endpoint
  }

  onEndpointSelectChange() {
    this.children.params.clear()
    Array.from(getEndpointFromList(this.children.endpoint.getValue())?.query)
      .map((name) => this.children.params.append(this.children.inputs.getComponent(name, name)))
  }

  getParamsHTML() {
    return this.children.params
  }

  getSendButton() {
    const button = new ButtonComponent()
    button.setText('send')
    button.on('click', () => this.onSendButtonClick())
    return button
  }

  onSendButtonClick() {
    const endpoint = getEndpointFromList(this.getEndpointValue())
    const queryValues = this.getQueryValues(endpoint)
    const headersValues = this.getHeadersValues(endpoint)
    const bodyValues = this.getBodyValues(endpoint)
    this.dispatchEvent('submit', { name: endpoint.name, method: endpoint.method, url: endpoint.url, query: queryValues, headers: headersValues, body: bodyValues })
  }

  getQueryValues({ query = [] } = {}) {
    return Array.from(query).reduce((values, item) => ({ ...values, [item]: this.children.inputs.getValue(item) }), {})
  }

  getHeadersValues({ headers = [] } = {}) {
    return {}
  }

  getBodyValues({ body = [] } = {}) {
    return null
  }

  getEndpointValue() {
    return this.children.endpoint.getValue()
  }

  getParamsValues(endpoint = '') {
    const list = getParamsList(endpoint).map((input) => ([input, this.children.inputs.getValue(input)]))
    return Array.from(list).reduce((values, [name, value]) => ({ ...values, [name]: value }), {})
  }
}
