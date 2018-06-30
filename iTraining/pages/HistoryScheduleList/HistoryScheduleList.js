var app = getApp()
var fileData = require('../../utils/data.js')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    // banner 初始化
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    navSectionItems: fileData.getHistroyScheduleListData(),
    curNavId: 1,
    schedule_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      list: that.data.navSectionItems
    })

    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/schedule',
      data: {
        option: 'created',
        team_id: '1',
        b_date: '2012-01-01',
        e_date: '2020-12-30'
      },
      method: 'GET',
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      success: function (res) {
        console.log(res)
        that.setData({
          schedule_list:res.data.data
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },

  navigateDetail:function(e) {
    console.log(e.currentTarget.dataset.data)
    wx.setStorageSync('schedule_to_punch',e.currentTarget.dataset.data)
    wx.navigateTo({
      url: '../PunchSchedule/PunchSchedule'
    })
  },

  // 加载更多
  loadMore: function (e) {
    /*console.log('加载更多')
    var curid = this.data.curIndex

    if (this.data.navSectionItems[curid].length === 0) return

    var that = this
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
    })*/
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
    var that = this;
    wx.showLoading({
      title: '玩命加载中',
    })
    wx.hideLoading();
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})