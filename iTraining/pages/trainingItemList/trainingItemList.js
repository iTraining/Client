// pages/trainingItemList/trainingItemList.js
//获取应用实例
const app = getApp()
const util = require('../../utils/util.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    scrollleft: 0,  // tab标题的滚动条位置
    currentTab: 0,  // 预设当前项的值
    tags: ['力量', '耐力','协调性','水上'],  // 项目分类
    showItems: util.trainingitem(),
    currentPages: [],  // 记录当前tab分页查询当前page
  },
  // 滑动切换标签样式
  switchTab: function (e) {
    console.log('switchTab');
    let index = e.detail.current  // 分类
    this.setData({
      currentTab: index
    });
  },
  // 点击标题切换当前页时改变样式
  switchNav: function (e) {
    var cur = e.target.dataset.current;
    console.log(cur)
    if (this.data.currentTab == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    };
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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