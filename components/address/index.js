const { Address } = require("../../models/address");
import {AuthAddress} from "../../core/enum";

// components/address/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  lifetimes: {
    attached() {
      const address = Address.getLocal()
      if (address) {
        this.setData({
          address,
          hasChosen:true
        })
      }
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    address:Object,
    hasChosen:false,
    showDialog: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    async onChooseAddress(event) {
      
      const authStatus = await this.hasAuthorizedAddress()
      if (authStatus === AuthAddress.DENY) {
        showDialog = true
        this.setData({
          showDialog
        })
        return
      }
      this.getUserAddress()
    },

    async getUserAddress() {
      let res;
      try {
        res = await wx.chooseAddress({})
      } catch (error) {
        console.error(error)
      }
      if (res) {
        this.setData({
          address:res,
          hasChosen: true
        })
        Address.setLocal(res)
      }
    },

    async hasAuthorizedAddress() {
      const setting = await wx.getSetting({})
      const addressSetting = setting.authSetting['scope.address']
      if (addressSetting === undefined) {
        return AuthAddress.NOT_AUTH
      }
      if (addressSetting === false) {
        return AuthAddress.DENY 
      }
      if (addressSetting === true) {
        return AuthAddress.AUTHORIZED
      }
    },

    onDialogConfirm(event) {
      wx.openSetting()
    }
  }
})
