import { promisic } from "./util"

const getSystemSize = async function() {
  const res = await promisic(wx.getSystemInfo)()
  return {
    windowHeight: res.windowHeight,
    windowWidth: res.windowWidth,
    screenHeight: res.screenHeight,
    screenWidth: res.screenWidth,
  }
}
export { getSystemSize }