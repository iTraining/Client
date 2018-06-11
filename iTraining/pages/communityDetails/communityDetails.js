Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    "testdata": [{
      "name": "张三",
      "imgsrc": "../../image/icon_tab/11.png"
    },
    {
      "name": "李四",
      "imgsrc": "../../image/icon_tab/11.png"
    },
    {
      "name": "王五",
      "imgsrc": "../../image/icon_tab/11.png"
    }, {
      "name": "于海",
      "imgsrc": "../../image/icon_tab/11.png"
    },{
      "name":"盖强",
      "imgsrc": "../../image/icon_tab/11.png"
    },
    {
      "name": "王五",
      "imgsrc": "../../image/icon_tab/11.png"
      
    }, {
      "name": "于海",
      "imgsrc": "../../image/icon_tab/11.png"      
    }, {
      "name": "",
      "imgsrc":"../../image/icon_tab/add.png"
    }
    ],
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
    return {
      title: 'iTraing~',
      path: '/page/user?id=123'
    }
  },
  inviteSomeone:function() {
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team/invitation',
      data: {
        team_id:'1'
        // option:'created'
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success: function (res) {
        console.log(res.data)

      },
    })
  }
})