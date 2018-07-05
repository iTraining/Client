// pages/PunchSchedule/PunchSchedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      schedule_to_punch:{},
      completion:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    var t_schedule=wx.getStorageSync('schedule_to_punch')
    console.log(t_schedule)
    that.setData({
      schedule_to_punch:t_schedule
    })
  },
  punch:function() {
    var that=this
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/punch',
      filePath: "...",
      name: 'file',
      formData: {
        schedule_id: that.data.schedule_to_punch.schedule_id,
        completion: that.data.completion,
        description:"完成打卡",
      },
      success: function (res) {
        var data = res.data
        //do something
      }
    })
    // wx.request({
    //   url: 'https://itraining.zhanzy.xyz/api/v1/punch',
    //   method:'POST',
    //   data:{
    //     schedule_id: that.data.schedule_to_punch.schedule_id,
    //     completion: that.data.completion,
    //     description:"完成打卡",q
    //   },
    //   header: {
    //     'Cookie': wx.getStorageSync("set-cookie")
    //   },
    //   success:function(res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '打卡成功',
    //       icon: 'success',
    //       duration: 1000,
    //       complete:function(){
    //         wx.switchTab({
    //           url: '../PersonalCenter/PersonalCenter',
    //         })
    //       }
    //       })
    //     // wx.navigateBack({
    //     //   delta: 1
    //     // })
        
    //   },
    //   fail:function(res) {
      
    //   }
    // })
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  sliderchange:function(e) {
    var that=this
    console.log(e)
    that.setData({
      completion:e.detail.value
    })
  }
})