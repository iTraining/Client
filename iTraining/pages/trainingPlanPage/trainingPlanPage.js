// pages/trainingPlanPage/trainingPlanPage.js
var fileUtils = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeNow:"",
    todayPlan:[],
    NextDayPlan:false,
    schedule_list_today:[],
    schedule_list_tomorrow:[],
    completion:0,
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
    var t_punch_list=[]
    // 获取自己的打卡信息
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/punch',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      data:{
        option:'private',
        team_id:'-1',
        schedule_id:'-1',
        b_date: '2012-01-01',
        e_date: '2020-12-30'
      },
      success:function(res) {
        console.log(res)
        t_punch_list = res.data.data
        // 根据队伍去匹配所有的schedule
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
                option: 'private',
                team_id: '-1',
                b_date: '2012-01-01',
                e_date: '2020-12-30'
              },
              method: 'GET',
              header: {
                'Cookie': wx.getStorageSync("set-cookie")
              },
              success: function (res) {
                console.log("schedule is:")
                // var t_schedule_unpunch=[]
                console.log(res)
              for (var i=0;i<res.data.data.length;i++) {
                var isFindinPunchList=false 
                for (var j = 0; j < t_punch_list.length;j++) {  
                  if (res.data.data[i].schedule_id == t_punch_list[j].schedule_id) {
                    isFindinPunchList=true
                  }
                }
                  if (isFindinPunchList ==false) {
                    res.data.data[i].is_punched=false 
                  } else {
                    res.data.data[i].is_punched = true
                  }
                
              }
              console.log(res.data.data)
                // 今天的日期
                var t_date = new Date()
                // console.log(t_date.toLocaleString())
                // console.log(t_date.toLocaleDateString())
                // console.log(t_date.toLocaleTimeString())
                var t_schedule_today = []
                var t_schedule_tomorrow = []
                for (var i = 0; i < res.data.data.length; i++) {
                  // res.data.data[i].training_date = res.data.data[i].training_date.substring(0,10)
                  // console.log(res.data.data[i].training_date)
                  var t_training_date = new Date(res.data.data[i].training_date.toLocaleString())
                  console.log(t_training_date)
                  // 加入今日计划
                  if (t_training_date.getFullYear() == t_date.getFullYear() && t_training_date.getDate() == t_date.getDate() && t_training_date.getMonth() == t_date.getMonth()) {
                    console.log("加入今日计划")
                    t_schedule_today.push(res.data.data[i])
                  }
                  // 加入明日计划
                  var t_tomorrow_date=+new Date()
                  t_tomorrow_date = t_tomorrow_date + 1000 * 60 * 60 * 24
                  t_tomorrow_date = new Date(t_tomorrow_date)
                  if (t_training_date.getFullYear() == t_tomorrow_date.getFullYear() && t_training_date.getDate() == t_tomorrow_date.getDate()&& t_training_date.getMonth() == t_tomorrow_date.getMonth()) {
                    console.log("加入明日计划")
                    t_schedule_tomorrow.push(res.data.data[i])
                  }
                }

                console.log(t_team_map)
                console.log(t_team_map.get(1))
                for (var i = 0; i < t_schedule_today.length; i++) {
                  t_schedule_today[i].image_url = t_team_map.get(t_schedule_today[i].team_id)
                }

                for (var i = 0; i < t_schedule_tomorrow.length; i++) {
                  t_schedule_tomorrow[i].image_url = t_team_map.get(t_schedule_tomorrow[i].team_id)
                }
                console.log("明天的计划")
                console.log(t_schedule_tomorrow)
                that.setData({
                  schedule_list_today: t_schedule_today,
                  schedule_list_tomorrow: t_schedule_tomorrow,
                })

              },
              fail: function (res) {
                console.log(res)
              }
            })
          },
        })    
      },
      fail:function(res) {
        console.log(res)
        

      }
    })
    // 显示时间
    var t_date_string = fileUtils.getNowDate()
    var t_date = new Date(t_date_string)
    var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var t_show_date = t_date.getFullYear() + ' ' + (t_date.getMonth() + 1) + '月' + t_date.getDate() + '日 ' + weekday[t_date.getDay()]
    console.log("今日时间"+t_show_date)
    that.setData({
      timeNow: t_show_date
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