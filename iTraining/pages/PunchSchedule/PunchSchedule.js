// pages/PunchSchedule/PunchSchedule.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      wx.request({
        url: 'https://itraining.zhanzy.xyz/api/v1/schedule',
        data:{
          option: 'private',
          team_id: '-1',
          b_date:'2017-01-01',  
          e_date:'2019-12-30'
        },
        method:'GET',
        header: {
          'Cookie': wx.getStorageSync("set-cookie")
        },
        success:function(res) {
          console.log(res)

        },
        fail:function(res) {
          console.log(res)
        }
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})