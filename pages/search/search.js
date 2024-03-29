import { HistoryKeyword } from "../../models/history-keyword"
import { Search } from "../../models/search"
import { Tag } from "../../models/tag"
import { showToast } from "../../utils/ui"

// pages/search/search.js
const history = new HistoryKeyword()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    const historyTags = history.get()
    const hotTags = await Tag.getSearchTags()
    this.setData({
      historyTags,
      hotTags
    })
  },

  async onSearch(event) {
    this.setData({
      search:true,
      items:[]
    })
    const keyword = event.detail.value || event.detail.name
    if (!keyword) {
      showToast('请输入关键字')
      return
    }
    history.save(keyword)
    this.setData({
      historyTags:history.get()
    })
    const paging = Search.search(keyword)
    wx.lin.showLoading({
      color: '#157658',
      type: 'flash',
      fullScreen: true
    })
    const data = await paging.getMoreData()
    wx.lin.hideLoading()
    this.bindItems(data)
  },

  onCancel(event) {
    this.setData({
      search:false
    })
  },

  bindItems(data) {
    if (data.accumulator.length != 0) {
      this.setData({
        items:data.accumulator
      })
    }
  },

  onDeleteHistory(event) {
    history.clear()
    this.setData({
      historyTags:[]
    })
  }
  
})