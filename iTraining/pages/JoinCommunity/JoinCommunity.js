// pages/JoinCommunity/JoinCommunity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    team_id: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      team_id: options.team_id,
      token:options.token,
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
  joinCommunity:function() {
    var that=this
    console.log("join community ")
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team/join',
      data: {
        team_id: that.data.team_id,
        token:that.data.token,
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        wx.showToast({
          title: '成功加入',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        console.log(res.data)
        that.setData({
          list: res.data.data
        })
        wx.navigateTo({
          url: '../TrainingItemTodoList/TrainingItemTodoList'
        })
      },
    })
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