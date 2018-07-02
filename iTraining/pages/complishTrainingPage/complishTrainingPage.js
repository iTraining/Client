// pages/complishTrainingPage/complishTrainingPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right_title:"6点健身房走一波",
    plan_time:"6月30日 18:00",
    plan_info:"今天有菜鸟入队，老鸟帮忙带一带",
    plan_items:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var plan_items = [
      {
        id: 1,
        name: "4x卧推",
        num_of_once: "20个",
        weight_of_once:"20kg",
      },
      {
        id: 2,
        name: "4x深蹲",
        num_of_once: "20个",
        weight_of_once: "20kg",
      }
    ]
    that.setData({ plan_items: plan_items });
    var temp= that.right_title;
    wx.setNavigationBarTitle({
      title: that.temp
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