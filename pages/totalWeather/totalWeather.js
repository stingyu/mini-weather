// pages/totalWeather/totalWeather.js
const http = require('../../utils/service.js');
const $ajax = require('../../utils/http.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    weather:[],
    currentCity: ''
  
  },
  LoadData(city) {
    var that = this
    $ajax._getmy(
      http.service.weatherAPI,
      {
        location: city || wx.getStorageSync('currentCity')
      },
      function (res) {
        if (res.data.status === 'OK' && res.data.weather.length !== 0) {
          let data = res.data.weather[0].future;
          for(let i = 0;i<data.length;i++) {
            Object.defineProperty(data[i],"icon",{
              enumerable: true,
              configurable: true,
              writable: true,
              value: `https://weixin.jirengu.com/images/weather/code/${data[i].code1}.png`
            })
          }
          that.setData({weather:data})
          console.log(data)
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
    var that = this
    if (wx.getStorageSync('currentCity') == undefined || wx.getStorageSync('currentCity') == '') {
      wx.navigateTo({
        url: '../citySelect/citySelect',
      })
    }else {
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
  gotoCity:function() {
    wx.navigateTo({
      url: '../citySelect/citySelect',
    })
  }
})