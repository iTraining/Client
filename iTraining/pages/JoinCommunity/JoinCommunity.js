// pages/JoinCommunity/JoinCommunity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    token: "",
    team_id: "",
    team_name: '',
    team_image_url: '',
    team_bio: '',
    team_members: [],

    autoSize: [],  // 前三位队伍成员头像的自适应宽高
  },

  autoImage: function (e) {
    var that = this
    console.log("队伍成员头像信息")
    console.log(e)
    console.log(e.currentTarget.dataset.index)

    var imageWidth = e.detail.width
    var imageHeight = e.detail.height
    var imageScale = imageWidth / imageHeight;   // 图片真实的宽高比例
    var autoWidth = 80
    var autoHeight
    if (imageWidth > autoWidth) {
      autoHeight = autoWidth /  imageScale
    }
    var the_autoSize = that.data.autoSize
    the_autoSize[e.target.dataset.index] = {
      width: autoWidth,
      height: autoHeight
    }
    that.setData({
      autoSize: the_autoSize
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("要加入的队伍信息")
    console.log(options)
    this.setData({
      team_id: options.team_id,
      token:options.token,
      team_name: options.team_name,
      team_image_url: options.team_image_url,
      team_bio: options.team_bio,
    })
    var that = this
    // 获取队伍成员
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team/member',
      data: {
        team_id: that.data.team_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        console.log("队伍成员： ")
        console.log(res.data.data)
        that.setData({
          team_members: res.data.data
        })
      }
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
        
        wx.switchTab({
          //url: '../TrainingItemTodoList/TrainingItemTodoList'
          url:'../SquarePage/square'
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