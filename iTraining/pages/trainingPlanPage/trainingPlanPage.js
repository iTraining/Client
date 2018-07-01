// pages/trainingPlanPage/trainingPlanPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeNow:"2018 7月1日 星期日",
    todayPlan:[],
    NextDayPlan:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that= this;
    
    var today_plan=[
      {
        id:1,
        img:"https://attach.s.op.gg/forum/20170801215759_139022.png",
        name:"6点健身房训练",
        time:"18:00",
        introduction:"4x卧推 4x深蹲"
      },
      {
        id:2,
        img: "https://attach.s.op.gg/forum/20170801215759_139022.png",
        name: "9点操场测功仪训练",
        time: "21:00",
        introduction: "1x测功仪"
      }
    ]
    that.setData({ todayPlan:today_plan});
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