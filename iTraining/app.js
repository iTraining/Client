//app.js
App({
  onLaunch: function () {
    var that=this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(wx.getStorageSync('set-cookie'))
    // if (wx.getStorageSync('set-cookie')==="") 
    {
      // 登录
      wx.login({
        //获取code
        success: function (res) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res
              typeof cb == "function" && cb(that.globalData.userInfo)
              wx.request({
                url: 'https://itraining.zhanzy.xyz/api/v1/session?code=' + code,
                data: {
                  'nickname': that.globalData.userInfo.nickName
                },
                header: {
                  'content-type': 'json'
                },
                success: function (res) {

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
                }
              })
            },
            fail: function () {
              console.log("fail to get userinfo")

            }
          })
          // that.globalData.userInfo = res.userInfo
          console.log("user nickName ")
          console.log(that.globalData.userInfo)
          var code = res.code; //返回code
          // 测试zzy的服务器
          
         
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
          
        } else {
          console.log("没有认证")
          wx.navigateTo({
            url: "pages/authorize/authorize"
        })
        }
      }
    })
  },
  getUserInfo: function (cb) {
    var that = this
    if (this.globalData.userInfo ) {
      console.log(this.globalData.userInfo)
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      console.log("call the login")
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail:function() {
              console.log("fail to get userinfo")
              
            }
          })
        },
        fail:function(){
          console.log("fail to login")

        }
        
      })
    }
  },
  globalData: {
    userInfo: null
  }
})