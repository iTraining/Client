Page({
  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    inputName:'',
    bio:'',
    inputBio:'',
    token:"",
    team_id:"",
    team_image:'',
    inputTeam_image:'',
    team_leader_id:'',
    is_leader:false,
    team_members:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var team_info=wx.getStorageSync("communityClicked")
    console.log("team info")
    console.log(team_info)
    console.log("-----onload of community details")
    // 获取从队伍列表界面传过来的数据
    console.log(options)  
    this.setData({
      name:options.aid,
      inputName:options.aid,
      bio:options.bio,
      inputBio:options.bio,
      team_id:options.team_id,
      team_image: 'https://itraining.zhanzy.xyz/'+options.team_image,
      inputTeam_image: 'https://itraining.zhanzy.xyz/'+options.team_image,
      team_leader_id:options.team_leader_id,
    })

    // 获取队伍成员
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team/member',
      data:{
        team_id: that.data.team_id
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded',
        // 'content-type': 'application/json',
        'Cookie': wx.getStorageSync("set-cookie")
      },
      method: "GET",
      success:function(res) {
        console.log("队伍成员： ")
        console.log(res.data.data)
        that.setData({
          team_members:res.data.data
        })
      }
    })
    // 先得到邀请他人的信息

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
    // 判断是否是队长
    var wx_id=wx.getStorageSync("wx_id")
    console.log("wx_id: "+wx_id)
    if (this.data.team_leader_id==wx_id) {
      console.log("我是队长hhh")
      that.setData({
        is_leader: true,
      })
    } else {
      console.log(this.data.team_leader_id)
    }
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
    console.log("community details on hide")
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    // 是否保存当前的修改
    var that=this
    console.log("on unload")
    console.log(that.data.inputTeam_image)
    console.log(that.data.team_image)
    if (that.data.bio != that.data.inputBio || that.data.name != that.data.inputName || that.data.inputTeam_image != that.data.team_image) {
      wx.showModal({
        title: '提示',
        content: '是否保存修改',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            console.log(that.data.inputTeam_image)
            wx.uploadFile({
              url: 'https://itraining.zhanzy.xyz/api/v1/team/detail',
              filePath: that.data.inputTeam_image,
              name: 'avatar',
              header: {
                //'content-type': 'multipart/form-data',
                // 'content-type': 'application/json',
                'Cookie': wx.getStorageSync("set-cookie")
              },
              formData:{
                name: that.data.inputName,
                bio: that.data.inputBio,
                team_id: that.data.team_id,
              },
              success: function (res) {
                console.log("success on update info ")
                console.log(res)
              },
              fail:function(res) {
                console.log(res)
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })    
    }
    // console.log("community details on unload") 
    // console.log(that.data.bio)
    // console.log(that.data.name) 
    // console.log(that.data.team_id) 
    
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
    console.log("队伍简介")
    console.log(this.data.team_bio)
    return {
      title: 'iTraining~',
      desc:'token='+this.data.token,
      path: '/pages/JoinCommunity/JoinCommunity?team_id=' + this.data.team_id + '&token=' + this.data.token + '&team_image_url=' + this.data.team_image + '&team_name=' + this.data.name + '&team_bio=' + this.data.bio
    }
  },
  inviteSomeone:function() {
    
    this.onShareAppMessage()
  },
  deleteCommunity:function() {
    var that=this;
    wx.showModal({
      title: '提示',
      content: '你的队员将无家可归o(╥﹏╥)o',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          console.log(that.data.team_id)
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
              console.log(res)
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
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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
          // team_image: res.tempFilePaths[0],
          inputTeam_image: res.tempFilePaths[0],
        })
        console.log(res.tempFilePaths[0])
      },

    })
  },
  inputName:function(e) {
    console.log("input Name"+e)
    this.setData({
      inputName:e.detail.value
    })
  },
  inputBio:function(e) {
    console.log("update input bio")
    console.log(e.detail.value)
    this.setData({
      inputBio:e.detail.value
    })
  }
})