const { FenceGroup } = require("../models/fence-group")
const { Judger } = require("../models/judger")

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
      const fenceGroup = new FenceGroup(spu)
      const judger = new Judger(fenceGroup)
      fenceGroup.initFences()
      this.bindInitData(fenceGroup)
    
    }
  },
  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    }
  }
})
