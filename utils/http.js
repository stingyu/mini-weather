/**
     * url 请求地址
     * success 成功的回调
     * fail 失败的回调
     */
function _getmy(url, data, success, fail) {
  // 增强体验：加载中
  wx.showNavigationBarLoading()
  wx.request({
    url: url,
    method: 'GET',
    data: data || {},
    success: function (res) {

      console.log('--------------------------开始--------------------------')
      console.log('0.返回情况:success')
      console.log('1.请求地址')
      console.log(url)
      console.log('2.请求数据')
      console.log(data)
      console.log('3.返回数据')
      console.log(res)
      console.log('--------------------------结束--------------------------')

      success(res);
    },
    fail: function (res) {
      console.log('--------------------------开始--------------------------')
      console.log('0.返回情况:fail')
      console.log('1.请求地址')
      console.log(url)
      console.log('2.请求数据')
      console.log(data)
      console.log('3.返回数据')
      console.log(res)
      console.log('--------------------------结束--------------------------')

      fail(res);
    }
  });
}
function _postmy(url, data, success, fail) {
  // 增强体验：加载中
  wx.showNavigationBarLoading()

  wx.request({
    url: url,
    method: 'POST',
    data: data || {},
    success: function (res) {
      if(res.statusCode === 200) {
        console.log('--------------------------开始--------------------------')
        console.log('0.返回情况:success')
        console.log('1.请求地址')
        console.log(url)
        console.log('2.请求数据')
        console.log(data)
        console.log('3.返回数据')
        console.log(res)
        console.log('--------------------------结束--------------------------')
        wx.hideNavigationBarLoading()
        success(res);
      }else {
        console.log('--------------------------开始--------------------------')
        console.log('0.返回情况:fail')
        console.log('1.请求地址')
        console.log(url)
        console.log('2.请求数据')
        console.log(data)
        console.log('3.返回数据')
        console.log(res)
        console.log('--------------------------结束--------------------------')
        wx.hideNavigationBarLoading()
        fail(res);
      }
    },
    fail: function (res) {
      console.log('--------------------------开始--------------------------')
      console.log('0.返回情况:fail')
      console.log('1.请求地址')
      console.log(url)
      console.log('2.请求数据')
      console.log(data)
      console.log('3.返回数据')
      console.log(res)
      console.log('--------------------------结束--------------------------')
      wx.hideNavigationBarLoading()
      fail(res);
    }
  });
}
module.exports = {
  _getmy: _getmy,
  _postmy:_postmy,
}