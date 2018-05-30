//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      //获取code
      success: function (res) {
        var code = res.code; //返回code
        console.log("res after login: ");
        console.log(code);
        // 测试zzy的服务器
        wx.request({
          url: 'https://itraining.zhanzy.xyz/api/v1/session?code='+code,
          data:{
          },
          header:{
            'content-type': 'json'              
          },
          success: function (res) {
            console.log(res.data)
            // console.log(res.data.data.sessionid)
            wx.setStorageSync("sessionid", res.data.data.sessionid)
          }
        })
        var appId = 'wxd3dae784d91bedf3';
        var secret = '74f8a0b038820663efbca24da8242b9e';
        // wx.request({
        //   url: 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appId + '&secret=' + secret + '&js_code=' + code + '&grant_type=authorization_code',
        //   data: {},
        //   header: {
        //     'content-type': 'json'  
        //   },
        //   success: function (res) {
        //     var openid = res.data.openid //返回sessionid
        //     console.log('openid为' + openid);
        //   }
        // })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          // wx.getUserInfo({
          //   success: res => {
          //     // 可以将 res 发送给后台解码出 unionId
          //     this.globalData.userInfo = res.userInfo

          //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
          //     // 所以此处加入 callback 以防止这种情况
          //     if (this.userInfoReadyCallback) {
          //       this.userInfoReadyCallback(res)
          //     }
          //   }
          // })
        }
      }
    })
  },
  globalData: {
    userInfo: null
  }
})