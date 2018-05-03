// pages/registerCommunity/registerCommunity.js
Page({
  /**
  * 页面的初始数据
  */
  /**
     * 确认提交
     */
  submit: function (e) {
    var that = this;
    console.log("确认成功" + that.data.CommunityName + "---------" + that.data.CommunityDescription);
    // wx.navigateTo({
    //   url: '../PersonalCenter/PersonalCenter'
    // })
  },

  data: {
    "CommunityName":'',
    "CommunityDescription":'',
    "imgUrl":''
  },
  communityNameInput:function(e){
    this.setData({
      CommunityName: e.detail.value
    })
  },
  communityDescriptionInput: function (e) {
    this.setData({
      CommunityDescription: e.detail.value
    })
  },
  /**
   * 选择队伍图标
   */
  choseTeamIcon:function() {
    var that=this;
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:['album','camera'],
      success: function(res) {
        var tempFilePath=res.tempFilePaths;
        console.log("-----"+res.tempFilePaths);
        that.setData({
          imgUrl:tempFilePath
          
        })
      },
    })
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