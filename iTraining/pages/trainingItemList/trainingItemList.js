// pages/trainingItemList/trainingItemList.js
//获取应用实例
const app = getApp()
const fileData = require('../../utils/data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    team_list: [],
    default_indicator: [],  // eg. [{ id: '每组距离', unit: 'km', value: 0 }...],
    amount_meta: 0,  // 项目的数量
    training_name_list: [],    // 项目名称 需要在向数据库索取meta
    meta_list: [],  // 训练项目 eg. [{team_id, training_name,index1..]},{team_id, training_name,index1..]}]
  },
  

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // var that = this;
    // var createdTeam=wx.getStorageSync('createdTeam')
    // console.log("created team")
    // console.log(createdTeam)
    // for(var i=0;i<createdTeam.length;i++) {
    // //从服务器获得所有的meta
    // wx.request({
    //   url: 'https://itraining.zhanzy.xyz/api/v1/schedule/meta',
    //   header: {
    //     'Cookie': wx.getStorageSync("set-cookie")
    //   },
    //   data: {
    //     team_id: createdTeam[i].team_id,
    //   },
    //   method: "GET",
    //   success:function(res) {      
    //     console.log(res)
    //     var t_name_list = that.data.training_name_list
    //     var t_meta_list = that.data.meta_list
    //     for (var i=0;i<res.data.data.length;i++) {
    //       t_name_list.push(res.data.data[i].training_name)
    //       t_meta_list.push(res.data.data[i])
    //     }
        
    //     var t_amount_meta=that.data.meta_list.length
    //     console.log("successfully get meta data")
    //     console.log(res.data.data[0])
    //     that.setData({
    //       meta_list: t_meta_list,
    //       training_name_list:t_name_list,
    //       amount_meta:t_amount_meta,
    //     })
        
    //     console.log(typeof(that.data.training_name_list))
    //     // that.data.amount_meta = that.data.meta_list.length 
    //     console.log(that.data.amount_meta)
    //     console.log(that.data.meta_list)
    //   },
    //   fail:function(res) {
    //     console.log(res)
    //   }
    // })
    // }

    // var old_amount_meta = getApp().globalData.amount_meta
    // var old_meta_list = getApp().globalData.meta_list

    // console.log('用户添加项目前全局的项目信息如下')
    // console.log(old_meta_list)
    
    // that.data.meta_list = old_meta_list
    

    // for (var i = 0; i < that.data.amount_meta; i++) {
    //   that.data.training_name_list = that.data.training_name_list.concat(that.data.meta_list[i].training_name)
    // }
    // that.setData({
    //   team_list: ['龙舟队', '赛艇队'],  // 计划的目标队伍，仅供局部测试
    //   default_indicator: fileData.getDefaultIndicator(),
    //   meta_list: that.data.meta_list,
    //   amount_meta: that.data.amount_meta,
    //   training_name_list: that.data.training_name_list,
    // })
    // console.log('训练项目具体信息')
    // console.log(that.data.meta_list)
    // console.log('训练项目数目')
    // console.log(that.data.amount_meta)
    // console.log('项目名称信息')
    // console.log(that.data.training_name_list)
  },
  AddItem: function () {
    var that = this
    var str = 'add'
    wx.navigateTo({
      url: '../AddorEditTrainItems/AddorEditTrainItems?flag=' + str
    })
  },
  Addone:function() {
    var that =this
    console.log("add one")
    that.setData(
      {
        amount_meta:10,
      }
    )
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
    var that = this;
    that.setData({
      amount_meta: 0,  // 项目的数量
      training_name_list: [],    // 项目名称 需要在向数据库索取meta
      meta_list: [],
    })
    // 获取创建的队伍 
    var createdTeam = ''
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/team',
      method: "GET",
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      data: {
        option: 'created'
      },
      success: function (res) {
        console.log("获取队伍信息成功")
        console.log(res)
        console.log(res.data.data)
        createdTeam = res.data.data
        console.log(createdTeam)
        var t_team_list = that.data.team_list
        for (var i = 0; i < createdTeam.length; i++) {
          t_team_list.push(createdTeam[i].team_id)
        }
        if (t_team_list.length != 0) {
          that.setData({
            team_list: t_team_list,
            'meta.team_id': t_team_list[0]
          })
        }

        //从服务器获得所有的meta
        console.log("created team")
        console.log(createdTeam)
        for (var i = 0; i < createdTeam.length; i++) {

          wx.request({
            url: 'https://itraining.zhanzy.xyz/api/v1/schedule/meta',
            header: {
              'Cookie': wx.getStorageSync("set-cookie")
            },
            data: {
              team_id: createdTeam[i].team_id,
            },
            method: "GET",
            success: function (res) {
              console.log(res)
              var t_name_list = that.data.training_name_list
              var t_meta_list = that.data.meta_list
              for (var i = 0; i < res.data.data.length; i++) {
                t_name_list.push(res.data.data[i].training_name)
                t_meta_list.push(res.data.data[i])
              }

              var t_amount_meta = that.data.meta_list.length
              console.log("successfully get meta data")
              console.log(res.data.data[0])
              that.setData({
                meta_list: t_meta_list,
                training_name_list: t_name_list,
                amount_meta: t_amount_meta,
              })

              console.log(typeof (that.data.training_name_list))
              // that.data.amount_meta = that.data.meta_list.length 
              console.log(that.data.amount_meta)
              console.log(that.data.meta_list)
            },
            fail: function (res) {
              console.log(res)
              console.log("fail to get meta data")
            }
          })
        }
      },
      fail: function (res) {
        console.log("获取队伍信息失败")
        console.log(res)
      }
    })
    // var that = this;
    // that.data.training_name_list = []
    
    // var old_amount_meta = getApp().globalData.amount_meta
    // var old_meta_list = getApp().globalData.meta_list

    // console.log('用户添加项目前全局的项目信息如下')
    // console.log(old_meta_list)

    // that.data.meta_list = old_meta_list
    // that.data.amount_meta = that.data.meta_list.length

    // for (var i = 0; i < that.data.amount_meta; i++) {
    //   that.data.training_name_list = that.data.training_name_list.concat(that.data.meta_list[i].training_name)
    // }
    // that.setData({
    //   team_list: ['龙舟队', '赛艇队'],  // 计划的目标队伍，仅供局部测试
    //   default_indicator: fileData.getDefaultIndicator(),
    //   meta_list: that.data.meta_list,
    //   // amount_meta: that.data.amount_meta,
    //   // training_name_list: that.data.training_name_list,
    // })
    // console.log('训练项目具体信息')
    // console.log(that.data.meta_list)
    // console.log('训练项目数目')
    // console.log(that.data.amount_meta)
    // console.log('项目名称信息')
    // console.log(that.data.training_name_list)
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
  
  }
})