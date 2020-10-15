const { Http } = require("../utils/http")

class Banner {
  static locationB = 'b-1'
  static locationG = 'b-2'
  static async getHomeLocationB() {
    return await Http.request({
      url: `banner?name=${Banner.locationB}`
    })
  }

  static async getHomeLocationF() {
    return await Http.request({
      url: `banner?name=${Banner.locationF}`
    })
  }
}

export {
  Banner
}