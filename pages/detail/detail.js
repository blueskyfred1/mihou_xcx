const { Spu } = require("../../models/spu")
const { ShoppingWay } = require("../../core/enum")

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
    this.setData({
      spu
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



  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})