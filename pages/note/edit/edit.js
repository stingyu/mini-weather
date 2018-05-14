// pages/note/edit/edit.js
const http = require('../../../utils/service.js')
const $ajax = require('../../../utils/http.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  addNote(value) {
    console.log(value)
    $ajax._postmy(
      http.service.add,
      {
        note: value
      },
      function (res) {
        if (res.data.status === 0) {
          wx.showToast({
            title: '添加成功',
            icon: "success",
            success: function () {
              wx.setStorageSync('isfrom', "add")
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
    console.log(e.detail.value.content)
    let value = e.detail.value.content
    this.addNote(value)
  }
})