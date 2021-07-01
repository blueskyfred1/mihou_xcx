import { getSystemSize } from "../../utils/system"
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util"
import { Categories } from "../../models/categories";

// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    defaultRootId: 2
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    this.initCategoryData()
    this.setDynamicSegmentHeight();
  },

  async initCategoryData() {
    const categories = new Categories()
    this.data.categories = categories
    await categories.getAll()
    const roots = categories.getRoots()
    const defalutRoot = this.getDefaultRoot(roots)
    const currentSubs = categories.getSubs(defalutRoot.id)
    this.setData({
      roots,
      currentSubs,
      currentBannerImg: defalutRoot.img
    })
  },

  getDefaultRoot(roots) {
    let defaultRoot = roots.find(r=>r.id===this.data.defaultRootId)
    if(!defaultRoot) {
      defaultRoot = roots[0]
    }
    return defaultRoot
  },

  async setDynamicSegmentHeight() {
    const res = await getSystemSize()
    const windowHeightRpx = px2rpx(res.windowHeight)
    const h = windowHeightRpx - 60 - 20 - 2
    this.setData({
      segHeight: h
    })
  },

  onGotoSearch(event) {
    wx.navigateTo({
      url: '/pages/search/search',
    })
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})