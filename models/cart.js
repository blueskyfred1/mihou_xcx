import { Sku } from "./sku"

class Cart {
  static SKU_MIN_COUNT = 1
  static SKU_MAX_COUNT = 77
  static CART_ITEM_MAX_COUNT = 77
  static STORAGE_KEY = 'cart'

  _cartData = null

  constructor() {
    if (typeof Cart.instance === 'object') {
      return Cart.instance
    }
    Cart.instance = this
    return this
  }

  getAllCartItemFromLocal() {
    return this._getCartData()
  }

  async getAllCartItemFromServer() {
    const cartData = this._getCartData()
    if (cartData.items.length === 0) {
      return null
    }
    const skuIds = this.getSkuIds()
    const serverData = await Sku.getSkusByIds(skuIds)
    this._refreshByServerData(serverData)
    this._refreshStorage()
    return this._getCartData()
  }

  _refreshByServerData(serverData) {
    const cartData = this._getCartData()
    cartData.items.forEach(item => {
      this._setLatestCartItem(item, serverData)
    })
  }

  _setLatestCartItem(item, serverData) {
    let removed = true
    for (const sku of serverData) {
      if (sku.id === item.skuId) {
        removed = false
        item.sku = sku
        break
      }
    }
    if (removed) {
      item.sku.online = false
    }
  }

  getSkuIds() {
    const cartData = this._getCartData()
    if (cartData.items.length === 0) {
      return []
    }
    return cartData.items.map(item => item.skuId)
  }

  replaceItemCount(skuId, newCount) {
    const oldItem = this.findEqualItem(skuId)
    if (!oldItem) {
      return
    }
    if (newCount < 1) {
      return
    }
    oldItem.count = newCount
    if (oldItem.count >= Cart.SKU_MAX_COUNT) {
      oldItem.count = Cart.SKU_MAX_COUNT
    }
    this._refreshStorage()
  }

  isAllChecked() {
    let allChecked = true
    const cartItems = this._getCartData().items
    for (let item of cartItems) {
      if (!item.checked) {
        allChecked = false
        break
      }
    }
    return allChecked
  }

  checkAll(checked) {
    const cartData = this._getCartData()
    cartData.items.forEach(item => {
      item.checked = checked
    })
    this._refreshStorage()
  }

  static isSoldOut(item) {
    return item.sku.stock === 0
  }

  getCheckedItems() {
    const cartItems = this._getCartData().items
    const checkedCartItems = []
    cartItems.forEach(item => {
      if (item.checked) {
        checkedCartItems.push(item)
      }
    })
    return checkedCartItems
  }

  checkItem(skuId) {
    const oldItem = this.findEqualItem(skuId)
    oldItem.checked = !oldItem.checked
    this._refreshStorage()
  }

  static isOnline(item) {
    return item.sku.online
  }
  
  isEmpty() {
    const cartData = this._getCartData();
    return cartData.items.length === 0
  }

  getCartItemCount() {
    return this._getCartData().items.length
  }
  addItem(newItem) {
    if (this.beyondMaxCartItemCount()) {
      throw new Error('超过购物车最大数量')
    }
    this._pushItem(newItem)
    this._refreshStorage()
  }

  removeItem(skuId) {
    const oldItemIndex = this._findEqualItemIndex(skuId)
    const cartData = this._getCartData()
    cartData.items.splice(oldItemIndex, 1)
    this._refreshStorage()
  }

  _findEqualItemIndex(skuId) {
    const cartData = this._getCartData();
    return cartData.items.findIndex(item => {
      return item.skuId === skuId
    })
  }
  _refreshStorage() {
    wx.setStorageSync(Cart.STORAGE_KEY, this._cartData)
  }

  _pushItem(newItem) {
    const cartData = this._getCartData()
    const oldItem = this.findEqualItem(newItem.skuId)
    if (!oldItem) {
      cartData.items.unshift(newItem)
    }else {
      this._combineItem(oldItem, newItem)
    }
   
  }

  findEqualItem(skuId) {
    let oldItem = null
    const items = this._getCartData().items
    for (let index = 0; index < items.length; index++) {
      if (this._isEqualItem(items[index], skuId)) {
        oldItem = items[index]
        break
      }
    }
    return oldItem
  }

  _isEqualItem(oldItem, skuId) {
    return oldItem.skuId === skuId
  }

  _combineItem(oldItem, newItem) {
    this._plusCount(oldItem, newItem.count)
  }

  _plusCount(item, count) {
    item.count += count
    if (item.count >= Cart.SKU_MAX_COUNT) {
      item.count = Cart.SKU_MAX_COUNT
    }
  }

  _getCartData() {
    if (this._cartData != null) {
      return this._cartData
    }
    let cartData = wx.getStorageSync(Cart.STORAGE_KEY)
    if (!cartData) {
      cartData = this._initCartDataStorage()
    }
    this._cartData = cartData
    return cartData
  }

  _initCartDataStorage() {
    const cartData = {
      items:[]
    }
    wx.setStorageSync(Cart.STORAGE_KEY, cartData)
    return cartData
  }

  beyondMaxCartItemCount() {
    const cartData = this._getCartData()
    return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
  }
}

export {
  Cart
}