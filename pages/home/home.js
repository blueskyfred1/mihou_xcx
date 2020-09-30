// pages/home/home.js
import { banner, categories } from "../../data/data"
import { Theme } from "../../model/theme"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA:null,
    themeE:null,
    bannerB:null,
    grid:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initAllData()
    
  },

  async initAllData() {
    const theme = new Theme()
    await theme.getThemes()
    const themeA = await theme.getHomeLocationA()
    // const bannerB = await Banner.getHomeLocationB()
    const bannerB = banner
    // const grid = await Category.getHomeLocationC()
    const grid = categories
    const themeE = await theme.getHomeLocationE()
    let themeESpu = []
    if(themeE.online) {
      const data = await Theme.getHomeLocationESpu()
      if(data) {
        themeESpu = data.spu_list.slice(0,8)
      }
    }
    this.setData({
      themeA,
      bannerB,
      grid,
      themeE,
      themeESpu
    })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})