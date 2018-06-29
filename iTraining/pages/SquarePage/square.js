// pages/SquarePage/square.js

const app = getApp()
Page({

  
  data: {
    navTab: ["干货", "动态"],
    currentNavTab:"0",
  },

  // 切换
  switchNav: function (e) {
    console.log(e);
    this.setData({
      currentNavTab: e.currentTarget.dataset.idx
    });
  },

  
  onLoad: function (options) {
  
  },


  TurnToTrainingItemList:function() {
    wx.navigateTo({
      url: '/pages/trainingItemList/trainingItemList',
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
  },

  TurnToInjuryArticlesList:function() {
    wx.navigateTo({
      url: '/pages/injuryArticleList/injuryArticleList',
      success: function (res) { },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  TurnToFoodArticlesList:function(){
    wx.navigateTo({
      url: '/pages/foodArticleList/foodArticleList',
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