import { HTML } from '@brtmvdl/frontend'

export class Component extends HTML {
  getComponent(name) { return new HTML() }
}
