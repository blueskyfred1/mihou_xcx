const { Http } = require("../utils/http")

class Activity {
  static locationD = 'a-2'
  static async getHomeLocationD() {
    return await Http.request({
      url: `activity/name/${this.locationD}`
    })
  }

  static async getActivityWithCoupon(activityName) {
    return Http.request({
        url: `activity/name/${activityName}/with_coupon`
    })
}
}

export {
  Activity
}