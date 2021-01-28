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
      fenceGroup.initFences()
      const judger = new Judger(fenceGroup)
      this.data.judger = judger
      this.bindInitData(fenceGroup)
    
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    judger:Object
  },

  /**
   * 组件的方法列表
   */
  methods: {
    bindInitData(fenceGroup) {
      this.setData({
        fences: fenceGroup.fences
      })
    },

    onCellTap(event) {
      const cell = event.detail.cell
      const x = event.detail.x
      const y = event.detail.y
      const judger = this.data.judger
      judger.judge(cell,x,y)
      this.setData({
        fences: judger.fenceGroup.fences
      })
    }
  } 
})
