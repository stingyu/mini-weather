/* ========================================================
                        小程序配置文件
======================================================== */
// 域名
var weatherAPI = 'https://weixin.jirengu.com/weather?key=study_javascript_in_jirengu.com';
var host = 'http://stingy.club';
var _24hour = 'https://weixin.jirengu.com/weather/future24h?key=study_javascript_in_jirengu.com';
const service = {
  //加载note
  load: `${host}/api/notes`,
  //删除note
  delete: `${host}/api/notes/delete`,
  //添加note
  add: `${host}/api/notes/add`,
  //编辑note
  edit: `${host}/api/notes/edit`,
  host,
  weatherAPI,
  _24hour,
}

module.exports = {
  service
}