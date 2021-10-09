const { Cart } = require("../../models/cart")
const { parseSpecValue } = require("../../utils/sku")

// components/cart-item/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    cartItem: Object
  },

  /**
   * 组件的初始数据
   */
  data: {
    soldOut: Boolean,
    online: Boolean,
    specStr: String,
    discount: Boolean,
    stock: Cart.SKU_MAX_COUNT,
    skuCount: 1
  },

  observers: {
    cartItem:function (cartItem) {
      if (!cartItem) {
        return
      }
      const specStr = parseSpecValue(cartItem.sku.specs)
      const discount = cartItem.sku.discount_price?true:false
      const soldOut = Cart.isSoldOut(cartItem)
      const online = Cart.isOnline(cartItem)
      this.setData({
        soldOut,
        online,
        specStr,
        discount,
        stock: cartItem.sku.stock,
        skuCount: cartItem.count
      })
    }
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
