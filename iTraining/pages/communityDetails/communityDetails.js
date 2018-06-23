Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    token:"",
    team_id:"",
    teamimg:'',
    team_leader_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      name:options.aid,
      bio:options.bio,
      team_id:options.team_id,
      team_image: 'https://itraining.zhanzy.xyz/'+options.team_image,
      team_leader_id:options.team_leader_id,
    })
    var that = this
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
        console.log(typeof(res.data))
        var url = res.data.data
        var index = url.indexOf('?')
        var resdata = url.substr(index + 1)
        // console.log(resdata)
        var strs = resdata.split("&")
        console.log("strs from community list")
        console.log(strs)
        var mtoken = strs[0].split('=')[1]
        var mteamid = strs[1].split('=')[1]
        // var mteamimg=strs[2].split('=')[1]
        console.log("token " + mtoken)
        console.log('teamid' + mteamid)
        // console.log(res.data.data.indexOf('?'))
        // var resdata=
        that.setData({
          token: mtoken,
          teamid: mteamid,
        })
      },
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
      title: 'iTraining~',
      desc:'token='+this.data.token,
      path: '/pages/JoinCommunity/JoinCommunity?team_id=' + this.data.team_id +'&token='+this.data.token
    }
  },
  inviteSomeone:function() {
    this.onShareAppMessage()
    // var that=this
    // wx.request({
    //   url: 'https://itraining.zhanzy.xyz/api/v1/team/invitation',
    //   data: {
    //     team_id: that.data.team_id
    //     // option:'created'
    //   },
    //   header: {
    //     'content-type': 'application/x-www-form-urlencoded',
    //     // 'content-type': 'application/json',
    //     'Cookie': wx.getStorageSync("set-cookie")
    //   },
    //   method: "GET",
    //   success: function (res) {
    //     // 从链接中获取到teamid 和token
    //     console.log(res.data)
    //     var url=res.data.data
    //     var index=url.indexOf('?')
    //     var resdata=url.substr(index+1)
    //     // console.log(resdata)
    //     var strs = resdata.split("&")
    //     // console.log(strs)
    //     var mtoken=strs[0].split('=')[1]
    //     var mteamid=strs[1].split('=')[1]
    //     console.log("token "+mtoken)
    //     console.log('teamid'+mteamid)
    //     // console.log(res.data.data.indexOf('?'))
    //     // var resdata=
    //     that.setData({
    //       token:mtoken,
    //       teamid:mteamid,
    //     })
    //   },
    // })
  },
  deleteCommunity:function() {
    var that=this
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team',
      data: {
        team_id: that.data.team_id
        // option:'created'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "DELETE",
      success: function (res) {
        // 从链接中获取到teamid 和token
        console.log("删除成功")
        wx.showToast({
          title: '删除成功',
          icon: 'succes',
          duration: 1000,
          mask: true
        })
        wx.navigateBack({
            delta: 1
        })
      },
    })
  },
  selectImage: function (e) {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imagePath: res.tempFilePaths[0],
        })
        console.log(res.tempFilePaths[0])
      },

    })
  },
})