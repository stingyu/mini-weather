// pages/total24h/total24h.js
const http = require('../../utils/service.js');
const $ajax = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    temData:[],
    currentCity:''
  
  },
  gotoCity() {
    wx.navigateTo({
      url: '../citySelect/citySelect',
    })
  },
  LoadData(city) {
    var that = this
    $ajax._getmy(
      http.service._24hour,
      {
        location: city || wx.getStorageSync('currentCity')
      },
      function(res) {
        if(res.data.status === 'OK' && res.data.hourly.length !== 0) {
          let data = res.data.hourly
          for(let i = 0;i < data.length;i++) {
            let idx_1 = data[i].time.indexOf('T');
            let idx_2 = data[i].time.indexOf('+');
            Object.defineProperties(data[i], {
              'date': {
                value: data[i].time.substring(0,idx_1),
                enumerable: true,
                configurable: true,
                writable: true
              },
              'time': {
                value: data[i].time.substring(idx_1+1,idx_2),
                enumerable: true,
                configurable: true,
                writable: true
              },
              "icon": {
                enumerable: true,
                configurable: true,
                writable: true,
                value: `https://weixin.jirengu.com/images/weather/code/${data[i].code}.png`
              }
            });
          }
          that.setData({temData: data})
          console.log(data)
        }
      },
      function(res) {

      }
    )


  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    var that = this
    if (wx.getStorageSync('currentCity') == undefined || wx.getStorageSync('currentCity') == '') {
      wx.navigateTo({
        url: '../citySelect/citySelect',
      })
    } else {
      that.setData({
        currentCity: wx.getStorageSync('currentCity')
      })
      that.LoadData(wx.getStorageSync('currentCity'))
    }
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
    var that = this
    if (wx.getStorageSync('isfrom') === 'citySelect') {
      that.setData({
        currentCity: wx.getStorageSync('currentCity')
      })
      that.LoadData(wx.getStorageSync('currentCity'))
    }
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
  
  }
})