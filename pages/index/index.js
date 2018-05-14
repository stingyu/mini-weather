//index.js
//获取应用实例
const app = getApp()
const http = require('../../utils/service.js')
const $ajax = require('../../utils/http.js')

Page({
  data: {
    currentCity: '',
    weatherInfo:[],
    icon_name_second: '',
    icon_name_first: '',
  },
  gotoCity() {
    wx.navigateTo({
      url: '../citySelect/citySelect',
    })
  },
  gotoMenu() {
    wx.navigateTo({
      url: './menu/menu',
    })
  },
  transformCode(code,isFirst) {
    let that = this
    switch (parseInt(code)) {
      case 0: case 2: case38:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'sun' });
        } else {
          that.setData({ icon_name_second: 'sun' });
        }
        break;
      case 1: case 3:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'moon' });
        } else {
          that.setData({ icon_name_second: 'moon' });
        }
        break;
      case 4:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'cloud' });
        } else {
          that.setData({ icon_name_second: 'cloud' });
        }
        break;
      case 6: case 8:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'moon-cloud' });
        } else {
          that.setData({ icon_name_second: 'moon-cloud' });
        }
        break;
      case 9:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'more-cloud' });
        } else {
          that.setData({ icon_name_second: 'more-cloud' });
        }
        break;
      case 5:case 7:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'sun-cloud' });
        } else {
          that.setData({ icon_name_second: 'sun-cloud' });
        }
        break;
      case 10: case 13: case 14:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'rain' });
        } else {
          that.setData({ icon_name_second: 'rain' });
        }
        break;
      case 11: case 12:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'lightning' });
        } else {
          that.setData({ icon_name_second: 'lightning' });
        }
        break;
      case 15: case 16: case 17: case 18: case 19:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'heavy-rain' });
        } else {
          that.setData({ icon_name_second: 'heavy-rain' });
        }
        break;
      case 20: case 21: case 22: case 23:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'snow' });
        } else {
          that.setData({ icon_name_second: 'snow' });
        }
        break;
      case 24 : case 25:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'heavy-snow' });
        } else {
          that.setData({ icon_name_second: 'heavy-snow' });
        }
        break;
      case 26 : case 27: case 28:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'hail' });
        } else {
          that.setData({ icon_name_second: 'hail' });
        }
        break;
      case 29 : case 30 : case 31:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'heavy-hail' });
        } else {
          that.setData({ icon_name_second: 'heavy-hail' });
        }
        break;
      case 32: case 33: case 34: case 35:case 36 : case 37:
        if (isFirst === true) {
          that.setData({ icon_name_first: 'cloud' });
        } else {
          that.setData({ icon_name_second: 'cloud' });
        }
        break;
    }

  },
  LoadData(city) {
    var that = this
    $ajax._getmy(
      http.service.weatherAPI,
      {
        location: city || wx.getStorageSync('currentCity')
      },
      function(res) {
        if(res.data.status === 'OK' && res.data.weather.length !== 0) {
          let data = res.data.weather[0];
          let weatherInfo = [data.future[0],data.future[1]];
          for(let i =0;i<weatherInfo.length;i++) {
            let text = weatherInfo[i].text.replace(/\//g,'~')
            weatherInfo[i].text = text
          }
          that.transformCode(data.future[0].code1,true);
          that.transformCode(data.future[1].code1,false);
          that.setData({
            currentCity: wx.getStorageSync('currentCity'),
            weatherInfo: weatherInfo
          })
        }
      },
      function(res) {

      }
    )
  },
  onShow: function () {
    var that = this
   if(wx.getStorageSync('isfrom') === 'citySelect') {
    that.setData({
      currentCity: wx.getStorageSync('currentCity')
    })
    that.LoadData(wx.getStorageSync('currentCity'))
   }

  },
  onLoad: function () {
    var that = this
    if (wx.getStorageSync('currentCity') == undefined || wx.getStorageSync('currentCity') == '') {
      wx.getLocation({
        type: 'wgs84',
        success: function (res) {
          var city = '广州'
          wx.setStorageSync('currentCity', city)
          that.LoadData(city)
        }
      })
    }else {
      that.LoadData(wx.getStorageSync('currentCity'))
    }
    
   /* if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }*/
  },
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
