Page({
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  onLoad: function () {
    

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              //用户已经授权过
            }
          })
        }
      }
    })
  },
  bindGetUserInfo: function (e) {
    var that = this
    console.log(e.detail.userInfo)
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      console.log("用户按了授权")
      // 登录
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code
          console.log(code)
          wx.getUserInfo({
            success: function (res) {
              console.log("get user info ")
              var nickName = JSON.parse(res.rawData).nickName
              var imgUrl = JSON.parse(res.rawData).image_url
              // that.globalData.userInfo = res
              // typeof cb == "function" && cb(that.globalData.userInfo)
              wx.request({
                url: 'https://itraining.zhanzy.xyz/api/v1/session',
                data: {
                  'nickname': nickName,
                  'image_url': imgUrl,
                  'code': code,
                },
                header: {
                  'content-type': 'application/x-www-form-urlencoded',
                },
                method: "POST",
                success: function (res) {
                  wx.setStorageSync("wx_id", res.data.data.wx_id)
                  console.log("set storage cookie")
                  console.log(res)
                  console.log(res.header['set-cookie'])
                  // console.log(res.data.data.sessionid)
                  if (res.header["set-cookie"])
                    wx.setStorageSync("set-cookie", res.header["set-cookie"])
                  if (res.header["Set-Cookie"])
                    wx.setStorageSync("set-cookie", res.header["Set-Cookie"])

                },
                fail: function (res) {
                  console.log("fail to log")
                  console.log(res)
                }
              })
            },
            fail: function () {
              console.log("fail to get userinfo")

            }
          })
          // that.globalData.userInfo = res.userInfo
          // console.log("user nickName ")
          // console.log(that.globalData.userInfo)
          var code = res.code; //返回code
          // 测试zzy的服务器
        }
      })
      console.log("跳转到首页")
      wx.switchTab({
        url: '../SquarePage/square',
        fail:function(res) {
          console.log(res)
        }
      })
    } else {
      //用户按了拒绝按钮
    }
  }
})