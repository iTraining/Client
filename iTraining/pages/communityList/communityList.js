var app = getApp()
var fileData = require('../../utils/data.js')

// pages/TrainingItemTodoList/TrainingItemTodoList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    colors: ['red', 'orange', 'yellow', 'green', 'purple'],
    // banner 初始化
    // banner_url: fileData.getBannerData(),
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav 初始化
    // navTopItems: fileData.getIndexNavData(),
    curNavId: 1,
    curIndex: 0
    // teamData:,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team',
      data: {
        option: 'joined'
        // option:'created'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.data
        })
      },
    })
  },

  // 加载更多
  loadMore: function (e) {
    console.log('加载更多')
    var curid = this.data.curIndex

    if (this.data.navSectionItems[curid].length === 0) return

    var that = this
    that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
    that.setData({
      list: that.data.navSectionItems,
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
    var that = this

    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team',
      data: {
        option: 'joined'
        // option:'created'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)
        that.setData({
          list: res.data.data
        })
      },
    })
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
  navigateDetail:function(e) {
    console.log("navigate to details")
    console.log(e)
    wx.setStorageSync("communityClicked", e.currentTarget.dataset)
    wx.navigateTo({
      url: '../communityDetails/communityDetails?aid='+e.currentTarget.dataset.aid+'&bio='+e.currentTarget.dataset.bio+'&team_id='+e.currentTarget.dataset.team_id+'&team_image='+e.currentTarget.dataset.team_image+'&team_leader_id='+e.currentTarget.dataset.leader_id
    })
  }
})