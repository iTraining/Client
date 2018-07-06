// pages/finishItemAndRelease/finishAndRelease.js



Page({

  /**
   * 页面的初始数据
   */
  data: {
    imagePath:'../../image/icon_tab/add2.png',
    completion:'',
    description:'',
    schedule_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this
    console.log(options)
    that.setData({
      schedule_id: options.schedule_id,
    })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  inputDescription: function (e) {
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

  // img_change: function(){
  //   var self = this;
  //   wx.chooseImage({
  //     count: 1, // 默认9
  //     sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
  //     sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
  //     success: function (res) {
  //       // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
  //       var tempFilePaths = res.tempFilePaths;
  //       //把获取到的图片的地址（数组），赋值给data中的src。    
  //       self.setData({ src: tempFilePaths[0]});
        
  //     }
  //   }) 
  // },
  img_delete:function() {

    this.setData({
      src:"../../image/icon_tab/add2.png",
    })
  },
  punch:function() {
    var that=this
    console.log(that.data.imagePath)
    console.log(that.data.completion)
    wx.uploadFile({
      url: 'https://itraining.zhanzy.xyz/api/v1/punch',
      filePath: that.data.imagePath,
      name: "avatar",
      formData: {
        schedule_id: that.data.schedule_id,
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
  sliderchange: function (e) {
    var that = this
    that.setData({
      completion: e.detail.value
    })
  },

})