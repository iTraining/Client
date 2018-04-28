Page({
  data: {
    "TeamID": '',
    "list": {},
    "testdata": [{
      "title": "中山大学赛艇队",
      "content": "赵云雷倾力指导，全中大最好的训练队"
    },
    {
      "title": "中山大学龙舟队",
      "content": "好好学习，天天划水"
    }
    ],

  },
  //注册社区
  registerCommunity: function () {
    wx.navigateTo({
      url: '../registerCommunity/registerCommunity'
    })
  },
  joinCommunity:function() {
    var that=this;
    console.log("----------Team id"+that.data.TeamID);
  },
  communityNameInput:function(e) {
    this.setData({
      TeamID:e.detail.value
    })
  },
  //跳转到社区详情界面
  ToCommunityDetails:function() {
    wx.navigateTo({
      url: '../communityDetails/communityDetails'
    })
  },
  /**
   * 页面的初始数据
   */
  

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
    
  },
  // onRequest: function () {
  //   var that = this;
  //   wx.request({
  //     url: 'https://douban.uieee.com/v2/movie/top250',
  //     method: "GET",
  //     header: {
  //       'Content-Type': 'json'
  //     },
  //     success: function (res) {
  //       if(res==undefined) {
  //         return ;
  //       }
  //       //console.log(res.data.subjects);
  //       var date = res.data.subjects;
  //       if(date !=undefined) {
  //       that.setData({
  //         list: date
  //       })
  //       }
  //     },
  //     fail: function () {
  //       console.log("接口调用失败");
  //     }
  //   })
  // },
  nextPage: function () {
    console.log("下拉触发该函数");
  }
})