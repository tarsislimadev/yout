import { HTML, nInputTextGroup } from '@brtmvdl/frontend'

export class InputTextGroupComponent extends nInputTextGroup {
  label = ''
  value = null

  constructor(label, value = null) {
    super()
    this.label = label
    this.value = value
  }

  onCreate() {
    super.onCreate()
    this.children.label.setText(this.label)
    this.children.input.setValue(this.value)
  }

}
