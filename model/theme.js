import { Http } from "../utils/http"
class Theme{
  static async getHomeLocationA(callback) {

    return await Http.request({
      url: 'themes',
      data: {
        name: 't-1'
      }
    })
  }
}



export {
  Theme
}
