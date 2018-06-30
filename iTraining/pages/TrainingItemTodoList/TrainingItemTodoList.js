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
    banner_url: fileData.getBannerData(),
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    interval: 3000,
    duration: 1000,
    // nav 初始化
    // navTopItems: fileData.getIndexNavData(),
    navSectionItems: fileData.getIndexNavSectionData(),
    curNavId: 1,
    schedule_list:[],
    schedule_to_punch:[]
  },
  navigateDetail: function (e) {
    console.log(e)
    wx.setStorageSync('schedule_to_punch', e.currentTarget.dataset.data)
    wx.navigateTo({
      url: '../PunchSchedule/PunchSchedule'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    var that = this
    // that.setData({
    //   list: that.data.navSectionItems
    // })

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
        var t_schedule_list=res.data.data
        for(var i=0;i<t_schedule_list.length;i++) {
          var t_date = t_schedule_list[i].training_date
          console.log(t_date)
          t_schedule_list[i].training_date=t_date.substring(0,10)
        }
        that.setData({
          // schedule_to_punch: res.data.data
          schedule_list: t_schedule_list
        })
      },
      fail: function (res) {
        console.log(res)
      }
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