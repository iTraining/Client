// var app = getApp()
// var fileData = require('../../utils/data.js')

// Page({
//   /**
//    * 页面的初始数据
//    */
//   data: {
//     colors: ['red', 'orange', 'yellow', 'green', 'purple'],
//     // banner 初始化
//     indicatorDots: true,
//     vertical: false,
//     autoplay: true,
//     interval: 3000,
//     duration: 1000,
//     navSectionItems: fileData.getHistroyScheduleListData(),
//     curNavId: 1,
//     schedule_list:[],
//   },

//   /**
//    * 生命周期函数--监听页面加载
//    */
//   onLoad: function (options) {
//     var that = this
//     that.setData({
//       list: that.data.navSectionItems
//     })

//     wx.request({
//       url: 'https://itraining.zhanzy.xyz/api/v1/schedule',
//       data: {
//         option: 'created',
//         team_id: '1',
//         b_date: '2012-01-01',
//         e_date: '2020-12-30'
//       },
//       method: 'GET',
//       header: {
//         'Cookie': wx.getStorageSync("set-cookie")
//       },
//       success: function (res) {
//         console.log(res)
//         that.setData({
//           schedule_list:res.data.data
//         })
//       },
//       fail: function (res) {
//         console.log(res)
//       }
//     })
//   },

//   navigateDetail:function(e) {
//     console.log(e.currentTarget.dataset.data)
//     wx.setStorageSync('schedule_to_punch',e.currentTarget.dataset.data)
//     wx.navigateTo({
//       url: '../PunchSchedule/PunchSchedule'
//     })
//   },

//   // 加载更多
//   loadMore: function (e) {
//     /*console.log('加载更多')
//     var curid = this.data.curIndex

//     if (this.data.navSectionItems[curid].length === 0) return

//     var that = this
//     that.data.navSectionItems[curid] = that.data.navSectionItems[curid].concat(that.data.navSectionItems[curid])
//     that.setData({
//       list: that.data.navSectionItems,
//     })*/
//   },
//   /**
//    * 生命周期函数--监听页面初次渲染完成
//    */
//   onReady: function () {

//   },

//   /**
//    * 生命周期函数--监听页面显示
//    */
//   onShow: function () {

//   },

//   /**
//    * 生命周期函数--监听页面隐藏
//    */
//   onHide: function () {

//   },

//   /**
//    * 生命周期函数--监听页面卸载
//    */
//   onUnload: function () {

//   },

//   /**
//    * 页面相关事件处理函数--监听用户下拉动作
//    */
//   onPullDownRefresh: function () {

//   },

//   /**
//    * 页面上拉触底事件的处理函数
//    */
//   onReachBottom: function () {
//     var that = this;
//     wx.showLoading({
//       title: '玩命加载中',
//     })
//     wx.hideLoading();
//   },

//   /**
//    * 用户点击右上角分享
//    */
//   onShareAppMessage: function () {

//   }
// })

// pages/trainingPlanPage/trainingPlanPage.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeNow: "",
    todayPlan: [],
    NextDayPlan: false,
    schedule_list: [],
    completion: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    // 获取自己的打卡信息
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/punch',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      data: {
        option: 'private',
        team_id: '-1',
        schedule_id: '-1',
        b_date: '2012-01-01',
        e_date: '2020-12-30'
      },
      success: function (res) {
        console.log(res)
      },
      fail: function (res) {
        console.log(res)
      }
    })

    var t_date = new Date()
    var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var t_show_date = t_date.getFullYear() + ' ' + (t_date.getMonth() + 1) + '月' + (t_date.getDay() + 1) + '日 ' + weekday[t_date.getDay()]
    // t_date=t_date.
    console.log(t_show_date)
    that.setData({
      timeNow: t_show_date
    })
    var t_team_map = new Map()
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
        console.log(res.data.data)
        var team = res.data.data
        for (var i = 0; i < team.length; i++) {
          t_team_map.set(team[i].team_id, team[i].image_url)
        }
        console.log(t_team_map)

        wx.request({
          url: 'https://itraining.zhanzy.xyz/api/v1/schedule',
          data: {
            option: 'created',
            team_id: '-1',
            b_date: '2012-01-01',
            e_date: '2020-12-30'
          },
          method: 'GET',
          header: {
            'Cookie': wx.getStorageSync("set-cookie")
          },
          success: function (res) {
            console.log(res)
            var t_schedule = res.data.data

            console.log(t_team_map)
            console.log(t_team_map.get(1))
            for (var i = 0; i < t_schedule.length; i++) {
              t_schedule[i].image_url = t_team_map.get(t_schedule[i].team_id)
            }
            console.log(t_schedule)

            that.setData({
              schedule_list: t_schedule
            })

          },
          fail: function (res) {
            console.log(res)
          }
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
  navigateDetail: function (e) {
    console.log(e)
    wx.setStorageSync('schedule_to_punch', e.currentTarget.dataset.data)
    wx.navigateTo({
      url: '../complishTrainingPage/complishTrainingPage'
    })
  },
  sliderchange: function (e) {
    var that = this
    console.log(e)
    that.setData({
      completion: e.detail.value
    })
  }
})