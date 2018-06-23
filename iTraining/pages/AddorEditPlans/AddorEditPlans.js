// pages/AddorEditPlans/AddorEditPlans.js
var fileData = require('../../utils/data.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    train_item_list: [],
    index_name: 0,

    style_per_group: ['每组按重量', '每组按距离', '每组按时间'],
    index_style: 0,
    style: ['kg', 'km', 'mins'],

    TotalGroups: 0,
    Num_PerGroup: 0,
    Require_PerGroup: 0,

    old_item_name: '',  // 之前的项目名称，如果用户编辑项目时把项目名称改变了，那计划页面就要把之前的项目条款删掉
    item_index: 0,  // 要修改的项目的在indicators的下标
    edit: false,
    train_item_info: {
      name: '',
      index_name: '',
      totalGroup: 0,
      num_perGroup: 0,
      train_model: '',
      index_style: 0,
      units: '',
      require_perGroup:0,
    },
  },

  item_name_Change: function (e) {
    var that = this
    that.setData({
      index_name: e.detail.value
    })
  },
  style_change: function (e) {
    var that = this
    that.setData({
      index_style: e.detail.value,
    })
  },
  getTotalGroups: function (e) {
    var that = this
    that.setData({
      TotalGroups: e.detail.value,
    })
  },
  getNum_PerGroup: function (e) {
    var that = this
    that.setData({
      Num_PerGroup: e.detail.value,
    })
  },
  getRequire_PerGroup: function (e) {
    var that = this
    that.setData({
      Require_PerGroup: e.detail.value,
    })
  },
  dataIsValid: function () {
    var that = this
    if (that.data.train_item_info.name == "") {
     that.showErrorToast('项目名称不能为空!');
     return false;
    } else if (that.data.train_item_info.totalGroup == 0 || this.data.train_item_info.totalGroup == "") {
      that.showErrorToast('完成组数须 > 0 !');
      return false;
    } else if (that.data.train_item_info.num_perGroup == 0 || this.data.train_item_info.num_perGroup == "") {
      that.showErrorToast('每组数量须 > 0 !');
      return false;
    } else if (that.data.train_item_info.require_perGroup == 0 || this.data.train_item_info.require_perGroup =="") {
      that.showErrorToast('每组要求须 > 0 !');
      return false;
    }
    /*
    if () {}   // 如果训练项目的属性和训练模式不符，比如力量训练模式是每组按距离
    */
    return true;
  },
  showErrorToast: function (message) {
    wx.showToast({
      title: message,
      duration: 1000,
    })
  },
  setTrainData:function(e) {
    var that = this;
    that.setData({
      'train_item_info.name': that.data.train_item_list[that.data.index_name],
      'train_item_info.index_name': that.data.index_name,
      'train_item_info.totalGroup': that.data.TotalGroups,
      'train_item_info.num_perGroup': that.data.Num_PerGroup,
      'train_item_info.train_model': that.data.style_per_group[that.data.index_style],
      'train_item_info.units': that.data.style[that.data.index_style],
      'train_item_info.index_style': that.data.index_style,
      'train_item_info.require_perGroup': that.data.Require_PerGroup,
    })
  },
  sure: function (e) {
    var that = this
    that.setTrainData()
    if (!that.dataIsValid()) {
      return;
    } else {
     var pages = getCurrentPages();
     var prevPage = pages[pages.length - 2];  // 直接调用上一个页面的setData方法
     if (that.data.old_item_name != "") {
       // 如果存在old_item_name
       prevPage.data.trainPlanData.indicators[that.data.item_index] = that.data.train_item_info
       prevPage.setData({
         indi_index: prevPage.data.indi_index,
         trainPlanData: prevPage.data.trainPlanData,
       })
     } else if (that.data.old_item_name == "") {
      var str_indicators = 'trainPlanData.indicators';
      var count = prevPage.data.indi_index + 1;
      prevPage.data.indi_index = count; // indi_index其实就是trainPlanData.indicators的length
      prevPage.data.trainPlanData.indicators = prevPage.data.trainPlanData.indicators.concat(that.data.train_item_info)

       prevPage.setData({
         //indi_index: prevPage.data.indi_index,
         // indicators: prevPage.data.indicators,
         indi_index: count,
         [str_indicators]: prevPage.data.trainPlanData.indicators
       })
     }
    }
    wx.navigateBack({
      delta: 1
    })
  },
  delete_item: function (e) {
    var that = this
    var pages = getCurrentPages();
    var prevPage = pages[pages.length - 2];  // 直接调用上一个页面的setData方法
    if (that.data.old_item_name != "") {
      // 删除项目，后续可以加再次确认的流程
      var count = prevPage.data.indi_index - 1;
      prevPage.data.indi_index = count;
      prevPage.data.trainPlanData.indicators.splice(that.data.item_index, 1);
      prevPage.setData({
        indi_index: prevPage.data.indi_index,
        trainPlanData: prevPage.data.trainPlanData,
      })
    } else {
      // 如果该项目并没有被添加
      that.showErrorToast("只可删除已添加的项目")
    }
    wx.navigateBack({
      delta: 1
    })
  },
  giveup: function (e) {
    wx.navigateBack({
      delta: 1
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    that.setData({
      train_item_list: ['前平推', '深蹲', '弓箭步', '测功仪', '平板支撑']  // 应该从数据库获取   
    })
    console.log("接受到的参数是");
    console.log(options)
    if (options.flag != 'add') {   // flag不是'add'就是要修改的项目信息
      // 因此要显示修改前的该项目计划信息
      that.setData({  
        index_style: options.index_style,
        index_name: options.index_name,
        TotalGroups: options.totalGroup,
        Num_PerGroup: options.num_perGroup,
        Require_PerGroup: options.require_perGroup,
        old_item_name: options.old_item_name,
        item_index: options.item_index,
        edit: true,
      })
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
  onShow: function (options) {

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