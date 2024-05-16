import { HTML } from '@brtmvdl/frontend'

export class AudioHTML extends HTML {
  state = {
    url: '',
  }

  constructor(url) {
    super()
    this.state.url = url
  }

  getName() {
    return 'audio'
  }

  getTagName() {
    return 'audio'
  }

}
