// pages/citySelect/citySelect.js
var city = require('../../utils/city.js')
//var $ajax = require('../../utils/network_util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitedData: [],
    hotData: ['广州市', '上海市', '北京市', '重庆市', '成都市', '深圳市', '长沙市', '杭州市', '东莞市'],
    seachData: [],
    cityList: [],
    currentCity: '当前：未知',
    current: '',
    seachVisited: 2,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 生命周期函数--监听页面加载
    var that = this;
    var searchLetter = city.searchLetter;
    var cityList = city.cityList();
    var cityObject = city.cityObject;
    var sysInfo = wx.getSystemInfoSync();
    var winHeight = sysInfo.windowHeight - 50;
    //添加要匹配的字母范围值
    //1、更加屏幕高度设置子元素的高度
    var itemH = (winHeight - 50) / searchLetter.length;
    if (wx.getStorageSync('currentCity') == undefined || wx.getStorageSync('currentCity') == '') {
      var currentCity = '未知'
    } else {
      var currentCity = wx.getStorageSync('currentCity');
    }
    /*if (wx.getStorageSync('currentCity')) {
      that.setData({
        curCity: wx.getStorageSync('currentCity')
      })
    } else {
      that.setData({
        curCity: '未知'
      })
    }*/
    this.setData({
      winHeight: winHeight,
      itemH: itemH,
      searchLetter: searchLetter,
      cityList: cityList,
      cityObject: cityObject,
      currentCity: currentCity,
      current: wx.getStorageSync('city'),
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


  //首字母选择
  searchLetterBind: function (e) {
    var that = this;
    that.setData({
      seachVisited: 2,
      showLetter: e.currentTarget.dataset.letter
    })
  },

  //点击列表获取城市
  cityBind: function (e) {
    var city = e.currentTarget.dataset.text
    var that = this;
    wx.setStorageSync('currentCity', city)
    wx.setStorageSync('isfrom', 'citySelect')
    wx.showToast({
      title: '切换成功',
      duration: 500
    })
    setTimeout(function () {
      wx.navigateBack();
    }, 1000)

    that.setData({
      currentCity: wx.getStorageSync('currentCity'),
      current: wx.getStorageSync('currentCity'),
    })
  },

  seachBind: function (e) {
    var that = this;
    var cursor = e.detail.cursor
    var str = e.detail.value
    var seachListData = []
    var cityObject = that.data.cityObject
    var result = str.replace(/(^\s+)|(\s+$)/g, "");//去掉前后空格
    var value = result.replace(/\s/g, "");//去除文章中间空格
    if (cursor > 0) {
      if (/^[\u4e00-\u9fa5]/.test(value) && !(/^[a-zA-Z]/.test(value))) {
        seachListData = []
        for (let i = 0; i < cityObject.length; i++) {
          if (cityObject[i].name.indexOf(value.toString()) == 0) {
            seachListData.push(cityObject[i])
          }
        }
      } else if (!(/^[\u4e00-\u9fa5]/.test(value)) && /^[a-zA-Z]/.test(value)) {
        seachListData = []
        for (let i = 0; i < cityObject.length; i++) {
          if (cityObject[i].short.indexOf(value.toUpperCase().toString()) == 0) {
            seachListData.push(cityObject[i])
          }
        }
      }
      that.setData({
        seachData: seachListData,
        seachVisited: 1,
      })
    } else {
      that.setData({
        seachListData: [],
        seachVisited: 2,
      })
    }
  },
})