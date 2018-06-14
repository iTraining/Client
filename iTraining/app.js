//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(wx.getStorageSync('set-cookie'))
    if (wx.getStorageSync('set-cookie')==="") {
      // 登录
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code; //返回code
          console.log("res after login: ");
          console.log(code);
          // 测试zzy的服务器
          wx.request({
            url: 'https://itraining.zhanzy.xyz/api/v1/session?code=' + code,
            data: {
            },
            header: {
              'content-type': 'json'
            },
            success: function (res) {
              console.log(res.header['set-cookie'])
              // console.log(res.data.data.sessionid)
              wx.setStorageSync("set-cookie", res.header["set-cookie"])
            },
            fail: function (res) {
              console.log("fail to log")
            }
          })
         
        }
      })
    }
    // } else {
    //   wx.navigateTo({
    //     url: "pages/Menu/Menu"
    //   })
    // }
    
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {

        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo) {
      console.log(this.globalData.userInfo)
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  globalData: {
    userInfo: null
  }
})