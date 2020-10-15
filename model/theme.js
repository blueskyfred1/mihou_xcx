import {
  Http
} from "../utils/http"
import { allThemes, withSpu } from "../data/data"
class Theme {
  static locationA = 't-1'
  static locationE = 't-2'
  static locationF = 't-3'
  static locationH = 't-4'

  themes = []

  async getThemes() {
    // const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
    // this.themes = await Http.request({
    //   url: 'themes',
    //   data: {
    //     names
    //   }
    // })
    this.themes = allThemes
  }

  async getHomeLocationA() {
     return this.themes.find(t => t.name === Theme.locationA)
  }

  async getHomeLocationE() {
    return this.themes.find(t => t.name === Theme.locationE)
  }

  async getHomeLocationF() {
    return this.themes.find(t => t.name === Theme.locationF)
  }

  async getHomeLocationH() {
    return this.themes.find(t => t.name === Theme.locationH)
  }

  static async getHomeLocationESpu() {
    return Theme.getThemeSpuByName(Theme.locationE)
  }

  static async getThemeSpuByName(name) {
    // const theme = await Http.request({
    //   url: `theme/name/${name}/with_spu`
    // })
    const theme = withSpu
    return theme
  }
}




export {
  Theme
}