import { Cart } from "../../models/cart"
import { CartItem } from "../../models/cart-item"
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
    showRealm:false,
    cartItemCount: 0
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
    this.updateCartItemCount()
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

  onShopping(event) {
    const chosenSku = event.detail.sku
    const skuCount = event.detail.skuCount
    if (event.detail.orderWay == ShoppingWay.CART) {
      const cart = new Cart();
      const cartItem = new CartItem(chosenSku, skuCount);
      cart.addItem(cartItem)
      this.updateCartItemCount()
    }
  },

  updateCartItemCount() {
    const cart = new Cart()
    this.setData({
      cartItemCount: cart.getCartItemCount(),
      showRealm: false
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