import {getWindowHeightRpx} from "../../utils/system"
const { Spu } = require("../../models/spu")
const { ShoppingWay } = require("../../core/enum")
const { SaleExplain } = require("../../models/sale-explain")

// pages/detail/detail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showRealm:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const pid = options.pid
    const spu = await Spu.getDetail(pid)
    const explain = await SaleExplain.getFixed()
    const windowHeight = await getWindowHeightRpx()
    const h = windowHeight - 100
    this.setData({
      spu,
      explain,
      h
    })
  },

  onAddtoCart(event) {
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.CART
    })
  },

  onBuy(event) {
    this.setData({
      showRealm:true,
      orderWay:ShoppingWay.BUY
    })
  },

  onGotoHome(event) {
    wx.switchTab({
      url: '/pages/home/home',
    })
  },

  onGotoCart(event) {
    wx.switchTab({
      url: '/pages/cart/cart',
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  onSpecChange(event) {
    this.setData({
      specs:event.detail
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})