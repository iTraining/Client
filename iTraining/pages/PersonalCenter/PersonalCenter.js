// pages/PersonalCenter/PersonalCenter.js
const app=getApp()
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
    userInfo:{},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
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
    

    if (app.globalData.userInfo) {
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    }
    else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }


  },

  getUserInfo: function (e) {
    console.log(e);
    app.globalData.userInfo = e.detail.userInfo;
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  
  onReady: function () {
  
  },

  
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

  onHide: function () {
  
  },

  
  onUnload: function () {
  
  },

  
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