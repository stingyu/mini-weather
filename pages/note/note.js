// pages/note/note.js
const http = require('../../utils/service.js')
const $ajax = require('../../utils/http.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    notesData:[]
  
  },
  LoadData() {
    var that = this
    $ajax._getmy(
      http.service.load,
      {},
      function(res) {
        if(res.data.status === 0 && res.data.data.length !== 0) {
          let data = res.data.data;
          let temData = [];
          for(let i = 0;i<data.length;i++) {
            if(data[i].uid === "26688167") {
              let createTime = data[i].createdAt.substring(0, 10);
              let updateTime = data[i].updatedAt.substring(0, 10);
              data[i].create = createTime;
              data[i].update = updateTime;
              temData.push(data[i])
            }
            
          } 
          that.setData({ notesData: temData})
        }  

      },
      function(res) {

      }
    )

  },
  deleteNote(e) {
    let that = this
    let target = e.target.dataset.id
    $ajax._postmy(
      http.service.delete_note,
      {
        id: target
      },
      function(res) {
        if(res.data.status === 0) {
          wx.showToast({
            title: '删除成功',
            icon: "success",
            success: function() {
              that.LoadData()
            }
          })
        }
        

      },
      function(res) {

      }
    )
  },
  addNote(e) {
    let that = this
    wx.navigateTo({
      url: './edit/edit',
    })
  },
  editNote(e) {
    let that = this
    let id = e.target.dataset.id
    let value = e.target.dataset.text
    wx.navigateTo({
      url: './update/update?id=' + id+'&value='+value,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.LoadData()
  
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
    let that = this
    if (wx.getStorageSync('isfrom') === "add" || wx.getStorageSync('isfrom') === "edit") {
      that.LoadData()
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
  
  },
})