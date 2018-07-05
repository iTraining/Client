// pages/complishTrainingPage/complishTrainingPage.js
var fileData = require('../../utils/data.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    right_title:"6点健身房走一波",
    plan_time:"6月30日 18:00",
    plan_info:"今天有菜鸟入队，老鸟帮忙带一带",
    plan_items:[],
    schedule_to_punch:[],
    meta_map:{},
    imagePath: "/image/icon_tab/dianzan1.png",
    indicator_map:fileData.getIndicatorMap(),
    description:'',
    completion:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var t_schedule = wx.getStorageSync('schedule_to_punch')
    console.log(t_schedule)
    t_schedule.training_date = t_schedule.training_date.substring(0,10)
    that.setData({
      schedule_to_punch: t_schedule
    })
    
    wx.request({
      url: 'https://itraining.zhanzy.xyz/api/v1/schedule/meta',
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      data: {
        team_id: that.data.schedule_to_punch.team_id,
      },
      method: "GET",
      success: function (res) {
        var t_team_map = new Map()
        console.log(res)
        var t_meta_data=res.data.data
        for (var i=0;i<t_meta_data.length;i++ ){
          t_meta_data[i].indic1 = fileData.getIndicatorMap().get(t_meta_data[i].index1)
          t_meta_data[i].indic2 = fileData.getIndicatorMap().get(t_meta_data[i].index2)
          t_meta_data[i].indic3 = fileData.getIndicatorMap().get(t_meta_data[i].index3)
          t_meta_data[i].indic4 = fileData.getIndicatorMap().get(t_meta_data[i].index4)
        }
        for (var i = 0; i < t_meta_data.length;i++) {
          t_team_map.set(t_meta_data[i].meta_id, t_meta_data[i])
        }
        console.log(t_team_map)
        that.setData({
          meta_map:t_team_map
        })
        console.log(that.data.meta_map)

        var t_references = that.data.schedule_to_punch.references
        // 匹配到训练项目的名称和单位

        for (var i = 0; i < t_references.length;i++) {
// that.data.meta_map.get(that.data.schedule_to_punch.references[i].meta_id)
          t_references[i].meta_details=that.data.meta_map.get(t_references[i].meta_id)
        }

        that.setData({
          'schedule_to_punch.references':t_references,
          indicator_map: fileData.getIndicatorMap()
        })
        console.log('indicator', that.data.indicator_map.get(t_references[0].meta_details.index1))

        console.log(that.data.meta_map)
        console.log(that.data.indicator_map)
        console.log(that.data.schedule_to_punch)
      }
    })
    
    // wx.request({
    //   url: 'https://itraining.zhanzy.xyz/api/v1/schedule/meta',
    //   header: {
    //     'Cookie': wx.getStorageSync("set-cookie")
    //   },
    //   data: {
    //     team_id: createdTeam[i].team_id,
    //   },
    //   method: "GET",
    //   success: function (res) {

    // var plan_items = [
    //   {
    //     id: 1,
    //     name: "4x卧推",
    //     num_of_once: "20个",
    //     weight_of_once:"20kg",
    //   },
    //   {
    //     id: 2,
    //     name: "4x深蹲",
    //     num_of_once: "20个",
    //     weight_of_once: "20kg",
    //   }
    // ]
    // that.setData({ plan_items: plan_items });
    // var temp= that.right_title;
    // wx.setNavigationBarTitle({
    //   title: that.temp
    // })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  inputDescription:function(e) {
    this.setData({
      description: e.detail.value
    })
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
  sliderchange:function(e) {
    var that=this
    that.setData({
      completion:e.detail.value
    })
  },
  punch: function () {
    var that = this

    console.log(that.data.imagePath)
    console.log(that.data.completion)
    wx.uploadFile({
      url: 'https://itraining.zhanzy.xyz/api/v1/punch',
      filePath: that.data.imagePath,
      name: "avatar",
      formData: {
        schedule_id: that.data.schedule_to_punch.schedule_id,
        completion: that.data.completion,
        description: that.data.description,
      },
      header: {
        'Cookie': wx.getStorageSync("set-cookie")
      },
      success: function (res) {
        console.log(res)
        wx.switchTab({
          url: '../trainingPlanPage/trainingPlanPage',
        })
      },
      fail:function(res) {

      }
    })

    // wx.request({
    //   url: 'https://itraining.zhanzy.xyz/api/v1/punch',
    //   method: 'POST',
    //   data: {
    //     schedule_id: that.data.schedule_to_punch.schedule_id,
    //     completion: that.data.completion,
    //   },
    //   header: {
    //     'Cookie': wx.getStorageSync("set-cookie")
    //   },
    //   success: function (res) {
    //     console.log(res)
    //     wx.showToast({
    //       title: '打卡成功',
    //       icon: 'success',
    //       duration: 1000,
    //       complete: function () {
    //         wx.switchTab({
    //           url: '../PersonalCenter/PersonalCenter',
    //         })
    //       }
    //     })
    //   },
    //   fail: function (res) {

    //   }
    // })
  },
  selectImage: function (e) {
    let that = this;
    that.isSelected = true;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          imagePath: res.tempFilePaths[0],
        })
        console.log(res.tempFilePaths[0])
      },

    })
  },
})