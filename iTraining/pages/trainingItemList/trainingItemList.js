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
    var that = this;

    var old_amount_meta = getApp().globalData.amount_meta
    var old_meta_list = getApp().globalData.meta_list

    console.log('用户添加项目前全局的项目信息如下')
    console.log(old_meta_list)
    
    that.data.meta_list = old_meta_list
    that.data.amount_meta = that.data.meta_list.length

    for (var i = 0; i < that.data.amount_meta; i++) {
      that.data.training_name_list = that.data.training_name_list.concat(that.data.meta_list[i].training_name)
    }
    that.setData({
      team_list: ['龙舟队', '赛艇队'],  // 计划的目标队伍，仅供局部测试
      default_indicator: fileData.getDefaultIndicator(),
      meta_list: that.data.meta_list,
      amount_meta: that.data.amount_meta,
      training_name_list: that.data.training_name_list,
    })
    console.log('训练项目具体信息')
    console.log(that.data.meta_list)
    console.log('训练项目数目')
    console.log(that.data.amount_meta)
    console.log('项目名称信息')
    console.log(that.data.training_name_list)
  },
  AddItem: function () {
    var that = this
    var str = 'add'
    wx.navigateTo({
      url: '../AddorEditTrainItems/AddorEditTrainItems?flag=' + str
    })
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
    that.data.training_name_list = []
    
    var old_amount_meta = getApp().globalData.amount_meta
    var old_meta_list = getApp().globalData.meta_list

    console.log('用户添加项目前全局的项目信息如下')
    console.log(old_meta_list)

    that.data.meta_list = old_meta_list
    that.data.amount_meta = that.data.meta_list.length

    for (var i = 0; i < that.data.amount_meta; i++) {
      that.data.training_name_list = that.data.training_name_list.concat(that.data.meta_list[i].training_name)
    }
    that.setData({
      team_list: ['龙舟队', '赛艇队'],  // 计划的目标队伍，仅供局部测试
      default_indicator: fileData.getDefaultIndicator(),
      meta_list: that.data.meta_list,
      amount_meta: that.data.amount_meta,
      training_name_list: that.data.training_name_list,
    })
    console.log('训练项目具体信息')
    console.log(that.data.meta_list)
    console.log('训练项目数目')
    console.log(that.data.amount_meta)
    console.log('项目名称信息')
    console.log(that.data.training_name_list)
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