import { HTML, nSelect, nButton } from '@brtmvdl/frontend'
import { QueryComponent } from './query.component.js'
import { getApisList } from '../utils/lists.js'

export class FormComponent extends HTML {
  children = {
    select: new nSelect(),
    inputs: new HTML(),
    button: new nButton(),
    query: new QueryComponent(),
  }

  onCreate() {
    this.setStyles()
    this.append(this.getSelect())
    this.append(this.getInputs())
    this.append(this.getButton())
  }

  setStyles() {
    this.setStyle('padding', '1rem')
  }

  getSelect() {
    getApisList().map(({ name }) => this.children.select.addOption(name, name))
    this.children.select.on('change', () => this.onSelectChange())
    this.children.select.setStyle('margin', '0rem 0rem 1rem')
    this.children.select.setStyle('padding', 'calc(1rem / 2)')
    return this.children.select
  }

  onSelectChange() {
    this.children.inputs.clear()
    const name = this.getSelectValue()
    Array.from(this.getAPI().query).map((q) => this.children.inputs.append(this.children.query.children[name].getComponent(q)))
  }

  getInputs() {
    return this.children.inputs
  }

  getButton() {
    this.children.button.setText('send')
    this.children.button.on('click', () => this.onButtonClick())
    this.children.button.setStyle('margin', '1rem 0rem')
    this.children.button.setStyle('padding', 'calc(1rem / 2)')
    this.children.button.setStyle('width', '100%')
    return this.children.button
  }

  onButtonClick() {
    const name = this.getSelectValue()
    const api = this.getAPI(name)
    const query = Array.from(api.query).reduce((r, q) => ({ ...r, [q]: this.children.query.children[name].getValue(q) }), {})
    this.dispatchEvent('submit', { name, method: api.method, url: `${api.url}?${new URLSearchParams(query).toString()}` })
  }

  getSelectValue() {
    return this.children.select.getValue()
  }

  getAPI(name = this.getSelectValue()) {
    return getApisList().find((api) => api.name === name)
  }
}
