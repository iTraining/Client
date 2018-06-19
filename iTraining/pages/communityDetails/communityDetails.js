Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    team_id:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name:options.aid,
      bio:options.bio,
      team_id:options.team_id
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
    return {
      title: '中大龙舟队~',
      desc:'token='+this.data.token,
      path: '/pages/TrainingItemTodoList/TrainingItemTodoList'
    }
  },
  inviteSomeone:function() {
    var that=this
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team/invitation',
      data: {
        team_id: that.data.team_id
        // option:'created'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        // 从链接中获取到teamid 和token
        console.log(res.data)
        var url=res.data.data
        var index=url.indexOf('?')
        var resdata=url.substr(index+1)
        // console.log(resdata)
        var strs = resdata.split("&")
        // console.log(strs)
        var mtoken=strs[0].split('=')[1]
        var mteamid=strs[1].split('=')[1]
        console.log("token "+token)
        console.log('teamid'+teamid)
        // console.log(res.data.data.indexOf('?'))
        // var resdata=
        that.setData({
          token:mtoken,
          teamid:mteamid,
        })
      },
    })
  }
})