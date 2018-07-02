// pages/trainingPlanPage/trainingPlanPage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    timeNow:"",
    todayPlan:[],
    NextDayPlan:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var t_date = new Date()
    var weekday = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
    var t_show_date = t_date.getFullYear() + ' ' + (t_date.getMonth() + 1) + '月' + (t_date.getDay() + 1) + '日 ' + weekday[t_date.getDay()]
    // t_date=t_date.
    console.log(t_show_date)
    that.setData({
      timeNow: t_show_date
    })
    
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