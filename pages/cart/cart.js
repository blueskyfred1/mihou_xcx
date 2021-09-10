// pages/cart/cart.js
import {Cart} from "../../models/cart"
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems:[],
    isEmpty: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
    
  },

  onShow: function() {
      const cart = new Cart()
      const cartItems = cart.getAllCartItemFromLocal().items
      if (cart.isEmpty()) {
        this.empty()
        return
      }
      this.setData({
        cartItems: cartItems
      })
      this.notEmpty()
  },
  empty() {
    this.setData({
      isEmpty: true
    })
    wx.hideTabBarRedDot({
      index: 2,
    })
  },

  notEmpty() {
    this.setData({
      isEmpty: false
    })
    wx.showTabBarRedDot({
      index: 2,
    })
  }

})