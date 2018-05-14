// pages/note/update/update.js
const http = require('../../../utils/service.js')
const $ajax = require('../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    text:''
  
  },
  editNote(value) {
    let that = this
    $ajax._postmy(
      http.service.edit,
      {
        note: value,
        id: that.data.id
      },
      function (res) {
        if (res.data.status === 0) {
          wx.showToast({
            title: '编辑成功',
            icon: "success",
            success: function () {
              wx.setStorageSync('isfrom', "edit")
              wx.navigateBack()
            }
          })
        }
      },
      function (res) {

      }
    )
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.data.id = options.id;
    this.setData({
      text: options.value
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  bindFormSubmit: function (e) {
    let value = e.detail.value.content
    this.editNote(value)
  }
})