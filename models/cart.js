class Cart {
  static SKU_MIN_COUNT = 1
  static SKU_MAX_COUNT = 77

  constructor() {
    if (typeof Cart.instance === 'object') {
      return Cart.instance
    }
    Cart.instance = this
    return this
  }
}

export {
  Cart
}