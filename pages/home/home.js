// pages/home/home.js
import { Theme } from "../../model/theme"
import { Banner } from "../../model/banner"
import { Category } from "../../model/category"
import { themes, banner, categories } from "../../data/data"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    themeA:null,
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
    // const themeA = await Theme.getHomeLocationA()
    const themeA = themes
    // const bannerB = await Banner.getHomeLocationB()
    const bannerB = banner
    // const grid = await Category.getGridCategory()
    const grid = categories
    this.setData({
      themeA: themeA[0],
      bannerB,
      grid,
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