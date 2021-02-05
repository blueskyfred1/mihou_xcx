const { Http } = require("../utils/http");

class Spu {

  static isNoSpec(spu) {
    if (spu.sku_list.length === 1 && 
      spu.sku_list[0].specs.length === 0) {
      return true
    }else {
      return false
    }
  }

  static getDetail(id) {
    return Http.request({
      url: `spu/id/${id}/detail`
    })
  }
}

export {
  Spu
}