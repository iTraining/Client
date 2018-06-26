//app.js
App({
  onLaunch: function () {
    var that = this
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    console.log(wx.getStorageSync('set-cookie'))
    //  if (wx.getStorageSync('set-cookie')==="") 
    {
      // 登录
      wx.login({
        //获取code
        success: function (res) {
          var code = res.code
          console.log(code)
          wx.getUserInfo({
            success: function (res) {
              console.log("get user info")
              console.log(res.userInfo.nickName)
              var nickName = res.userInfo.nickName
              var imgUrl = res.userInfo.avatarUrl
              console.log("imgurl")
              console.log(imgUrl)
              that.globalData.userInfo = res
              typeof cb == "function" && cb(that.globalData.userInfo)
              // wx.uploadFile({
              //   url: 'https://itraining.zhanzy.xyz/api/v1/session?code='+code,
              //   filePath: '',
              //   name: '',
              // })

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
          // wx.redirectTo({
          //   url: 'pages/TrainingItemTodoList/TrainingItemTodoList',
          // })
        } else {
          console.log("没有认证")
          wx.navigateTo({
            url: "../pages/authorize/authorize"
          })
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
      console.log("call the login")
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              console.log(res)
              that.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(that.globalData.userInfo)
            },
            fail: function () {
              console.log("fail to get userinfo")

            }
          })
        },
        fail: function () {
          console.log("fail to login")

        }

      })
    }
  },
  globalData: {
    userInfo: null,
    //训练项目数据
    amount_meta: 1,
    meta_list: [{ team_id: 0, training_name: '深蹲', index1: 'weigh', index2: 'time', index3: '无', index4: '无', index5: '无', index6: '无' }],  // eg. [{team_id, training_name,index1..]},{team_id, training_name,index1..]}]
  }
})