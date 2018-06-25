// pages/PersonalCenter/PersonalCenter.js
var app=getApp()
Page({

  /**
     * 跳转到项目专栏
     */
  ToTrainingItemList: function () {
    wx.navigateTo({
      url: '../trainingItemList/trainingItemList'
    })
  },
  /**
     * 跳转到社区详情界面
     */
  ToCommunityDetails: function () {
    wx.navigateTo({
      url: '../communityDetails/communityDetails'
    })
  },
  /**
     * 跳转到社区详情界面
     */
  ToCommunityList: function () {
    wx.navigateTo({
      url: '../communityList/communityList'
    })
  },
  RegisterCommunity:function() {
    wx.navigateTo({
      url: '../registerCommunity/registerCommunity',
    })
  },
  /**
   * 跳转到制定训练计划界面
   */
  ToMakePlans:function() {
    wx.navigateTo({
      url: '../MakingPlansList/MakingPlansList',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {

    try {  // 读取数据缓存中的单个训练计划
      var single_trainPlanData = wx.getStorageSync('single_trainPlanData')
      if (single_trainPlanData) {
        console.log('数据缓存中的单个训练计划')
        console.log(single_trainPlanData)
      }
    } catch (e) {
      // Do something when catch error
    }
    
    var that=this
    //console.log("on load ")
    app.getUserInfo(function(userInfo) {
      // console.log(userInfo)
      that.setData({
        userInfo: JSON.parse(userInfo.rawData)
      })
    })
    console.log(this.data.userInfo)
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
    try {
      var single_trainPlanData = wx.getStorageSync('single_trainPlanData')
      if (single_trainPlanData) {
        console.log('数据缓存中的单个训练计划')
        console.log(single_trainPlanData)
      }
    } catch (e) {
      // Do something when catch error
    }
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