// pages/order/order.js
import {Cart} from "../../models/cart"
import { Sku } from "../../models/sku"
import {Order} from "../../models/order"
const cart = new Cart()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderItems
    let localItemCount
    const skuIds = cart.getCheckedSkuIds()
    localItemCount = skuIds.length
    orderItems = this.getCartOrderItems(skuIds)
    const order = new Order(orderItems, localItemCount)
    try {
      order.checkOrderIsOk()
  } catch (e) {
      console.error(e)
      this.setData({
          isOk: false
      })
      return
  }
  },

  async getCartOrderItems(skuIds) {
    // 同步最新的SKU数据
    const skus = await Sku.getSkusByIds(skuIds)
    const orderItems = this.packageOrderItems(skus)
    return orderItems
},

packageOrderItems(skus) {
  return skus.map(sku => {
      const count = cart.getSkuCountBySkuId(sku.id)
      return new OrderItem(sku, count)
  })
},

 
})