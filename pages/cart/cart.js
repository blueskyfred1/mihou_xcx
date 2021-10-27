import { Caculator } from "../../models/caculator"
// pages/cart/cart.js
import {
  Cart
} from "../../models/cart"
const cart = new Cart()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    isEmpty: false,
    allChecked: false,
    totalPrice: 0,
    totalSkuCount: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  async onLoad (options) {
    const cartData = await cart.getAllCartItemFromServer()

  },

  onShow: function () {
    const cartItems = cart.getAllCartItemFromLocal().items
    if (cart.isEmpty()) {
      this.empty()
      return
    }
    this.setData({
      cartItems: cartItems
    })
    this.notEmpty()
    this.isAllChecked()
    this.refreshCartData()
  },

  refreshCartData() {
    const checkedItems = cart.getCheckedItems()
    const calculator = new Caculator(checkedItems)
    calculator.calc()
    this.setCalData(calculator)
  },

  setCalData(calculator) {
    const totalPrice = calculator.getTotalPrice()
    const totalSkuCount = calculator.getTotalSkuCount()
    this.setData({
      totalPrice,
      totalSkuCount
    })
  },
 
  isAllChecked() {
    const allChecked = cart.isAllChecked()
    this.setData({
      allChecked
    })
  },

  onSingleCheck() {
    this.isAllChecked()
    this.refreshCartData()
  },

  onDeleteItem() {
    this.isAllChecked()
    this.refreshCartData()
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
  },

  onCheckAll(event) {
    const checked = event.detail.checked
    cart.checkAll(checked)
    this.setData({
      cartItems:this.data.cartItems
    })
    this.refreshCartData()
  },

  onCountFloat(event) {
    this.refreshCartData()
  },

  onSettle(event) {
    if (this.data.totalSkuCount <= 0) {
      return
    }
    wx.navigateTo({
      url: '/pages/order/order',
    })
  }
})