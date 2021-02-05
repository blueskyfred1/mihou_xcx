const { FenceGroup } = require("../models/fence-group")
const { Judger } = require("../models/judger")
const { Spu } = require("../../models/spu")
const { Cell } = require("../models/cell")

// components/realm/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    spu:Object
  },

  observers: {
    'spu':function (spu) {
      if (!spu) {
        return
      }
      if (Spu.isNoSpec(spu)) {
       this.processNoSpec(spu)
      }else {
        this.processHasSpec(spu)
      }
    
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    judger:Object,
    previewImg: String,
    title: String,
    price: null,
    discountPrice: null
  },

  /**
   * 组件的方法列表
   */
  methods: {
    processNoSpec(spu) {
      this.setData( {
        noSpec: true,
      }) 
      this.bindSkuData(spu.sku_list[0])
    
    },

    processHasSpec(spu) {
      const fenceGroup = new FenceGroup(spu)
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      const defaultSku = fenceGroup.getDefaultSku()
      if (defaultSku) {
        this.bindSkuData(defaultSku)
      }else {
        this.bindSpuData()
      }
      this.bindTipData()
      this.bindFenceGroupData(fenceGroup)
    },

    bindSpuData() {
      const spu = this.properties.spu
      this.setData({
        previewImg: spu.img,
        title: spu.title,
        price: spu.price,
        discountPrice: spu.discount_price,
      })
    },

    bindSkuData(sku) {
      this.setData({
        previewImg: sku.img,
        title: sku.title,
        price: sku.price,
        discountPrice: sku.discount_price,
        stock: sku.stock,
      })
    },

    bindTipData() {
      this.setData({
        skuIntact: this.data.judger.isSkuIntact(),
        currentValues: this.data.judger.getCurrentValues(),
        missingKeys: this.data.judger.getMissingKeys()
      })
    },

    bindFenceGroupData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences,
        
      })
    },

    onCellTap(event) {
      const data = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y
      const cell = new Cell(data.spec)
      cell.status = data.status
      const judger = this.data.judger
      judger.judge(cell,x,y)
      const skuIntact = judger.isSkuIntact()
      if (skuIntact) {
        const currentSku = judger.getDeterminateSku()
        console.log(currentSku)
        this.bindSkuData(currentSku)
      }
      this.bindTipData()
      this.bindFenceGroupData(judger.fenceGroup)
    }
  } 
})
